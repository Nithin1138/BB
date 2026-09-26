"use client";

import React, { useState } from "react";
import { Poll, ShareCardConfig } from "@/types";
import { StorageService } from "@/lib/storage";
import { useAuth } from "@/context/AuthContext";
import { ShareModal } from "@/components/share/ShareModal";
import confetti from "canvas-confetti";
import { INITIAL_POLL } from "@/lib/mock-data";
import {
  Clock,
  Radio,
  Share2,
  ShieldCheck
} from "lucide-react";

interface CommunityVoteCardProps {
  initialPoll?: Poll;
  onVoted?: () => void;
}

export function CommunityVoteCard({ initialPoll = INITIAL_POLL, onVoted }: CommunityVoteCardProps) {
  const { user, openAuthModal } = useAuth();
  const [poll, setPoll] = useState<Poll>(initialPoll);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shareConfig, setShareConfig] = useState<ShareCardConfig | null>(null);

  // Check if current user has already cast a vote
  const [userVote, setUserVote] = useState<{ optionId: string; contestantName: string } | null>(() => {
    if (typeof window === "undefined" || !user) return null;
    const existing = StorageService.getUserVote(user.id, poll.id);
    if (existing) {
      const chosen = poll.options.find(o => o.id === existing.option_id);
      return {
        optionId: existing.option_id,
        contestantName: chosen ? chosen.contestant_name : "your contestant"
      };
    }
    return null;
  });

  const handleVoteSubmit = () => {
    if (!user) {
      openAuthModal("google");
      return;
    }
    if (!selectedOptionId) return;

    setIsSubmitting(true);
    const res = StorageService.submitVote(user.id, poll.id, selectedOptionId);
    setIsSubmitting(false);

    if (res.success && res.updatedPoll) {
      setPoll(res.updatedPoll);
      const chosen = res.updatedPoll.options.find(o => o.id === selectedOptionId);
      setUserVote({
        optionId: selectedOptionId,
        contestantName: chosen ? chosen.contestant_name : "your contestant"
      });

      // Subtle celebratory confetti
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#FF4500', '#F59E0B', '#10B981']
        });
      } catch {
        // ignore if canvas unavailable
      }

      if (onVoted) onVoted();
    }
  };

  const handleOpenShare = () => {
    const chosen = poll.options.find(o => o.id === userVote?.optionId);
    setShareConfig({
      type: "vote",
      headline: `Fans are backing ${userVote?.contestantName || "their favorites"}`,
      main_metric: `${chosen?.percentage || 36}%`,
      secondary_metric: "of community votes",
      contestant_name: userVote?.contestantName,
      contestant_avatar: chosen?.contestant_avatar,
      disclaimer: "Unofficial BBPulse Week 4 Community Poll",
      url: "/vote"
    });
  };

  return (
    <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 sm:p-6 shadow-2xs">
      {/* Poll Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 border-b border-[#E4E4E7] dark:border-[#232328] gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF4500] bg-[#FF4500]/10 px-2 py-0.5 rounded-sm font-semibold">
              COMMUNITY BALLOT
            </span>
            <span className="flex items-center gap-1 font-mono text-[10px] text-[#10B981]">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>BALLOT OPEN</span>
            </span>
          </div>
          <h2 className="font-serif italic font-bold text-xl sm:text-2xl text-[#09090B] dark:text-[#F4F4F5] mt-1.5">
            Who are you backing this week?
          </h2>
          <p className="text-xs text-[#71717A] mt-0.5">
            Unofficial fan broadsheet ballot. Vote once to reveal real-time community percentages.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#71717A]">
          <span className="flex items-center gap-1 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-[#71717A]" />
            <span>Closes in 4h 12m</span>
          </span>
          <span className="font-mono text-[11px] font-semibold text-[#09090B] dark:text-[#F4F4F5]">{poll.total_votes.toLocaleString()} votes</span>
        </div>
      </div>

      {/* Options List */}
      <div className="mt-5 space-y-2">
        {poll.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isVotedOption = userVote?.optionId === option.id;
          const hasVoted = !!userVote;

          return (
            <div
              key={option.id}
              onClick={() => !hasVoted && setSelectedOptionId(option.id)}
              className={`relative overflow-hidden p-3 sm:p-3.5 rounded-lg border transition-all duration-150 active:scale-[0.99] ${
                hasVoted
                  ? isVotedOption
                    ? "border-[#FF4500] bg-[#FF4500]/5 dark:bg-[#FF4500]/10"
                    : "border-[#E4E4E7] dark:border-[#232328] bg-white dark:bg-[#141416] opacity-90"
                  : isSelected
                  ? "border-[#FF4500] bg-[#FF4500]/5 dark:bg-[#FF4500]/10 ring-1 ring-[#FF4500] cursor-pointer"
                  : "border-[#E4E4E7] dark:border-[#232328] bg-white dark:bg-[#141416] hover:border-[#09090B]/30 dark:hover:border-[#F4F4F5]/30 hover:bg-[#F4F4F5]/60 dark:hover:bg-[#1B1B1F] cursor-pointer"
              }`}
            >
              {/* Progress bar background for results view */}
              {hasVoted && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#FF4500]/15 dark:bg-[#FF4500]/20 transition-all duration-700 ease-out"
                  style={{ width: `${option.percentage}%` }}
                />
              )}

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={option.contestant_avatar}
                    alt={option.contestant_name}
                    className="w-9 h-9 rounded-full object-cover border border-[#E4E4E7] dark:border-[#232328]"
                  />
                  <div>
                    <div className="text-sm font-serif font-bold text-[#09090B] dark:text-[#F4F4F5] flex items-center gap-2">
                      <span>{option.contestant_name}</span>
                      {isVotedOption && (
                        <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-[#FF4500] bg-[#FF4500]/15 px-1.5 py-0.5 rounded">
                          Your Ballot
                        </span>
                      )}
                    </div>
                    {hasVoted && (
                      <div className="font-mono text-[11px] text-[#71717A]">
                        {option.vote_count.toLocaleString()} votes
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {hasVoted ? (
                    <span className="text-sm font-bold font-mono tabular-nums text-[#09090B] dark:text-[#F4F4F5]">
                      {option.percentage}%
                    </span>
                  ) : (
                    <div
                      className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-[#FF4500] bg-[#FF4500] text-white"
                          : "border-[#E4E4E7] dark:border-[#32323A] bg-white dark:bg-[#1B1B1F]"
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="mt-5 pt-4 border-t border-[#E4E4E7] dark:border-[#232328] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#71717A]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
          <span>One verified ballot per BBPulse account • Cryptographic hash check</span>
        </div>

        <div>
          {userVote ? (
            <button
              onClick={handleOpenShare}
              className="w-full sm:w-auto px-4 py-2 bg-[#09090B] dark:bg-[#F4F4F5] hover:bg-black dark:hover:bg-white active:scale-95 text-white dark:text-[#09090B] rounded-md text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer font-mono uppercase tracking-wider"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Ballot</span>
            </button>
          ) : (
            <button
              onClick={handleVoteSubmit}
              disabled={!selectedOptionId || isSubmitting}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#FF4500] hover:bg-[#E03E00] active:scale-95 text-white rounded-md text-xs font-bold shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-mono uppercase tracking-wider"
            >
              {isSubmitting ? "Casting..." : user ? "Submit Ballot" : "Authenticate to Vote"}
            </button>
          )}
        </div>
      </div>

      {/* Share Modal Trigger */}
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
