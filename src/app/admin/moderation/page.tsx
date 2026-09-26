"use client";

import React, { useState } from "react";
import { StorageService } from "@/lib/storage";
import { ReportItem } from "@/types";
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  UserX
} from "lucide-react";

export default function ModerationQueuePage() {
  const [reports, setReports] = useState<ReportItem[]>(() => StorageService.getReports());
  const [filter, setFilter] = useState<"pending" | "resolved">("pending");

  const handleAction = (reportId: string, actionText: string) => {
    StorageService.resolveReport(reportId, actionText);
    setReports(StorageService.getReports());
  };

  const displayedReports = reports.filter(r =>
    filter === "pending" ? (r.status === "pending" || r.status === "reviewing") : r.status === "resolved"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E6DF] dark:border-[#24242A]">
        <div>
          <h1 className="font-serif italic font-bold text-xl sm:text-2xl text-[#121210] dark:text-[#F3F2EE] flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#E03137]" />
            <span>Community Deliberation Moderation Queue</span>
          </h1>
          <p className="text-xs text-[#7C7A72] dark:text-[#A09E96] mt-0.5">
            Review reported items against BBPulse in-show guidelines. Ensure civil discourse and eliminate spam.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-xl p-1 text-xs overflow-x-auto no-scrollbar w-full sm:w-auto font-mono">
          <button
            onClick={() => setFilter("pending")}
            className={`flex-1 sm:flex-none text-center px-3.5 py-1.5 rounded-lg font-medium cursor-pointer shrink-0 transition-all active:scale-95 ${
              filter === "pending"
                ? "bg-[#121210] dark:bg-[#F3F2EE] text-[#FAF9F6] dark:text-[#121210] shadow-xs font-bold"
                : "text-[#7C7A72] dark:text-[#A09E96] hover:text-[#121210] dark:hover:text-[#F3F2EE]"
            }`}
          >
            Pending ({reports.filter(r => r.status === "pending").length})
          </button>
          <button
            onClick={() => setFilter("resolved")}
            className={`flex-1 sm:flex-none text-center px-3.5 py-1.5 rounded-lg font-medium cursor-pointer shrink-0 transition-all active:scale-95 ${
              filter === "resolved"
                ? "bg-[#121210] dark:bg-[#F3F2EE] text-[#FAF9F6] dark:text-[#121210] shadow-xs font-bold"
                : "text-[#7C7A72] dark:text-[#A09E96] hover:text-[#121210] dark:hover:text-[#F3F2EE]"
            }`}
          >
            Resolved ({reports.filter(r => r.status === "resolved").length})
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {displayedReports.length > 0 ? (
          displayedReports.map((report) => (
            <div
              key={report.id}
              className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E8E6DF] dark:border-[#24242A]">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#E03137] bg-[#E03137]/10 px-2 py-0.5 rounded">
                    {report.reason}
                  </span>
                  <span className="text-[#7C7A72] dark:text-[#A09E96]">Target:</span>
                  <strong className="font-mono text-[#121210] dark:text-[#F3F2EE]">@{report.target_author}</strong>
                  <span className="font-mono text-[#7C7A72] dark:text-[#A09E96]">({report.target_type})</span>
                </div>
                <div className="font-mono text-[11px] text-[#7C7A72] dark:text-[#A09E96]">
                  Reported by @{report.reporter_username} • {report.created_at}
                </div>
              </div>

              {/* Snippet */}
              <div className="p-3.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] rounded-xl border border-[#E8E6DF] dark:border-[#24242A] space-y-1">
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#7C7A72] dark:text-[#A09E96]">Content In Question:</div>
                <p className="text-xs text-[#121210] dark:text-[#F3F2EE] font-serif italic">"{report.content_snippet}"</p>
                {report.description && (
                  <p className="text-[11px] text-[#7C7A72] dark:text-[#A09E96] pt-1">
                    <strong>Reporter notes:</strong> {report.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              {report.status !== "resolved" ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => handleAction(report.id, "Content Removed")}
                    className="justify-center px-4 py-2 bg-[#E03137] hover:bg-[#C92A30] active:scale-95 text-white rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Remove Content</span>
                  </button>

                  <button
                    onClick={() => handleAction(report.id, "User Restricted 24h")}
                    className="justify-center px-4 py-2 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <UserX className="w-3.5 h-3.5" />
                    <span>Restrict User</span>
                  </button>

                  <button
                    onClick={() => handleAction(report.id, "Report Dismissed (No Violation)")}
                    className="justify-center px-4 py-2 bg-[#FAF9F6] dark:bg-[#1A1A1E] hover:bg-[#F0EEE6] active:scale-95 border border-[#E8E6DF] dark:border-[#24242A] text-[#121210] dark:text-[#F3F2EE] rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Dismiss Report</span>
                  </button>
                </div>
              ) : (
                <div className="pt-2 font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Action taken: {report.action_taken || "Resolved"}</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl text-center text-xs text-[#7C7A72] dark:text-[#A09E96]">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
            <div className="font-serif italic font-bold text-base text-[#121210] dark:text-[#F3F2EE]">Queue is completely audited</div>
            <div>No reports currently pending review.</div>
          </div>
        )}
      </div>
    </div>
  );
}
