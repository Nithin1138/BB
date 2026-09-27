"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Debate } from "@/types";
import { StorageService } from "@/lib/storage";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Check, ThumbsUp, ThumbsDown } from "lucide-react";

interface DebateEditorialCardProps {
  initialDebate?: Debate;
}

export function DebateEditorialCard({ initialDebate }: DebateEditorialCardProps) {
  const { user, openAuthModal } = useAuth();
  const [debate, setDebate] = useState<Debate>(() => initialDebate || StorageService.getDebate());
  const [stance, setStance] = useState<"agree" | "disagree">("agree");
  const [commentInput, setCommentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleResponseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal("google");
      return;
    }
    if (!commentInput.trim()) return;

    setIsSubmitting(true);
    const updated = StorageService.submitDebateResponse(
      user.id,
      user.username,
      user.avatar_url,
      stance,
      commentInput.trim()
    );
    setDebate(updated);
    setIsSubmitting(false);
    setCommentInput("");
    setSubmittedMessage("Your response has been published to Today's Debate!");
    setTimeout(() => setSubmittedMessage(null), 3500);
  };

  return (
    <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 sm:p-6 shadow-2xs">
      {/* Editorial Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E4E4E7] dark:border-[#232328]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] font-bold text-[#FF4500] uppercase tracking-widest bg-[#FF4500]/10 px-2 py-0.5 rounded-sm">
            FEATURED DEBATE
          </span>
          <span className="font-mono text-[10px] text-[#71717A]">EP · 24 CONFRONTATION</span>
        </div>
        <Link
          href="/debates/was-sivajis-outburst-justified"
          className="font-mono text-xs text-[#FF4500] hover:underline flex items-center gap-1"
        >
          <span>Examine Debate</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Question */}
      <div className="my-5">
        <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-[#09090B] dark:text-[#F4F4F5] leading-tight">
          {debate.question}
        </h3>
        <p className="text-xs text-[#71717A] mt-1.5 leading-relaxed">
          {debate.context}
        </p>
      </div>

      {/* Split Bar Visual */}
      <div className="bg-[#F4F4F5] dark:bg-[#1B1B1F] p-4 rounded-lg border border-[#E4E4E7] dark:border-[#232328]">
        <div className="flex items-center justify-between text-xs font-semibold mb-2 font-mono">
          <span className="text-[#10B981] flex items-center gap-1.5">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Agree (<span className="tabular-nums">{debate.agree_percentage}%</span>)</span>
          </span>
          <span className="text-[#FF4500] flex items-center gap-1.5">
            <span>Disagree (<span className="tabular-nums">{debate.disagree_percentage}%</span>)</span>
            <ThumbsDown className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="h-2 w-full bg-[#E4E4E7] dark:border-[#232328] dark:bg-[#232328] rounded-full overflow-hidden flex">
          <div
            className="bg-[#10B981] transition-all duration-700 ease-out"
            style={{ width: `${debate.agree_percentage}%` }}
          />
          <div
            className="bg-[#FF4500] transition-all duration-700 ease-out"
            style={{ width: `${debate.disagree_percentage}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-[#71717A] mt-2 font-mono tabular-nums">
          <span>{debate.agree_count.toLocaleString()} fans agree</span>
          <span>{debate.disagree_count.toLocaleString()} fans disagree</span>
        </div>
      </div>

      {/* Two-column Editorial Highlight: Why fans agree vs disagree */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-4 border-t border-[#E4E4E7] dark:border-[#232328] text-xs">
        <div className="space-y-2">
          <span className="font-mono text-[10px] font-bold text-[#10B981] uppercase tracking-widest block">
            Why fans agree
          </span>
          {debate.why_agree.slice(0, 2).map((point, idx) => (
            <p key={idx} className="font-serif italic text-[#71717A] dark:text-[#A1A1AA] leading-relaxed pl-2 border-l-2 border-[#10B981]">
              "{point}"
            </p>
          ))}
        </div>

        <div className="space-y-2">
          <span className="font-mono text-[10px] font-bold text-[#FF4500] uppercase tracking-widest block">
            Why fans disagree
          </span>
          {debate.why_disagree.slice(0, 2).map((point, idx) => (
            <p key={idx} className="font-serif italic text-[#71717A] dark:text-[#A1A1AA] leading-relaxed pl-2 border-l-2 border-[#FF4500]">
              "{point}"
            </p>
          ))}
        </div>
      </div>

      {/* Interactive Stance & Response Field */}
      <form onSubmit={handleResponseSubmit} className="mt-5 pt-4 border-t border-[#E4E4E7] dark:border-[#232328]">
        {submittedMessage && (
          <div className="mb-3 p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs rounded-md flex items-center gap-2">
            <Check className="w-4 h-4 text-[#10B981]" />
            <span>{submittedMessage}</span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-2 font-mono text-xs">
          <span className="font-semibold text-[#09090B] dark:text-[#F4F4F5]">Your Stance:</span>
          <button
            type="button"
            onClick={() => setStance("agree")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all active:scale-95 cursor-pointer ${
              stance === "agree"
                ? "bg-[#10B981] text-white"
                : "bg-[#F4F4F5] dark:bg-[#1B1B1F] text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F4F4F5]"
            }`}
          >
            Agree
          </button>
          <button
            type="button"
            onClick={() => setStance("disagree")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all active:scale-95 cursor-pointer ${
              stance === "disagree"
                ? "bg-[#FF4500] text-white"
                : "bg-[#F4F4F5] dark:bg-[#1B1B1F] text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F4F4F5]"
            }`}
          >
            Disagree
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder={user ? "Add your perspective..." : "Authenticate to join debate..."}
            className="flex-1 min-w-0 px-3.5 py-2 text-xs bg-[#F4F4F5] dark:bg-[#1B1B1F] border border-[#E4E4E7] dark:border-[#232328] focus:border-[#FF4500] rounded-md outline-hidden text-[#09090B] dark:text-[#F4F4F5] transition-all"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-3 sm:px-4 py-2 bg-[#09090B] dark:bg-[#F4F4F5] hover:bg-black dark:hover:bg-white text-white dark:text-[#09090B] text-xs font-semibold rounded-md transition-all shrink-0 active:scale-95 cursor-pointer font-mono uppercase tracking-wider"
          >
            {isSubmitting ? "Posting..." : "Join Debate"}
          </button>
        </div>
      </form>
    </div>
  );
}
