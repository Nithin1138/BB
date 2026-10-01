"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { INITIAL_CONTESTANTS } from "@/lib/mock-data";
import { Contestant } from "@/types";
import { Sparkline } from "@/components/ui/Sparkline";
import { ArrowUpRight, ArrowDownRight, Minus, UserCheck, Search, Filter, Zap, ArrowRight, DollarSign, Skull, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ContestantsPage() {
  const { user, toggleFollowContestant } = useAuth();
  const [contestantsList, setContestantsList] = useState<Contestant[]>(INITIAL_CONTESTANTS);
  const [filter, setFilter] = useState<"all" | "active" | "nominated" | "captain" | "exited">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const loadContestants = async () => {
    try {
      const res = await fetch("/api/contestants");
      if (res.ok) {
        const data = await res.json();
        if (data.contestants && data.contestants.length > 0) {
          setContestantsList(data.contestants);
        }
      }
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    loadContestants();

    const handleSync = () => {
      loadContestants();
    };

    window.addEventListener("bbpulse:wikipedia_synced", handleSync);
    return () => {
      window.removeEventListener("bbpulse:wikipedia_synced", handleSync);
    };
  }, []);

  const filtered = contestantsList.filter(c => {
    if (filter === "active" && (c.status === "evicted" || c.status === "walked")) return false;
    if (filter === "nominated" && c.status !== "nominated") return false;
    if (filter === "captain" && c.status !== "captain") return false;
    if (filter === "exited" && c.status !== "evicted" && c.status !== "walked") return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return c.name.toLowerCase().includes(q) || (c.telugu_name && c.telugu_name.includes(q)) || c.profession.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-10">
      {/* Editorial Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E4E4E7] dark:border-[#232328]">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#FF4500] uppercase font-bold">
            SEASON 10 DASAVATHARAM • HOUSE ROSTER (18 HOUSEMATES)
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-2 leading-[1.15]">
            House Contestants <span className="italic font-normal">Directory</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] mt-2 max-w-xl leading-relaxed">
            All 18 housemates from Bigg Boss Telugu Season 10. Track real nominations, Dasavatharam special powers, exit dossiers, and public sentiment.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-[#71717A] dark:text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contestant..."
              className="w-full sm:w-48 pl-8 pr-3 py-2 text-xs bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-md outline-hidden text-[#09090B] dark:text-[#F4F4F5] focus:border-[#FF4500] dark:focus:border-[#FF4500] transition-colors placeholder:text-[#A1A1AA]"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-1 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-md p-1 text-xs overflow-x-auto no-scrollbar">
            {(["all", "active", "nominated", "captain", "exited"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  filter === tab
                    ? "bg-[#09090B] text-white dark:bg-[#F4F4F5] dark:text-[#09090B] font-semibold shadow-xs"
                    : "text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#F4F4F5]"
                }`}
              >
                {tab === "exited" ? "Eliminated / Walked" : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Banner linking to Nominations & Evictions Ledger */}
      <Link
        href="/contestants/nominations"
        className="block p-5 bg-gradient-to-r from-[#FF4500]/10 via-[#FF4500]/5 to-transparent border border-[#FF4500]/30 rounded-xl hover:border-[#FF4500] transition-all group"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4500] font-bold">
                COMPLETE VOTING INTELLIGENCE
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FF4500] text-white font-bold uppercase">
                WEEKS 1–4
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#09090B] dark:text-[#F4F4F5]">
              Explore Nominations Ledger, Who Nominated Whom & Special Powers →
            </h3>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA]">
              View the full voting grid, axe-race nominations, Krishnudu & Chaitra Rai evictions, and Mithilesh's ₹15 Lakhs briefcase exit.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF4500] group-hover:translate-x-1 transition-transform self-start sm:self-auto shrink-0">
            <span>Open Ledger</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>

      {/* Contestants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((contestant) => {
          const isFollowing = user?.followed_contestants.includes(contestant.id);
          const isPositive = contestant.pulse_change > 0;
          const isNegative = contestant.pulse_change < 0;

          return (
            <div
              key={contestant.id}
              className={`bg-white dark:bg-[#141416] border rounded-xl p-5 shadow-xs transition-all duration-200 flex flex-col justify-between group ${
                contestant.status === 'evicted' || contestant.status === 'walked'
                  ? 'border-[#E4E4E7]/60 dark:border-[#232328]/60 opacity-80 hover:opacity-100'
                  : 'border-[#E4E4E7] dark:border-[#232328] hover:border-[#09090B]/30 dark:hover:border-[#F4F4F5]/30'
              }`}
            >
              <div>
                {/* Top: Avatar & Status */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={contestant.avatar_url}
                      alt={contestant.name}
                      className={`w-18 h-18 sm:w-22 sm:h-22 rounded-2xl object-cover border-2 border-[#E4E4E7] dark:border-[#27272A] shadow-xs transition-all ${
                        contestant.status === 'evicted' || contestant.status === 'walked'
                          ? 'grayscale opacity-75'
                          : 'grayscale-0 group-hover:scale-105'
                      }`}
                    />
                    {contestant.status === "nominated" && (
                      <span
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#FF4500] border-2 border-white dark:border-[#141416]"
                        title="Currently Nominated"
                      />
                    )}
                    {contestant.status === "captain" && (
                      <span
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#F59E0B] border-2 border-white dark:border-[#141416]"
                        title="House Captain"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span className="text-[10px] font-mono text-[#FF4500] font-semibold uppercase tracking-wider truncate">
                        {contestant.profession}
                      </span>
                      <div className="shrink-0">
                        {contestant.status === "nominated" ? (
                          <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#FF4500] bg-[#FF4500]/10 px-1.5 sm:px-2 py-0.5 rounded-sm uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse" />
                            Nominated
                          </span>
                        ) : contestant.status === "captain" ? (
                          <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-1.5 sm:px-2 py-0.5 rounded-sm uppercase tracking-wider">
                            Captain
                          </span>
                        ) : contestant.status === "evicted" ? (
                          <span className="text-[9px] sm:text-[10px] font-mono font-bold text-red-600 dark:text-red-400 bg-red-500/10 px-1.5 sm:px-2 py-0.5 rounded-sm uppercase tracking-wider">
                            Evicted D{contestant.day_exited}
                          </span>
                        ) : contestant.status === "walked" ? (
                          <span className="text-[9px] sm:text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 sm:px-2 py-0.5 rounded-sm uppercase tracking-wider">
                            Walked ₹15L
                          </span>
                        ) : (
                          <span className="text-[9px] sm:text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] bg-[#F4F4F5] dark:bg-[#1A1A1E] px-1.5 sm:px-2 py-0.5 rounded-sm uppercase tracking-wider">
                            Active
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <h2 className="text-base sm:text-lg font-serif font-bold text-[#09090B] dark:text-[#F4F4F5] leading-snug truncate">
                        {contestant.name}
                      </h2>
                      {contestant.is_wildcard && (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold uppercase shrink-0">
                          WC
                        </span>
                      )}
                    </div>

                    {contestant.telugu_name && (
                      <div className="text-xs text-[#71717A] dark:text-[#A1A1AA] truncate mt-0.5">
                        {contestant.telugu_name}
                      </div>
                    )}
                  </div>
                </div>

                {/* Special Power Badge or Default Slot for uniform card heights */}
                {contestant.special_power ? (
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-[#FF4500] bg-[#FF4500]/5 dark:bg-[#FF4500]/10 px-2.5 py-1 rounded border border-[#FF4500]/20 min-h-[30px]">
                    <Zap className="w-3 h-3 shrink-0" />
                    <span className="font-semibold truncate">{contestant.special_power.name}</span>
                    <span className="text-[#71717A] dark:text-[#A1A1AA] truncate">({contestant.special_power.category})</span>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-[#71717A]/50 dark:text-[#A1A1AA]/50 px-2.5 py-1 rounded border border-dashed border-[#E4E4E7]/60 dark:border-[#232328]/60 min-h-[30px]">
                    <Shield className="w-3 h-3 shrink-0 opacity-40" />
                    <span className="truncate">Regular Housemate</span>
                  </div>
                )}

                {/* Bio snippet with uniform 2-line height */}
                <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed mt-3 line-clamp-2 min-h-[2.5rem]">
                  {contestant.short_bio}
                </p>

                {/* Quote with uniform height */}
                <div className="text-xs italic font-serif text-[#71717A] dark:text-[#A1A1AA] mt-2.5 pl-2.5 border-l-2 border-[#FF4500] line-clamp-2 min-h-[2.25rem] flex items-center">
                  "{contestant.quote}"
                </div>

                {/* Pulse Stats Bar */}
                <div className="mt-4 p-3 bg-[#F4F4F5] dark:bg-[#1A1A1E] rounded-md border border-[#E4E4E7] dark:border-[#232328] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
                      Pulse Index
                    </div>
                    <div className="text-lg font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] tracking-tight tabular-nums">
                      {contestant.pulse_score}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
                      24h Shift
                    </div>
                    <div
                      className={`text-xs font-mono font-semibold flex items-center justify-end gap-0.5 tabular-nums ${
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

                  <div>
                    <Sparkline
                      data={contestant.sparkline}
                      color={isPositive ? "#10B981" : isNegative ? "#FF4500" : "#71717A"}
                      width={64}
                      height={20}
                    />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-5 pt-3.5 border-t border-[#E4E4E7] dark:border-[#232328] flex items-center justify-between gap-2">
                <button
                  onClick={() => toggleFollowContestant(contestant.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer border ${
                    isFollowing
                      ? "border-[#10B981] bg-[#10B981]/10 text-[#10B981] font-semibold"
                      : "border-[#E4E4E7] dark:border-[#232328] hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] text-[#71717A] dark:text-[#A1A1AA]"
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{isFollowing ? "Following" : "Follow"}</span>
                </button>

                <Link
                  href={`/contestants/${contestant.slug}`}
                  className="px-3.5 py-1.5 bg-[#09090B] dark:bg-[#F4F4F5] hover:bg-[#FF4500] dark:hover:bg-[#FF4500] text-white dark:text-[#09090B] dark:hover:text-white rounded-md text-xs font-mono font-medium transition-all active:scale-95 shrink-0"
                >
                  <span className="hidden sm:inline">Profile & Story</span>
                  <span className="sm:hidden">Profile</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
