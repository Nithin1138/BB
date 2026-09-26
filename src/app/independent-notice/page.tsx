import React from "react";
import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";

export default function IndependentNoticePage() {
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
            Editorial Integrity Notice
          </span>
          <h1 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#121210] dark:text-[#F3F2EE] mt-2">
            Independent Platform Notice
          </h1>
          <p className="font-mono text-xs text-[#7C7A72] dark:text-[#A09E96] mt-0.5">Non-affiliation & editorial autonomy declaration</p>
        </div>

        <section className="space-y-4">
          <div className="p-4 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-[#E03137] dark:text-[#FF453A] shrink-0 mt-0.5" />
            <p className="text-xs text-[#121210] dark:text-[#F3F2EE] font-medium leading-relaxed font-serif">
              <strong>BBPulse is an independent fan community and public opinion intelligence journal.</strong>
            </p>
          </div>

          <p>
            BBPulse is NOT affiliated with, associated with, authorized by, sponsored by, or endorsed by Star Maa, Disney+ Hotstar, Endemol Shine India, Banijay Asia, or any official corporate entity holding ownership of the Bigg Boss trademark, format, or broadcast rights.
          </p>

          <p>
            The names “Bigg Boss”, “Bigg Boss Telugu”, and associated show trademarks are the intellectual property of their respective trademark holders. Their use on this website falls under nominative fair use for identification, fan commentary, critique, and community discourse.
          </p>

          <p>
            All community polls, BBPulse Risk Scores, and Public Pulse calculations published on this website are unofficial community metrics. They do not constitute official audience voting data and have no impact on television broadcast eliminations.
          </p>
        </section>
      </div>
    </div>
  );
}
