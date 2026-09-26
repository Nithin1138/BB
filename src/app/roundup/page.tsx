"use client";

import React, { useState } from "react";
import { INITIAL_ROUNDUPS } from "@/lib/mock-data";
import { useAuth } from "@/context/AuthContext";
import { ExternalLink, ShieldCheck, Plus, CheckCircle2 } from "lucide-react";
import { PollRoundup } from "@/types";

export default function RoundupPage() {
  const { user, openAuthModal } = useAuth();
  const [roundups, setRoundups] = useState<PollRoundup[]>(INITIAL_ROUNDUPS);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [sourceName, setSourceName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [submittedToast, setSubmittedToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceName.trim() || !sourceUrl.trim()) return;

    const newRoundup: PollRoundup = {
      id: `roundup_${Date.now()}`,
      source_name: sourceName.trim(),
      source_url: sourceUrl.trim(),
      source_type: "fan_portal",
      date_checked: new Date().toISOString().split("T")[0],
      status: "pending",
      submitted_by: user?.display_name || "Community Observer",
      notes: notes.trim() || "Submitted via public crowdsourced intake",
      results: [
        { contestant_name: "Shivaji", percentage: 38 },
        { contestant_name: "Pallavi Prashanth", percentage: 31 },
        { contestant_name: "Yawar", percentage: 17 }
      ]
    };

    setRoundups([newRoundup, ...roundups]);
    setIsSubmitOpen(false);
    setSourceName("");
    setSourceUrl("");
    setNotes("");
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 4000);
  };

  const verifiedRoundups = roundups.filter(r => r.status === "verified");

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Editorial Broadsheet Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E6DF] dark:border-[#24242A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#E03137] dark:text-[#FF453A] bg-[#E03137]/10 px-2 py-0.5 rounded-sm">
              External Polling Observatory
            </span>
          </div>
          <h1 className="font-serif italic font-bold text-3xl sm:text-4xl text-[#121210] dark:text-[#F3F2EE] mt-2">
            Independent Media & Fan Surveys
          </h1>
          <p className="text-xs sm:text-sm text-[#7C7A72] dark:text-[#A09E96] mt-1 max-w-xl leading-relaxed">
            Verified observations from independent Telugu media polls and public fan forums. Every entry is audited by moderators with transparent citation.
          </p>
        </div>

        <button
          onClick={() => {
            if (!user) openAuthModal("google");
            else setIsSubmitOpen(!isSubmitOpen);
          }}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#E03137] hover:bg-[#C92A30] active:scale-95 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Poll Observation</span>
        </button>
      </div>

      {submittedToast && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 rounded-2xl flex items-center gap-3 text-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div>
            <div className="font-bold">Observation Submitted for Review</div>
            <div>Your submission has been queued for editorial verification. It will appear publicly once citations are validated.</div>
          </div>
        </div>
      )}

      {/* Submission Accordion Form */}
      {isSubmitOpen && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-4 sm:p-6 shadow-md space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] dark:border-[#24242A]">
            <h2 className="font-serif font-bold text-base text-[#121210] dark:text-[#F3F2EE]">
              Submit Public Poll Citation
            </h2>
            <span className="font-mono text-[10px] text-[#7C7A72] dark:text-[#A09E96]">Audited intake</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#121210] dark:text-[#F3F2EE] mb-1">
                Source Portal / Survey Organization
              </label>
              <input
                type="text"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="e.g. CineMedia Telugu Weekly Survey"
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] focus:border-[#E03137] rounded-xl outline-hidden text-[#121210] dark:text-[#F3F2EE]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#121210] dark:text-[#F3F2EE] mb-1">
                Public URL Link
              </label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] focus:border-[#E03137] rounded-xl outline-hidden text-[#121210] dark:text-[#F3F2EE] font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#121210] dark:text-[#F3F2EE] mb-1">
                Methodology Notes / Sample Size Context
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Provide observed vote breakdown or methodology details..."
                rows={2}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] focus:border-[#E03137] rounded-xl outline-hidden text-[#121210] dark:text-[#F3F2EE]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsSubmitOpen(false)}
              className="py-1.5 px-3 text-xs text-[#7C7A72] dark:text-[#A09E96] hover:text-[#121210] dark:hover:text-[#F3F2EE]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-5 bg-[#E03137] hover:bg-[#C92A30] active:scale-95 text-white rounded-xl text-xs font-semibold"
            >
              Submit for Verification
            </button>
          </div>
        </form>
      )}

      {/* Verified Observations List */}
      <div className="space-y-4 sm:space-y-6">
        {verifiedRoundups.map((roundup) => (
          <div
            key={roundup.id}
            className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E6DF] dark:border-[#24242A]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-base text-[#121210] dark:text-[#F3F2EE]">
                    {roundup.source_name}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>
                <div className="font-mono text-[11px] text-[#7C7A72] dark:text-[#A09E96] mt-0.5">
                  Checked on {roundup.date_checked} • {roundup.notes}
                </div>
              </div>

              <a
                href={roundup.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#E03137] dark:text-[#FF453A] hover:underline flex items-center gap-1 shrink-0 self-start sm:self-auto"
              >
                <span>Examine Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
              {roundup.results.map((res: { contestant_name: string; percentage: number }, i: number) => (
                <div
                  key={i}
                  className="p-3 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] rounded-xl flex items-center justify-between min-w-0"
                >
                  <span className="text-xs font-serif font-medium text-[#121210] dark:text-[#F3F2EE] truncate">
                    {res.contestant_name}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#E03137] dark:text-[#FF453A] tabular-nums ml-2 shrink-0">
                    {res.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
