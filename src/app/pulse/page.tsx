"use client";

import React, { useState } from "react";
import Link from "next/link";
import { calculateContestantPulse } from "@/lib/pulse-calculator";
import { ShieldCheck, Info, Sliders, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function PulseMethodologyPage() {
  const [pollInput, setPollInput] = useState(70);
  const [roundupInput, setRoundupInput] = useState(65);
  const [sentimentInput, setSentimentInput] = useState(80);
  const [engagementInput, setEngagementInput] = useState(75);
  const [trendInput, setTrendInput] = useState(60);

  const { finalPulse, breakdown } = calculateContestantPulse(
    pollInput,
    roundupInput,
    sentimentInput,
    engagementInput,
    trendInput
  );

  return (
    <div className="max-w-[920px] mx-auto space-y-12">
      {/* Top back */}
      <div>
        <Link
          href="/trend"
          className="text-xs font-mono font-medium text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← ATTENTION RADAR</span>
        </Link>
      </div>

      {/* Editorial Header */}
      <div className="pb-8 border-b border-[#E4E4E7] dark:border-[#232328]">
        <span className="text-[10px] font-mono tracking-widest text-[#FF4500] uppercase font-bold">
          TRANSPARENT METHODOLOGY & FORMULA
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-2 leading-[1.15]">
          How BBPulse Pulse <span className="italic font-normal">is Formulated</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] mt-2 max-w-2xl leading-relaxed">
          The BBPulse Pulse is an explainable, deterministic community signal synthesized from five transparent streams without algorithmic manipulation.
        </p>
      </div>

      {/* 5-Signal Formula Breakdown */}
      <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-lg sm:text-xl font-serif font-normal text-[#09090B] dark:text-[#F4F4F5]">
          The 5-Component Mathematical Formula
        </h2>

        <div className="space-y-3">
          <div className="p-4 bg-[#F4F4F5] dark:bg-[#1A1A1E] rounded-md border border-[#E4E4E7] dark:border-[#232328] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#FF4500]">
                  35% WEIGHT
                </span>
                <span className="text-sm font-semibold text-[#09090B] dark:text-[#F4F4F5]">BBPulse Community Poll</span>
              </div>
              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1 leading-relaxed">
                Direct votes cast by authenticated BBPulse fans in the active cycle poll (strictly 1 vote per account).
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] shrink-0">0.35 × Poll Score</div>
          </div>

          <div className="p-4 bg-[#F4F4F5] dark:bg-[#1A1A1E] rounded-md border border-[#E4E4E7] dark:border-[#232328] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#09090B] dark:text-[#F4F4F5]">
                  20% WEIGHT
                </span>
                <span className="text-sm font-semibold text-[#09090B] dark:text-[#F4F4F5]">Verified Public Poll Observations</span>
              </div>
              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1 leading-relaxed">
                Moderator-verified observations from independent public surveys and external fan hubs.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] shrink-0">0.20 × Roundup Score</div>
          </div>

          <div className="p-4 bg-[#F4F4F5] dark:bg-[#1A1A1E] rounded-md border border-[#E4E4E7] dark:border-[#232328] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#10B981]">
                  20% WEIGHT
                </span>
                <span className="text-sm font-semibold text-[#09090B] dark:text-[#F4F4F5]">In-App Discussion Sentiment</span>
              </div>
              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1 leading-relaxed">
                Ratio of positive and supportive arguments vs critical critiques in discussion rooms and debates.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] shrink-0">0.20 × Sentiment Ratio</div>
          </div>

          <div className="p-4 bg-[#F4F4F5] dark:bg-[#1A1A1E] rounded-md border border-[#E4E4E7] dark:border-[#232328] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#F59E0B]">
                  15% WEIGHT
                </span>
                <span className="text-sm font-semibold text-[#09090B] dark:text-[#F4F4F5]">Normalized Engagement</span>
              </div>
              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1 leading-relaxed">
                Daily mention volume, response depth, and comment agreements normalized against total house volume.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] shrink-0">0.15 × Engagement Index</div>
          </div>

          <div className="p-4 bg-[#F4F4F5] dark:bg-[#1A1A1E] rounded-md border border-[#E4E4E7] dark:border-[#232328] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#71717A] dark:text-[#A1A1AA]">
                  10% WEIGHT
                </span>
                <span className="text-sm font-semibold text-[#09090B] dark:text-[#F4F4F5]">Trend Movement</span>
              </div>
              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1 leading-relaxed">
                24-hour rate of attention acceleration or deceleration (momentum delta).
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-[#09090B] dark:text-[#F4F4F5] shrink-0">0.10 × Velocity Delta</div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#FF4500]" />
            <h2 className="text-base sm:text-lg font-serif font-normal text-[#09090B] dark:text-[#F4F4F5]">
              Interactive Formula Simulator
            </h2>
          </div>
          <span className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">DETERMINISTIC TESTER</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono text-[#09090B] dark:text-[#F4F4F5] mb-1">
                <span>Community Poll Score: {pollInput}</span>
                <span className="text-[#71717A] dark:text-[#A1A1AA]">Contrib: {breakdown.pollContribution}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={pollInput}
                onChange={(e) => setPollInput(Number(e.target.value))}
                className="w-full h-1.5 bg-[#E4E4E7] dark:bg-[#27272A] rounded-lg appearance-none cursor-pointer accent-[#FF4500]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-[#09090B] dark:text-[#F4F4F5] mb-1">
                <span>Public Roundup Observation: {roundupInput}</span>
                <span className="text-[#71717A] dark:text-[#A1A1AA]">Contrib: {breakdown.roundupContribution}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={roundupInput}
                onChange={(e) => setRoundupInput(Number(e.target.value))}
                className="w-full h-1.5 bg-[#E4E4E7] dark:bg-[#27272A] rounded-lg appearance-none cursor-pointer accent-[#FF4500]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-[#09090B] dark:text-[#F4F4F5] mb-1">
                <span>Discussion Sentiment: {sentimentInput}</span>
                <span className="text-[#71717A] dark:text-[#A1A1AA]">Contrib: {breakdown.sentimentContribution}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sentimentInput}
                onChange={(e) => setSentimentInput(Number(e.target.value))}
                className="w-full h-1.5 bg-[#E4E4E7] dark:bg-[#27272A] rounded-lg appearance-none cursor-pointer accent-[#FF4500]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-[#09090B] dark:text-[#F4F4F5] mb-1">
                <span>Engagement Index: {engagementInput}</span>
                <span className="text-[#71717A] dark:text-[#A1A1AA]">Contrib: {breakdown.engagementContribution}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={engagementInput}
                onChange={(e) => setEngagementInput(Number(e.target.value))}
                className="w-full h-1.5 bg-[#E4E4E7] dark:bg-[#27272A] rounded-lg appearance-none cursor-pointer accent-[#FF4500]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-[#09090B] dark:text-[#F4F4F5] mb-1">
                <span>Trend Momentum: {trendInput}</span>
                <span className="text-[#71717A] dark:text-[#A1A1AA]">Contrib: {breakdown.trendContribution}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={trendInput}
                onChange={(e) => setTrendInput(Number(e.target.value))}
                className="w-full h-1.5 bg-[#E4E4E7] dark:bg-[#27272A] rounded-lg appearance-none cursor-pointer accent-[#FF4500]"
              />
            </div>
          </div>

          <div className="p-8 bg-[#09090B] dark:bg-[#0C0C0D] text-white rounded-xl border border-[#232328] text-center space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] dark:text-[#A1A1AA]">
              SYNTHESIZED PUBLIC PULSE
            </span>
            <div className="text-6xl font-mono font-bold text-white tracking-tight tabular-nums">
              {finalPulse}
            </div>
            <div className="text-xs text-[#71717A] dark:text-[#A1A1AA] font-mono">
              Computed instantaneously via deterministic math.
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimers & Integrity */}
      <section className="p-5 bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl flex items-start gap-3 text-xs text-[#71717A] dark:text-[#A1A1AA]">
        <Info className="w-4 h-4 text-[#FF4500] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#09090B] dark:text-[#F4F4F5]">Independent Transparency Principle:</strong> BBPulse is an independent fan sentiment platform. Pulse scores and Danger Risk values are mathematical estimates based on community inputs and external surveys, not official television broadcast eviction decisions.
        </p>
      </section>
    </div>
  );
}
