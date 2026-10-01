"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  X,
  Tv,
  Users,
  MessageSquare,
  Trophy,
  FileCheck,
  ShieldCheck,
  ShieldAlert,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Check,
  Target,
  Calendar,
  Radio,
  Globe,
  ExternalLink
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
  const { user, role, setRole, openAuthModal, logout } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
      className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
      />

      {/* Drawer content sliding from right */}
      <div className="fixed inset-y-0 right-0 w-full max-w-[320px] bg-white dark:bg-[#0C0C0D] shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-200 text-[#09090B] dark:text-[#F4F4F5] border-l border-[#E4E4E7] dark:border-[#232328]">
        <div>
          {/* Drawer Header */}
          <div className="p-4 border-b border-[#E4E4E7] dark:border-[#232328] flex items-center justify-between bg-white dark:bg-[#141416]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#09090B] dark:bg-[#F4F4F5] flex items-center justify-center text-white dark:text-[#09090B] shadow-xs shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="2.5" fill="#FF4500" stroke="none" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight font-sans">BBPULSE</span>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-[#71717A]">
                  TELUGU EDITION
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F4F4F5] hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F] transition-colors cursor-pointer active:scale-90"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User profile section */}
          <div className="p-4 border-b border-[#E4E4E7] dark:border-[#232328] bg-[#F4F4F5] dark:bg-[#141416]">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar_url}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-[#E4E4E7] dark:border-[#232328]"
                  />
                  <div className="overflow-hidden">
                    <div className="font-medium text-sm text-[#09090B] dark:text-[#F4F4F5] truncate">{user.display_name}</div>
                    <div className="text-xs text-[#FF4500] font-mono">@{user.username}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 text-xs">
                  <Link
                    href={`/u/${user.username}`}
                    onClick={onClose}
                    className="flex-1 text-center py-1.5 bg-white dark:bg-[#1B1B1F] border border-[#E4E4E7] dark:border-[#232328] rounded-md font-medium text-[#09090B] dark:text-[#F4F4F5] hover:bg-[#F4F4F5] dark:hover:bg-[#232328] transition-colors active:scale-95"
                  >
                    View Dossier
                  </Link>
                  <Link
                    href="/settings"
                    onClick={onClose}
                    className="p-1.5 bg-white dark:bg-[#1B1B1F] border border-[#E4E4E7] dark:border-[#232328] rounded-md text-[#71717A] hover:text-[#09090B] dark:hover:text-white transition-colors active:scale-95"
                    title="Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-center py-2">
                <p className="text-xs text-[#71717A]">Authenticate to verify poll ballots and debate.</p>
                <button
                  onClick={() => { onClose(); openAuthModal("google"); }}
                  className="w-full py-2 bg-[#09090B] dark:bg-[#F4F4F5] hover:bg-black dark:hover:bg-white text-white dark:text-[#09090B] rounded-md text-xs font-semibold shadow-xs active:scale-95 transition-all"
                >
                  Continue with Google
                </button>
              </div>
            )}
          </div>

          {/* Theme & Appearance Toggle Row */}
          <div className="p-3 border-b border-[#E4E4E7] dark:border-[#232328] bg-white dark:bg-[#141416] flex items-center justify-between">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#71717A]">
                Atmosphere
              </div>
              <div className="text-xs font-medium text-[#09090B] dark:text-[#F4F4F5] mt-0.5">
                Display Theme
              </div>
            </div>
            <ThemeToggle showLabel={true} />
          </div>

          {/* Role Switcher Pill Bar (for testing) */}
          <div className="p-3 border-b border-[#E4E4E7] dark:border-[#232328] bg-[#F4F4F5] dark:bg-[#141416]">
            <div className="font-mono text-[9px] uppercase tracking-widest text-[#71717A] mb-2 px-1">
              Active Role Switcher (Audit View):
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {(["user", "moderator", "admin", "visitor"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-1 px-2 rounded-md text-[11px] font-mono capitalize border flex items-center justify-between transition-all active:scale-95 cursor-pointer ${
                    role === r
                      ? "border-[#FF4500] bg-[#FF4500]/10 text-[#FF4500] font-bold"
                      : "border-[#E4E4E7] dark:border-[#232328] text-[#71717A] hover:bg-white dark:hover:bg-[#1B1B1F]"
                  }`}
                >
                  <span>{r}</span>
                  {role === r && <Check className="w-3 h-3 text-[#FF4500]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links List */}
          <div className="p-3 space-y-1 text-xs">
            <Link
              href="/episodes"
              onClick={onClose}
              className="flex items-center justify-between p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#141416] transition-colors active:scale-98"
            >
              <span className="flex items-center gap-2.5 font-medium text-[#09090B] dark:text-[#F4F4F5]">
                <Tv className="w-4 h-4 text-[#71717A]" />
                <span>Episodes & Chronology</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#71717A]" />
            </Link>

            <Link
              href="/contestants"
              onClick={onClose}
              className="flex items-center justify-between p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#141416] transition-colors active:scale-98"
            >
              <span className="flex items-center gap-2.5 font-medium text-[#09090B] dark:text-[#F4F4F5]">
                <Users className="w-4 h-4 text-[#71717A]" />
                <span>Housemates Roster</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#71717A]" />
            </Link>

            <Link
              href="/contestants/nominations"
              onClick={onClose}
              className="flex items-center justify-between p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#141416] transition-colors active:scale-98"
            >
              <span className="flex items-center gap-2.5 font-medium text-[#09090B] dark:text-[#F4F4F5]">
                <Target className="w-4 h-4 text-[#FF4500]" />
                <span className="flex items-center gap-1.5">
                  <span>Nominations & Powers</span>
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#FF4500]/10 text-[#FF4500] font-bold">W4</span>
                </span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#71717A]" />
            </Link>

            <Link
              href="/chats"
              onClick={onClose}
              className="flex items-center justify-between p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#141416] transition-colors active:scale-98"
            >
              <span className="flex items-center gap-2.5 font-medium text-[#09090B] dark:text-[#F4F4F5]">
                <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span className="flex items-center gap-1.5">
                  <span>Live Fan Lounges</span>
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">Live</span>
                </span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#71717A]" />
            </Link>

            <Link
              href="/upcoming"
              onClick={onClose}
              className="flex items-center justify-between p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#141416] transition-colors active:scale-98"
            >
              <span className="flex items-center gap-2.5 font-medium text-[#09090B] dark:text-[#F4F4F5]">
                <Calendar className="w-4 h-4 text-[#71717A]" />
                <span>Upcoming Schedule</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#71717A]" />
            </Link>

            <Link
              href="/debates/was-sivajis-outburst-justified"
              onClick={onClose}
              className="flex items-center justify-between p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#141416] transition-colors active:scale-98"
            >
              <span className="flex items-center gap-2.5 font-medium text-[#09090B] dark:text-[#F4F4F5]">
                <MessageSquare className="w-4 h-4 text-[#FF4500]" />
                <span>Editorial Debates</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#71717A]" />
            </Link>

            <Link
              href="/predict/leaderboard"
              onClick={onClose}
              className="flex items-center justify-between p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#141416] transition-colors active:scale-98"
            >
              <span className="flex items-center gap-2.5 font-medium text-[#09090B] dark:text-[#F4F4F5]">
                <Trophy className="w-4 h-4 text-[#F59E0B]" />
                <span>Forecaster Index</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#71717A]" />
            </Link>

            <Link
              href="/roundup"
              onClick={onClose}
              className="flex items-center justify-between p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#141416] transition-colors active:scale-98"
            >
              <span className="flex items-center gap-2.5 font-medium text-[#09090B] dark:text-[#F4F4F5]">
                <FileCheck className="w-4 h-4 text-[#71717A]" />
                <span>Ballot Observatory</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#71717A]" />
            </Link>

            <Link
              href="/pulse"
              onClick={onClose}
              className="flex items-center justify-between p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#141416] transition-colors active:scale-98"
            >
              <span className="flex items-center gap-2.5 font-medium text-[#09090B] dark:text-[#F4F4F5]">
                <HelpCircle className="w-4 h-4 text-[#71717A]" />
                <span>Pulse Formula Audit</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#71717A]" />
            </Link>

            <Link
              href="/admin"
              onClick={onClose}
              className="flex items-center justify-between p-2 rounded-md bg-[#FF4500]/5 dark:bg-[#FF4500]/10 hover:bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/20 transition-colors mt-2 active:scale-98"
            >
              <span className="flex items-center gap-2.5 font-semibold">
                <ShieldAlert className="w-4 h-4 text-[#FF4500]" />
                <span>Editorial Dispatch & Admin</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#FF4500]" />
            </Link>

            {/* Wikipedia Automated Live Sync Card */}
            <div className="mt-3 p-2.5 rounded-lg bg-[#FAF9F6] dark:bg-[#18181C] border border-[#E8E6DF] dark:border-[#24242A]">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-medium text-[#09090B] dark:text-[#F4F4F5]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                  </span>
                  <Globe className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Wikipedia Live Sync</span>
                </div>
                <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded font-bold">
                  ACTIVE
                </span>
              </div>
              <p className="text-[10.5px] text-[#71717A] mt-1 font-mono leading-tight">
                MediaWiki rev-hash stream monitors Bigg Boss 10 updates in sub-second latency.
              </p>
              <a
                href="https://en.wikipedia.org/wiki/Bigg_Boss_(Telugu_TV_series)_season_10"
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-[#FF4500] hover:underline font-mono"
              >
                <span>View Wikipedia Source</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Drawer Footer: Legal & Logout */}
        <div
          className="p-4 border-t border-[#E4E4E7] dark:border-[#232328] bg-[#F4F4F5] dark:bg-[#141416] space-y-2 text-xs"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#71717A]">
            <Link href="/terms" onClick={onClose} className="hover:underline">Terms</Link>
            <span>•</span>
            <Link href="/privacy" onClick={onClose} className="hover:underline">Privacy</Link>
            <span>•</span>
            <Link href="/guidelines" onClick={onClose} className="hover:underline">Guidelines</Link>
            <span>•</span>
            <Link href="/independent-notice" onClick={onClose} className="hover:underline">Disclaimer</Link>
          </div>

          {user && (
            <button
              onClick={() => { logout(); onClose(); }}
              className="w-full pt-2 flex items-center justify-center gap-1.5 text-xs text-[#FF4500] hover:underline cursor-pointer active:scale-95 font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
