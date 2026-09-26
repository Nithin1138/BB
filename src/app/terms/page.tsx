import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
            Legal Terms & Covenant
          </span>
          <h1 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#121210] dark:text-[#F3F2EE] mt-2">Terms of Service</h1>
          <p className="font-mono text-xs text-[#7C7A72] dark:text-[#A09E96] mt-0.5">Last codified: September 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-sm text-[#121210] dark:text-[#F3F2EE]">1. Nature of the Platform</h2>
          <p>
            BBPulse is an independent fan intelligence and deliberation journal operated solely for entertainment, community discourse, and fan engagement surrounding Bigg Boss Telugu. BBPulse is NOT affiliated with, sponsored by, or endorsed by Star Maa, Disney+ Hotstar, Endemol Shine India, or Banijay Group.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-sm text-[#121210] dark:text-[#F3F2EE]">2. Eligibility & 18+ Age Policy</h2>
          <p>
            Account creation and interactive participation (ballot casting, deliberation, forecasting, and reporting) are strictly limited to individuals who are 18 years of age or older. By confirming your age during onboarding, you represent that you meet this requirement.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-sm text-[#121210] dark:text-[#F3F2EE]">3. Unofficial Community Polling & Calculations</h2>
          <p>
            All community polls, BBPulse Risk Scores, and Public Pulse metrics published on BBPulse are unofficial estimates derived from fan activity and transparent rule-based metrics. They do not constitute official broadcast voting data and do not influence television elimination decisions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-sm text-[#121210] dark:text-[#F3F2EE]">4. User-Generated Content & Moderation</h2>
          <p>
            Users retain ownership of their submitted opinions, comments, and memes. By posting, you grant BBPulse a non-exclusive license to host, format, and display your content, including generating social share cards. Community moderators reserve the right to remove content violating in-show discussion boundaries.
          </p>
        </section>
      </div>
    </div>
  );
}
