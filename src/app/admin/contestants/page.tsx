"use client";

import React, { useState } from "react";
import { StorageService } from "@/lib/storage";
import { Contestant } from "@/types";
import { Check } from "lucide-react";

export default function AdminContestantsPage() {
  const [contestants, setContestants] = useState<Contestant[]>(() => StorageService.getContestants());
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const handleStatusChange = (contestantId: string, newStatus: Contestant['status']) => {
    const target = contestants.find(c => c.id === contestantId);
    if (!target) return;

    const updated: Contestant = {
      ...target,
      status: newStatus
    };
    StorageService.updateContestant(updated);
    setContestants(StorageService.getContestants());
    setSavedMessage(`Updated ${target.name} status to ${newStatus}`);
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const handlePulseAdjust = (contestantId: string, delta: number) => {
    const target = contestants.find(c => c.id === contestantId);
    if (!target) return;

    const updated: Contestant = {
      ...target,
      pulse_score: Math.min(100, Math.max(0, target.pulse_score + delta)),
      pulse_change: Number((target.pulse_change + delta).toFixed(1))
    };
    StorageService.updateContestant(updated);
    setContestants(StorageService.getContestants());
    setSavedMessage(`Adjusted ${target.name} Pulse to ${updated.pulse_score}`);
    setTimeout(() => setSavedMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E6DF] dark:border-[#24242A]">
        <div>
          <h1 className="font-serif italic font-bold text-xl sm:text-2xl text-[#121210] dark:text-[#F3F2EE]">
            Housemates Status & Calibration Desk
          </h1>
          <p className="text-xs text-[#7C7A72] dark:text-[#A09E96]">
            Manage weekly nomination flags, captaincy insignia, and pulse calibrations.
          </p>
        </div>
      </div>

      {savedMessage && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{savedMessage}</span>
        </div>
      )}

      <div className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs min-w-[540px]">
            <thead className="bg-[#FAF9F6] dark:bg-[#1A1A1E] border-b border-[#E8E6DF] dark:border-[#24242A] font-mono text-[10px] font-bold uppercase tracking-wider text-[#7C7A72] dark:text-[#A09E96]">
              <tr>
                <th className="py-3 px-4">Housemate</th>
                <th className="py-3 px-4">Profession</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Pulse Score</th>
                <th className="py-3 px-4 text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E6DF] dark:divide-[#24242A]">
              {contestants.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF9F6] dark:hover:bg-[#18181C] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img src={c.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover border border-[#E8E6DF] dark:border-[#24242A]" />
                      <span className="font-serif font-semibold text-[#121210] dark:text-[#F3F2EE]">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#7C7A72] dark:text-[#A09E96]">{c.profession}</td>
                  <td className="py-3 px-4">
                    <select
                      value={c.status}
                      onChange={(e) => handleStatusChange(c.id, e.target.value as Contestant['status'])}
                      className="p-1 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] rounded-lg text-xs font-mono font-semibold outline-hidden cursor-pointer text-[#121210] dark:text-[#F3F2EE]"
                    >
                      <option value="active">Active</option>
                      <option value="nominated">Nominated</option>
                      <option value="captain">Captain</option>
                      <option value="evicted">Evicted</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-[#121210] dark:text-[#F3F2EE]">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handlePulseAdjust(c.id, -2)}
                        className="w-5 h-5 rounded bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] hover:bg-[#E8E6DF] text-xs font-mono font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="tabular-nums">{c.pulse_score}</span>
                      <button
                        onClick={() => handlePulseAdjust(c.id, +2)}
                        className="w-5 h-5 rounded bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] hover:bg-[#E8E6DF] text-xs font-mono font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">Verified Sync</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
