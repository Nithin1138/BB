import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-[800px] mx-auto space-y-8">
      <Link
        href="/"
        className="text-xs font-semibold text-[#626873] hover:text-[#111318] flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-xs space-y-6 text-xs text-[#626873] leading-relaxed">
        <div className="border-b border-[#E5E7EB] pb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded">
            Privacy Policy
          </span>
          <h1 className="text-2xl font-bold text-[#111318] mt-2">Privacy & Data Safeguards</h1>
          <p className="text-xs text-[#8B919B] mt-0.5">Last updated: September 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#111318]">1. Private Email Architecture</h2>
          <p>
            When you sign in with Google, your email address is used solely for authentication and account verification. <strong>Your email address is never displayed publicly</strong>, shared with other users, or sold to third parties. Only your chosen public BBPulse ID (`@username`) is displayed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#111318]">2. Community Voting Integrity & IP Protection</h2>
          <p>
            To prevent vote manipulation and bot activity, we record hashed IP identifiers and session tokens per poll cycle. This data is strictly utilized for vote deduplication and anti-automation audits.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#111318]">3. Account Deletion Rights</h2>
          <p>
            Users maintain full control over their account. You can permanently initiate account deletion via the Settings page at any time, which removes your profile and dissociates past forecast records.
          </p>
        </section>
      </div>
    </div>
  );
}
