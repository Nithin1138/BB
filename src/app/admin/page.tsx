"use client";

import React from "react";
import Link from "next/link";
import { StorageService } from "@/lib/storage";
import { INITIAL_CONTESTANTS } from "@/lib/mock-data";
import {
  ShieldAlert,
  Radio,
  Users,
  MessageSquare,
  FileCheck,
  CheckCircle2
} from "lucide-react";

export default function AdminOverviewPage() {
  const poll = StorageService.getPoll();
  const reports = StorageService.getReports().filter(r => r.status === "pending");
  const roundups = StorageService.getRoundups().filter(r => r.status === "pending");
  const debate = StorageService.getDebate();

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#7C7A72] dark:text-[#A09E96]">
            <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider truncate">Active Ballots</span>
            <Radio className="w-4 h-4 text-[#E03137] dark:text-[#FF453A] shrink-0" />
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-[#121210] dark:text-[#F3F2EE] mt-1.5 sm:mt-2 tabular-nums">
            {poll.total_votes.toLocaleString()}
          </div>
          <div className="font-mono text-[10px] sm:text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 font-medium truncate">Verified ballots</div>
        </div>

        <div className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#7C7A72] dark:text-[#A09E96]">
            <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider truncate">Flagged Reports</span>
            <ShieldAlert className="w-4 h-4 text-[#E03137] shrink-0" />
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-[#E03137] mt-1.5 sm:mt-2 tabular-nums">
            {reports.length}
          </div>
          <div className="font-mono text-[10px] sm:text-[11px] text-[#7C7A72] dark:text-[#A09E96] mt-1 font-medium truncate">Pending review</div>
        </div>

        <div className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#7C7A72] dark:text-[#A09E96]">
            <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider truncate">Debate Turnout</span>
            <MessageSquare className="w-4 h-4 text-[#E03137] dark:text-[#FF453A] shrink-0" />
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-[#121210] dark:text-[#F3F2EE] mt-1.5 sm:mt-2 tabular-nums">
            {(debate.agree_count + debate.disagree_count).toLocaleString()}
          </div>
          <div className="font-mono text-[10px] sm:text-[11px] text-[#7C7A72] dark:text-[#A09E96] mt-1 font-medium truncate">{debate.agree_percentage}% Agree</div>
        </div>

        <div className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#7C7A72] dark:text-[#A09E96]">
            <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider truncate">Intake Submissions</span>
            <FileCheck className="w-4 h-4 text-[#D97706] dark:text-[#F59E0B] shrink-0" />
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-[#121210] dark:text-[#F3F2EE] mt-1.5 sm:mt-2 tabular-nums">
            {roundups.length}
          </div>
          <div className="font-mono text-[10px] sm:text-[11px] text-[#7C7A72] dark:text-[#A09E96] mt-1 font-medium truncate">Public surveys</div>
        </div>
      </div>

      {/* Quick Action Portals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Moderation Box */}
        <div className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] dark:border-[#24242A]">
            <h3 className="font-serif italic font-bold text-sm sm:text-base text-[#121210] dark:text-[#F3F2EE] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#E03137]" />
              <span>Moderation Action Queue</span>
            </h3>
            <Link href="/admin/moderation" className="font-mono text-xs text-[#E03137] dark:text-[#FF453A] hover:underline">
              Open Queue ({reports.length}) →
            </Link>
          </div>

          {reports.length > 0 ? (
            <div className="space-y-3">
              {reports.map(r => (
                <div key={r.id} className="p-3 bg-[#FAF9F6] dark:bg-[#1A1A1E] rounded-xl border border-[#E8E6DF] dark:border-[#24242A] text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono font-semibold">
                    <span className="text-[#121210] dark:text-[#F3F2EE]">@{r.target_author}</span>
                    <span className="text-[10px] text-[#E03137] bg-[#E03137]/10 px-2 py-0.5 rounded">{r.reason}</span>
                  </div>
                  <p className="text-[11px] text-[#7C7A72] dark:text-[#A09E96] italic">"{r.content_snippet}"</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-[#7C7A72] dark:text-[#A09E96]">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <span>No pending reports. Editorial standards verified!</span>
            </div>
          )}
        </div>

        {/* Contestants Status Box */}
        <div className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] dark:border-[#24242A]">
            <h3 className="font-serif italic font-bold text-sm sm:text-base text-[#121210] dark:text-[#F3F2EE] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#E03137] dark:text-[#FF453A]" />
              <span>House Status Controls</span>
            </h3>
            <Link href="/admin/contestants" className="font-mono text-xs text-[#E03137] dark:text-[#FF453A] hover:underline">
              Manage Housemates →
            </Link>
          </div>

          <div className="space-y-2">
            {INITIAL_CONTESTANTS.slice(0, 4).map(c => (
              <div key={c.id} className="p-2.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img src={c.avatar_url} alt="" className="w-10 h-10 rounded-xl object-cover border border-[#E8E6DF] dark:border-[#24242A] shrink-0" />
                  <span className="font-serif font-semibold text-[#121210] dark:text-[#F3F2EE]">{c.name}</span>
                </div>
                <span className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  c.status === "nominated" ? "bg-[#E03137]/10 text-[#E03137] dark:text-[#FF453A]" : c.status === "captain" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-[#E8E6DF] dark:bg-[#24242A] text-[#7C7A72] dark:text-[#A09E96]"
                }`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
