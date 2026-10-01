"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown, ArrowRight, ArrowUpRight, AudioLines, Check, ChevronDown,
  Heart, Menu, MessageCircle, MoveUpRight, Sparkles, Users, X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { INITIAL_POSTS } from "@/lib/mock-data";
import { useWikipediaSync } from "@/hooks/useWikipediaSync";
import { housemates, portraits, resolveHouseData, statusLabels, type HouseData } from "./housemates";
import styles from "./landing.module.css";

type HouseFilter = "featured" | "nominated" | "captain";

const questions = [
  {
    question: "What exactly is BBPulse?",
    answer: "Think of it as your Bigg Boss Telugu watch party, beyond the screen. BBPulse is an independent fan community where you can explore contestant journeys, share your take, join community polls, and make predictions with people who care about the show as much as you do.",
  },
  {
    question: "Is BBPulse affiliated with Bigg Boss?",
    answer: "No. We’re an independent, fan-built platform. BBPulse is not affiliated with, endorsed by, or connected to Bigg Boss, Star Maa, JioHotstar, or the show’s producers. All show and contestant names belong to their respective owners.",
  },
  {
    question: "Do community polls count as official votes?",
    answer: "No. BBPulse polls reflect only the preferences of participating community members. They do not affect the show’s official voting or eliminations. To cast an official vote, follow the instructions provided by the show and its official broadcaster.",
  },
  {
    question: "Can I look around before joining?",
    answer: "Absolutely. Explore the house, read discussions, and get a feel for the community without an account. When you’re ready to participate, create a free account. You must be 18 or older to join, and all members are expected to follow our community guidelines.",
  },
];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`${styles.brand} ${light ? styles.brandLight : ""}`} aria-label="BBPulse home">
      <span className={styles.brandMark} aria-hidden="true"><AudioLines size={25} strokeWidth={2.1} /></span>
      <span>bb<span className={styles.brandAccent}>pulse</span><span className={styles.brandPeriod}>.</span></span>
    </Link>
  );
}

function Starburst({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <path d="m50 0 8 28L79 9l-7 28 28-7-21 20 21 20-28-7 7 28-21-19-8 28-8-28-21 19 7-28-28 7 21-20L0 30l28 7-7-28 21 19Z" />
    </svg>
  );
}

export function LandingPage() {
  const { user, openAuthModal } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [houseFilter, setHouseFilter] = useState<HouseFilter>("featured");
  const [houseData, setHouseData] = useState<HouseData>({ housemates, source: "snapshot" });
  // Keep the existing sync subscription alive once, rather than mounting separate
  // desktop and mobile banners (which would create duplicate SSE connections).
  useWikipediaSync();

  useEffect(() => {
    let controller: AbortController;
    const loadContestants = async () => {
      controller?.abort();
      const request = new AbortController();
      controller = request;
      try {
        const response = await fetch("/api/contestants", { signal: request.signal });
        if (!response.ok) throw new Error("Contestant data unavailable");
        const data = resolveHouseData(await response.json());
        if (!data) throw new Error("Contestant data unavailable");
        if (!request.signal.aborted) setHouseData(data);
      } catch {
        if (!request.signal.aborted) {
          setHouseData((previous) => previous.source === "synced" ? { ...previous, source: "stale" } : previous);
        }
      }
    };

    void loadContestants();
    window.addEventListener("bbpulse:wikipedia_synced", loadContestants);
    return () => {
      controller?.abort();
      window.removeEventListener("bbpulse:wikipedia_synced", loadContestants);
    };
  }, []);

  const visibleHousemates = houseData.housemates.filter((person) => houseFilter === "featured" || person.status === houseFilter);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("landing-menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const joinButton = (className: string, label = "Find your people") => user ? (
    <Link href="/discuss" className={className}>{label} <ArrowUpRight size={18} aria-hidden="true" /></Link>
  ) : (
    <button type="button" className={className} onClick={() => openAuthModal()}>{label} <ArrowUpRight size={18} aria-hidden="true" /></button>
  );

  return (
    <div className={styles.page}>
      <a href="#main-content" className={styles.skipLink}>Skip to content</a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brandGroup}><Brand /><span className={styles.seasonPill}>TELUGU · S10</span></div>
          <nav className={styles.desktopNav} aria-label="Landing page navigation">
            <a href="#the-story">The story</a>
            <a href="#the-house">Meet the house</a>
            <a href="#fan-voices">Fan voices</a>
            <Link href="/contestants">Contestants</Link>
            <Link href="/vote">Community vote</Link>
          </nav>
          <div className={styles.headerActions}>
            {user ? <Link className={styles.login} href="/settings">My account</Link> : <button type="button" className={styles.login} onClick={() => openAuthModal()}>Log in</button>}
            {joinButton(styles.headerJoin, "Join the conversation")}
            <button id="landing-menu-toggle" type="button" className={styles.menuToggle} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="landing-mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="landing-mobile-menu" className={styles.mobileNav} aria-label="Mobile landing navigation">
            <Link href="/contestants" onClick={() => setMenuOpen(false)}>House contestants <ArrowUpRight size={18} /></Link>
            <Link href="/contestants/nominations" onClick={() => setMenuOpen(false)}>Nominations Ledger <ArrowUpRight size={18} /></Link>
            <Link href="/vote" onClick={() => setMenuOpen(false)}>Community Vote <ArrowUpRight size={18} /></Link>
            <a href="#the-story" onClick={() => setMenuOpen(false)}>The story <ArrowUpRight size={18} /></a>
            <a href="#the-house" onClick={() => setMenuOpen(false)}>Meet the house <ArrowUpRight size={18} /></a>
            <a href="#fan-voices" onClick={() => setMenuOpen(false)}>Fan voices <ArrowUpRight size={18} /></a>
            <Link href="/discuss" onClick={() => setMenuOpen(false)}>Explore discussions <ArrowUpRight size={18} /></Link>
          </nav>
        )}
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className={`${styles.hero} ${styles.container}`} aria-labelledby="hero-heading">
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span className={styles.orangeDot} /> THE UNOFFICIAL HOME OF REAL FANS</div>
            <h1 id="hero-heading">One house.<br />A million<br /><em>perspectives.</em></h1>
            <p className={styles.heroDescription}>The alliances. The plot twists. The “did that just happen?” moments. The story doesn’t end with the episode. <strong>It starts with you.</strong></p>
            <div className={styles.heroActions}>
              {joinButton(styles.primaryButton)}
              <a className={styles.textButton} href="#the-story">Explore the story <ArrowDown size={17} aria-hidden="true" /></a>
            </div>
            <div className={styles.fanNote}>
              <div className={styles.avatarStack} aria-hidden="true">
                {portraits.slice(0, 3).map((person) => <Image key={person.image} src={`/images/landing/${person.image}.webp`} alt="" width={38} height={38} />)}
                <span><Heart size={14} fill="currentColor" /></span>
              </div>
              <div><strong>Different favorites. One community.</strong><span>Made for fans. Built for every point of view.</span></div>
            </div>
          </div>

          <div className={styles.heroArt} aria-label="A collage of Bigg Boss Telugu housemates Thrigun, Varshini, and Jhansi">
            <div className={styles.orbit} aria-hidden="true" />
            <div className={styles.orbitInner} aria-hidden="true" />
            <div className={styles.orangeDisc} aria-hidden="true"><span>EVERYONE HAS A SIDE.</span></div>
            <Starburst className={styles.smallBurst} />
            <div className={styles.floatingLabel}><span className={styles.orangeDot} /> REAL PEOPLE. REAL PLOT TWISTS.</div>
            <Link href="/contestants/thrigun" className={`${styles.photoCard} ${styles.photoThrigun}`} aria-label="Explore Thrigun’s story">
              <div className={styles.photoImage}><Image src="/images/landing/thrigun.webp" alt="Thrigun smiling" fill sizes="(max-width: 600px) 190px, 255px" preload /></div>
              <div className={styles.photoCaption}><span>THE QUIET STORM</span><strong>Thrigun <ArrowUpRight size={19} /></strong></div>
            </Link>
            <Link href="/contestants/varshini-sounderajan" className={`${styles.photoCard} ${styles.photoVarshini}`} aria-label="Explore Varshini’s story">
              <div className={styles.photoImage}><Image src="/images/landing/varshini.webp" alt="Varshini Sounderajan" fill sizes="(max-width: 600px) 155px, 205px" preload /></div>
              <div className={styles.photoCaption}><span>UNAPOLOGETICALLY HER</span><strong>Varshini <ArrowUpRight size={18} /></strong></div>
            </Link>
            <Link href="/contestants/jhansi" className={`${styles.photoCard} ${styles.photoJhansi}`} aria-label="Explore Jhansi’s story">
              <div className={styles.photoImage}><Image src="/images/landing/jhansi.webp" alt="Folk singer Jhansi" fill sizes="(max-width: 600px) 140px, 180px" /></div>
              <div className={styles.photoCaption}><strong>All heart. All Jhansi. <ArrowUpRight size={15} /></strong></div>
            </Link>
            <div className={styles.commentSticker}><MessageCircle size={21} aria-hidden="true" /><span>Okay, but can we talk<br />about that episode?</span><span className={styles.commentSpark}>✳</span></div>
            <div className={styles.roundSticker}><span>NOT JUST<br />A VIEWER.</span><ArrowUpRight size={24} aria-hidden="true" /><strong>PART OF THE PLOT.</strong></div>
            <div className={styles.artFootnote}><span>THE HOUSE HAS A STORY.</span><span>YOU HAVE A TAKE. ↗</span></div>
          </div>
          <div className={styles.heroBottom}><span>BIGG BOSS TELUGU, THROUGH A DIFFERENT LENS.</span><a href="#the-story">THERE’S MORE TO THE STORY <ArrowDown size={13} /></a></div>
        </section>

        <div className={styles.ticker} aria-label="Every twist. Every take. Every side of the story.">
          <div className={styles.tickerTrack} aria-hidden="true">
            {[0, 1].map((copy) => <div className={styles.tickerGroup} key={copy}><span>EVERY TWIST.</span><Starburst /><span>EVERY TAKE.</span><Starburst /><span>EVERY SIDE OF THE STORY.</span><Starburst /><span>THAT’S THE PULSE.</span><Starburst /></div>)}
          </div>
        </div>

        <section id="the-story" className={`${styles.storySection} ${styles.container}`} aria-labelledby="story-heading">
          <div className={styles.sectionIntro}>
            <div className={styles.eyebrow}><span className={styles.chapterNumber}>01</span> MORE THAN A WATCH PARTY</div>
            <h2 id="story-heading">It’s never <em>just a show.</em></h2>
            <p>It’s the person you root for. The opinion you can’t keep to yourself.<br className={styles.desktopBreak} /> The strangers who somehow get it. We built a place for all of it.</p>
          </div>
          <div className={styles.storyGrid}>
            <Link href="/contestants" className={`${styles.storyCard} ${styles.peopleCard}`}>
              <div className={styles.storyVisual} aria-hidden="true">
                <div className={styles.miniPortraits}>{portraits.slice(0, 3).map((person) => <Image key={person.image} src={`/images/landing/${person.image}.webp`} alt="" width={100} height={118} />)}</div>
                <span className={styles.heartBubble}><Heart size={20} fill="currentColor" /></span>
              </div>
              <div className={styles.storyCardNumber}>01 / THE CONNECTION</div><h3>Pick your people.</h3>
              <p>Behind every housemate is a story worth knowing. Find the ones that feel like yours.</p>
              <span className={styles.cardLink}>Meet the housemates <ArrowUpRight size={18} /></span>
            </Link>
            <Link href="/debates" className={`${styles.storyCard} ${styles.voiceCard}`}>
              <div className={styles.storyVisual} aria-hidden="true"><div className={styles.speechOne}>That was a power move. <span>↗</span></div><div className={styles.speechTwo}>Or was it a plot twist? <span>👀</span></div><div className={styles.speechDots}>•••</div></div>
              <div className={styles.storyCardNumber}>02 / THE CONVERSATION</div><h3>Bring your own take.</h3>
              <p>Hot takes welcome. Different opinions, too. The best conversations have more than one side.</p>
              <span className={styles.cardLink}>Join the debate <ArrowUpRight size={18} /></span>
            </Link>
            <Link href="/pulse" className={`${styles.storyCard} ${styles.pulseCard}`}>
              <div className={styles.storyVisual} aria-hidden="true"><div className={styles.pulseVisual}><AudioLines size={22} /><span>THE FAN PULSE</span><svg viewBox="0 0 260 70" fill="none"><path d="M0 55h24l14-14 20 7 17-29 15 17 24-8 18 18 17-31 14 14 24-20 17 9 18-15 38-3" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" /><path d="M0 68h260" stroke="currentColor" strokeOpacity=".15" /></svg><span>BIG FEELINGS. A CLEARER PICTURE.</span></div></div>
              <div className={styles.storyCardNumber}>03 / THE BIGGER PICTURE</div><h3>Feel the pulse.</h3>
              <p>Who’s winning hearts? Who’s changing minds? See how the community sees the house.</p>
              <span className={styles.cardLink}>Explore the fan pulse <ArrowUpRight size={18} /></span>
            </Link>
          </div>
        </section>

        <section id="the-house" className={styles.houseSection} aria-labelledby="house-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeadingRow}>
              <div><div className={styles.eyebrow}><span className={styles.chapterNumber}>02</span> THE CHARACTERS. THE CHOICES.</div><h2 id="house-heading">Every face. <em>A new chapter.</em></h2></div>
              <Link href="/contestants" className={styles.textButton}>Meet the whole house <ArrowUpRight size={18} /></Link>
            </div>
            <div className={styles.houseToolbar}>
              <div className={styles.filters} role="group" aria-label="Filter featured housemates">
                {([{ value: "featured", label: "Featured housemates" }, { value: "nominated", label: "Nominated" }, { value: "captain", label: "House captain" }] as const).map((filter) => <button key={filter.value} type="button" aria-pressed={houseFilter === filter.value} className={houseFilter === filter.value ? styles.activeFilter : ""} onClick={() => setHouseFilter(filter.value)}>{filter.label}</button>)}
              </div>
              <span className={styles.previewLabel}>
                {houseData.source === "synced" ? "WIKIPEDIA-SYNCED STATUS · NOT OFFICIAL RESULTS" : houseData.source === "stale" ? "LAST LOADED STATUS · UPDATES UNAVAILABLE" : "SEASON SNAPSHOT · DEMONSTRATION DATA"}
              </span>
            </div>
            <p className={styles.srOnly} role="status">Showing {visibleHousemates.length} featured {visibleHousemates.length === 1 ? "housemate" : "housemates"}.</p>
            <div className={styles.houseGrid}>
              {visibleHousemates.map((person, index) => (
                <Link href={`/contestants/${person.slug}`} key={person.id} className={`${styles.houseCard} ${styles[person.color]}`}>
                  <div className={styles.housePortrait}><Image src={`/images/landing/${person.image}.webp`} alt={person.name} fill sizes="(max-width: 600px) 45vw, (max-width: 900px) 44vw, 280px" /><span className={styles.portraitIndex}>0{index + 1}</span><span className={styles.portraitArrow}><ArrowUpRight size={21} /></span><span className={styles.portraitTag}>{statusLabels[person.status]}</span></div>
                  <div className={styles.houseCardCopy}><h3>{person.name}</h3><p>{person.note}</p><span>Discover the story <ArrowRight size={15} /></span></div>
                </Link>
              ))}
              {visibleHousemates.length === 0 && (
                <div className={styles.emptyHouse}>
                  <Users size={27} aria-hidden="true" />
                  <h3>No {houseFilter === "captain" ? "house captain" : "nominees"} among these featured faces.</h3>
                  <p>This is just a peek at the house. Explore the full cast for more stories.</p>
                  <Link href="/contestants" className={styles.textButton}>See all housemates <ArrowUpRight size={18} /></Link>
                </div>
              )}
            </div>
            <p className={styles.houseFootnote}>Favorites change. Stories evolve. That’s what makes it interesting. <Link href="/contestants/nominations">Explore the nominations <ArrowUpRight size={12} aria-hidden="true" /></Link></p>
          </div>
        </section>

        <section id="fan-voices" className={`${styles.voicesSection} ${styles.container}`} aria-labelledby="voices-heading">
          <div className={styles.voicesIntro}><div className={styles.eyebrow}><span className={styles.chapterNumber}>03</span> THE OTHER SIDE OF THE SCREEN</div><h2 id="voices-heading">The house talks.<br /><em>So do we.</em></h2><p>Some moments deserve more than a group chat. Find thoughtful takes, friendly rivalries, and your next “exactly what I was thinking.”</p><Link href="/discuss" className={styles.outlineButton}>Find your conversation <ArrowUpRight size={18} /></Link><span className={styles.communityNote}><Users size={15} /> A little disagreement. A lot of belonging.</span></div>
          <div className={styles.discussionStack}>
            <span className={styles.discussionCaption}><MessageCircle size={14} /> A PEEK AT THE CONVERSATION <span>COMMUNITY PREVIEW</span></span>
            {INITIAL_POSTS.slice(0, 2).map((post, index) => <Link href={`/discuss/${post.id}`} key={post.id} className={styles.discussionCard}><div className={styles.discussionTop}><span className={`${styles.authorAvatar} ${index ? styles.authorPeach : ""}`}>{post.author_name.slice(0, 1)}</span><div><strong>{post.author_name}</strong><span>@{post.author_username}</span></div><span className={styles.postCategory}>{index ? "THE BIG DEBATE" : "FAN PERSPECTIVE"}</span></div><h3>{post.title}</h3><div className={styles.discussionBottom}><span><Heart size={14} /> {post.agree_count} agree</span><span><MessageCircle size={14} /> {post.comment_count} replies</span><ArrowUpRight size={18} /></div></Link>)}
            <div className={styles.handwritten}>Your take belongs here, too. <MoveUpRight size={24} /></div>
          </div>
        </section>

        <section className={styles.manifesto} aria-labelledby="manifesto-heading">
          <div className={styles.manifestoLines} aria-hidden="true" /><Starburst className={styles.manifestoStar} />
          <div className={styles.manifestoInner}><span className={styles.eyebrow}>THE SHOW HAS HOUSEMATES. WE HAVE EACH OTHER.</span><h2 id="manifesto-heading">You bring the passion.<br />We’ll bring <em>the people.</em></h2><p>For the day-one supporters. The unexpected converts.<br />The “one more episode” people. This is your place.</p>{joinButton(styles.lightButton, "Come on in. You belong here.")}<span className={styles.joinNote}><Check size={13} /> Free to join <span>·</span> Independent by choice <span>·</span> Fans first, always</span></div>
        </section>

        <section className={`${styles.faqSection} ${styles.container}`} aria-labelledby="faq-heading">
          <div><div className={styles.eyebrow}>A LITTLE CONTEXT</div><h2 id="faq-heading">Before you<br /><em>join the plot.</em></h2><p>A few things you might be wondering.</p></div>
          <div className={styles.faqList}>{questions.map((item) => <details className={styles.faqItem} key={item.question}><summary>{item.question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}><div className={styles.footerTop}><div><Brand /><p>Outside the house. Inside the conversation.</p></div><a href="#main-content" className={styles.backToTop}>BACK TO THE TOP <ArrowUpRight size={16} /></a></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} BBPulse. Made of fan energy.</span><nav aria-label="Footer navigation"><Link href="/guidelines">Community guidelines</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/independent-notice">Independent fan platform <Sparkles size={12} /></Link></nav></div><p className={styles.disclaimer}>An unofficial fan community. Not affiliated with Bigg Boss, Star Maa, or JioHotstar. Community polls are not official votes. Housemate statuses use Wikipedia-synced data when available, with a labeled season snapshot as fallback. Conversation previews use demonstration data.</p></div>
      </footer>
    </div>
  );
}
