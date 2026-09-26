"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StorageService } from "@/lib/storage";
import { Debate, ShareCardConfig } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { ShareModal } from "@/components/share/ShareModal";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Check,
  Send
} from "lucide-react";

export default function DebatePage() {
  const { user, openAuthModal } = useAuth();
  const [debate, setDebate] = useState<Debate>(() => StorageService.getDebate());
  const [stance, setStance] = useState<"agree" | "disagree">("agree");
  const [commentInput, setCommentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedToast, setSubmittedToast] = useState(false);
  const [shareConfig, setShareConfig] = useState<ShareCardConfig | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
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
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3000);
  };

  const handleShare = () => {
    setShareConfig({
      type: "debate",
      headline: debate.question,
      main_metric: `${debate.agree_percentage}% Agree`,
      secondary_metric: `${debate.disagree_percentage}% Disagree (${(debate.agree_count + debate.disagree_count).toLocaleString()} verified votes)`,
      disclaimer: "Today's Editorial Debate • Unofficial Fan Sentiment",
      url: "/debates/was-sivajis-outburst-justified"
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Top back link */}
      <div>
        <Link
          href="/"
          className="text-xs font-semibold text-[#7C7A72] hover:text-[#121210] dark:text-[#A09E96] dark:hover:text-[#F3F2EE] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home Broad-sheet</span>
        </Link>
      </div>

      {/* Editorial Debate Spotlight */}
      <section className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#E03137] dark:text-[#FF453A] bg-[#E03137]/10 px-2.5 py-0.5 rounded-sm">
            Featured Debate • Episode 24
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 font-mono text-xs text-[#E03137] dark:text-[#FF453A] hover:underline cursor-pointer shrink-0"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share Debate Card</span>
            <span className="sm:hidden">Share</span>
          </button>
        </div>

        <div>
          <h1 className="font-serif italic font-bold text-2xl sm:text-4xl text-[#121210] dark:text-[#F3F2EE] leading-tight">
            {debate.question}
          </h1>
          <p className="text-xs sm:text-sm text-[#7C7A72] dark:text-[#A09E96] mt-2 leading-relaxed">
            {debate.context}
          </p>
        </div>

        {/* Split Visual */}
        <div className="bg-[#FAF9F6] dark:bg-[#1A1A1E] p-4 sm:p-5 rounded-2xl border border-[#E8E6DF] dark:border-[#24242A] space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold font-mono">
            <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <ThumbsUp className="w-4 h-4 shrink-0" />
              <span>Agree ({debate.agree_percentage}%)</span>
            </span>
            <span className="text-[#E03137] dark:text-[#FF453A] flex items-center gap-1.5">
              <span>Disagree ({debate.disagree_percentage}%)</span>
              <ThumbsDown className="w-4 h-4 shrink-0" />
            </span>
          </div>

          <div className="h-3 w-full bg-[#E8E6DF] dark:bg-[#24242A] rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-600 dark:bg-emerald-500 transition-all duration-700 ease-out"
              style={{ width: `${debate.agree_percentage}%` }}
            />
            <div
              className="bg-[#E03137] dark:bg-[#FF453A] transition-all duration-700 ease-out"
              style={{ width: `${debate.disagree_percentage}%` }}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-[11px] text-[#7C7A72] dark:text-[#A09E96]">
            <span>{debate.agree_count.toLocaleString()} fans supported Sivaji</span>
            <span>{debate.disagree_count.toLocaleString()} fans condemned outburst</span>
          </div>
        </div>
      </section>

      {/* Editorial Split Arguments: Why Fans Agree vs Disagree */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Agree column */}
        <div className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-6 shadow-xs space-y-3">
          <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Why Fans Agree ({debate.agree_percentage}%)</span>
          </span>
          <div className="space-y-3 pt-1">
            {debate.why_agree.map((point, idx) => (
              <p key={idx} className="p-3.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] rounded-xl border border-[#E8E6DF] dark:border-[#24242A] text-[#121210] dark:text-[#F3F2EE] leading-relaxed italic font-serif">
                "{point}"
              </p>
            ))}
          </div>
        </div>

        {/* Disagree column */}
        <div className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-6 shadow-xs space-y-3">
          <span className="font-mono text-xs font-bold text-[#E03137] dark:text-[#FF453A] uppercase tracking-wider flex items-center gap-1.5">
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>Why Fans Disagree ({debate.disagree_percentage}%)</span>
          </span>
          <div className="space-y-3 pt-1">
            {debate.why_disagree.map((point, idx) => (
              <p key={idx} className="p-3.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] rounded-xl border border-[#E8E6DF] dark:border-[#24242A] text-[#121210] dark:text-[#F3F2EE] leading-relaxed italic font-serif">
                "{point}"
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Conversation & Live Responses */}
      <section className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="font-serif italic font-bold text-xl sm:text-2xl text-[#121210] dark:text-[#F3F2EE]">
            Record Your Editorial Stance
          </h2>
          <p className="text-xs text-[#7C7A72] dark:text-[#A09E96] mt-0.5">
            Cast your vote on this debate and articulate your perspective for the community record.
          </p>
        </div>

        {submittedToast && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Your perspective has been recorded on Today's Debate!</span>
          </div>
        )}

        {/* Response Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-[#121210] dark:text-[#F3F2EE]">Your Stance:</span>
            <button
              type="button"
              onClick={() => setStance("agree")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                stance === "agree"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-[#F4F3EE] dark:bg-[#1A1A1E] text-[#7C7A72] dark:text-[#A09E96] hover:text-[#121210] dark:hover:text-[#F3F2EE]"
              }`}
            >
              I Agree
            </button>
            <button
              type="button"
              onClick={() => setStance("disagree")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                stance === "disagree"
                  ? "bg-[#E03137] text-white shadow-xs"
                  : "bg-[#F4F3EE] dark:bg-[#1A1A1E] text-[#7C7A72] dark:text-[#A09E96] hover:text-[#121210] dark:hover:text-[#F3F2EE]"
              }`}
            >
              I Disagree
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder={user ? `Articulate why you ${stance} with today's action...` : "Sign in with Google to participate..."}
              className="flex-1 px-4 py-2.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] focus:border-[#E03137] rounded-xl text-xs outline-hidden text-[#121210] dark:text-[#F3F2EE]"
            />
            <button
              type="submit"
              disabled={isSubmitting || !commentInput.trim()}
              className="px-5 py-2.5 bg-[#121210] dark:bg-[#F3F2EE] hover:bg-[#252520] dark:hover:bg-white active:scale-95 text-[#FAF9F6] dark:text-[#121210] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shrink-0 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          </div>
        </form>

        {/* Community Responses List */}
        <div className="pt-4 border-t border-[#E8E6DF] dark:border-[#24242A] space-y-3">
          <div className="font-mono text-xs font-bold text-[#121210] dark:text-[#F3F2EE] uppercase tracking-wider">
            Verified Community Perspectives ({debate.responses.length})
          </div>

          {debate.responses.map(r => (
            <div key={r.id} className="p-4 bg-[#FAF9F6] dark:bg-[#1A1A1E] rounded-2xl border border-[#E8E6DF] dark:border-[#24242A] space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={r.user_avatar} alt="" className="w-10 h-10 rounded-xl object-cover border-2 border-[#E8E6DF] dark:border-[#24242A] shadow-2xs shrink-0" />
                  <Link href={`/u/${r.username}`} className="text-xs font-mono font-bold text-[#121210] dark:text-[#F3F2EE] hover:text-[#E03137] dark:hover:text-[#FF453A]">
                    @{r.username}
                  </Link>
                  <span className={`font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    r.stance === "agree" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-[#E03137]/10 text-[#E03137] dark:text-[#FF453A]"
                  }`}>
                    {r.stance}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#7C7A72] dark:text-[#A09E96]">{r.created_at}</span>
              </div>
              <p className="text-xs text-[#121210] dark:text-[#F3F2EE] leading-relaxed">
                {r.comment}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Share Modal */}
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
