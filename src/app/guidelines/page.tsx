import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function GuidelinesPage() {
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
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B5CE2] bg-[#5B5CE2]/10 px-2 py-0.5 rounded">
            Community Rules
          </span>
          <h1 className="text-2xl font-bold text-[#111318] mt-2">Community Guidelines</h1>
          <p className="text-xs text-[#8B919B] mt-0.5">Standards for respectful fandom and discussion</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#111318]">1. In-Show Behavior Focus (Mandatory)</h2>
          <p>
            Discussions must focus on contestant gameplay, tasks, nominations, living room debates, and strategic maneuvers inside the house. <strong>Do not discuss, speculate about, or attack contestants' personal lives, families, or external relationships.</strong>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#111318]">2. Zero Tolerance for Hate Speech & Defamation</h2>
          <p>
            Abusive language, casteist, communal, sexist slurs, or coordinated harassment campaigns against any contestant or fellow user will result in immediate content removal and account restriction.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#111318]">3. Agree / Disagree Civility</h2>
          <p>
            Bigg Boss stirs strong emotions. Express support or disagreement through reasoned analysis, memes, or the Agree/Disagree buttons without resorting to personal attacks.
          </p>
        </section>
      </div>
    </div>
  );
}
