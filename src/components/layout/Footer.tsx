import React from "react";
import Link from "next/link";
import { ShieldCheck, Info } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 sm:mt-20 border-t border-[#E4E4E7] dark:border-[#232328] bg-white dark:bg-[#0C0C0D] pt-10 pb-28 md:py-12 text-xs text-[#71717A] transition-colors duration-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#E4E4E7] dark:border-[#232328]">
          {/* Column 1: Brand & Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#09090B] dark:bg-[#F4F4F5] flex items-center justify-center text-white dark:text-[#09090B] shadow-xs shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="2.5" fill="#FF4500" stroke="none" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-sm text-[#09090B] dark:text-[#F4F4F5] tracking-tight font-sans">BBPULSE</span>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-[#71717A]">
                  TELUGU EDITORIAL OBSERVATORY
                </span>
              </div>
            </div>
            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed max-w-md">
              An independent community intelligence and deliberation journal for Bigg Boss Telugu.
              Track daily community sentiment, participate in tamper-evident ballots, inspect structured debates, and forecast season outcomes.
            </p>
            <div className="pt-1 flex items-center gap-2 font-mono text-[10px] text-[#71717A]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span>Independent Fan Broadsheet • Strict 18+ Participation Standards</span>
            </div>
          </div>

          {/* Column 2: Core Pillars */}
          <div>
            <div className="font-mono font-semibold text-[#09090B] dark:text-[#F4F4F5] uppercase tracking-widest text-[10px] mb-3">
              Observatory
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#09090B] dark:hover:text-[#F4F4F5] transition-colors">
                  Front Page Dispatch
                </Link>
              </li>
              <li>
                <Link href="/vote" className="hover:text-[#09090B] dark:hover:text-[#F4F4F5] transition-colors">
                  Community Ballots
                </Link>
              </li>
              <li>
                <Link href="/discuss" className="hover:text-[#09090B] dark:hover:text-[#F4F4F5] transition-colors">
                  Deliberation Forum
                </Link>
              </li>
              <li>
                <Link href="/trend" className="hover:text-[#09090B] dark:hover:text-[#F4F4F5] transition-colors">
                  Sentiment Shifts & Radar
                </Link>
              </li>
              <li>
                <Link href="/predict" className="hover:text-[#09090B] dark:hover:text-[#F4F4F5] transition-colors">
                  Forecaster Accuracy Index
                </Link>
              </li>
              <li>
                <Link href="/roundup" className="hover:text-[#09090B] dark:hover:text-[#F4F4F5] transition-colors">
                  External Media Surveys
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust, Methodology & Legal */}
          <div>
            <div className="font-mono font-semibold text-[#09090B] dark:text-[#F4F4F5] uppercase tracking-widest text-[10px] mb-3">
              Integrity & Standards
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/pulse" className="hover:text-[#09090B] dark:hover:text-[#F4F4F5] transition-colors font-medium text-[#FF4500]">
                  How Pulse is Formulated
                </Link>
              </li>
              <li>
                <Link href="/independent-notice" className="hover:text-[#09090B] dark:hover:text-[#F4F4F5] transition-colors">
                  Independent Platform Notice
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-[#09090B] dark:hover:text-[#F4F4F5] transition-colors">
                  Community Standards
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#09090B] dark:hover:text-[#F4F4F5] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#09090B] dark:hover:text-[#F4F4F5] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/grievance" className="hover:text-[#09090B] dark:hover:text-[#F4F4F5] transition-colors">
                  Grievance Redressal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#09090B] dark:hover:text-[#F4F4F5] transition-colors text-[#71717A]">
                  Editorial Moderation Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Independent Platform Disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-[#71717A]">
          <div className="flex items-start gap-2 max-w-3xl leading-relaxed">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#09090B] dark:text-[#F4F4F5]">Independent Editorial Notice:</strong> BBPulse is an independent fan publication and opinion aggregator.
              BBPulse is NOT affiliated with, authorized, endorsed, or officially sponsored by Star Maa, Disney+ Hotstar, Endemol Shine India,
              Banijay Group, or the official Bigg Boss television franchise. All community poll results, Risk Scores, and Public Pulse metrics
              are unofficial community estimates and do not represent official television voting records or guaranteed outcomes.
            </p>
          </div>
          <div className="whitespace-nowrap font-mono text-[10px]">
            © {new Date().getFullYear()} BBPulse Telugu. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
