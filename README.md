This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## Landing-page redesign

The homepage lives in `src/components/landing/LandingPage.tsx`, with scoped styles in `landing.module.css`. It uses the existing auth dialog and links to the app’s contestant, voting, nomination, and discussion pages. Other routes retain the original app shell.

Featured cards load `/api/contestants` and refresh on the existing `bbpulse:wikipedia_synced` event. The page labels demonstration fallback data and stale responses, and provides a full-cast link when a filter has no featured matches. The Wikipedia sync service and nomination data are not replaced by this design.

### Checks

```bash
npx tsx --test src/components/landing/housemates.test.ts
npx eslint src/components/landing src/components/layout/AppShell.tsx src/app/page.tsx scripts/landing-smoke.mjs
npx tsc --noEmit
npm run build
```

Browser smoke checks reuse an existing Playwright installation and Google Chrome. With the app running:

```bash
PLAYWRIGHT_MODULE=/absolute/path/to/playwright \
  BASE_URL=http://localhost:3000 \
  SCREENSHOT_DIR=/tmp \
  node scripts/landing-smoke.mjs
```

`PLAYWRIGHT_MODULE` is optional if Playwright is already resolvable; screenshots are optional. The script uses controlled contestant, sync, and auth API responses so it does not write to the database or send sign-up emails. It checks navigation, sign-in entry points, filters, sync events, stale/empty/error states, FAQ disclosures, keyboard navigation, reduced motion, dark-mode compatibility, and widths from 320px to 1440px. It does **not** certify live Wikipedia ingestion or account registration.

For a manual check, open `/`, try the housemate filters and FAQ, open/close the mobile menu with Escape, and follow a portrait into its profile and back Home. The app currently restores its existing demo-user state when no saved user is present; to exercise visitor CTAs, set `bbpulse_user_v1` to the string `null` in local storage and reload.
