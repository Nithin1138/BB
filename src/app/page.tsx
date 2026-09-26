"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  INITIAL_CONTESTANTS,
  INITIAL_POSTS,
  INITIAL_DEBATE
} from "@/lib/mock-data";
import { ContestantRow } from "@/components/contestants/ContestantRow";
import { CommunityVoteCard } from "@/components/poll/CommunityVoteCard";
import { DebateEditorialCard } from "@/components/debate/DebateEditorialCard";
import { CommunityPredictionCard } from "@/components/prediction/CommunityPredictionCard";
import { PostCard } from "@/components/discussions/PostCard";
import { ShareModal } from "@/components/share/ShareModal";
import { ShareCardConfig } from "@/types";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  MessageCircle,
  Share2,
  Radio,
  Flame,
  Clock,
  Sparkles,
  BarChart3,
  ShieldAlert
} from "lucide-react";

export default function HomePage() {
  const [shareConfig, setShareConfig] = useState<ShareCardConfig | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "nominated" | "safe">("all");

  const filteredContestants = INITIAL_CONTESTANTS.filter(c => {
    if (selectedFilter === "nominated") return c.status === "nominated";
    if (selectedFilter === "safe") return c.status === "active" || c.status === "captain";
    return true;
  }).slice(0, 6);

  const risingContestants = [...INITIAL_CONTESTANTS].sort((a, b) => b.pulse_change - a.pulse_change).slice(0, 3);
  const fallingContestants = [...INITIAL_CONTESTANTS].sort((a, b) => a.pulse_change - b.pulse_change).slice(0, 3);
  const mostDiscussed = [...INITIAL_CONTESTANTS].sort((a, b) => b.discussion_count - a.discussion_count).slice(0, 3);
  const highlightedPosts = INITIAL_POSTS.slice(0, 3);

  const handleOpenShare = () => {
    setShareConfig({
      type: "trend",
      headline: "The house is divided. The verified audience record.",
      main_metric: `${INITIAL_CONTESTANTS[0].pulse_score} Pulse`,
      secondary_metric: `${INITIAL_CONTESTANTS[0].name} leads daily community attention`,
      contestant_name: INITIAL_CONTESTANTS[0].name,
      contestant_avatar: INITIAL_CONTESTANTS[0].avatar_url,
      disclaimer: "Daily BBPulse Fan Intelligence Signal",
      url: "/"
    });
  };

  return (
    <div className="space-y-12 sm:space-y-16 max-w-[1240px] mx-auto">
      {/* 1. BROADSHEET DATELINE HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E4E4E7] dark:border-[#232328] font-mono text-[10px] tracking-[0.2em] uppercase text-[#71717A]">
        <div className="flex items-center gap-3">
          <span>TELUGU EDITION • SEASON 10 DASAVATHARAM</span>
          <span>•</span>
          <span>SEPTEMBER 27, 2026</span>
          <span>•</span>
          <span className="text-[#FF4500] font-semibold">DAY 24 OF 105</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span>TRANSMISSION: 23:00 IST STAR MAA / HOTSTAR</span>
        </div>
      </div>

      {/* 2. EDITORIAL HERO STATEMENT */}
      <section className="pt-2 sm:pt-4 pb-8 sm:pb-12 border-b border-[#E4E4E7] dark:border-[#232328]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Hero Left: Statement, Metrics & Fast Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] leading-[1.04]">
              The house is <span className="italic font-serif">divided</span>.<br className="hidden sm:inline" />
              The audience record.
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] dark:text-[#A1A1AA] leading-relaxed max-w-xl font-sans">
              A transparent, tamper-evident ledger of fan voting momentum, nomination danger signals, and polarized deliberation across Telugu reality television audiences.
            </p>

            {/* Swiss Minimalist Monolithic Data Line */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-[#E4E4E7] dark:border-[#232328]">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#71717A]">
                  Verified Ballots
                </div>
                <div className="text-2xl font-mono font-bold tabular-nums text-[#09090B] dark:text-[#F4F4F5] mt-1">
                  14,820
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#71717A]">
                  Eviction Cycle
                </div>
                <div className="text-2xl font-mono font-bold tabular-nums text-[#FF4500] mt-1">
                  Week 04
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#71717A]">
                  Leader Share
                </div>
                <div className="text-2xl font-mono font-bold tabular-nums text-[#F59E0B] mt-1">
                  36.0%
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#71717A]">
                  Nominated
                </div>
                <div className="text-2xl font-mono font-bold tabular-nums text-[#09090B] dark:text-[#F4F4F5] mt-1">
                  6 at risk
                </div>
              </div>
            </div>

            {/* High-Contrast Minimalist Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#live-standings"
                className="px-5 py-2.5 rounded-md bg-[#09090B] dark:bg-[#F4F4F5] hover:bg-black dark:hover:bg-white text-white dark:text-[#09090B] text-xs font-mono uppercase tracking-wider font-bold transition-all active:scale-95 shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Inspect Standings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/vote"
                className="px-5 py-2.5 rounded-md bg-[#FF4500] hover:bg-[#E03E00] text-white text-xs font-mono uppercase tracking-wider font-bold transition-all active:scale-95 shadow-xs flex items-center gap-1.5"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Cast Verified Ballot</span>
              </Link>
            </div>
          </div>

          {/* Hero Right: Lead Contender Dossier (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] dark:border-[#232328]">
                <span className="font-mono text-[10px] font-bold tracking-widest text-[#FF4500] uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]" />
                  Cycle 04 Front-Runner
                </span>
                <span className="font-mono text-xs font-bold text-[#10B981] tabular-nums">
                  +8.2% 24h delta
                </span>
              </div>

              <div className="flex items-start gap-4">
                <img
                  src={INITIAL_CONTESTANTS[0].avatar_url}
                  alt={INITIAL_CONTESTANTS[0].name}
                  className="w-16 h-16 rounded-md object-cover border border-[#E4E4E7] dark:border-[#232328] shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-xl font-serif font-bold text-[#09090B] dark:text-[#F4F4F5] truncate">
                      {INITIAL_CONTESTANTS[0].name}
                    </h2>
                    <span className="text-xs text-[#71717A] shrink-0 font-medium">
                      ({INITIAL_CONTESTANTS[0].telugu_name})
                    </span>
                  </div>
                  <div className="text-xs text-[#52525B] dark:text-[#A1A1AA] mt-0.5">
                    {INITIAL_CONTESTANTS[0].profession}
                  </div>
                  <blockquote className="font-serif italic text-xs text-[#71717A] mt-2 border-l-2 border-[#FF4500] pl-2 line-clamp-2">
                    "{INITIAL_CONTESTANTS[0].quote}"
                  </blockquote>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E4E4E7] dark:border-[#232328] text-center">
                <div className="p-2 rounded-md bg-[#F4F4F5] dark:bg-[#1B1B1F]">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#71717A]">Pulse Index</div>
                  <div className="text-lg font-mono font-bold tabular-nums text-[#09090B] dark:text-[#F4F4F5]">
                    {INITIAL_CONTESTANTS[0].pulse_score}
                  </div>
                </div>
                <div className="p-2 rounded-md bg-[#F4F4F5] dark:bg-[#1B1B1F]">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#71717A]">Ballot Share</div>
                  <div className="text-lg font-mono font-bold tabular-nums text-[#F59E0B]">
                    36.0%
                  </div>
                </div>
                <div className="p-2 rounded-md bg-[#F4F4F5] dark:bg-[#1B1B1F]">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#71717A]">Danger Score</div>
                  <div className="text-lg font-mono font-bold tabular-nums text-[#52525B] dark:text-[#A1A1AA]">
                    18/100
                  </div>
                </div>
              </div>

              <Link
                href={`/contestants/${INITIAL_CONTESTANTS[0].slug}`}
                className="w-full py-2 bg-[#F4F4F5] dark:bg-[#1B1B1F] hover:bg-[#E4E4E7] dark:hover:bg-[#232328] text-[#09090B] dark:text-[#F4F4F5] rounded-md text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-98"
              >
                <span>Examine Full Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LIVE HOUSE STANDINGS (BROADSHEET RANKING INDEX) */}
      <section id="live-standings" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-[#E4E4E7] dark:border-[#232328]">
          <div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#FF4500] font-semibold mb-1">
              THE SEASON INDEX
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#09090B] dark:text-[#F4F4F5]">
              Live House Standings
            </h2>
            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mt-0.5">
              Daily synthesized score calculated from verified community ballots, polarized debate splits, and eviction vulnerability.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center border border-[#E4E4E7] dark:border-[#232328] rounded-md p-0.5 bg-white dark:bg-[#141416] text-[11px] font-mono">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-2.5 py-1 rounded transition-colors ${selectedFilter === "all" ? "bg-[#09090B] text-white dark:bg-[#F4F4F5] dark:text-[#09090B] font-bold" : "text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F4F4F5]"}`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter("nominated")}
                className={`px-2.5 py-1 rounded transition-colors ${selectedFilter === "nominated" ? "bg-[#FF4500] text-white font-bold" : "text-[#71717A] hover:text-[#FF4500]"}`}
              >
                Nominated
              </button>
              <button
                onClick={() => setSelectedFilter("safe")}
                className={`px-2.5 py-1 rounded transition-colors ${selectedFilter === "safe" ? "bg-[#10B981] text-white font-bold" : "text-[#71717A] hover:text-[#10B981]"}`}
              >
                Safe
              </button>
            </div>

            <Link
              href="/contestants"
              className="text-xs font-mono uppercase tracking-wider font-semibold text-[#09090B] dark:text-[#F4F4F5] hover:text-[#FF4500] flex items-center gap-1 shrink-0 ml-2"
            >
              <span>All 14 →</span>
            </Link>
          </div>
        </div>

        <div className="space-y-1.5">
          {filteredContestants.map((contestant, idx) => (
            <ContestantRow
              key={contestant.id}
              contestant={contestant}
              rank={idx + 1}
              isLeader={idx === 0 && selectedFilter === "all"}
            />
          ))}
        </div>
      </section>

      {/* 4. DELIBERATION DUAL COLUMN (BALLOT + EDITORIAL DEBATE) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left: Community Vote (7 cols) */}
        <div className="lg:col-span-7">
          <CommunityVoteCard />
        </div>

        {/* Right: Today's Featured Debate (5 cols) */}
        <div className="lg:col-span-5">
          <DebateEditorialCard />
        </div>
      </section>

      {/* 5. HOUSE MOMENTUM & VOLATILITY MATRIX */}
      <section className="space-y-4">
        <div className="pb-3 border-b border-[#E4E4E7] dark:border-[#232328]">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#71717A] font-semibold mb-1">
            24-HOUR VOLATILITY LEDGER
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#09090B] dark:text-[#F4F4F5]">
            House Momentum & Shifts
          </h2>
          <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mt-0.5">
            Real-time delta tracking voting velocity, public backing erosion, and discourse spikes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Gaining Momentum */}
          <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-4 sm:p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#E4E4E7] dark:border-[#232328]">
              <span className="text-xs font-mono font-bold text-[#10B981] flex items-center gap-1.5 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Gaining Momentum</span>
              </span>
              <span className="text-[10px] font-mono text-[#71717A]">24H Delta</span>
            </div>

            <div className="space-y-1.5">
              {risingContestants.map(c => (
                <Link
                  key={c.id}
                  href={`/contestants/${c.slug}`}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F] transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={c.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover border border-[#E4E4E7] dark:border-[#232328]" />
                    <div className="min-w-0 truncate">
                      <div className="text-xs font-serif font-bold text-[#09090B] dark:text-[#F4F4F5] group-hover:text-[#FF4500] truncate">
                        {c.name}
                      </div>
                      <div className="text-[10px] text-[#71717A]">
                        {c.profession}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono tabular-nums text-[#10B981] shrink-0 pl-2">
                    +{c.pulse_change}%
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Under Pressure */}
          <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-4 sm:p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#E4E4E7] dark:border-[#232328]">
              <span className="text-xs font-mono font-bold text-[#FF4500] flex items-center gap-1.5 uppercase tracking-wider">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>Under Pressure</span>
              </span>
              <span className="text-[10px] font-mono text-[#71717A]">24H Delta</span>
            </div>

            <div className="space-y-1.5">
              {fallingContestants.map(c => (
                <Link
                  key={c.id}
                  href={`/contestants/${c.slug}`}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F] transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={c.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover border border-[#E4E4E7] dark:border-[#232328]" />
                    <div className="min-w-0 truncate">
                      <div className="text-xs font-serif font-bold text-[#09090B] dark:text-[#F4F4F5] group-hover:text-[#FF4500] truncate">
                        {c.name}
                      </div>
                      <div className="text-[10px] text-[#71717A]">
                        {c.profession}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono tabular-nums text-[#FF4500] shrink-0 pl-2">
                    {c.pulse_change}%
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Most Discussed */}
          <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-4 sm:p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#E4E4E7] dark:border-[#232328]">
              <span className="text-xs font-mono font-bold text-[#F59E0B] flex items-center gap-1.5 uppercase tracking-wider">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Most Discussed</span>
              </span>
              <span className="text-[10px] font-mono text-[#71717A]">Mentions</span>
            </div>

            <div className="space-y-1.5">
              {mostDiscussed.map(c => (
                <Link
                  key={c.id}
                  href={`/contestants/${c.slug}`}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F] transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={c.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover border border-[#E4E4E7] dark:border-[#232328]" />
                    <div className="min-w-0 truncate">
                      <div className="text-xs font-serif font-bold text-[#09090B] dark:text-[#F4F4F5] group-hover:text-[#FF4500] truncate">
                        {c.name}
                      </div>
                      <div className="text-[10px] text-[#71717A]">
                        {c.discussion_count.toLocaleString()} posts
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono tabular-nums text-[#09090B] dark:text-[#F4F4F5] shrink-0 pl-2">
                    {c.pulse_score}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMMUNITY DISCOURSE FEED PREVIEW */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] dark:border-[#232328]">
          <div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#71717A] font-semibold mb-1">
              FAN DISPATCH & THEORIES
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#09090B] dark:text-[#F4F4F5]">
              Community Perspectives
            </h2>
            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mt-0.5">
              Live episode breakdowns, arguments, and strategic theories from Telugu audiences.
            </p>
          </div>
          <Link
            href="/discuss"
            className="text-xs font-mono uppercase tracking-wider font-semibold text-[#09090B] dark:text-[#F4F4F5] hover:text-[#FF4500] flex items-center gap-1"
          >
            <span>All Topics →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {highlightedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 7. EVICTION CONSENSUS FORECAST */}
      <section>
        <CommunityPredictionCard />
      </section>

      {/* 8. SHAREABLE LIVE INTELLIGENCE */}
      <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-6 sm:p-8 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-xl">
          <div className="text-[10px] font-mono font-bold text-[#FF4500] uppercase tracking-widest">
            VERIFIED SOCIAL DISPATCH
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#09090B] dark:text-[#F4F4F5]">
            Export Today's Live Standing Card
          </h3>
          <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
            Generate stark, typography-led broadsheet graphics formatted for WhatsApp status, Instagram stories, and X.
          </p>
        </div>

        <button
          onClick={handleOpenShare}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#09090B] dark:bg-[#F4F4F5] text-white dark:text-[#09090B] hover:bg-black dark:hover:bg-white text-xs font-mono uppercase tracking-wider font-bold rounded-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Generate Graphic Card</span>
        </button>
      </section>

      {/* 9. BROADCAST SYNCHRONIZATION FOOTNOTE */}
      <section className="text-center py-8 border-t border-[#E4E4E7] dark:border-[#232328] space-y-3">
        <p className="text-xs font-mono text-[#71717A] max-w-md mx-auto">
          Signals and polls synchronize daily following the Star Maa / Disney+ Hotstar broadcast at 11:00 PM IST.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
          <Link
            href="/debates/was-sivajis-outburst-justified"
            className="text-[#71717A] hover:text-[#FF4500] transition-colors"
          >
            Today's Debate
          </Link>
          <span className="text-[#E4E4E7] dark:text-[#232328]">•</span>
          <Link
            href="/predict"
            className="text-[#71717A] hover:text-[#FF4500] transition-colors"
          >
            Eviction Prediction
          </Link>
          <span className="text-[#E4E4E7] dark:text-[#232328]">•</span>
          <Link
            href="/vote"
            className="text-[#71717A] hover:text-[#FF4500] transition-colors"
          >
            Community Poll
          </Link>
          <span className="text-[#E4E4E7] dark:text-[#232328]">•</span>
          <Link
            href="/pulse"
            className="text-[#71717A] hover:text-[#FF4500] transition-colors"
          >
            Pulse Methodology
          </Link>
        </div>
      </section>

      {/* Share Modal */}
      {shareConfig && (
        <ShareModal
          isOpen={!!shareConfig}
          onClose={() => setShareConfig(null)}
          config={shareConfig}
        />
      )}
    </div>
  );
}
