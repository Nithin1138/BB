"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INITIAL_CONTESTANTS } from "@/lib/mock-data";
import { Sparkline } from "@/components/ui/Sparkline";
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  HelpCircle,
  ArrowRight,
  Calendar,
  Flame,
  LineChart
} from "lucide-react";

export default function TrendPage() {
  const [timeframe, setTimeframe] = useState<"7d" | "14d" | "season">("7d");

  const rising = [...INITIAL_CONTESTANTS].sort((a, b) => b.pulse_change - a.pulse_change);
  const falling = [...INITIAL_CONTESTANTS].sort((a, b) => a.pulse_change - b.pulse_change);
  const mostDiscussed = [...INITIAL_CONTESTANTS].sort((a, b) => b.discussion_count - a.discussion_count);

  return (
    <div className="space-y-12">
      {/* Editorial Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[#E4E4E7] dark:border-[#232328]">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#FF4500] uppercase font-bold">
            HOUSE MOMENTUM & ATTENTION DYNAMICS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-2 leading-[1.15]">
            Trending & <span className="italic font-normal">Attention Shifts</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] mt-2 max-w-xl leading-relaxed">
            Monitor real-time shifts in audience focus across the Bigg Boss Telugu house, powered by transparent community Pulse calculations.
          </p>
        </div>

        <Link
          href="/pulse"
          className="text-xs font-mono font-medium text-[#FF4500] hover:underline flex items-center gap-1.5 shrink-0"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Formula Details →</span>
        </Link>
      </div>

      {/* Rising & Losing Attention Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Rising Leaderboard */}
        <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] dark:border-[#232328]">
            <span className="text-xs font-mono font-bold text-[#10B981] flex items-center gap-1.5 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>Gaining Momentum</span>
            </span>
            <span className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA]">24H DELTA</span>
          </div>

          <div className="divide-y divide-[#E4E4E7] dark:divide-[#232328]">
            {rising.slice(0, 5).map((c, idx) => (
              <Link
                key={c.id}
                href={`/contestants/${c.slug}`}
                className="flex items-center justify-between py-3 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] px-2 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                  <span className="w-5 text-center text-xs font-mono font-semibold text-[#71717A] dark:text-[#A1A1AA] shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <img src={c.avatar_url} alt="" className="w-9 h-9 rounded-full object-cover border border-[#E4E4E7] dark:border-[#232328] shrink-0" />
                  <div className="min-w-0 truncate">
                    <div className="text-sm font-serif font-normal text-[#09090B] dark:text-[#F4F4F5] group-hover:text-[#FF4500] dark:group-hover:text-[#FF4500] truncate">{c.name}</div>
                    <div className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] truncate">{c.profession}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  <div className="hidden xs:block">
                    <Sparkline data={c.sparkline} color="#10B981" width={50} height={16} />
                  </div>
                  <div className="text-right min-w-[55px] sm:min-w-[65px]">
                    <div className="text-sm font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] tabular-nums">{c.pulse_score}</div>
                    <div className="text-[11px] font-mono font-semibold text-[#10B981] tabular-nums">+{c.pulse_change}%</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Falling Leaderboard */}
        <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] dark:border-[#232328]">
            <span className="text-xs font-mono font-bold text-[#FF4500] flex items-center gap-1.5 uppercase tracking-wider">
              <TrendingDown className="w-4 h-4 shrink-0" />
              <span>Losing Attention</span>
            </span>
            <span className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA]">24H DELTA</span>
          </div>

          <div className="divide-y divide-[#E4E4E7] dark:divide-[#232328]">
            {falling.slice(0, 5).map((c, idx) => (
              <Link
                key={c.id}
                href={`/contestants/${c.slug}`}
                className="flex items-center justify-between py-3 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] px-2 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                  <span className="w-5 text-center text-xs font-mono font-semibold text-[#71717A] dark:text-[#A1A1AA] shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <img src={c.avatar_url} alt="" className="w-9 h-9 rounded-full object-cover border border-[#E4E4E7] dark:border-[#232328] shrink-0" />
                  <div className="min-w-0 truncate">
                    <div className="text-sm font-serif font-normal text-[#09090B] dark:text-[#F4F4F5] group-hover:text-[#FF4500] dark:group-hover:text-[#FF4500] truncate">{c.name}</div>
                    <div className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] truncate">{c.profession}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  <div className="hidden xs:block">
                    <Sparkline data={c.sparkline} color="#FF4500" width={50} height={16} />
                  </div>
                  <div className="text-right min-w-[55px] sm:min-w-[65px]">
                    <div className="text-sm font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] tabular-nums">{c.pulse_score}</div>
                    <div className="text-[11px] font-mono font-semibold text-[#FF4500] tabular-nums">{c.pulse_change}%</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Most Discussed Contestants */}
      <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E4E4E7] dark:border-[#232328]">
          <div>
            <h2 className="text-base sm:text-lg font-serif font-normal text-[#09090B] dark:text-[#F4F4F5] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#FF4500]" />
              <span>Most Discussed Housemates Today</span>
            </h2>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-0.5">Contestants generating high mention volume in fan rooms and debates.</p>
          </div>
          <Link href="/discuss" className="text-xs font-mono font-medium text-[#FF4500] hover:underline self-start sm:self-auto">
            Discourse Feed →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mostDiscussed.slice(0, 3).map((c) => (
            <div key={c.id} className="p-4 bg-[#F4F4F5] dark:bg-[#1A1A1E] rounded-md border border-[#E4E4E7] dark:border-[#232328] flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3 min-w-0">
                <img src={c.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover border border-[#E4E4E7] dark:border-[#232328] shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm font-serif font-normal text-[#09090B] dark:text-[#F4F4F5] truncate">{c.name}</h3>
                  <div className="text-xs font-mono text-[#FF4500] truncate tabular-nums">{c.discussion_count.toLocaleString()} threads</div>
                </div>
              </div>

              <p className="text-xs italic font-serif text-[#71717A] dark:text-[#A1A1AA] line-clamp-2">
                "{c.quote}"
              </p>

              <Link
                href={`/contestants/${c.slug}`}
                className="text-xs font-mono font-medium text-[#09090B] dark:text-[#F4F4F5] hover:text-[#FF4500] dark:hover:text-[#FF4500] flex items-center gap-1 active:scale-95 transition-all"
              >
                <span>View Dossier & Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Pulse History Timeline */}
      <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#FF4500] uppercase font-bold">
              CHRONOLOGICAL DYNAMICS
            </span>
            <h2 className="text-lg sm:text-xl font-serif font-normal text-[#09090B] dark:text-[#F4F4F5] mt-1">
              Pulse Movement Trajectory
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-[#F4F4F5] dark:bg-[#1A1A1E] p-1 rounded-md text-xs font-mono overflow-x-auto no-scrollbar self-start sm:self-auto border border-[#E4E4E7] dark:border-[#232328]">
            <button
              onClick={() => setTimeframe("7d")}
              className={`px-3 py-1 rounded-sm text-[11px] cursor-pointer shrink-0 transition-colors uppercase tracking-wider ${
                timeframe === "7d" ? "bg-[#09090B] text-white dark:bg-[#F4F4F5] dark:text-[#09090B] font-semibold" : "text-[#71717A] dark:text-[#A1A1AA]"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeframe("14d")}
              className={`px-3 py-1 rounded-sm text-[11px] cursor-pointer shrink-0 transition-colors uppercase tracking-wider ${
                timeframe === "14d" ? "bg-[#09090B] text-white dark:bg-[#F4F4F5] dark:text-[#09090B] font-semibold" : "text-[#71717A] dark:text-[#A1A1AA]"
              }`}
            >
              14 Days
            </button>
            <button
              onClick={() => setTimeframe("season")}
              className={`px-3 py-1 rounded-sm text-[11px] cursor-pointer shrink-0 transition-colors uppercase tracking-wider ${
                timeframe === "season" ? "bg-[#09090B] text-white dark:bg-[#F4F4F5] dark:text-[#09090B] font-semibold" : "text-[#71717A] dark:text-[#A1A1AA]"
              }`}
            >
              Full Season
            </button>
          </div>
        </div>

        {/* Clean Editorial Timeline Chart Visualization */}
        <div className="space-y-3">
          {INITIAL_CONTESTANTS.slice(0, 4).map((c, i) => (
            <div key={c.id} className="p-3 bg-[#F4F4F5] dark:bg-[#1A1A1E] rounded-md border border-[#E4E4E7] dark:border-[#232328] flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5 sm:gap-3 w-32 sm:w-44 shrink-0 min-w-0">
                <img src={c.avatar_url} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                <span className="text-xs font-serif font-normal text-[#09090B] dark:text-[#F4F4F5] truncate">{c.name}</span>
              </div>

              <div className="flex-1 min-w-[60px]">
                <div className="h-1.5 w-full bg-[#E4E4E7] dark:bg-[#27272A] rounded-full overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      i === 0 ? "bg-[#FF4500]" : i === 1 ? "bg-[#10B981]" : i === 2 ? "bg-[#F59E0B]" : "bg-[#71717A]"
                    }`}
                    style={{ width: `${c.pulse_score}%` }}
                  />
                </div>
              </div>

              <div className="text-right w-16 sm:w-24 shrink-0">
                <span className="text-xs font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] block tabular-nums">{c.pulse_score}</span>
                <span className={`block text-[10px] font-mono tabular-nums ${c.pulse_change >= 0 ? "text-[#10B981]" : "text-[#FF4500]"}`}>
                  {c.pulse_change >= 0 ? `+${c.pulse_change}%` : `${c.pulse_change}%`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
