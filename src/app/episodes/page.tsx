"use client";

import React from "react";
import Link from "next/link";
import { INITIAL_EPISODE } from "@/lib/mock-data";
import { Calendar, Clock, ArrowRight, Radio } from "lucide-react";

export default function EpisodesPage() {
  const episodes = [
    INITIAL_EPISODE,
    {
      id: "ep_23",
      season_id: "s_telugu_v1",
      episode_number: 23,
      title: "Ration Scarcity & Kitchen Politics",
      air_date: "2026-09-24",
      status: "completed" as const,
      duration: "1h 10m",
      summary: "Tensions flare over luxury food budget allocations and breakfast preparation duties.",
      highlights: ["Kitchen argument between Sandhya and Ajay", "Secret ration hoard discovered in luggage room"],
      events: []
    },
    {
      id: "ep_22",
      season_id: "s_telugu_v1",
      episode_number: 22,
      title: "The Endurance Trial: Stand Your Ground",
      air_date: "2026-09-23",
      status: "completed" as const,
      duration: "1h 18m",
      summary: "Housemates compete in a grueling 6-hour endurance battle balancing clay pots under sun and rain simulator.",
      highlights: ["Rahul and Kalyan last until final bell", "Deepthi negotiates shelter deal"],
      events: []
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="pb-6 border-b border-[#E4E4E7] dark:border-[#232328]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF4500] font-bold">
            CHRONOLOGICAL ARCHIVE
          </span>
          <span className="text-[#A1A1AA] dark:text-[#52525B] text-xs">•</span>
          <span className="font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA]">
            SEASON 10 DASAVATHARAM
          </span>
        </div>
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#09090B] dark:text-[#F4F4F5] mt-2">
          Broadcast Chronology & Storylines
        </h1>
        <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] mt-1 max-w-2xl leading-relaxed">
          Relive key moments from each broadcast. Inspect moment-by-moment chronological events, debate triggers, and community pulse shifts.
        </p>
      </div>

      {/* Episodes List */}
      <div className="space-y-4">
        {episodes.map(ep => (
          <div
            key={ep.id}
            className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] hover:border-[#09090B]/30 dark:hover:border-[#F4F4F5]/30 rounded-xl p-5 sm:p-6 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="space-y-2.5 max-w-2xl min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-[#71717A] dark:text-[#A1A1AA]">
                <span className="font-mono text-[10px] font-bold text-[#FF4500] bg-[#FF4500]/10 px-2 py-0.5 rounded-sm">
                  EP · {String(ep.episode_number).padStart(2, "0")}
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{ep.air_date}</span>
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{ep.duration}</span>
                </span>
              </div>

              <h2 className="font-serif font-normal text-lg sm:text-xl text-[#09090B] dark:text-[#F4F4F5]">
                {ep.title}
              </h2>

              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
                {ep.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                {ep.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] px-2.5 py-0.5 rounded-sm font-mono"
                  >
                    • {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <Link
                href={`/episodes/${ep.episode_number}`}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#09090B] dark:bg-[#F4F4F5] hover:bg-[#FF4500] dark:hover:bg-[#FF4500] active:scale-95 text-white dark:text-[#09090B] dark:hover:text-white rounded-md text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <span>Examine Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
