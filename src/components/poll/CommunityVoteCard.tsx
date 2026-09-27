"use client";

import React, { useState, useEffect } from "react";
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
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Database
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
  const [isLoadingPoll, setIsLoadingPoll] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [shareConfig, setShareConfig] = useState<ShareCardConfig | null>(null);
  const [isLiveDb, setIsLiveDb] = useState(false);

  // Check if current user has already cast a vote
  const [userVote, setUserVote] = useState<{ optionId: string; contestantName: string; votedAt?: string } | null>(() => {
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

  // 1. Fetch active poll & user ballot from Neon PostgreSQL
  useEffect(() => {
    let isMounted = true;
    async function fetchPollFromDb() {
      setIsLoadingPoll(true);
      try {
        const query = user?.id ? `?userId=${encodeURIComponent(user.id)}` : "";
        const res = await fetch(`/api/polls/active${query}`);
        if (res.ok) {
          const data = await res.json();
          if (!isMounted) return;
          if (data.poll) {
            setPoll(data.poll);
            setIsLiveDb(Boolean(data.isLiveDb));
          }
          if (data.userVote) {
            setUserVote(data.userVote);
          }
        }
      } catch (err) {
        console.error("Error fetching live poll from Neon DB:", err);
      } finally {
        if (isMounted) setIsLoadingPoll(false);
      }
    }

    fetchPollFromDb();
    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  // Mask email for privacy display (e.g. n***n@example.com)
  const maskEmail = (email: string) => {
    const parts = email.split("@");
    if (parts.length !== 2) return email;
    const name = parts[0];
    const domain = parts[1];
    if (name.length <= 2) return `${name[0]}*@${domain}`;
    return `${name[0]}${"*".repeat(Math.min(name.length - 2, 4))}${name[name.length - 1]}@${domain}`;
  };

  const handleVoteSubmit = async () => {
    if (!user) {
      openAuthModal("choose");
      return;
    }
    if (!selectedOptionId) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessBanner(null);

    try {
      // 1. Submit ballot to Neon PostgreSQL API
      const res = await fetch("/api/polls/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pollId: poll.id,
          optionId: selectedOptionId,
          userId: user.id
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.poll) setPoll(data.poll);
        const chosen = (data.poll || poll).options.find((o: any) => o.id === selectedOptionId);
        const voteInfo = data.userVote || {
          optionId: selectedOptionId,
          contestantName: chosen ? chosen.contestant_name : "your contestant"
        };
        setUserVote(voteInfo);
        setSuccessBanner(`Ballot recorded in Neon DB under @${user.username} (${maskEmail(user.email_private)})`);

        // Cache in local storage for offline fast lookup
        StorageService.submitVote(user.id, poll.id, selectedOptionId);

        // Celebratory confetti
        try {
          confetti({
            particleCount: 45,
            spread: 65,
            origin: { y: 0.75 },
            colors: ['#FF4500', '#F59E0B', '#10B981']
          });
        } catch {
          // ignore canvas
        }

        if (onVoted) onVoted();
      } else if (data.alreadyVoted) {
        if (data.userVote) setUserVote(data.userVote);
        setErrorMessage(data.error || "You have already cast your verified ballot for this eviction cycle.");
      } else {
        // Fallback to local storage
        const localRes = StorageService.submitVote(user.id, poll.id, selectedOptionId);
        if (localRes.success && localRes.updatedPoll) {
          setPoll(localRes.updatedPoll);
          setUserVote({
            optionId: selectedOptionId,
            contestantName: localRes.updatedPoll.options.find(o => o.id === selectedOptionId)?.contestant_name || "your contestant"
          });
        }
        setErrorMessage(data.error || "Could not reach database, saved locally.");
      }
    } catch (err) {
      console.error("Vote submission error:", err);
      // Fallback to local storage
      const localRes = StorageService.submitVote(user.id, poll.id, selectedOptionId);
      if (localRes.success && localRes.updatedPoll) {
        setPoll(localRes.updatedPoll);
        setUserVote({
          optionId: selectedOptionId,
          contestantName: localRes.updatedPoll.options.find(o => o.id === selectedOptionId)?.contestant_name || "your contestant"
        });
      }
    } finally {
      setIsSubmitting(false);
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
    <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-2xl p-5 sm:p-7 shadow-xs">
      {/* Poll Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 border-b border-[#E4E4E7] dark:border-[#232328] gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF4500] bg-[#FF4500]/10 px-2 py-0.5 rounded font-semibold">
              COMMUNITY BALLOT
            </span>
            <span className="flex items-center gap-1 font-mono text-[10px] text-[#10B981]">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>BALLOT OPEN</span>
            </span>
            {isLiveDb && (
              <span className="flex items-center gap-1 font-mono text-[10px] text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded">
                <Database className="w-3 h-3" />
                <span>NEON POSTGRES SYNC</span>
              </span>
            )}
          </div>
          <h2 className="font-serif italic font-bold text-xl sm:text-2xl text-[#09090B] dark:text-[#F4F4F5] mt-1.5">
            {poll.title || "Who are you backing this week?"}
          </h2>
          <p className="text-xs text-[#71717A] mt-0.5">
            1 verified ballot per email account. Direct database persistence in Neon PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#71717A] shrink-0">
          <span className="flex items-center gap-1 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-[#71717A]" />
            <span>Week 4 Cycle</span>
          </span>
          <span className="font-mono text-[11px] font-semibold text-[#09090B] dark:text-[#F4F4F5]">
            {poll.total_votes.toLocaleString()} votes
          </span>
        </div>
      </div>

      {/* Messages */}
      {errorMessage && (
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-xl flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successBanner && (
        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-xl flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Verified Ballot Confirmation Card */}
      {userVote && user && (
        <div className="mt-4 p-3 sm:p-4 bg-[#FAF9F6] dark:bg-[#18181C] rounded-xl border border-[#10B981]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-[#09090B] dark:text-[#F4F4F5] flex items-center gap-2">
                <span>Verified Ballot Cast</span>
                <span className="font-mono text-[10px] text-[#10B981] uppercase font-bold bg-[#10B981]/10 px-1.5 py-0.5 rounded">
                  STORED IN DB
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#71717A] mt-0.5">
                Voted for <strong className="text-[#FF4500] font-sans text-xs">{userVote.contestantName}</strong> • Tied to {maskEmail(user.email_private)} (@{user.username})
              </div>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#71717A] bg-white dark:bg-[#131316] px-2.5 py-1 rounded-md border border-[#E4E4E7] dark:border-[#232328] shrink-0 self-start sm:self-auto">
            1 Vote / Cycle Policy
          </span>
        </div>
      )}

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
              className={`relative overflow-hidden p-3 sm:p-3.5 rounded-xl border transition-all duration-150 active:scale-[0.99] ${
                hasVoted
                  ? isVotedOption
                    ? "border-[#FF4500] bg-[#FF4500]/5 dark:bg-[#FF4500]/10 ring-1 ring-[#FF4500]/40"
                    : "border-[#E4E4E7] dark:border-[#232328] bg-white dark:bg-[#141416] opacity-90"
                  : isSelected
                  ? "border-[#FF4500] bg-[#FF4500]/5 dark:bg-[#FF4500]/10 ring-2 ring-[#FF4500] cursor-pointer shadow-xs"
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

              <div className="relative z-10 flex items-center justify-between gap-3 w-full">
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                  <img
                    src={option.contestant_avatar}
                    alt={option.contestant_name}
                    className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-[#E4E4E7] dark:border-[#27272A] shadow-xs shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm sm:text-base font-serif font-bold text-[#09090B] dark:text-[#F4F4F5] truncate">
                        {option.contestant_name}
                      </span>
                      {isVotedOption && (
                        <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-[#FF4500] bg-[#FF4500]/15 px-1.5 py-0.5 rounded shrink-0">
                          Your Ballot
                        </span>
                      )}
                    </div>
                    {hasVoted && (
                      <div className="font-mono text-[11px] sm:text-xs text-[#71717A] mt-0.5">
                        {option.vote_count.toLocaleString()} votes
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 shrink-0">
                  {hasVoted ? (
                    <span className="text-sm sm:text-base font-bold font-mono tabular-nums text-[#09090B] dark:text-[#F4F4F5]">
                      {option.percentage}%
                    </span>
                  ) : (
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
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
          <span>One verified ballot per BBPulse account • Neon PostgreSQL Verified</span>
        </div>

        <div>
          {userVote ? (
            <button
              onClick={handleOpenShare}
              className="w-full sm:w-auto px-4 py-2 bg-[#09090B] dark:bg-[#F4F4F5] hover:bg-black dark:hover:bg-white active:scale-95 text-white dark:text-[#09090B] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer font-mono uppercase tracking-wider"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Ballot</span>
            </button>
          ) : (
            <button
              onClick={handleVoteSubmit}
              disabled={!selectedOptionId || isSubmitting}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#FF4500] hover:bg-[#E03E00] active:scale-95 text-white rounded-xl text-xs font-bold shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-mono uppercase tracking-wider"
            >
              {isSubmitting ? "Recording in DB..." : user ? "Submit Verified Ballot" : "Verify Email & Vote"}
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
