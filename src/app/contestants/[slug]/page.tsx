"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { INITIAL_CONTESTANTS, INITIAL_POSTS } from "@/lib/mock-data";
import { Sparkline } from "@/components/ui/Sparkline";
import { PostCard } from "@/components/discussions/PostCard";
import { ShareModal } from "@/components/share/ShareModal";
import { ShareCardConfig } from "@/types";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  UserCheck,
  Radio,
  Target,
  Share2,
  Calendar,
  Award,
  AlertTriangle,
  HelpCircle,
  MessageSquare,
  Zap,
  ExternalLink,
  ShieldCheck,
  DollarSign,
  Shield,
  Swords,
  Flame,
  CheckCircle2,
  XCircle,
  Sparkles
} from "lucide-react";

export default function ContestantProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { user, toggleFollowContestant } = useAuth();
  const [activeTab, setActiveTab] = useState<"story" | "nominations" | "pulse" | "discussions">("story");
  const [shareConfig, setShareConfig] = useState<ShareCardConfig | null>(null);

  const contestant = INITIAL_CONTESTANTS.find(c => c.slug === slug || c.id === slug);

  if (!contestant) {
    return notFound();
  }

  const isFollowing = user?.followed_contestants.includes(contestant.id);
  const isPositive = contestant.pulse_change > 0;
  const isNegative = contestant.pulse_change < 0;

  // Filter posts discussing this contestant
  const relatedPosts = INITIAL_POSTS.filter(p => p.contestant_id === contestant.id || p.body.toLowerCase().includes(contestant.name.toLowerCase()));

  const handleShare = () => {
    setShareConfig({
      type: "contestant",
      headline: `${contestant.name} • Season 10 Dasavatharam Journey`,
      main_metric: `${contestant.pulse_score} Pulse`,
      secondary_metric: `${contestant.pulse_change >= 0 ? '+' : ''}${contestant.pulse_change}% shift today`,
      contestant_name: contestant.name,
      contestant_avatar: contestant.avatar_url,
      disclaimer: "BBPulse Community Intelligence",
      url: `/contestants/${contestant.slug}`
    });
  };

  return (
    <div className="space-y-10">
      {/* Back link */}
      <div>
        <Link
          href="/contestants"
          className="text-xs font-mono font-medium text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← ROSTER DIRECTORY</span>
        </Link>
      </div>

      {/* Editorial Profile Header */}
      <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
          {/* Avatar & Identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7">
            <div className="relative shrink-0">
              <img
                src={contestant.avatar_url}
                alt={contestant.name}
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-3xl object-cover border-2 border-[#E4E4E7] dark:border-[#27272A] shadow-md"
              />
              {contestant.status === "nominated" && (
                <span className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FF4500] border-2 border-white dark:border-[#141416] flex items-center justify-center text-[11px] font-bold text-white shadow-xs" title="Nominated">
                  !
                </span>
              )}
              {contestant.status === "captain" && (
                <span className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#F59E0B] border-2 border-white dark:border-[#141416] flex items-center justify-center text-[11px] font-bold text-white shadow-xs" title="Captain">
                  ★
                </span>
              )}
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#FF4500]">
                  SEASON 10 DASAVATHARAM • DAY {contestant.days_in_house}
                </span>
                <span className="text-[#A1A1AA] dark:text-[#52525B] text-xs">•</span>
                <span
                  className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-sm ${
                    contestant.status === "nominated"
                      ? "bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/30"
                      : contestant.status === "captain"
                      ? "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30"
                      : contestant.status === "evicted"
                      ? "bg-[#71717A]/10 text-[#71717A] border border-[#71717A]/30"
                      : contestant.status === "walked"
                      ? "bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/30"
                      : "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30"
                  }`}
                >
                  {contestant.status === "evicted"
                    ? `Evicted (Day ${contestant.day_exited})`
                    : contestant.status === "walked"
                    ? "Walked with ₹15L (Day 20)"
                    : contestant.status}
                </span>
                {contestant.is_wildcard && (
                  <span className="text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded-sm bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30">
                    Wildcard (Day 19)
                  </span>
                )}
                {contestant.is_commoner && (
                  <span className="text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded-sm bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30">
                    Agnipariksha 2 Commoner
                  </span>
                )}
                {contestant.wikipedia_url && (
                  <a
                    href={contestant.wikipedia_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-white flex items-center gap-1 underline underline-offset-2 ml-1"
                  >
                    <span>Wikipedia</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] flex flex-wrap items-baseline gap-2.5">
                <span>{contestant.name}</span>
                {contestant.telugu_name && (
                  <span className="text-base sm:text-lg font-normal text-[#71717A] dark:text-[#A1A1AA] italic">
                    ({contestant.telugu_name})
                  </span>
                )}
              </h1>

              <p className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">{contestant.profession}</p>
              <p className="text-xs italic font-serif text-[#71717A] dark:text-[#A1A1AA] max-w-lg mt-1">
                "{contestant.quote}"
              </p>
            </div>
          </div>

          {/* Pulse Metric & Actions */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-[#E4E4E7] dark:border-[#232328] w-full md:w-auto">
            <div className="flex items-baseline md:justify-end gap-5 w-full sm:w-auto justify-between sm:justify-start">
              <div className="text-left md:text-right">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
                  Public Pulse
                </div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] tracking-tight tabular-nums">
                  {contestant.pulse_score}
                </div>
              </div>

              <div className="text-right pl-4 border-l border-[#E4E4E7] dark:border-[#232328]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
                  24h Shift
                </div>
                <div
                  className={`text-xs sm:text-sm font-mono font-semibold flex items-center gap-0.5 tabular-nums ${
                    isPositive ? "text-[#10B981]" : isNegative ? "text-[#FF4500]" : "text-[#71717A]"
                  }`}
                >
                  {isPositive ? (
                    <>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>+{contestant.pulse_change}%</span>
                    </>
                  ) : isNegative ? (
                    <>
                      <ArrowDownRight className="w-3.5 h-3.5" />
                      <span>{contestant.pulse_change}%</span>
                    </>
                  ) : (
                    <>
                      <Minus className="w-3 h-3" />
                      <span>0.0%</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* CTA Buttons: Follow, Vote, Share */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => toggleFollowContestant(contestant.id)}
                className={`flex-1 sm:flex-initial justify-center px-3.5 py-2 rounded-md text-xs font-mono transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer border ${
                  isFollowing
                    ? "border-[#10B981] bg-[#10B981]/10 text-[#10B981] font-semibold"
                    : "border-[#E4E4E7] dark:border-[#232328] hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] text-[#09090B] dark:text-[#F4F4F5]"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{isFollowing ? "Following" : "Follow"}</span>
              </button>

              <Link
                href="/vote"
                className="flex-1 sm:flex-initial justify-center px-3.5 py-2 bg-[#FF4500] hover:bg-[#E03D00] text-white rounded-md text-xs font-mono font-medium flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Vote in Poll</span>
              </Link>

              <button
                onClick={handleShare}
                className="p-2 border border-[#E4E4E7] dark:border-[#232328] hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] text-[#71717A] dark:text-[#A1A1AA] rounded-md transition-all active:scale-95 cursor-pointer shrink-0"
                title="Share contestant card"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 pt-4 border-t border-[#E4E4E7] dark:border-[#232328] text-xs font-mono overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("story")}
            className={`px-3.5 py-1.5 rounded-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap uppercase tracking-wider text-[10px] ${
              activeTab === "story"
                ? "bg-[#09090B] text-white dark:bg-[#F4F4F5] dark:text-[#09090B] font-semibold shadow-xs"
                : "text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white"
            }`}
          >
            Story Journey
          </button>
          <button
            onClick={() => setActiveTab("nominations")}
            className={`px-3.5 py-1.5 rounded-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap uppercase tracking-wider text-[10px] flex items-center gap-1.5 ${
              activeTab === "nominations"
                ? "bg-[#09090B] text-white dark:bg-[#F4F4F5] dark:text-[#09090B] font-semibold shadow-xs"
                : "text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white"
            }`}
          >
            <span>Nominations & Power</span>
            {contestant.status === 'nominated' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse" />
            )}
            {contestant.special_power && (
              <span className="text-[9px] px-1 py-0.2 bg-[#FF4500]/15 text-[#FF4500] rounded font-bold">
                PWR
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("pulse")}
            className={`px-3.5 py-1.5 rounded-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap uppercase tracking-wider text-[10px] ${
              activeTab === "pulse"
                ? "bg-[#09090B] text-white dark:bg-[#F4F4F5] dark:text-[#09090B] font-semibold shadow-xs"
                : "text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white"
            }`}
          >
            Pulse Breakdown
          </button>
          <button
            onClick={() => setActiveTab("discussions")}
            className={`px-3.5 py-1.5 rounded-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap uppercase tracking-wider text-[10px] ${
              activeTab === "discussions"
                ? "bg-[#09090B] text-white dark:bg-[#F4F4F5] dark:text-[#09090B] font-semibold shadow-xs"
                : "text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white"
            }`}
          >
            Discussions ({relatedPosts.length})
          </button>
        </div>
      </section>

      {/* Story & Milestones */}
      {activeTab === "story" && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Journey Timeline (8 columns) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 sm:p-7 shadow-xs space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4500] font-bold">
                SEASON CHRONOLOGY
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-1">
                {contestant.name}'s Season Storyline
              </h2>
              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1">
                Verified milestone moments, nominations, physical trials, and pivotal house arguments.
              </p>
            </div>

            <div className="relative pl-6 border-l border-[#E4E4E7] dark:border-[#232328] space-y-6 ml-2">
              {contestant.milestones.map((m, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline node */}
                  <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#09090B] dark:bg-[#F4F4F5] group-hover:bg-[#FF4500] dark:group-hover:bg-[#FF4500] transition-colors" />

                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                    <span className="font-semibold text-[#09090B] dark:text-[#F4F4F5]">{m.date}</span>
                    <span>•</span>
                    <span>EP {m.episode}</span>
                    <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 bg-[#F4F4F5] dark:bg-[#1A1A1E] rounded text-[#71717A] dark:text-[#A1A1AA]">
                      {m.signal_type.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-[#09090B] dark:text-[#F4F4F5] mt-1">
                    {m.title}
                  </h3>

                  <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed mt-0.5">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Context Sidebar (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Community Prediction Card for Contestant */}
            <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] dark:border-[#232328]">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#09090B] dark:text-[#F4F4F5]">Community Forecast</span>
                <span className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA]">Week 4</span>
              </div>

              <div>
                <div className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider">
                  Win Backing Rate
                </div>
                <div className="text-2xl font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] mt-0.5 tabular-nums">
                  {contestant.poll_support_pct}% <span className="text-xs font-normal text-[#71717A] dark:text-[#A1A1AA]">fans backing</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E4E4E7] dark:border-[#232328]">
                <div className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] font-mono flex items-center justify-between">
                  <span>Danger Risk Score</span>
                  <Link href="/pulse" title="How Risk Score is calculated">
                    <HelpCircle className="w-3.5 h-3.5 text-[#71717A] dark:text-[#A1A1AA]" />
                  </Link>
                </div>
                <div className="text-lg font-mono font-bold text-[#71717A] dark:text-[#A1A1AA] tabular-nums mt-0.5">
                  {contestant.risk_score} <span className="text-xs font-normal">/ 100</span>
                </div>
                <p className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] mt-1.5 leading-snug">
                  Rule-based fan consensus estimate. Not an official broadcast result.
                </p>
              </div>

              <Link
                href="/predict"
                className="w-full mt-2 py-2 bg-[#09090B] dark:bg-[#F4F4F5] hover:bg-[#FF4500] dark:hover:bg-[#FF4500] text-white dark:text-[#09090B] dark:hover:text-white text-xs font-mono font-medium rounded-md flex items-center justify-center transition-all"
              >
                Submit Forecast
              </Link>
            </div>

            {/* Dasavatharam Special Power & Ledger Callout in Story tab */}
            {contestant.special_power && (
              <div className="bg-[#FF4500]/5 dark:bg-[#FF4500]/10 border border-[#FF4500]/30 rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider font-bold text-[#FF4500]">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Special Power</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF4500]/20 text-[#FF4500] font-semibold uppercase">
                    {contestant.special_power.category}
                  </span>
                </div>
                <div className="text-base font-serif font-bold text-[#09090B] dark:text-[#F4F4F5]">
                  {contestant.special_power.name}
                </div>
                <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
                  {contestant.special_power.description}
                </p>
                <div className="pt-2 border-t border-[#FF4500]/20 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#71717A] dark:text-[#A1A1AA]">Game Outcome:</span>
                  <span className="font-semibold text-[#09090B] dark:text-[#F4F4F5]">{contestant.special_power.outcome}</span>
                </div>
                <button
                  onClick={() => setActiveTab("nominations")}
                  className="w-full mt-1 text-center text-xs font-mono text-[#FF4500] hover:underline cursor-pointer block pt-1"
                >
                  View Full Nominations & Votes →
                </button>
              </div>
            )}

            {/* Sparkline History Card */}
            <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 shadow-xs space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider font-semibold text-[#09090B] dark:text-[#F4F4F5]">
                7-Day Pulse Velocity
              </div>
              <Sparkline
                data={contestant.sparkline}
                color={isPositive ? "#10B981" : isNegative ? "#FF4500" : "#71717A"}
                width={260}
                height={50}
              />
              <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                <span>Day 18</span>
                <span>Day 24 (Today)</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Nominations & Dasavatharam Power Tab */}
      {activeTab === "nominations" && (
        <section className="space-y-6">
          {/* Header & Quick Link */}
          <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4500] font-bold">
                  SEASON 10 DASAVATHARAM • VOTING & POWERS DOSSIER
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-1">
                  {contestant.name}'s Nominations & Special Powers
                </h2>
                <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1">
                  Full voting breakdown: who cast ballots against {contestant.name}, their target choices, and strategic power plays.
                </p>
              </div>
              <Link
                href="/contestants/nominations"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono bg-[#F4F4F5] dark:bg-[#1A1A1E] hover:bg-[#FF4500] hover:text-white dark:hover:bg-[#FF4500] text-[#09090B] dark:text-[#F4F4F5] rounded-md transition-all self-start sm:self-auto shrink-0 border border-[#E4E4E7] dark:border-[#232328]"
              >
                <span>Full Season 10 Matrix</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Exit Dossier if evicted or walked */}
          {(contestant.status === 'evicted' || contestant.status === 'walked') && (
            <div className={`p-6 rounded-xl border shadow-xs ${
              contestant.status === 'walked'
                ? "bg-amber-500/10 border-amber-500/30 text-[#09090B] dark:text-[#F4F4F5]"
                : "bg-red-500/10 border-red-500/30 text-[#09090B] dark:text-[#F4F4F5]"
            }`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  contestant.status === 'walked' ? "bg-amber-500/20 text-amber-500" : "bg-red-500/20 text-red-500"
                }`}>
                  {contestant.status === 'walked' ? (
                    <DollarSign className="w-6 h-6" />
                  ) : (
                    <AlertTriangle className="w-6 h-6" />
                  )}
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                      contestant.status === 'walked' ? "bg-amber-500/20 text-amber-600 dark:text-amber-400" : "bg-red-500/20 text-red-600 dark:text-red-400"
                    }`}>
                      {contestant.status === 'walked' ? 'Voluntary Cash Walkout' : 'Official Eviction Record'}
                    </span>
                    <span className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
                      Day {contestant.day_exited} • Survived {contestant.days_in_house} Days
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-semibold">
                    {contestant.status === 'walked'
                      ? 'Accepted Cash Temptation Offer'
                      : 'Evicted from the Bigg Boss House'}
                  </h3>
                  <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
                    {contestant.exit_reason}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Special Power Card */}
          {contestant.special_power ? (
            <div className="bg-[#FF4500]/5 dark:bg-[#FF4500]/10 border border-[#FF4500]/30 rounded-xl p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#FF4500]/20 text-[#FF4500]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4500] font-bold">
                      DASAVATHARAM SPECIAL POWER
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#09090B] dark:text-[#F4F4F5]">
                      {contestant.special_power.name}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#FF4500]/20 text-[#FF4500] font-semibold uppercase">
                  {contestant.special_power.category}
                </span>
              </div>
              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
                {contestant.special_power.description}
              </p>
              <div className="pt-3 border-t border-[#FF4500]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#71717A] dark:text-[#A1A1AA]">Season Outcome / Status:</span>
                <span className="font-semibold text-[#09090B] dark:text-[#F4F4F5] bg-white dark:bg-[#141416] px-3 py-1 rounded border border-[#FF4500]/20">
                  {contestant.special_power.outcome}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 text-xs text-[#71717A] dark:text-[#A1A1AA] flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#71717A] shrink-0" />
              <span>No special Dasavatharam power currently held by {contestant.name} in the active week.</span>
            </div>
          )}

          {/* Two-Column Grid: Nominated By vs Nominations Given */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left: Nominated By */}
            <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] dark:border-[#232328]">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#FF4500]" />
                  <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-[#09090B] dark:text-[#F4F4F5]">
                    Nominated By (In Defense)
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#FF4500] font-bold">
                  {contestant.nomination_count} Times Nominated
                </span>
              </div>

              {contestant.nominated_by && contestant.nominated_by.length > 0 ? (
                <div className="space-y-4">
                  {contestant.nominated_by.map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-[#F4F4F5] dark:bg-[#1A1A1E] rounded-lg border border-[#E4E4E7] dark:border-[#232328] space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-[#09090B] dark:text-[#F4F4F5]">
                          WEEK {item.week}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF4500]/10 text-[#FF4500] font-semibold uppercase">
                          {item.nominators.length} Ballots
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.nominators.map((nominator, nIdx) => (
                          <span
                            key={nIdx}
                            className="text-xs font-mono px-2 py-0.5 rounded bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] text-[#09090B] dark:text-[#F4F4F5] font-medium"
                          >
                            {nominator}
                          </span>
                        ))}
                      </div>
                      {item.note && (
                        <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] italic pt-1 border-t border-[#E4E4E7]/60 dark:border-[#232328]/60">
                          {item.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-[#71717A] dark:text-[#A1A1AA]">
                  No direct housemate nominations on record for {contestant.name}.
                </div>
              )}
            </div>

            {/* Right: Nominations Given */}
            <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] dark:border-[#232328]">
                <div className="flex items-center gap-2">
                  <Swords className="w-4 h-4 text-[#09090B] dark:text-[#F4F4F5]" />
                  <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-[#09090B] dark:text-[#F4F4F5]">
                    Nominations Cast (On Offense)
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
                  Week-by-Week
                </span>
              </div>

              {contestant.nominations_given && contestant.nominations_given.length > 0 ? (
                <div className="space-y-4">
                  {contestant.nominations_given.map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-[#F4F4F5] dark:bg-[#1A1A1E] rounded-lg border border-[#E4E4E7] dark:border-[#232328] space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-[#09090B] dark:text-[#F4F4F5]">
                          WEEK {item.week}
                        </span>
                        <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA]">
                          Targeted {item.targets.length} {item.targets.length === 1 ? 'Contestant' : 'Contestants'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.targets.map((target, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs font-mono px-2 py-0.5 rounded bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] text-[#FF4500] font-medium"
                          >
                            {target}
                          </span>
                        ))}
                      </div>
                      {item.note && (
                        <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] italic pt-1 border-t border-[#E4E4E7]/60 dark:border-[#232328]/60">
                          {item.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-[#71717A] dark:text-[#A1A1AA]">
                  No recorded nomination votes cast by {contestant.name} yet.
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Fan Pulse Breakdown */}
      {activeTab === "pulse" && (
        <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4500] font-bold">
              TRANSPARENT METHODOLOGY
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-1">
              How {contestant.name}'s Pulse is Formulated
            </h2>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1">
              Rule-based multi-stream synthesis with transparent verifiable weights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="p-4 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-md text-center">
              <div className="text-[10px] font-mono uppercase font-semibold text-[#71717A] dark:text-[#A1A1AA]">35% Weight</div>
              <div className="text-xs font-medium text-[#09090B] dark:text-[#F4F4F5] mt-1">Poll Ballots</div>
              <div className="text-lg font-mono font-bold text-[#FF4500] mt-2 tabular-nums">{contestant.poll_support_pct}%</div>
            </div>

            <div className="p-4 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-md text-center">
              <div className="text-[10px] font-mono uppercase font-semibold text-[#71717A] dark:text-[#A1A1AA]">20% Weight</div>
              <div className="text-xs font-medium text-[#09090B] dark:text-[#F4F4F5] mt-1">External Roundups</div>
              <div className="text-lg font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] mt-2">Verified</div>
            </div>

            <div className="p-4 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-md text-center">
              <div className="text-[10px] font-mono uppercase font-semibold text-[#71717A] dark:text-[#A1A1AA]">20% Weight</div>
              <div className="text-xs font-medium text-[#09090B] dark:text-[#F4F4F5] mt-1">Discussions</div>
              <div className="text-lg font-mono font-bold text-[#10B981] mt-2">78% Pos</div>
            </div>

            <div className="p-4 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-md text-center">
              <div className="text-[10px] font-mono uppercase font-semibold text-[#71717A] dark:text-[#A1A1AA]">15% Weight</div>
              <div className="text-xs font-medium text-[#09090B] dark:text-[#F4F4F5] mt-1">Mention Volume</div>
              <div className="text-lg font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] mt-2">High</div>
            </div>

            <div className="p-4 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-md text-center">
              <div className="text-[10px] font-mono uppercase font-semibold text-[#71717A] dark:text-[#A1A1AA]">10% Weight</div>
              <div className="text-xs font-medium text-[#09090B] dark:text-[#F4F4F5] mt-1">Momentum Delta</div>
              <div className="text-lg font-mono font-bold text-[#10B981] mt-2 tabular-nums">+{contestant.pulse_change}%</div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E4E4E7] dark:border-[#232328] flex items-center justify-between text-xs text-[#71717A] dark:text-[#A1A1AA]">
            <span>Independent community signal • Verified fan participation</span>
            <Link href="/pulse" className="font-mono text-xs text-[#FF4500] hover:underline">
              Inspect Formula Details →
            </Link>
          </div>
        </section>
      )}

      {/* Community Discussions */}
      {activeTab === "discussions" && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-normal text-[#09090B] dark:text-[#F4F4F5]">
              Conversations regarding {contestant.name}
            </h2>
            <Link
              href="/discuss"
              className="text-xs font-mono text-[#FF4500] hover:underline"
            >
              + Start Discussion
            </Link>
          </div>

          <div className="space-y-4">
            {relatedPosts.length > 0 ? (
              relatedPosts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-8 text-center text-xs text-[#71717A] dark:text-[#A1A1AA]">
                No specific discussions tagged yet for {contestant.name}. Be the first to start an analysis or debate topic.
              </div>
            )}
          </div>
        </section>
      )}

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
