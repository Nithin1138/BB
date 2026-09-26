"use client";

import React, { useState } from "react";
import { StorageService } from "@/lib/storage";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert, X, CheckCircle2 } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: "post" | "comment" | "user";
  targetId: string;
  targetAuthor: string;
  contentSnippet: string;
}

const REPORT_REASONS = [
  "Abusive language / harassment",
  "Targeted contestant toxicity",
  "Unverified spoiler / fake leak",
  "Off-topic / spam advertising",
  "Impersonation or bot behavior"
];

export function ReportModal({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetAuthor,
  contentSnippet
}: ReportModalProps) {
  const { user } = useAuth();
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[0]);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    StorageService.submitReport({
      reporter_id: user.id,
      reporter_username: user.username,
      target_type: targetType,
      target_id: targetId,
      target_author: targetAuthor,
      content_snippet: contentSnippet || "",
      reason: selectedReason,
      description: description.trim() || undefined
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setDescription("");
    }, 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-[2px] p-0 sm:p-4 animate-in fade-in duration-150"
    >
      <div className="bg-[#FAF9F6] dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-t-3xl sm:rounded-2xl w-full max-w-[440px] max-h-[92vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative text-[#121210] dark:text-[#F3F2EE] animate-in slide-in-from-bottom duration-200">
        {/* Mobile drag handle */}
        <div className="w-12 h-1.5 bg-[#E8E6DF] dark:bg-[#333338] rounded-full mx-auto mb-3 sm:hidden" />

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-[#7C7A72] hover:text-[#121210] dark:text-[#A09E96] dark:hover:text-[#F3F2EE] p-1.5 rounded-lg hover:bg-[#F0EEE6] dark:hover:bg-[#1A1A1E] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto animate-in zoom-in-75 duration-200" />
            <h3 className="font-serif italic font-bold text-base text-[#121210] dark:text-[#F3F2EE]">Observation Logged for Audit</h3>
            <p className="text-xs text-[#7C7A72] dark:text-[#A09E96]">
              Our editorial moderation team reviews flagged entries against BBPulse Community Standards.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-5 h-5 text-[#E03137] dark:text-[#FF453A]" />
              <h2 id="report-modal-title" className="font-serif italic font-bold text-base text-[#121210] dark:text-[#F3F2EE]">
                Report {targetType === "post" ? "Post" : targetType === "comment" ? "Comment" : "User"}
              </h2>
            </div>

            <div className="p-2.5 bg-white dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] rounded-xl mb-4 text-xs text-[#7C7A72] dark:text-[#A09E96]">
              <span className="font-mono font-semibold text-[#121210] dark:text-[#F3F2EE]">@{targetAuthor}: </span>
              <span className="italic line-clamp-2">"{contentSnippet}"</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#121210] dark:text-[#F3F2EE] mb-1.5 font-mono">
                  Violation Category
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {REPORT_REASONS.map(reason => (
                    <label
                      key={reason}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                        selectedReason === reason
                          ? "border-[#E03137] bg-[#E03137]/10 text-[#E03137] dark:text-[#FF453A] font-semibold"
                          : "border-[#E8E6DF] dark:border-[#24242A] bg-white dark:bg-[#1A1A1E] text-[#121210] dark:text-[#F3F2EE] hover:bg-[#FAF9F6] dark:hover:bg-[#151518]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="report_reason"
                        value={reason}
                        checked={selectedReason === reason}
                        onChange={() => setSelectedReason(reason)}
                        className="accent-[#E03137]"
                      />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#121210] dark:text-[#F3F2EE] mb-1 font-mono">
                  Contextual Evidence (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide timestamp or context on why this violates in-show deliberation standards..."
                  rows={2}
                  className="w-full p-2.5 bg-white dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] focus:border-[#E03137] rounded-xl text-xs outline-hidden text-[#121210] dark:text-[#F3F2EE]"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-3 text-xs text-[#7C7A72] dark:text-[#A09E96] hover:text-[#121210] dark:hover:text-[#F3F2EE] rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-[#E03137] hover:bg-[#C92A30] active:scale-95 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Submit Flag
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
