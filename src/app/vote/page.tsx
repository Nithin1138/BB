"use client";

import React from "react";
import { CommunityVoteCard } from "@/components/poll/CommunityVoteCard";
import { ShieldCheck, Lock, AlertCircle, History, Radio } from "lucide-react";

export default function VotePage() {
  const pastPolls = [
    {
      week: 3,
      title: "Week 3 Eviction Poll (Temptation vs Tension)",
      totalVotes: "24,810",
      winner: "Thrigun (38.4%)",
      evicted: "Mithilesh Reddy (Walked ₹15L Day 20)",
      closedDate: "2026-09-20"
    },
    {
      week: 2,
      title: "Week 2 Eviction Ballot (Pole & Axe Race)",
      totalVotes: "21,430",
      winner: "Jhansi (31.2%)",
      evicted: "Krishnudu (Evicted Day 14)",
      closedDate: "2026-09-13"
    },
    {
      week: 1,
      title: "Week 1 Mahapariksha Opening Eviction",
      totalVotes: "28,500",
      winner: "Varshini Sounderajan (29.6%)",
      evicted: "Charan (Day 4) & Chaitra Rai (Day 5)",
      closedDate: "2026-09-06"
    }
  ];

  return (
    <div className="max-w-[920px] mx-auto space-y-12">
      {/* Editorial Page Header */}
      <div className="pb-8 border-b border-[#E4E4E7] dark:border-[#232328]">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-mono tracking-widest text-[#FF4500] uppercase font-bold">
            CYCLE 04 • WEEK 4 EVICTION
          </span>
          <span className="text-[#A1A1AA] dark:text-[#52525B] text-xs">•</span>
          <span className="flex items-center gap-1.5 text-xs text-[#10B981] font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>POLLS OPEN</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] leading-[1.15]">
          Bigg Boss Telugu <span className="italic font-normal">Community Vote</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] mt-2 max-w-2xl leading-relaxed">
          One vote per verified account per weekly cycle. Measured transparently to capture authentic fan sentiment across Telugu fandom.
        </p>
      </div>

      {/* Active Poll Card */}
      <section>
        <CommunityVoteCard />
      </section>

      {/* Polling Integrity & Standards - Editorial Minimalist Columns */}
      <section className="border-t border-[#E4E4E7] dark:border-[#232328] pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#09090B] dark:text-[#F4F4F5] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#FF4500] shrink-0" />
            <span>Polling Integrity & Verification</span>
          </div>
          <span className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
            STANDARD V1.4
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs divide-y md:divide-y-0 md:divide-x divide-[#E4E4E7] dark:divide-[#232328]">
          <div className="pt-4 md:pt-0 md:pr-6 space-y-1.5">
            <div className="font-mono text-[10px] text-[#FF4500] font-semibold tracking-wider">
              01 / ONE ACCOUNT
            </div>
            <div className="font-semibold text-sm text-[#09090B] dark:text-[#F4F4F5]">
              Single Ballot Principle
            </div>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
              Each vote is anchored to your authenticated profile. Multiple submissions within the same 7-day cycle are automatically superseded.
            </p>
          </div>

          <div className="pt-4 md:pt-0 md:px-6 space-y-1.5">
            <div className="font-mono text-[10px] text-[#FF4500] font-semibold tracking-wider">
              02 / ANTI-MANIPULATION
            </div>
            <div className="font-semibold text-sm text-[#09090B] dark:text-[#F4F4F5]">
              Script & Bot Filtering
            </div>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
              Automated headless scrapers and artificial spike clusters are discarded from official tallies to ensure grassroots fidelity.
            </p>
          </div>

          <div className="pt-4 md:pt-0 md:pl-6 space-y-1.5">
            <div className="font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA] font-semibold tracking-wider">
              03 / INDEPENDENCE
            </div>
            <div className="font-semibold text-sm text-[#09090B] dark:text-[#F4F4F5]">
              Fan Sentiment Metric
            </div>
            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
              This ballot measures community opinion independently. It does not replace official television network voting or broadcast decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Past Polls Archive - Broadsheet Tabular Style */}
      <section className="border-t border-[#E4E4E7] dark:border-[#232328] pt-8 space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-[#E4E4E7] dark:border-[#232328]">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#71717A] dark:text-[#A1A1AA]" />
            <h2 className="text-sm font-semibold tracking-wide uppercase font-mono text-[#09090B] dark:text-[#F4F4F5]">
              Archive of Completed Ballots
            </h2>
          </div>
          <span className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
            Season 10 Dasavatharam
          </span>
        </div>

        <div className="divide-y divide-[#E4E4E7] dark:divide-[#232328]">
          {pastPolls.map((poll, idx) => (
            <div
              key={idx}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-[#F4F4F5] dark:hover:bg-[#141416] px-2 rounded-lg transition-colors"
            >
              <div>
                <div className="font-medium text-sm text-[#09090B] dark:text-[#F4F4F5]">
                  {poll.title}
                </div>
                <div className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] mt-0.5">
                  Concluded {poll.closedDate} • <span className="tabular-nums">{poll.totalVotes}</span> verified submissions
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <div className="text-xs font-medium text-[#10B981] font-mono">
                  Leader: {poll.winner}
                </div>
                {poll.evicted && (
                  <div className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] font-mono">
                    Official Eviction: {poll.evicted}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
