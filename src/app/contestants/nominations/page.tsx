"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  INITIAL_CONTESTANTS,
  BB10_SPECIAL_POWERS,
  BB10_NOMINATION_WEEKS
} from "@/lib/mock-data";
import {
  ShieldAlert,
  Zap,
  UserX,
  Radio,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  Award,
  DollarSign,
  ArrowLeft
} from "lucide-react";

export default function NominationsLedgerPage() {
  const latestWeekNumber = Math.max(...BB10_NOMINATION_WEEKS.map(w => w.week));
  const [selectedWeek, setSelectedWeek] = useState<number>(latestWeekNumber);
  const [selectedContestantId, setSelectedContestantId] = useState<string>("c_thrigun");

  const activeWeekData = BB10_NOMINATION_WEEKS.find(w => w.week === selectedWeek) || BB10_NOMINATION_WEEKS[BB10_NOMINATION_WEEKS.length - 1];
  const inspectedContestant = INITIAL_CONTESTANTS.find(c => c.id === selectedContestantId) || INITIAL_CONTESTANTS[0];

  return (
    <div className="space-y-10">
      {/* Top Breadcrumb & Header */}
      <div>
        <Link
          href="/contestants"
          className="text-xs font-mono font-medium text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5] flex items-center gap-1.5 transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← ROSTER DIRECTORY</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E4E4E7] dark:border-[#232328]">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#FF4500] uppercase font-bold">
              BIGG BOSS 10 • DASAVATHARAM ARCHIVES
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-2 leading-[1.15]">
              Nominations &amp; <span className="italic font-normal">Evictions Ledger</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] mt-2 max-w-2xl leading-relaxed">
              Complete scraped and verified records from Season 10 Wikipedia: week-by-week vote matrices,
              who nominated whom, eliminated housemates timeline, and the 10 Special Powers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/vote"
              className="px-4 py-2 bg-[#FF4500] hover:bg-[#E03D00] text-white rounded-md text-xs font-mono font-medium flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Cast Live Ballot</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Section 1: Previous Weeks Eliminated & Exited Members */}
      <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-4 sm:p-6 lg:p-8 shadow-xs space-y-6 max-w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E4E4E7] dark:border-[#232328]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4500] font-bold">
              ELIMINATION CHRONOLOGY
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-1">
              Previous Weeks Eliminated &amp; Exited Members
            </h2>
          </div>
          <span className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
            4 Official Departures / Twists
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {/* Charan Mahadev - Evicted Day 4 / Re-entered Day 11 */}
          <div className="border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-4 bg-[#F4F4F5]/60 dark:bg-[#1A1A1E]/60 flex flex-col justify-between space-y-3 shadow-2xs h-full">
            <div className="space-y-3">
              <div className="flex items-center gap-3.5">
                <img
                  src="https://b374dd683233.blob.upstash.io/CHARAN.jpg"
                  alt="Charan Mahadev"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#E4E4E7] dark:border-[#27272A] shadow-xs shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-sm font-serif font-semibold text-[#09090B] dark:text-[#F4F4F5] truncate">
                    Charan Mahadev
                  </div>
                  <div className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] truncate">
                    Radio Jockey (Commoner)
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#71717A] dark:text-[#A1A1AA]">Status:</span>
                  <span className="text-[#10B981] font-bold">Re-entered Day 11</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#71717A] dark:text-[#A1A1AA]">Exit 1:</span>
                  <span className="text-[#FF4500] font-semibold">Evicted Day 4 (9-4)</span>
                </div>
              </div>

              <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] leading-relaxed pt-2 border-t border-[#E4E4E7] dark:border-[#232328]">
                Evicted in surprise mid-week house vote by 9 housemates. Brought back on Day 11 by overwhelming public vote in Power of People twist.
              </p>
            </div>

            <Link
              href="/contestants/charan-mahadev"
              className="text-[11px] font-mono text-[#FF4500] hover:underline flex items-center gap-1 pt-2 border-t border-[#E4E4E7]/60 dark:border-[#232328]/60"
            >
              <span>View Dossier</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Chaitra Rai - Evicted Day 5 */}
          <div className="border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-4 bg-[#F4F4F5]/60 dark:bg-[#1A1A1E]/60 flex flex-col justify-between space-y-3 shadow-2xs h-full">
            <div className="space-y-3">
              <div className="flex items-center gap-3.5">
                <img
                  src="https://b374dd683233.blob.upstash.io/CHAITRA%20RAI.jpg"
                  alt="Chaitra Rai"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#E4E4E7] dark:border-[#27272A] grayscale shadow-xs shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-sm font-serif font-semibold text-[#09090B] dark:text-[#F4F4F5] truncate">
                    Chaitra Rai
                  </div>
                  <div className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] truncate">
                    Television Actress
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#71717A] dark:text-[#A1A1AA]">Status:</span>
                  <span className="text-[#FF4500] font-bold">Evicted Day 5</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#71717A] dark:text-[#A1A1AA]">Vote Count:</span>
                  <span className="font-semibold text-[#09090B] dark:text-[#F4F4F5]">3 votes against (3-1)</span>
                </div>
              </div>

              <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] leading-relaxed pt-2 border-t border-[#E4E4E7] dark:border-[#232328]">
                Faced surprise 4-way internal vote on Day 5 alongside Aman, Sudheer, and Varshini. Voted out with 3 votes against her.
              </p>
            </div>

            <Link
              href="/contestants/chaitra-rai"
              className="text-[11px] font-mono text-[#FF4500] hover:underline flex items-center gap-1 pt-2 border-t border-[#E4E4E7]/60 dark:border-[#232328]/60"
            >
              <span>View Dossier</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Krishnudu - Evicted Day 14 */}
          <div className="border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-4 bg-[#F4F4F5]/60 dark:bg-[#1A1A1E]/60 flex flex-col justify-between space-y-3 shadow-2xs h-full">
            <div className="space-y-3">
              <div className="flex items-center gap-3.5">
                <img
                  src="https://b374dd683233.blob.upstash.io/KRISHNUDU.jpg"
                  alt="Krishnudu"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#E4E4E7] dark:border-[#27272A] grayscale shadow-xs shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-sm font-serif font-semibold text-[#09090B] dark:text-[#F4F4F5] truncate">
                    Krishnudu
                  </div>
                  <div className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] truncate">
                    Film Actor
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#71717A] dark:text-[#A1A1AA]">Status:</span>
                  <span className="text-[#FF4500] font-bold">Evicted Day 14</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#71717A] dark:text-[#A1A1AA]">Lost Power:</span>
                  <span className="font-semibold text-[#71717A] dark:text-[#A1A1AA]">Switch (Unused)</span>
                </div>
              </div>

              <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] leading-relaxed pt-2 border-t border-[#E4E4E7] dark:border-[#232328]">
                Lost axe sprint to Debjani in Week 2 and faced an 11-way public vote. Received the fewest public votes on Day 14.
              </p>
            </div>

            <Link
              href="/contestants/krishnudu"
              className="text-[11px] font-mono text-[#FF4500] hover:underline flex items-center gap-1 pt-2 border-t border-[#E4E4E7]/60 dark:border-[#232328]/60"
            >
              <span>View Dossier</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Mithilesh Reddy - Walked Day 20 with ₹15 Lakhs */}
          <div className="border border-[#FF4500]/30 dark:border-[#FF4500]/40 rounded-xl p-4 bg-[#FF4500]/5 dark:bg-[#FF4500]/10 flex flex-col justify-between space-y-3 shadow-2xs h-full">
            <div className="space-y-3">
              <div className="flex items-center gap-3.5">
                <img
                  src="https://b374dd683233.blob.upstash.io/MYDHILI.jpg"
                  alt="Mithilesh Reddy"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#FF4500]/50 shadow-xs shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-sm font-serif font-semibold text-[#09090B] dark:text-[#F4F4F5] truncate">
                    Mithilesh Reddy
                  </div>
                  <div className="text-[11px] font-mono text-[#FF4500] font-semibold truncate">
                    Wildcard (Day 19)
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#71717A] dark:text-[#A1A1AA]">Status:</span>
                  <span className="text-[#FF4500] font-bold flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    <span>Walked Day 20</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#71717A] dark:text-[#A1A1AA]">Bounty:</span>
                  <span className="font-bold text-[#09090B] dark:text-[#F4F4F5]">₹15 Lakhs Cash</span>
                </div>
              </div>

              <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] leading-relaxed pt-2 border-t border-[#E4E4E7] dark:border-[#232328]">
                Won the Day 19 tiebreaker task against Ramakrishna to enter the house, then accepted the ₹15L briefcase temptation on Day 20 and walked out!
              </p>
            </div>

            <Link
              href="/contestants/mithilesh-reddy"
              className="text-[11px] font-mono text-[#FF4500] hover:underline flex items-center gap-1 pt-2 border-t border-[#FF4500]/20"
            >
              <span>View Dossier</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Week-by-Week Nominations & "Nominated By" Breakdown */}
      <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-4 sm:p-6 lg:p-8 shadow-xs space-y-6 max-w-full overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E4E4E7] dark:border-[#232328]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4500] font-bold">
              NOMINATIONS MATRIX
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-1">
              Who Nominated Whom: Week {activeWeekData.week} ({activeWeekData.theme})
            </h2>
          </div>

          {/* Week Selector Tabs */}
          <div className="flex items-center gap-1 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-md p-1 font-mono text-xs overflow-x-auto no-scrollbar max-w-full">
            {BB10_NOMINATION_WEEKS.map(nw => (
              <button
                key={nw.week}
                onClick={() => setSelectedWeek(nw.week)}
                className={`px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer shrink-0 ${
                  selectedWeek === nw.week
                    ? "bg-[#09090B] text-white dark:bg-[#F4F4F5] dark:text-[#09090B] shadow-2xs"
                    : "text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#F4F4F5]"
                }`}
              >
                Week {nw.week}
              </button>
            ))}
          </div>
        </div>

        {/* Week Summary Banner */}
        <div className="p-4 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div>
            <span className="text-[#71717A] dark:text-[#A1A1AA] text-[10px] uppercase tracking-wider block">
              Weekly Theme
            </span>
            <span className="font-bold text-[#09090B] dark:text-[#F4F4F5] mt-0.5 block">
              {activeWeekData.theme}
            </span>
          </div>
          <div>
            <span className="text-[#71717A] dark:text-[#A1A1AA] text-[10px] uppercase tracking-wider block">
              House Captain
            </span>
            <span className="font-bold text-[#FF4500] mt-0.5 block">
              {activeWeekData.captain}
            </span>
          </div>
          <div>
            <span className="text-[#71717A] dark:text-[#A1A1AA] text-[10px] uppercase tracking-wider block">
              Nominees Against Public Vote
            </span>
            <span className="font-bold text-[#09090B] dark:text-[#F4F4F5] mt-0.5 block">
              {activeWeekData.public_vote_nominees.length} Contestants
            </span>
          </div>
        </div>

        {/* Detailed Week Notes & Twist Rules */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#71717A] dark:text-[#A1A1AA] font-bold">
            KEY RULES &amp; TWISTS IN WEEK {activeWeekData.week}
          </div>
          <ul className="space-y-1.5 text-xs text-[#71717A] dark:text-[#A1A1AA] list-disc list-inside">
            {activeWeekData.notes.map((n, i) => (
              <li key={i} className="leading-relaxed">
                {n}
              </li>
            ))}
          </ul>
        </div>

        {/* Contestants Table for this Week */}
        <div className="border border-[#E4E4E7] dark:border-[#232328] rounded-lg overflow-x-auto w-full max-w-full">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#F4F4F5] dark:bg-[#1A1A1E] border-b border-[#E4E4E7] dark:border-[#232328] text-[#71717A] dark:text-[#A1A1AA] text-[10px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Housemate</th>
                <th className="py-3 px-4">Status This Week</th>
                <th className="py-3 px-4">Nominations Cast (Who They Nominated)</th>
                <th className="py-3 px-4">Nominated By (Who Voted Against Them)</th>
                <th className="py-3 px-4 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7] dark:divide-[#232328]">
              {INITIAL_CONTESTANTS.map(c => {
                const givenForWeek = c.nominations_given?.find(ng => ng.week === activeWeekData.week);
                const receivedForWeek = c.nominated_by?.find(nb => nb.week === activeWeekData.week);

                // Week-specific status calculation
                const isCaptainThisWeek =
                  activeWeekData.captain.toLowerCase().includes(c.name.toLowerCase()) ||
                  (activeWeekData.week === 4 && (c.slug === "apoorva" || c.name.toLowerCase().includes("apoorva"))) ||
                  (activeWeekData.week === 3 && c.slug === "nihar-mukesh-gowda") ||
                  (activeWeekData.week === 2 && c.slug === "jhansi");

                const isNominatedThisWeek = activeWeekData.public_vote_nominees.some(name => {
                  const cleanNom = name.toLowerCase();
                  const cleanC = c.name.toLowerCase();
                  return cleanNom.includes(cleanC) || cleanC.includes(cleanNom);
                });

                const isEvictedThisWeek =
                  (c.id === "c_chaitra" && activeWeekData.week >= 1) ||
                  (c.id === "c_krishnudu" && activeWeekData.week >= 2) ||
                  (c.id === "c_charan" && activeWeekData.week === 1);

                const isWalkedThisWeek = (c.id === "c_mithilesh" && activeWeekData.week >= 3);
                const isNotInHouseThisWeek =
                  (c.id === "c_apoorva" && activeWeekData.week < 3) ||
                  (c.id === "c_mithilesh" && activeWeekData.week < 3);

                return (
                  <tr
                    key={c.id}
                    className="hover:bg-[#F4F4F5]/50 dark:hover:bg-[#1A1A1E]/50 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-sans font-semibold text-[#09090B] dark:text-[#F4F4F5] whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar_url}
                          alt={c.name}
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border-2 border-[#E4E4E7] dark:border-[#27272A] shadow-2xs shrink-0"
                        />
                        <span className="text-sm font-serif font-bold">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {isCaptainThisWeek ? (
                        <span className="px-2 py-0.5 bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30 rounded-xs text-[10px] font-bold">
                          Captain
                        </span>
                      ) : isNominatedThisWeek ? (
                        <span className="px-2 py-0.5 bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/30 rounded-xs text-[10px] font-bold">
                          Nominated
                        </span>
                      ) : isWalkedThisWeek ? (
                        <span className="px-2 py-0.5 bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/30 rounded-xs text-[10px]">
                          Walked
                        </span>
                      ) : isEvictedThisWeek ? (
                        <span className="px-2 py-0.5 bg-[#71717A]/10 text-[#71717A] border border-[#71717A]/30 rounded-xs text-[10px]">
                          Evicted
                        </span>
                      ) : isNotInHouseThisWeek ? (
                        <span className="px-2 py-0.5 bg-[#71717A]/10 text-[#71717A] border border-[#71717A]/30 rounded-xs text-[10px]">
                          Not in House
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 rounded-xs text-[10px]">
                          Safe
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[#71717A] dark:text-[#A1A1AA] max-w-xs">
                      {givenForWeek ? (
                        <div>
                          <span className="text-[#09090B] dark:text-[#F4F4F5] font-semibold">
                            {givenForWeek.targets.join(", ") || "None"}
                          </span>
                          {givenForWeek.note && (
                            <div className="text-[10px] text-[#A1A1AA] mt-0.5 italic">
                              {givenForWeek.note}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-[#A1A1AA]">Not eligible / No vote cast</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[#71717A] dark:text-[#A1A1AA] max-w-xs">
                      {receivedForWeek ? (
                        <div>
                          <span className="text-[#FF4500] font-semibold">
                            {receivedForWeek.nominators.join(", ")}
                          </span>
                          {receivedForWeek.note && (
                            <div className="text-[10px] text-[#A1A1AA] mt-0.5 italic">
                              {receivedForWeek.note}
                            </div>
                          )}
                        </div>
                      ) : isNominatedThisWeek ? (
                        <span className="text-[#FF4500]">Against Public Vote</span>
                      ) : (
                        <span className="text-[#10B981]">0 votes received</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Link
                        href={`/contestants/${c.slug}`}
                        className="text-[#FF4500] hover:underline text-[11px] font-semibold"
                      >
                        Profile →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: The 10 Special Powers Grid */}
      <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-4 sm:p-6 lg:p-8 shadow-xs space-y-6 max-w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E4E4E7] dark:border-[#232328]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4500] font-bold">
              GAME MODIFIERS
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-1">
              The 10 Special Powers (Dasavatharam)
            </h2>
          </div>
          <span className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
            Revealed on Launch Day
          </span>
        </div>

        <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
          On Day 1, housemates competed in groups of 4 to win a Power Key. Strict house rules prohibit disclosing or discussing powers.
          Revealing a power results in immediate revocation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {BB10_SPECIAL_POWERS.map((sp, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#F4F4F5]/60 dark:bg-[#1A1A1E]/60 border border-[#E4E4E7] dark:border-[#232328] rounded-lg flex flex-col justify-between space-y-3 h-full"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="text-sm font-serif font-bold text-[#09090B] dark:text-[#F4F4F5]">
                        {sp.power}
                      </span>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-xs font-semibold bg-[#E4E4E7] dark:bg-[#232328] text-[#71717A] dark:text-[#A1A1AA]">
                        {sp.category}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[#FF4500] truncate">
                      Holder: <Link href={`/contestants/${sp.holder_slug}`} className="hover:underline font-bold">{sp.holder}</Link>
                    </div>
                  </div>
                  <Zap className="w-4 h-4 text-[#FF4500] shrink-0" />
                </div>

                <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
                  {sp.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#E4E4E7] dark:border-[#232328] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#71717A] dark:text-[#A1A1AA]">Status:</span>
                <span className="font-semibold text-[#09090B] dark:text-[#F4F4F5] truncate max-w-[200px] sm:max-w-[240px]">
                  {sp.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Individual Contestant Nomination Inspector */}
      <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-4 sm:p-6 lg:p-8 shadow-xs space-y-6 max-w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E4E4E7] dark:border-[#232328]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4500] font-bold">
              HOUSEMATE DEEP-DIVE
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-1">
              Contestant Nomination &amp; Vote Inspector
            </h2>
          </div>

          <div className="w-full sm:w-64">
            <select
              value={selectedContestantId}
              onChange={(e) => setSelectedContestantId(e.target.value)}
              className="w-full text-xs font-mono py-2 px-3 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-md text-[#09090B] dark:text-[#F4F4F5] outline-hidden cursor-pointer"
            >
              {INITIAL_CONTESTANTS.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.status})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Contestant Dossier Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4 p-5 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-lg space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={inspectedContestant.avatar_url}
                alt={inspectedContestant.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#E4E4E7] dark:border-[#27272A] shadow-md shrink-0"
              />
              <div className="min-w-0">
                <h3 className="text-lg font-serif font-bold text-[#09090B] dark:text-[#F4F4F5] truncate">
                  {inspectedContestant.name}
                </h3>
                {inspectedContestant.telugu_name && (
                  <div className="text-xs text-[#71717A] dark:text-[#A1A1AA] italic">
                    {inspectedContestant.telugu_name}
                  </div>
                )}
                <div className="text-[10px] font-mono text-[#FF4500] uppercase font-semibold mt-0.5">
                  {inspectedContestant.profession}
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono pt-3 border-t border-[#E4E4E7] dark:border-[#232328]">
              <div className="flex items-center justify-between">
                <span className="text-[#71717A] dark:text-[#A1A1AA]">Status:</span>
                <span className="font-bold uppercase text-[#09090B] dark:text-[#F4F4F5]">
                  {inspectedContestant.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#71717A] dark:text-[#A1A1AA]">Times Nominated:</span>
                <span className="font-bold text-[#FF4500]">
                  {inspectedContestant.nomination_count} Weeks
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#71717A] dark:text-[#A1A1AA]">Days in House:</span>
                <span className="font-bold text-[#09090B] dark:text-[#F4F4F5]">
                  {inspectedContestant.days_in_house} Days
                </span>
              </div>
              {inspectedContestant.special_power && (
                <div className="pt-2 border-t border-[#E4E4E7] dark:border-[#232328]">
                  <span className="text-[#71717A] dark:text-[#A1A1AA] block text-[10px] uppercase">Special Power:</span>
                  <span className="font-bold text-[#FF4500] text-xs">
                    {inspectedContestant.special_power.name}
                  </span>
                  <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] mt-0.5">
                    {inspectedContestant.special_power.description}
                  </p>
                </div>
              )}
            </div>

            <Link
              href={`/contestants/${inspectedContestant.slug}`}
              className="w-full py-2 bg-[#09090B] dark:bg-[#F4F4F5] hover:bg-[#FF4500] dark:hover:bg-[#FF4500] text-white dark:text-[#09090B] dark:hover:text-white rounded-md text-xs font-mono font-medium flex items-center justify-center transition-all"
            >
              Full Profile Dossier →
            </Link>
          </div>

          {/* Timeline of nominations given & received */}
          <div className="md:col-span-8 space-y-5">
            <div>
              <h4 className="text-sm font-serif font-bold text-[#09090B] dark:text-[#F4F4F5] mb-2 flex items-center gap-2">
                <span>Who Nominated {inspectedContestant.name} ("Nominated By")</span>
              </h4>
              <div className="space-y-2">
                {inspectedContestant.nominated_by && inspectedContestant.nominated_by.length > 0 ? (
                  inspectedContestant.nominated_by.map((nb, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#F4F4F5]/60 dark:bg-[#1A1A1E]/60 border border-[#E4E4E7] dark:border-[#232328] rounded-md font-mono text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#09090B] dark:text-[#F4F4F5]">Week {nb.week}</span>
                        <span className="text-[#FF4500] font-semibold">{nb.nominators.join(", ")}</span>
                      </div>
                      {nb.note && (
                        <div className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] italic">
                          {nb.note}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA] p-3 border border-[#E4E4E7] dark:border-[#232328] rounded-md">
                    No direct negative votes registered against this contestant.
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-serif font-bold text-[#09090B] dark:text-[#F4F4F5] mb-2 flex items-center gap-2">
                <span>Who {inspectedContestant.name} Nominated ("Nominations Cast")</span>
              </h4>
              <div className="space-y-2">
                {inspectedContestant.nominations_given && inspectedContestant.nominations_given.length > 0 ? (
                  inspectedContestant.nominations_given.map((ng, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#F4F4F5]/60 dark:bg-[#1A1A1E]/60 border border-[#E4E4E7] dark:border-[#232328] rounded-md font-mono text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#09090B] dark:text-[#F4F4F5]">Week {ng.week}</span>
                        <span className="text-[#09090B] dark:text-[#F4F4F5] font-semibold">
                          Targeted: {ng.targets.join(", ") || "None"}
                        </span>
                      </div>
                      {ng.note && (
                        <div className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] italic">
                          {ng.note}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA] p-3 border border-[#E4E4E7] dark:border-[#232328] rounded-md">
                    No votes cast or entered after nomination rounds.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
