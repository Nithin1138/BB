"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { INITIAL_EPISODE, INITIAL_CONTESTANTS } from "@/lib/mock-data";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Radio,
  MessageSquare,
  AlertTriangle,
  ArrowRight
} from "lucide-react";

export default function EpisodeDetailPage() {
  const params = useParams();
  const episodeNumber = params?.episode as string;
  const [isLiveMode, setIsLiveMode] = useState(false);

  const episode = INITIAL_EPISODE;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top back navigation & Live Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          href="/episodes"
          className="text-xs font-mono font-medium text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5] flex items-center gap-1.5 transition-colors self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BROADCAST ARCHIVE</span>
        </Link>

        {/* Live Episode Mode Switch */}
        <button
          onClick={() => setIsLiveMode(!isLiveMode)}
          className={`flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-md border text-xs font-mono transition-all cursor-pointer w-full sm:w-auto active:scale-95 ${
            isLiveMode
              ? "bg-[#FF4500] border-[#FF4500] text-white shadow-xs"
              : "bg-white dark:bg-[#141416] border-[#E4E4E7] dark:border-[#232328] text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#F4F4F5]"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isLiveMode ? "bg-white animate-ping" : "bg-[#71717A]"}`} />
          <span>{isLiveMode ? "SIMULATION: ON-AIR STREAM" : "SIMULATE ON-AIR BROADCAST"}</span>
        </button>
      </div>

      {/* Live Mode Banner if Active */}
      {isLiveMode && (
        <div className="p-4 bg-[#09090B] dark:bg-[#141416] text-[#F4F4F5] rounded-xl border border-[#FF4500]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest bg-[#FF4500] text-white px-2 py-0.5 rounded-sm shrink-0">
              LIVE BROADCAST
            </span>
            <span className="text-xs text-[#F4F4F5]/80">
              Episode {episode.episode_number} is currently on air. Live community reactions and pulse updates streaming.
            </span>
          </div>
          <Link
            href="/discuss"
            className="w-full sm:w-auto text-center px-4 py-2 bg-[#FF4500] hover:bg-[#E03D00] active:scale-95 text-white rounded-md text-xs font-mono font-medium shrink-0 transition-colors"
          >
            Open Live Dispatch Feed
          </Link>
        </div>
      )}

      {/* Episode Header */}
      <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#71717A] dark:text-[#A1A1AA]">
          <span className="font-mono text-[10px] font-bold text-[#FF4500] bg-[#FF4500]/10 px-2 py-0.5 rounded-sm">
            EP · {String(episode.episode_number).padStart(2, "0")}
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px]">
            <Calendar className="w-3.5 h-3.5" />
            <span>{episode.air_date}</span>
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5" />
            <span>{episode.duration}</span>
          </span>
        </div>

        <h1 className="font-serif italic font-normal text-2xl sm:text-4xl text-[#09090B] dark:text-[#F4F4F5]">
          {episode.title}
        </h1>

        <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] leading-relaxed max-w-3xl">
          {episode.summary}
        </p>

        <div className="pt-2 flex flex-wrap gap-1.5 sm:gap-2">
          {episode.highlights.map((h, i) => (
            <span
              key={i}
              className="text-[11px] font-mono text-[#09090B] dark:text-[#F4F4F5] bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] px-2.5 sm:px-3 py-1 rounded-sm"
            >
              • {h}
            </span>
          ))}
        </div>
      </section>

      {/* Chronological Episode Story Timeline */}
      <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF4500] font-bold">
            CHRONOLOGICAL SEQUENCE
          </span>
          <h2 className="font-serif italic font-normal text-xl sm:text-2xl text-[#09090B] dark:text-[#F4F4F5] mt-1">
            Episode {episode.episode_number} Pivotal Chronology
          </h2>
          <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-0.5">
            Click any pivotal event to inspect contestant reactions, community debates, and real-time sentiment shifts.
          </p>
        </div>

        <div className="relative pl-5 sm:pl-8 border-l border-[#E4E4E7] dark:border-[#232328] space-y-6 sm:space-y-8 ml-2 sm:ml-3">
          {episode.events.map((event, idx) => {
            const contestants = INITIAL_CONTESTANTS.filter(c => event.contestant_ids.includes(c.id));

            return (
              <div key={event.id} className="relative group">
                {/* Node icon */}
                <div className="absolute -left-[31px] sm:-left-[41px] top-1 w-5 h-5 rounded-full bg-white dark:bg-[#141416] border border-[#FF4500] flex items-center justify-center font-mono text-[10px] font-bold text-[#FF4500] group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>

                <div className="bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] hover:border-[#09090B]/30 dark:hover:border-[#F4F4F5]/30 rounded-xl p-5 transition-all space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#FF4500]">
                        {event.time_in_episode}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] text-[#71717A] dark:text-[#A1A1AA]">
                        {event.event_type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {contestants.map(c => (
                        <Link
                          key={c.id}
                          href={`/contestants/${c.slug}`}
                          className="flex items-center gap-1.5 text-xs font-mono text-[#09090B] dark:text-[#F4F4F5] bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] px-2.5 py-1 rounded-md hover:border-[#FF4500] transition-colors"
                        >
                          <img src={c.avatar_url} alt="" className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg object-cover border border-[#E4E4E7] dark:border-[#27272A] shrink-0" />
                          <span>{c.name.split(' ')[0]}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-serif font-normal text-base sm:text-lg text-[#09090B] dark:text-[#F4F4F5]">
                    {event.title}
                  </h3>

                  <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
                    {event.description}
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    {event.event_type === "debate" ? (
                      <Link
                        href="/debates/was-sivajis-outburst-justified"
                        className="text-xs font-mono font-medium text-[#FF4500] hover:underline flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Join Today's Debate on this moment</span>
                      </Link>
                    ) : event.event_type === "prediction" ? (
                      <Link
                        href="/predict"
                        className="text-xs font-mono font-medium text-[#F59E0B] hover:underline flex items-center gap-1"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Forecast housemate elimination risk</span>
                      </Link>
                    ) : (
                      <Link
                        href="/discuss"
                        className="text-xs font-mono font-medium text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5] flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Discuss this moment in Community Feed</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
