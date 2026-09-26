"use client";

import React, { useState } from "react";
import { StorageService } from "@/lib/storage";
import { Debate } from "@/types";
import { Check } from "lucide-react";

export default function AdminDebatesPage() {
  const [debate, setDebate] = useState<Debate>(() => StorageService.getDebate());
  const [question, setQuestion] = useState(debate.question);
  const [context, setContext] = useState(debate.context);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    debate.question = question;
    debate.context = context;
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E6DF] dark:border-[#24242A]">
        <div>
          <h1 className="font-serif italic font-bold text-xl sm:text-2xl text-[#121210] dark:text-[#F3F2EE]">
            Editorial Debate Management
          </h1>
          <p className="text-xs text-[#7C7A72] dark:text-[#A09E96]">
            Configure the active daily debate prompt, view live responses, and feature key perspectives.
          </p>
        </div>
      </div>

      {savedToast && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Debate prompt updated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-[#121210] dark:text-[#F3F2EE] mb-1 font-mono">
            Debate Premise Headline
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] focus:border-[#E03137] rounded-xl outline-hidden text-[#121210] dark:text-[#F3F2EE]"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-[#121210] dark:text-[#F3F2EE] mb-1 font-mono">
            Context Background & Broadcast Timestamps
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={3}
            className="w-full p-3.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] focus:border-[#E03137] rounded-xl outline-hidden text-[#121210] dark:text-[#F3F2EE]"
            required
          />
        </div>

        <div className="flex flex-col xs:flex-row xs:items-center justify-around sm:justify-start gap-4 sm:gap-6 p-4 bg-[#FAF9F6] dark:bg-[#1A1A1E] rounded-xl border border-[#E8E6DF] dark:border-[#24242A] font-mono">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#7C7A72] dark:text-[#A09E96]">Agrees Recorded</div>
            <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">{debate.agree_count} ({debate.agree_percentage}%)</div>
          </div>
          <div className="pt-3 xs:pt-0 border-t xs:border-t-0 xs:pl-6 xs:border-l border-[#E8E6DF] dark:border-[#24242A]">
            <div className="text-[10px] uppercase font-bold text-[#7C7A72] dark:text-[#A09E96]">Disagrees Recorded</div>
            <div className="text-lg font-bold text-[#E03137] dark:text-[#FF453A] tabular-nums">{debate.disagree_count} ({debate.disagree_percentage}%)</div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2.5 bg-[#E03137] hover:bg-[#C92A30] active:scale-95 text-white rounded-xl font-semibold shadow-xs transition-all cursor-pointer"
        >
          Save Debate Configuration
        </button>
      </form>
    </div>
  );
}
