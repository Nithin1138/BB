"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PostCard } from "@/components/discussions/PostCard";
import { CreatePostModal } from "@/components/discussions/CreatePostModal";
import { StorageService } from "@/lib/storage";
import { INITIAL_CONTESTANTS } from "@/lib/mock-data";
import { Post } from "@/types";
import { useAuth } from "@/context/AuthContext";
import {
  MessageSquare,
  TrendingUp,
  Clock,
  UserCheck,
  Plus,
  Flame,
  Filter,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function DiscussPage() {
  const { user, openAuthModal } = useAuth();
  const [filterTab, setFilterTab] = useState<"latest" | "trending" | "following">("latest");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedContestantFilter, setSelectedContestantFilter] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [filterTab, activeCategory, selectedContestantFilter]);

  const loadPosts = () => {
    let all = StorageService.getPosts();

    // Exclude blocked users
    if (user?.blocked_users) {
      all = all.filter(p => !user.blocked_users.includes(p.author_username));
    }

    // Category filter
    if (activeCategory !== "all") {
      all = all.filter(p => p.category === activeCategory);
    }

    // Contestant filter
    if (selectedContestantFilter) {
      all = all.filter(p => p.contestant_id === selectedContestantFilter);
    }

    // Tab sorting
    if (filterTab === "trending") {
      all = [...all].sort((a, b) => (b.agree_count + b.comment_count) - (a.agree_count + a.comment_count));
    } else if (filterTab === "following") {
      if (user?.followed_contestants && user.followed_contestants.length > 0) {
        all = all.filter(p => p.contestant_id && user.followed_contestants.includes(p.contestant_id));
      }
    }

    setPosts(all);
  };

  const handlePostCreated = (newPost: Post) => {
    loadPosts();
  };

  const handleOpenCreate = () => {
    if (!user) {
      openAuthModal("google");
    } else {
      setIsCreateOpen(true);
    }
  };

  return (
    <div className="space-y-10">
      {/* Editorial Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E4E4E7] dark:border-[#232328]">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#FF4500] uppercase font-bold">
            COMMUNITY DISCOURSE & EPISODE ROOMS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#09090B] dark:text-[#F4F4F5] mt-2 leading-[1.15]">
            What are fans <span className="italic font-normal">talking about?</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] mt-2 max-w-xl leading-relaxed">
            Join fan analyses, episode breakdowns, memes, and debate rebuttals. Authenticated Telugu fandom identity.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#FF4500] hover:bg-[#E03D00] active:scale-95 text-white rounded-md text-xs font-mono font-medium flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Start Conversation</span>
        </button>
      </div>

      {/* Contestant Rooms Quick Filter */}
      <div className="space-y-2">
        <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
          Contestant Focus Rooms
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setSelectedContestantFilter(null)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-all cursor-pointer shrink-0 active:scale-95 ${
              selectedContestantFilter === null
                ? "bg-[#09090B] text-[#FFFFFF] dark:bg-[#F4F4F5] dark:text-[#09090B] font-semibold shadow-xs"
                : "bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white"
            }`}
          >
            All House
          </button>
          {INITIAL_CONTESTANTS.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedContestantFilter(selectedContestantFilter === c.id ? null : c.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap border transition-all cursor-pointer shrink-0 active:scale-95 ${
                selectedContestantFilter === c.id
                  ? "bg-[#FF4500] border-[#FF4500] text-white font-semibold shadow-xs"
                  : "bg-white dark:bg-[#141416] border-[#E4E4E7] dark:border-[#232328] text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#18181C]"
              }`}
            >
              <img src={c.avatar_url} alt="" className="w-4 h-4 rounded-full object-cover" />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Discussion Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Feed Area (8 columns) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Feed Controls: Latest / Trending / Following Tabs & Categories */}
          <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-lg p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 sm:pb-0 font-mono text-xs">
              <button
                onClick={() => setFilterTab("latest")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer shrink-0 active:scale-95 ${
                  filterTab === "latest" ? "bg-[#09090B] text-[#FFFFFF] dark:bg-[#F4F4F5] dark:text-[#09090B] font-semibold" : "text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Latest</span>
              </button>
              <button
                onClick={() => setFilterTab("trending")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer shrink-0 active:scale-95 ${
                  filterTab === "trending" ? "bg-[#09090B] text-[#FFFFFF] dark:bg-[#F4F4F5] dark:text-[#09090B] font-semibold" : "text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Trending</span>
              </button>
              <button
                onClick={() => setFilterTab("following")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer shrink-0 active:scale-95 ${
                  filterTab === "following" ? "bg-[#09090B] text-[#FFFFFF] dark:bg-[#F4F4F5] dark:text-[#09090B] font-semibold" : "text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Following</span>
              </button>
            </div>

            <div className="flex items-center gap-1 text-xs font-mono overflow-x-auto no-scrollbar pt-2 border-t border-[#E4E4E7] dark:border-[#232328] sm:pt-0 sm:border-t-0">
              {(["all", "opinion", "debate", "meme", "task", "nomination"] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-all cursor-pointer shrink-0 active:scale-95 ${
                    activeCategory === cat
                      ? "bg-[#09090B] text-[#FFFFFF] dark:bg-[#F4F4F5] dark:text-[#09090B] font-medium shadow-xs"
                      : "text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map(post => (
                <PostCard key={post.id} post={post} onPostUpdated={loadPosts} />
              ))
            ) : (
              <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-lg p-12 text-center space-y-3">
                <MessageSquare className="w-8 h-8 text-[#71717A] dark:text-[#A1A1AA] mx-auto" />
                <h3 className="text-base font-serif font-normal text-[#09090B] dark:text-[#F4F4F5]">
                  Be the first fan to start the conversation.
                </h3>
                <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] max-w-sm mx-auto">
                  No discussions found under this filter. Share your thoughts on today's episode or task.
                </p>
                <button
                  onClick={handleOpenCreate}
                  className="px-4 py-2 bg-[#FF4500] hover:bg-[#E03D00] text-white rounded-md text-xs font-mono font-medium"
                >
                  + Post an Opinion
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Context Sidebar (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Today's Debate Teaser */}
          <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#F59E0B]">
                FEATURED DEBATE
              </span>
              <span className="text-[11px] font-mono text-[#10B981] font-semibold">58% AGREE</span>
            </div>

            <h3 className="text-sm font-serif font-normal text-[#09090B] dark:text-[#F4F4F5] leading-snug">
              Was Sivaji's emotional outburst in Episode 24 justified?
            </h3>

            <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
              Join over 3,170 fans debating whether the veteran actor's clash with Priya was warranted.
            </p>

            <Link
              href="/debates/was-sivajis-outburst-justified"
              className="w-full py-2 bg-[#09090B] dark:bg-[#F4F4F5] hover:bg-[#FF4500] dark:hover:bg-[#FF4500] text-white dark:text-[#09090B] dark:hover:text-white rounded-md text-xs font-mono font-medium flex items-center justify-center gap-1 transition-all"
            >
              <span>Join Debate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Trending Topics List */}
          <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-lg p-5 shadow-xs space-y-3">
            <div className="text-xs font-mono font-semibold text-[#09090B] dark:text-[#F4F4F5] uppercase tracking-wider">
              Trending Topics
            </div>
            <div className="space-y-2 text-xs font-mono">
              <button
                onClick={() => setSelectedContestantFilter("c_priya")}
                className="w-full text-left p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1F1F23] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <div className="font-semibold text-[#09090B] dark:text-[#F4F4F5]">#PriyaComposure</div>
                  <div className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] tabular-nums">1,820 discussions today</div>
                </div>
                <Flame className="w-3.5 h-3.5 text-[#FF4500]" />
              </button>

              <button
                onClick={() => setSelectedContestantFilter("c_sivaji")}
                className="w-full text-left p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1F1F23] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <div className="font-semibold text-[#09090B] dark:text-[#F4F4F5]">#SivajiStand</div>
                  <div className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] tabular-nums">2,940 discussions today</div>
                </div>
                <Flame className="w-3.5 h-3.5 text-[#FF4500]" />
              </button>

              <button
                onClick={() => setActiveCategory("nomination")}
                className="w-full text-left p-2 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1F1F23] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <div className="font-semibold text-[#09090B] dark:text-[#F4F4F5]">#Week4EvictionZone</div>
                  <div className="text-[10px] text-[#71717A] dark:text-[#A1A1AA]">6 nominees analyzed</div>
                </div>
                <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={handlePostCreated}
      />
    </div>
  );
}
