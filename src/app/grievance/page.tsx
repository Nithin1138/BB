import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function GrievancePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link
        href="/"
        className="text-xs font-semibold text-[#7C7A72] hover:text-[#121210] dark:text-[#A09E96] dark:hover:text-[#F3F2EE] flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home Broad-sheet</span>
      </Link>

      <div className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 text-xs text-[#7C7A72] dark:text-[#A09E96] leading-relaxed">
        <div className="border-b border-[#E8E6DF] dark:border-[#24242A] pb-4">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#E03137] dark:text-[#FF453A] bg-[#E03137]/10 px-2 py-0.5 rounded">
            Compliance & Takedowns
          </span>
          <h1 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#121210] dark:text-[#F3F2EE] mt-2">Grievance Redressal</h1>
          <p className="font-mono text-xs text-[#7C7A72] dark:text-[#A09E96] mt-0.5">Content complaints and editorial moderation escalation</p>
        </div>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-sm text-[#121210] dark:text-[#F3F2EE]">1. Reporting Inappropriate Content</h2>
          <p>
            If you encounter any post, comment, or user profile that violates our Community Guidelines, please utilize the built-in "Report" button located in the options menu of each item. Reports are prioritized in our moderator review queue.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-sm text-[#121210] dark:text-[#F3F2EE]">2. Grievance Officer Contact</h2>
          <p>
            For legal notices, copyright inquiries, or privacy grievances that cannot be resolved through the standard in-app reporting flow, you may reach out to our designated compliance channel:
          </p>
          <div className="p-4 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] rounded-xl flex items-center gap-3 font-mono text-xs text-[#121210] dark:text-[#F3F2EE] mt-2">
            <Mail className="w-4 h-4 text-[#E03137] dark:text-[#FF453A]" />
            <span>grievance@bbpulse.app</span>
          </div>
          <p className="font-mono text-[11px] text-[#7C7A72] dark:text-[#A09E96] mt-1">
            Grievances are acknowledged within 24 hours and addressed in accordance with digital media standards.
          </p>
        </section>
      </div>
    </div>
  );
}
