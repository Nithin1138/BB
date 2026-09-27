"use client";

import React from "react";
import Link from "next/link";
import { Contestant } from "@/types";
import { Sparkline } from "@/components/ui/Sparkline";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface ContestantRowProps {
  contestant: Contestant;
  rank?: number;
  isLeader?: boolean;
}

export function ContestantRow({ contestant, rank, isLeader }: ContestantRowProps) {
  const isPositive = contestant.pulse_change > 0;
  const isNegative = contestant.pulse_change < 0;
  const formattedRank = rank !== undefined ? (rank < 10 ? `0${rank}` : `${rank}`) : null;

  return (
    <Link
      href={`/contestants/${contestant.slug}`}
      className={`group flex items-center justify-between p-3 sm:p-3.5 rounded-lg border transition-all duration-150 active:scale-[0.99] ${
        isLeader
          ? "bg-white dark:bg-[#141416] border-[#FF4500]/40 shadow-2xs hover:border-[#FF4500]"
          : "bg-white dark:bg-[#141416] border-[#E4E4E7] dark:border-[#232328] hover:border-[#09090B]/30 dark:hover:border-[#F4F4F5]/30 hover:bg-[#F4F4F5]/60 dark:hover:bg-[#1B1B1F]"
      }`}
    >
      {/* Left: Rank & Avatar & Details */}
      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden min-w-0 flex-1 mr-2">
        {formattedRank && (
          <span className={`text-xs font-mono font-bold w-5 text-center shrink-0 tabular-nums ${
            rank === 1 ? "text-[#FF4500]" : "text-[#71717A]"
          }`}>
            {formattedRank}
          </span>
        )}

        <div className="relative shrink-0">
          <img
            src={contestant.avatar_url}
            alt={contestant.name}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl object-cover border-2 border-[#E4E4E7] dark:border-[#27272A] group-hover:border-[#FF4500] transition-colors shadow-xs"
          />
          {contestant.status === "nominated" && (
            <span
              className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FF4500] border-2 border-white dark:border-[#141416]"
              title="Currently Nominated"
            />
          )}
          {contestant.status === "captain" && (
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#10B981] border-2 border-white dark:border-[#141416]"
              title="Captain of the House"
            />
          )}
        </div>

        <div className="overflow-hidden min-w-0 flex-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-serif font-bold text-sm sm:text-base text-[#09090B] dark:text-[#F4F4F5] group-hover:text-[#FF4500] transition-colors truncate">
              {contestant.name}
            </span>
            {contestant.telugu_name && (
              <span className="text-[11px] text-[#71717A] hidden sm:inline truncate font-medium">
                ({contestant.telugu_name})
              </span>
            )}
            {isLeader && (
              <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-[#FF4500] bg-[#FF4500]/10 px-1.5 py-0.5 rounded-sm shrink-0">
                #1
              </span>
            )}
            {contestant.status === "nominated" && !isLeader && (
              <span className="font-mono text-[9px] font-medium text-[#FF4500] bg-[#FF4500]/10 px-1.5 py-0.5 rounded-sm shrink-0 hidden xs:inline-block">
                Nominated
              </span>
            )}
          </div>
          <div className="text-[11px] text-[#71717A] truncate mt-0.5">
            {contestant.profession}
          </div>
        </div>
      </div>

      {/* Right: Sparkline, Pulse Score & Movement Indicator */}
      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
        <div className="hidden sm:block">
          <Sparkline
            data={contestant.sparkline}
            color={isPositive ? "#10B981" : isNegative ? "#FF4500" : "#71717A"}
          />
        </div>

        <div className="text-right min-w-[55px] sm:min-w-[70px]">
          <div className="text-sm sm:text-base font-bold font-mono tabular-nums text-[#09090B] dark:text-[#F4F4F5] tracking-tight">
            {contestant.pulse_score}
          </div>
          <div
            className={`text-[10px] sm:text-xs font-semibold font-mono tabular-nums flex items-center justify-end gap-0.5 ${
              isPositive ? "text-[#10B981]" : isNegative ? "text-[#FF4500]" : "text-[#71717A]"
            }`}
          >
            {isPositive ? (
              <>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>+{contestant.pulse_change}%</span>
              </>
            ) : isNegative ? (
              <>
                <ArrowDownRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>{contestant.pulse_change}%</span>
              </>
            ) : (
              <>
                <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>0%</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
