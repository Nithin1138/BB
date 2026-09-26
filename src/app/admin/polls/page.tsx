"use client";

import React, { useState } from "react";
import { StorageService } from "@/lib/storage";
import { Poll } from "@/types";
import { Check } from "lucide-react";

export default function AdminPollsPage() {
  const [poll, setPoll] = useState<Poll>(() => StorageService.getActivePoll());
  const [integrityNote, setIntegrityNote] = useState(poll.integrity_note || "");
  const [savedToast, setSavedToast] = useState(false);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    poll.integrity_note = integrityNote;
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleToggleStatus = () => {
    poll.status = poll.status === "active" ? "closed" : "active";
    setPoll({ ...poll });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E6DF] dark:border-[#24242A]">
        <div>
          <h1 className="font-serif italic font-bold text-xl sm:text-2xl text-[#121210] dark:text-[#F3F2EE]">
            Ballots & Vote Integrity Manager
          </h1>
          <p className="text-xs text-[#7C7A72] dark:text-[#A09E96]">
            Configure weekly voting cycles, audit live distribution, and issue cryptographic bulletins.
          </p>
        </div>
      </div>

      {savedToast && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Ballot configuration updated successfully.</span>
        </div>
      )}

      {/* Active Poll Configuration */}
      <div className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E6DF] dark:border-[#24242A]">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#E03137] dark:text-[#FF453A]">
              Cycle {poll.week_number} • {poll.title}
            </div>
            <div className="font-mono text-xs text-[#7C7A72] dark:text-[#A09E96] mt-0.5">
              {poll.total_votes.toLocaleString()} verified ballots recorded
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
              poll.status === "active" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-[#E8E6DF] dark:bg-[#24242A] text-[#7C7A72] dark:text-[#A09E96]"
            }`}>
              {poll.status}
            </span>
            <button
              onClick={handleToggleStatus}
              className="px-3.5 py-1.5 border border-[#E8E6DF] dark:border-[#24242A] hover:bg-[#FAF9F6] dark:hover:bg-[#1A1A1E] active:scale-95 text-[#121210] dark:text-[#F3F2EE] rounded-xl text-xs font-semibold cursor-pointer transition-all"
            >
              {poll.status === "active" ? "Lock Ballot Now" : "Re-open Ballot"}
            </button>
          </div>
        </div>

        {/* Options Breakdown */}
        <div className="space-y-2">
          <div className="font-serif font-bold text-xs text-[#121210] dark:text-[#F3F2EE]">Current Nominee Distribution</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
            {poll.options.map(opt => (
              <div key={opt.id} className="p-3 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] rounded-xl flex flex-col xs:flex-row xs:items-center justify-between gap-1 min-w-0">
                <span className="font-serif font-semibold text-[#121210] dark:text-[#F3F2EE] truncate">{opt.contestant_name}</span>
                <span className="font-mono font-bold text-[#E03137] dark:text-[#FF453A] shrink-0 tabular-nums">{opt.percentage}% ({opt.vote_count.toLocaleString()} votes)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Integrity Bulletin Editor */}
        <form onSubmit={handleSaveNote} className="space-y-2 pt-2 border-t border-[#E8E6DF] dark:border-[#24242A]">
          <label className="block text-xs font-semibold text-[#121210] dark:text-[#F3F2EE] font-mono">
            Auditor Integrity Note / Dispatch Bulletin
          </label>
          <input
            type="text"
            value={integrityNote}
            onChange={(e) => setIntegrityNote(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] focus:border-[#E03137] rounded-xl text-xs outline-hidden text-[#121210] dark:text-[#F3F2EE]"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#121210] dark:bg-[#F3F2EE] hover:bg-[#252520] dark:hover:bg-white active:scale-95 text-[#FAF9F6] dark:text-[#121210] rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-xs"
          >
            Publish Integrity Note
          </button>
        </form>
      </div>
    </div>
  );
}
