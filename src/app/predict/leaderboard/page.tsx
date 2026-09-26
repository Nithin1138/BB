"use client";

import React from "react";
import Link from "next/link";
import { StorageService } from "@/lib/storage";
import { Trophy, ArrowLeft, Flame } from "lucide-react";

export default function PredictionLeaderboardPage() {
  const leaderboard = StorageService.getLeaderboard();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top back */}
      <div>
        <Link
          href="/predict"
          className="text-xs font-mono font-medium text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO FORECASTING HUB</span>
        </Link>
      </div>

      {/* Header */}
      <div className="pb-6 border-b border-[#E4E4E7] dark:border-[#232328]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] font-bold text-[#FF4500] tracking-widest uppercase">
            AUDITED FORECASTER INDEX
          </span>
          <span className="text-[#A1A1AA] dark:text-[#52525B] text-xs">•</span>
          <span className="font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA]">
            SEASON 10 DASAVATHARAM
          </span>
        </div>
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#09090B] dark:text-[#F4F4F5] mt-2">
          Forecaster Accuracy Standings
        </h1>
        <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] mt-1 max-w-xl leading-relaxed">
          Season 10 top forecasters ranked strictly by verified elimination accuracy. No arbitrary badges; authentic predictive records.
        </p>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs min-w-[500px]">
            <thead className="bg-[#F4F4F5] dark:bg-[#1A1A1E] border-b border-[#E4E4E7] dark:border-[#232328] font-mono text-[10px] font-bold uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
              <tr>
                <th className="py-3.5 px-4">Rank</th>
                <th className="py-3.5 px-4">Forecaster</th>
                <th className="py-3.5 px-4 text-center">Accuracy</th>
                <th className="py-3.5 px-4 text-center">Forecasts</th>
                <th className="py-3.5 px-4 text-center">Correct</th>
                <th className="py-3.5 px-4 text-right">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7] dark:divide-[#232328]">
              {leaderboard.map((entry) => (
                <tr key={entry.rank} className="hover:bg-[#F4F4F5] dark:hover:bg-[#18181C] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold">
                    {entry.rank === 1 ? (
                      <span className="flex items-center gap-1.5 text-[#FF4500]">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>01</span>
                      </span>
                    ) : (
                      <span className="text-[#71717A] dark:text-[#A1A1AA]">
                        {String(entry.rank).padStart(2, "0")}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <Link
                      href={`/u/${entry.username}`}
                      className="flex items-center gap-2.5 font-medium text-[#09090B] dark:text-[#F4F4F5] hover:text-[#FF4500] dark:hover:text-[#FF4500]"
                    >
                      <img
                        src={entry.avatar_url}
                        alt=""
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border-2 border-[#E4E4E7] dark:border-[#27272A] shadow-2xs shrink-0"
                      />
                      <span className="font-mono text-xs">@{entry.username}</span>
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold tabular-nums text-[#10B981]">
                    {entry.accuracy}%
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-[#71717A] dark:text-[#A1A1AA] tabular-nums">
                    {entry.predictions_count}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-medium text-[#09090B] dark:text-[#F4F4F5] tabular-nums">
                    {entry.correct_count}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#FF4500]">
                      <Flame className="w-3 h-3 text-[#FF4500]" />
                      <span>{entry.current_streak}W</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
