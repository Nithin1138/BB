"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { StorageService } from "@/lib/storage";
import { INITIAL_CONTESTANTS } from "@/lib/mock-data";
import { PostCard } from "@/components/discussions/PostCard";
import Link from "next/link";
import { Calendar, Settings, MessageSquare, ShieldCheck, Trophy, Sparkles } from "lucide-react";

export default function UserProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const { user: currentUser } = useAuth();

  const isOwnProfile = currentUser && currentUser.username === username;

  const profileUser = isOwnProfile
    ? currentUser
    : {
        id: "usr_mock",
        username: username || "fan_observer",
        display_name: username ? `${username.charAt(0).toUpperCase()}${username.slice(1)}` : "Community Member",
        avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        role: "user" as const,
        reputation_score: 94,
        predictions_count: 14,
        accuracy_rate: 78,
        joined_date: "Sep 2026",
        bio: "Dedicated Bigg Boss Telugu analyst and live watcher. Tracking task strategies, alliances, and community pulse daily."
      };

  const allPosts = StorageService.getPosts();
  const userPosts = allPosts.filter(p => (p.author_username || p.author?.username) === profileUser.username);

  const followedContestants = INITIAL_CONTESTANTS.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Dossier Hero */}
      <section className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <img
              src={profileUser.avatar_url}
              alt=""
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-[#F4F3EE] dark:border-[#24242A] shadow-md shrink-0"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#121210] dark:text-[#F3F2EE]">
                  {profileUser.display_name}
                </h1>
                <span className="font-mono text-xs font-semibold text-[#E03137] dark:text-[#FF453A] bg-[#E03137]/10 px-2 py-0.5 rounded">
                  @{profileUser.username}
                </span>
              </div>
              <div className="font-mono text-xs text-[#7C7A72] dark:text-[#A09E96] flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Enrolled {profileUser.joined_date}</span>
                <span>•</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Verified Citizen</span>
              </div>
              {profileUser.bio && (
                <p className="text-xs text-[#7C7A72] dark:text-[#A09E96] mt-2 max-w-md leading-relaxed font-serif italic">
                  "{profileUser.bio}"
                </p>
              )}
            </div>
          </div>

          {isOwnProfile && (
            <Link
              href="/settings"
              className="w-full sm:w-auto justify-center px-4 py-2 border border-[#E8E6DF] dark:border-[#24242A] hover:bg-[#FAF9F6] dark:hover:bg-[#1A1A1E] active:scale-95 text-[#121210] dark:text-[#F3F2EE] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Dossier Settings</span>
            </Link>
          )}
        </div>

        {/* Prediction Accuracy Metrics Strip */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#E8E6DF] dark:border-[#24242A] grid grid-cols-3 gap-2 sm:gap-4 text-center font-mono">
          <div className="bg-[#FAF9F6] dark:bg-[#1A1A1E] p-3 rounded-xl border border-[#E8E6DF] dark:border-[#24242A]">
            <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#7C7A72] dark:text-[#A09E96]">Accuracy Index</div>
            <div className="text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 tabular-nums">{profileUser.accuracy_rate}%</div>
          </div>
          <div className="bg-[#FAF9F6] dark:bg-[#1A1A1E] p-3 rounded-xl border border-[#E8E6DF] dark:border-[#24242A]">
            <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#7C7A72] dark:text-[#A09E96]">Forecasts</div>
            <div className="text-lg sm:text-xl font-bold text-[#121210] dark:text-[#F3F2EE] mt-0.5 tabular-nums">{profileUser.predictions_count}</div>
          </div>
          <div className="bg-[#FAF9F6] dark:bg-[#1A1A1E] p-3 rounded-xl border border-[#E8E6DF] dark:border-[#24242A]">
            <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#7C7A72] dark:text-[#A09E96]">Backed Housemates</div>
            <div className="text-lg sm:text-xl font-bold text-[#E03137] dark:text-[#FF453A] mt-0.5 tabular-nums">{followedContestants.length}</div>
          </div>
        </div>
      </section>

      {/* Followed Contestants Section */}
      {followedContestants.length > 0 && (
        <section className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="font-mono text-xs font-bold text-[#121210] dark:text-[#F3F2EE] uppercase tracking-wider">
            Backed Housemates Roster
          </div>
          <div className="flex flex-wrap gap-3">
            {followedContestants.map(c => (
              <Link
                key={c.id}
                href={`/contestants/${c.slug}`}
                className="flex items-center gap-2.5 p-2 px-3.5 rounded-xl bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] hover:border-[#E03137] transition-colors"
              >
                <img src={c.avatar_url} alt="" className="w-10 h-10 rounded-xl object-cover border border-[#E8E6DF] dark:border-[#24242A] shrink-0" />
                <span className="text-xs font-serif font-semibold text-[#121210] dark:text-[#F3F2EE]">{c.name}</span>
                <span className="font-mono text-[10px] text-[#E03137] dark:text-[#FF453A] font-bold tabular-nums">{c.pulse_score} Pulse</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Activity Feed */}
      <section className="space-y-4">
        <h2 className="font-serif italic font-bold text-lg text-[#121210] dark:text-[#F3F2EE] flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#E03137] dark:text-[#FF453A]" />
          <span>Deliberation Dispatch History ({userPosts.length})</span>
        </h2>

        {userPosts.length > 0 ? (
          <div className="space-y-4">
            {userPosts.map(p => <PostCard key={p.id} post={p} />)}
          </div>
        ) : (
          <div className="p-8 bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl text-center text-xs text-[#7C7A72] dark:text-[#A09E96]">
            No public dispatches recorded yet in this season.
          </div>
        )}
      </section>
    </div>
  );
}
