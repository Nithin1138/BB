"use client";

import React, { useState } from "react";
import { useWikipediaSync } from "@/hooks/useWikipediaSync";
import { RefreshCw, ExternalLink, Zap, CheckCircle2, ChevronDown, Clock, ShieldCheck } from "lucide-react";

export function WikipediaLiveSyncBanner() {
  const { syncInfo, isSyncing, notification, triggerSync } = useWikipediaSync();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      {/* Floating / Top Toast when an update happens */}
      {notification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300 max-w-[90vw] sm:max-w-md w-full px-4">
          <div className="bg-[#121210] dark:bg-[#F3F2EE] text-white dark:text-[#121210] p-3.5 rounded-xl shadow-2xl border border-white/10 dark:border-black/10 flex items-center gap-3">
            <Zap className="w-4 h-4 text-[#FF4500] shrink-0 animate-bounce" />
            <div className="flex-1 text-xs font-mono leading-tight">
              <span className="font-bold text-[#FF4500]">LIVE WIKI UPDATE:</span> {notification}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="text-[10px] uppercase font-mono px-2 py-1 bg-white/20 dark:bg-black/20 hover:bg-white/30 rounded cursor-pointer shrink-0"
            >
              Refresh
            </button>
          </div>
        </div>
      )}

      {/* Broadsheet Sync Pill */}
      <div className="relative inline-flex items-center">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 bg-[#FAF9F6] dark:bg-[#18181C] border border-[#E8E6DF] dark:border-[#24242A] rounded-full text-[10px] font-mono shadow-2xs">
          {/* Pulsing indicator */}
          <span className="flex items-center gap-1 text-[#10B981]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <span className="hidden sm:inline font-bold">WIKI LIVE</span>
          </span>

          <span className="text-[#8A8983] dark:text-[#7A7A85] hidden md:inline">•</span>

          {/* Revision ID */}
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="flex items-center gap-0.5 sm:gap-1 text-[#5C5B56] dark:text-[#A1A1AA] hover:text-[#121210] dark:hover:text-[#F3F2EE] transition-colors cursor-pointer"
            title="Click for Wikipedia Sync Details"
          >
            <span className="hidden md:inline">Rev #{syncInfo?.lastSyncedRevisionId || "1377708413"}</span>
            <span className="md:hidden font-mono text-[10px]">#{String(syncInfo?.lastSyncedRevisionId || "8413").slice(-4)}</span>
            <ChevronDown className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform ${isDetailsOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Sync Now Action */}
          <button
            onClick={() => triggerSync(true)}
            disabled={isSyncing}
            className="flex items-center gap-1 ml-0.5 sm:ml-1 px-1.5 sm:px-2 py-0.5 bg-white dark:bg-[#202026] hover:bg-[#F0EEE6] dark:hover:bg-[#282830] active:scale-95 rounded text-[#121210] dark:text-[#F3F2EE] font-medium transition-all cursor-pointer disabled:opacity-50"
            title="Force re-fetch from Wikipedia"
          >
            <RefreshCw className={`w-2.5 h-2.5 ${isSyncing ? "animate-spin text-[#FF4500]" : ""}`} />
            <span className="hidden xs:inline">{isSyncing ? "..." : "Sync"}</span>
          </button>
        </div>

        {/* Detailed Dropdown popover */}
        {isDetailsOpen && (
          <div className="absolute top-full right-0 mt-2 z-50 w-80 bg-white dark:bg-[#141416] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-4 shadow-xl text-xs space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E6DF] dark:border-[#24242A]">
              <div className="flex items-center gap-1.5 font-bold font-mono text-[11px] text-[#121210] dark:text-[#F3F2EE]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Automated Wikipedia Sync</span>
              </div>
              <span className="font-mono text-[10px] text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded">
                Active
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] font-mono text-[#5C5B56] dark:text-[#A1A1AA]">
              <div className="flex items-center justify-between">
                <span>Article:</span>
                <a
                  href={syncInfo?.wikipediaUrl || "https://en.wikipedia.org/wiki/Bigg_Boss_(Telugu_TV_series)_season_10"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#FF4500] hover:underline flex items-center gap-1 truncate max-w-[170px]"
                >
                  <span className="truncate">BB Telugu Season 10</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              <div className="flex items-center justify-between">
                <span>Latest Wikipedia Rev:</span>
                <span className="font-semibold text-[#121210] dark:text-[#F3F2EE]">
                  #{syncInfo?.latestRevisionId || "1377708413"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Database Sync Count:</span>
                <span className="text-[#121210] dark:text-[#F3F2EE]">
                  {syncInfo?.syncCount || 1} updates
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Query Latency:</span>
                <span className="text-[#10B981]">
                  {syncInfo?.latencyMs ? `${syncInfo.latencyMs}ms` : "120ms"}
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-[#FAF9F6] dark:bg-[#18181C] rounded-xl border border-[#E8E6DF] dark:border-[#24242A] text-[11px] leading-relaxed text-[#71717A]">
              <div className="font-semibold text-[#121210] dark:text-[#F3F2EE] mb-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#FF4500]" />
                <span>Last Sync Summary:</span>
              </div>
              <p className="line-clamp-2 italic">
                {syncInfo?.lastChangesSummary || "Synchronized with live Wikipedia article"}
              </p>
            </div>

            <div className="pt-1 flex items-center justify-between text-[10px] text-[#8A8983]">
              <span>EventStreams / SSE Polling</span>
              <button
                onClick={() => {
                  triggerSync(true);
                  setIsDetailsOpen(false);
                }}
                className="text-[#FF4500] hover:underline font-mono font-semibold cursor-pointer"
              >
                Force Sync Now →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
