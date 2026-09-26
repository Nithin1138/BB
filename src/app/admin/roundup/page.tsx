"use client";

import React, { useState } from "react";
import { StorageService } from "@/lib/storage";
import { PollRoundupItem } from "@/types";
import { CheckCircle2, ExternalLink } from "lucide-react";

export default function AdminRoundupReviewPage() {
  const [roundups, setRoundups] = useState<PollRoundupItem[]>(() => StorageService.getRoundups());

  const handleApprove = (id: string) => {
    StorageService.approveRoundup(id);
    setRoundups(StorageService.getRoundups());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E6DF] dark:border-[#24242A]">
        <div>
          <h1 className="font-serif italic font-bold text-xl sm:text-2xl text-[#121210] dark:text-[#F3F2EE]">
            Observatory Survey Submissions Audit
          </h1>
          <p className="text-xs text-[#7C7A72] dark:text-[#A09E96]">
            Verify submitted public survey findings before incorporation into the Roundup Observatory and Pulse engine.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {roundups.map((r) => (
          <div key={r.id} className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm text-[#121210] dark:text-[#F3F2EE]">{r.source_name}</span>
                <span className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  r.status === "verified" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                }`}>
                  {r.status}
                </span>
              </div>
              <a
                href={r.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#E03137] dark:text-[#FF453A] hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Examine Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs text-[#7C7A72] dark:text-[#A09E96]">{r.notes}</p>

            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 gap-2 pt-1 font-mono">
              {r.results.map((res, i) => (
                <div key={i} className="p-2.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] rounded-xl text-center min-w-0">
                  <div className="text-[10px] text-[#7C7A72] dark:text-[#A09E96] truncate">{res.contestant_name}</div>
                  <div className="text-xs font-bold text-[#E03137] dark:text-[#FF453A] tabular-nums">{res.percentage}%</div>
                </div>
              ))}
            </div>

            {r.status === "pending" && (
              <div className="flex justify-end gap-2 pt-2 border-t border-[#E8E6DF] dark:border-[#24242A]">
                <button
                  onClick={() => handleApprove(r.id)}
                  className="w-full sm:w-auto justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Audit & Publish</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
