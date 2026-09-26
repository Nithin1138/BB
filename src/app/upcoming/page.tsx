"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UpcomingEvent } from "@/types";
import {
  Calendar,
  Clock,
  Radio,
  Tv,
  AlertTriangle,
  Award,
  ArrowRight,
  ShieldAlert,
  Database,
  CheckCircle2
} from "lucide-react";

export default function UpcomingPage() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    async function loadUpcoming() {
      try {
        const res = await fetch("/api/upcoming");
        const data = await res.json();
        if (data.events) {
          setEvents(data.events);
        }
      } catch (err) {
        console.error("Failed to load upcoming events:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadUpcoming();
  }, []);

  const filteredEvents = events.filter(e => {
    if (filter === "all") return true;
    return e.event_type === filter;
  });

  return (
    <div className="max-w-[1020px] mx-auto space-y-10">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E4E4E7] dark:border-[#232328]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#FF4500] uppercase font-bold">
              SEASON 10 DASAVATHARAM • UPCOMING DETAILS & SCHEDULE
            </span>
            <span className="text-xs text-[#71717A] dark:text-[#A1A1AA]">•</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
              NEON DB SYNCED
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-2 leading-[1.15]">
            Broadcast Chronology & <span className="italic">Upcoming Events</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] mt-2 max-w-xl leading-relaxed">
            Verified broadcast schedules, Nagarjuna's Sunday eviction reveals, captaincy task battles, and mid-week nomination ceremonies.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-md p-1 text-xs">
          {(["all", "eviction", "captaincy_task", "nomination_cycle", "special_task"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                filter === tab
                  ? "bg-[#09090B] text-white dark:bg-[#F4F4F5] dark:text-[#09090B] font-semibold shadow-xs"
                  : "text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#F4F4F5]"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Events Timeline List */}
      <div className="space-y-5">
        {filteredEvents.map(evt => {
          const isCritical = evt.importance === "critical";
          const isHigh = evt.importance === "high";

          return (
            <div
              key={evt.id}
              className={`bg-white dark:bg-[#141416] border rounded-xl p-5 sm:p-6 shadow-xs transition-all ${
                isCritical
                  ? "border-[#FF4500]/50 dark:border-[#FF4500]/40 bg-gradient-to-r from-[#FF4500]/5 via-transparent to-transparent"
                  : "border-[#E4E4E7] dark:border-[#232328]"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                      isCritical
                        ? "bg-[#FF4500]/20 text-[#FF4500]"
                        : isHigh
                        ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                        : "bg-[#F4F4F5] dark:bg-[#1A1A1E] text-[#71717A] dark:text-[#A1A1AA]"
                    }`}>
                      {evt.event_type.replace("_", " ")}
                    </span>

                    <span className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(evt.scheduled_time).toLocaleString("en-IN", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>

                    <span className="text-xs text-[#71717A]">•</span>
                    <span className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
                      {evt.venue_or_broadcast}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#09090B] dark:text-[#F4F4F5]">
                    {evt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] leading-relaxed max-w-2xl">
                    {evt.description}
                  </p>
                </div>

                {evt.action_url && (
                  <Link
                    href={evt.action_url}
                    className="self-start sm:self-center px-4 py-2 bg-[#09090B] dark:bg-[#F4F4F5] hover:bg-[#FF4500] dark:hover:bg-[#FF4500] text-white dark:text-[#09090B] dark:hover:text-white rounded-md text-xs font-mono font-medium transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <span>View Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
