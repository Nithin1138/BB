// Uses an existing Playwright installation; no new project dependency is needed.
// PLAYWRIGHT_MODULE=/path/to/playwright BASE_URL=http://localhost:3000 node scripts/landing-smoke.mjs
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const loadPlaywright = createRequire(import.meta.url);
const { chromium } = loadPlaywright(process.env.PLAYWRIGHT_MODULE || 'playwright');
const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const screenshotDir = process.env.SCREENSHOT_DIR;
const pass = (name) => console.log(`PASS ${name}`);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    let payload = {
      success: true,
      source: 'neon_postgres_wikipedia_synced',
      contestants: [
        { id: 'c_thrigun', status: 'nominated' },
        { id: 'c_varshini', status: 'active' },
        { id: 'c_mukesh', status: 'captain' },
        { id: 'c_jhansi', status: 'nominated' },
      ],
    };
    let unavailable = false;
    // Isolate the backend boundaries, especially the SSE endpoint that can write
    // to the database. These checks validate the UI, not Wikipedia or auth delivery.
    await context.route('**/api/contestants', (route) => route.fulfill({ status: unavailable ? 503 : 200, json: payload }));
    await context.route('**/api/sync/wikipedia/stream', (route) => route.fulfill({ contentType: 'text/event-stream', body: 'data: {"type":"init"}\n\n' }));
    await context.route('**/api/sync/wikipedia/status', (route) => route.fulfill({ json: {} }));
    await context.route('**/api/auth/me', (route) => route.fulfill({ json: { user: null, isGoogleConfigured: false } }));
    await context.addInitScript(() => {
      if (!sessionStorage.getItem('landing_smoke_initialized')) {
        localStorage.setItem('bbpulse_user_v1', 'null');
        sessionStorage.setItem('landing_smoke_initialized', 'true');
      }
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await page.getByText('WIKIPEDIA-SYNCED STATUS', { exact: false }).waitFor();
    assert.match(await page.title(), /One house/);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('main').count(), 1);
    assert(!/maximum-scale=1|user-scalable=no/.test(await page.locator('meta[name="viewport"]').getAttribute('content')));
    pass('home metadata, a single main landmark, and unrestricted zoom');

    await page.keyboard.press('Tab');
    assert.equal(await page.getByRole('link', { name: 'Skip to content' }).evaluate((el) => el === document.activeElement), true);
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('main').evaluate((el) => el === document.activeElement), true);
    pass('keyboard skip link moves focus into the main content');

    for (const label of ['Find your people', 'Join the conversation', 'Come on in. You belong here.', 'Log in']) {
      await page.getByRole('button', { name: label, exact: true }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      await page.getByRole('button', { name: 'Close', exact: true }).click();
      await page.getByRole('dialog').waitFor({ state: 'hidden' });
    }
    pass('all visitor calls to action open and close the existing sign-in dialog');

    const cards = page.locator('#the-house a[href^="/contestants/"]').filter({ has: page.locator('h3') });
    assert.equal(await cards.count(), 4);
    await page.getByRole('button', { name: 'Nominated', exact: true }).click();
    assert.equal(await cards.count(), 2);
    assert.equal(await page.getByRole('button', { name: 'Nominated', exact: true }).getAttribute('aria-pressed'), 'true');
    await page.getByRole('button', { name: 'House captain', exact: true }).click();
    assert.equal(await cards.count(), 1);
    assert.match(await cards.innerText(), /Mukesh/);
    pass('housemate filters use API statuses and expose their selected state');

    payload.contestants = payload.contestants.map((person) => ({ ...person, status: 'active' }));
    await page.evaluate(() => window.dispatchEvent(new Event('bbpulse:wikipedia_synced')));
    await page.getByText('No house captain among these featured faces.').waitFor();
    assert.equal(await cards.count(), 0);
    assert.equal(await page.getByRole('link', { name: 'See all housemates' }).getAttribute('href'), '/contestants');
    pass('Wikipedia update event refreshes cards and an empty filter offers a useful destination');

    unavailable = true;
    await page.evaluate(() => window.dispatchEvent(new Event('bbpulse:wikipedia_synced')));
    await page.getByText('LAST LOADED STATUS', { exact: false }).waitFor();
    await page.getByRole('button', { name: 'Featured housemates', exact: true }).click();
    assert.equal(await cards.count(), 4);
    pass('failed refresh retains the last cards and labels them as stale');

    unavailable = false;
    payload.source = 'mock_fallback';
    await page.evaluate(() => window.dispatchEvent(new Event('bbpulse:wikipedia_synced')));
    await page.getByText('SEASON SNAPSHOT · DEMONSTRATION DATA', { exact: true }).waitFor();
    pass('API fallback is explicitly labeled as demonstration data');

    const question = page.locator('summary').filter({ hasText: 'Do community polls count as official votes?' });
    await question.click();
    assert.match(await page.locator('details[open]').innerText(), /do not affect/);
    await question.click();
    assert.equal(await page.locator('details[open]').count(), 0);
    pass('FAQ disclosure opens and closes with the official-voting disclaimer');

    await page.getByRole('navigation', { name: 'Landing page navigation', exact: true }).getByRole('link', { name: 'The story', exact: true }).click();
    assert.equal(new URL(page.url()).hash, '#the-story');
    assert((await page.locator('#the-story').boundingBox()).y >= 85);
    pass('chapter navigation clears the sticky header');

    for (const width of [320, 375, 390, 500, 640, 700, 701, 768, 900, 901, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => window.scrollTo(0, 0));
      const bounds = await page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
      assert.equal(bounds.scroll, bounds.viewport, `Horizontal overflow at ${width}px`);
      const h1 = await page.locator('h1').boundingBox();
      assert(h1.x >= 0 && h1.x + h1.width <= width, `Heading clipped at ${width}px`);
      const controls = await page.locator('header a, header button, a[aria-label^="Explore"]').evaluateAll((elements) => elements
        .map((el) => ({ label: el.textContent || el.getAttribute('aria-label'), rect: el.getBoundingClientRect() }))
        .filter(({ rect }) => rect.width > 0)
        .map(({ label, rect }) => ({ label, x: rect.x, right: rect.right })));
      for (const control of controls) assert(control.x >= -1 && control.right <= width + 1, `${control.label} clipped at ${width}px: ${JSON.stringify(control)}`);
      pass(`responsive layout and visible navigation/portraits at ${width}px`);
    }

    await page.setViewportSize({ width: 390, height: 844 });
    const menu = page.getByRole('button', { name: 'Open menu', exact: true });
    await menu.click();
    assert.equal(await page.getByRole('button', { name: 'Close menu', exact: true }).getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Escape');
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    assert.equal(await menu.evaluate((el) => el === document.activeElement), true);
    await menu.click();
    await page.getByRole('navigation', { name: 'Mobile landing navigation' }).getByRole('link', { name: 'Meet the house', exact: true }).click();
    assert.equal(new URL(page.url()).hash, '#the-house');
    assert.equal(await page.getByRole('navigation', { name: 'Mobile landing navigation' }).count(), 0);
    pass('mobile navigation toggles, Escape restores focus, and anchor selection closes it');

    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    assert.equal(await page.locator('header').evaluate((el) => getComputedStyle(el).backgroundColor), 'rgba(248, 247, 242, 0.95)');
    assert.equal(await page.locator('main').evaluate((el) => [...el.querySelectorAll('*')].filter((node) => getComputedStyle(node).animationName !== 'none').length), 0);
    assert.equal(await page.locator('html').evaluate((el) => getComputedStyle(el).scrollBehavior), 'auto');
    pass('landing palette survives system dark mode and reduced motion stops animations');

    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((img) => img.decode());
    }
    assert(await page.locator('main img').evaluateAll((images) => images.every((img) => img.complete && img.naturalWidth > 0)));
    if (screenshotDir) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `${screenshotDir}/bbpulse-mobile-final.png`, fullPage: true });
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.screenshot({ path: `${screenshotDir}/bbpulse-desktop-final.png`, fullPage: true });
    }
    pass('all local portrait uses load');

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.getByRole('link', { name: 'Explore Thrigun’s story', exact: true }).click();
    await page.waitForURL('**/contestants/thrigun');
    assert.match(await page.locator('main').innerText(), /Thrigun/);
    await page.getByRole('navigation', { name: 'Main Navigation', exact: true }).getByRole('link', { name: 'Home', exact: true }).click();
    await page.waitForURL(`${baseURL}/`);
    await page.locator('#fan-voices a[href="/discuss/post_1"]').click();
    await page.waitForURL('**/discuss/post_1');
    assert.match(await page.locator('main').innerText(), /Thrigun/);
    pass('profile and discussion links work, and the app shell can return home');
    assert.deepEqual(errors, []);
    pass('no browser runtime errors throughout visitor flows');

    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.removeItem('bbpulse_user_v1'));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'Find your people', exact: true }).click();
    await page.waitForURL('**/discuss');
    pass('existing signed-in/demo state enters discussions directly');

    unavailable = true;
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await page.getByText('SEASON SNAPSHOT · DEMONSTRATION DATA', { exact: true }).waitFor();
    assert.equal(await cards.count(), 4);
    pass('initial API failure still leaves a browsable four-card snapshot');
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
