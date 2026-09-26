"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PredictionCommunityStat, ShareCardConfig } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { StorageService } from "@/lib/storage";
import { ShareModal } from "@/components/share/ShareModal";
import { AlertTriangle, ArrowRight, ShieldCheck, Share2, HelpCircle } from "lucide-react";

interface CommunityPredictionCardProps {
  stats?: PredictionCommunityStat[];
}

export function CommunityPredictionCard({ stats }: CommunityPredictionCardProps) {
  const { user, openAuthModal } = useAuth();
  const allStats = stats || StorageService.getPredictionStats();
  const leadingRisk = allStats[0]; // Ajay Kumar (64% community prediction, 72 Risk score)
  const [selectedContestantId, setSelectedContestantId] = useState(leadingRisk?.contestant_id || "c_ajay");
  const [submittedPrediction, setSubmittedPrediction] = useState<string | null>(null);
  const [shareConfig, setShareConfig] = useState<ShareCardConfig | null>(null);

  const handlePredict = () => {
    if (!user) {
      openAuthModal("google");
      return;
    }

    const target = allStats.find(s => s.contestant_id === selectedContestantId);
    if (target) {
      StorageService.submitPrediction(user.id, target.contestant_id, target.contestant_name, target.contestant_avatar);
      setSubmittedPrediction(target.contestant_name);
    }
  };

  const handleShare = () => {
    setShareConfig({
      type: "prediction",
      headline: `${leadingRisk.community_pct}% think ${leadingRisk.contestant_name} is at risk`,
      main_metric: `${leadingRisk.community_pct}%`,
      secondary_metric: `Community Risk Score: ${leadingRisk.risk_score}/100`,
      contestant_name: leadingRisk.contestant_name,
      contestant_avatar: leadingRisk.contestant_avatar,
      disclaimer: "Unofficial community forecast • Not an official broadcast result",
      url: "/predict"
    });
  };

  return (
    <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 sm:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E4E4E7] dark:border-[#232328] gap-2">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#FF4500] uppercase font-semibold">
            COMMUNITY CONSENSUS FORECAST
          </span>
          <h2 className="text-xl sm:text-2xl font-serif italic font-bold tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-1">
            Who do fans think is at risk this week?
          </h2>
        </div>
        <Link
          href="/predict"
          className="text-xs font-mono font-medium text-[#FF4500] hover:underline flex items-center gap-1 shrink-0"
        >
          <span>All Projections</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Comparison Area: Primary Community Prediction vs Secondary Risk Score */}
      <div className="mt-5 p-4 sm:p-5 bg-[#F4F4F5] dark:bg-[#1B1B1F] rounded-lg border border-[#E4E4E7] dark:border-[#232328] flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
        {/* Leading Contestant Profile Snippet */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <img
            src={leadingRisk.contestant_avatar}
            alt={leadingRisk.contestant_name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-[#E4E4E7] dark:border-[#232328] shadow-xs shrink-0"
          />
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#FF4500] font-semibold uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Highest Danger Signal</span>
            </div>
            <h4 className="text-lg font-serif font-bold text-[#09090B] dark:text-[#F4F4F5]">{leadingRisk.contestant_name}</h4>
            <div className="text-[11px] font-mono text-[#71717A] tabular-nums">{leadingRisk.total_predictions.toLocaleString()} submissions</div>
          </div>
        </div>

        {/* Primary vs Secondary Metrics */}
        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-[#E4E4E7] dark:border-[#232328]">
          {/* PRIMARY: Community Prediction */}
          <div className="text-left md:text-right">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#71717A]">
              Eviction Backing
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] tracking-tight tabular-nums">
              {leadingRisk.community_pct}%
            </div>
            <div className="text-[10px] font-mono text-[#71717A]">community forecast</div>
          </div>

          <div className="h-10 w-px bg-[#E4E4E7] dark:bg-[#232328]" />

          {/* SECONDARY: BBPulse Risk Score */}
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] flex items-center justify-end gap-1">
              <span>Risk Score</span>
              <Link href="/pulse" title="How Risk Score is calculated">
                <HelpCircle className="w-3 h-3 text-[#71717A]" />
              </Link>
            </div>
            <div className="text-2xl font-mono font-bold text-[#52525B] dark:text-[#A1A1AA] tabular-nums">
              {leadingRisk.risk_score} <span className="text-xs text-[#71717A] font-normal">/ 100</span>
            </div>
            <div className="text-[10px] font-mono text-[#71717A]">rule-based score</div>
          </div>
        </div>
      </div>

      {/* Contestant Prediction Selector */}
      <div className="mt-5 space-y-2.5">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#09090B] dark:text-[#F4F4F5]">
          Select Contestant to Forecast:
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {allStats.slice(0, 6).map((stat) => (
            <button
              key={stat.contestant_id}
              onClick={() => setSelectedContestantId(stat.contestant_id)}
              className={`p-2.5 rounded-md border text-left flex items-center gap-2.5 transition-all duration-150 active:scale-95 cursor-pointer ${
                selectedContestantId === stat.contestant_id
                  ? "border-[#FF4500] bg-[#FF4500]/5 dark:bg-[#FF4500]/10 ring-1 ring-[#FF4500]"
                  : "border-[#E4E4E7] dark:border-[#232328] bg-white dark:bg-[#141416] hover:border-[#09090B]/30 dark:hover:border-[#F4F4F5]/30"
              }`}
            >
              <img
                src={stat.contestant_avatar}
                alt=""
                className="w-7 h-7 rounded-full object-cover border border-[#E4E4E7] dark:border-[#232328] shrink-0"
              />
              <div className="overflow-hidden">
                <div className="text-xs font-serif font-bold text-[#09090B] dark:text-[#F4F4F5] truncate">{stat.contestant_name}</div>
                <div className="text-[10px] font-mono text-[#71717A] tabular-nums">{stat.community_pct}% danger</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 pt-4 border-t border-[#E4E4E7] dark:border-[#232328] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-[11px] font-mono text-[#71717A] flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
          <span>Independent fan consensus • Accuracy logged to profile</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex-1 sm:flex-none justify-center px-3 py-2 bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F] text-[#09090B] dark:text-[#F4F4F5] rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={handlePredict}
            className="flex-1 sm:flex-none justify-center px-4 py-2 bg-[#FF4500] hover:bg-[#E03E00] text-white rounded-md text-xs font-mono font-bold transition-all active:scale-95 cursor-pointer shadow-xs uppercase tracking-wider"
          >
            {submittedPrediction ? `Forecasted (${submittedPrediction})` : "Submit Forecast"}
          </button>
        </div>
      </div>

      {shareConfig && (
        <ShareModal
          isOpen={!!shareConfig}
          onClose={() => setShareConfig(null)}
          config={shareConfig}
        />
      )}
    </div>
  );
}
