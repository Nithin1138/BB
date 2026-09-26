"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StorageService } from "@/lib/storage";
import { INITIAL_CONTESTANTS } from "@/lib/mock-data";
import { useAuth } from "@/context/AuthContext";
import { CommunityPredictionCard } from "@/components/prediction/CommunityPredictionCard";
import {
  Trophy,
  Target,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  History
} from "lucide-react";

export default function PredictPage() {
  const { user, openAuthModal } = useAuth();
  const userPredictions = user ? StorageService.getUserPredictions(user.id) : [];
  const stats = StorageService.getPredictionStats();

  const mockPastResults = [
    { week: 3, contestant: "Mithilesh Reddy", result: "Walked (₹15L)", userGuessed: "Mithilesh Reddy", status: "correct" },
    { week: 2, contestant: "Krishnudu", result: "Evicted", userGuessed: "Krishnudu", status: "correct" },
    { week: 1, contestant: "Chaitra Rai", result: "Evicted", userGuessed: "Charan Mahadev", status: "correct" },
  ];

  return (
    <div className="max-w-[960px] mx-auto space-y-12">
      {/* Editorial Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[#E4E4E7] dark:border-[#232328]">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#FF4500] uppercase font-bold">
            COMMUNITY FORECAST & ACCURACY HUB
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-2 leading-[1.15]">
            What do you think <span className="italic font-normal">happens next?</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] mt-2 max-w-xl leading-relaxed">
            Test your Bigg Boss intuition. Submit weekly community eviction forecasts and build your verifiable accuracy profile.
          </p>
        </div>

        <Link
          href="/predict/leaderboard"
          className="px-4 py-2 bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] text-[#09090B] dark:text-[#F4F4F5] rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Trophy className="w-4 h-4 text-[#F59E0B]" />
          <span>Leaderboard →</span>
        </Link>
      </div>

      {/* Main Prediction Interactive Card */}
      <section>
        <CommunityPredictionCard stats={stats} />
      </section>

      {/* Personal Prediction Performance & History */}
      <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E4E4E7] dark:border-[#232328] gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-serif font-normal text-[#09090B] dark:text-[#F4F4F5] flex items-center gap-2">
              <Target className="w-4 h-4 text-[#FF4500]" />
              <span>Your Prediction Performance</span>
            </h2>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-0.5 font-mono">Tracked on public handle @{user?.username || 'user'}</p>
          </div>

          <div className="flex items-center gap-4 text-left sm:text-right self-start sm:self-auto bg-[#F4F4F5] dark:bg-[#1A1A1E] sm:bg-transparent p-3 sm:p-0 rounded-md w-full sm:w-auto justify-around sm:justify-end border sm:border-0 border-[#E4E4E7] dark:border-[#232328]">
            <div>
              <div className="text-[10px] uppercase font-mono font-semibold text-[#71717A] dark:text-[#A1A1AA]">Accuracy Rate</div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#10B981] tabular-nums">
                {user ? `${user.accuracy_rate}%` : "78%"}
              </div>
            </div>
            <div className="pl-4 border-l border-[#E4E4E7] dark:border-[#232328]">
              <div className="text-[10px] uppercase font-mono font-semibold text-[#71717A] dark:text-[#A1A1AA]">Predictions</div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] tabular-nums">
                {user ? user.predictions_count : 14}
              </div>
            </div>
          </div>
        </div>

        {/* Prediction History Records */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-semibold text-[#09090B] dark:text-[#F4F4F5] uppercase tracking-wider">
            Season 10 Verification Log
          </div>

          <div className="divide-y divide-[#E4E4E7] dark:divide-[#232328]">
            {mockPastResults.map((item, idx) => (
              <div
                key={idx}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] px-2 rounded-md transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs font-bold text-[#09090B] dark:text-[#F4F4F5] bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] px-2 py-0.5 rounded-sm shrink-0">
                    WK {item.week}
                  </span>
                  <div className="min-w-0">
                    <div className="font-medium text-[#09090B] dark:text-[#F4F4F5] truncate">Your Pick: {item.userGuessed}</div>
                    <div className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] truncate">Outcome: {item.contestant} {item.result}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 font-mono font-semibold self-end sm:self-auto shrink-0">
                  {item.status === "correct" ? (
                    <span className="text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>CORRECT (+10 PTS)</span>
                    </span>
                  ) : (
                    <span className="text-[#71717A] dark:text-[#A1A1AA]">MISSED</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
