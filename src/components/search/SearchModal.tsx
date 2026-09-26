"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { INITIAL_CONTESTANTS } from "@/lib/mock-data";
import { StorageService } from "@/lib/storage";
import {
  Search,
  X,
  Flame,
  MessageSquare,
  Film,
  ArrowRight,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { Contestant, Post } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "contestants" | "discussions" | "episodes">("all");
  const inputRef = useRef<HTMLInputElement>(null);

  const posts = StorageService.getPosts();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredContestants = INITIAL_CONTESTANTS.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    (c.telugu_name && c.telugu_name.includes(query)) ||
    c.profession.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.body.toLowerCase().includes(query.toLowerCase()) ||
    (p.author_username || p.author?.username || "").toLowerCase().includes(query.toLowerCase())
  );

  const popularSearches = [
    "Shivaji", "Eviction Poll", "Episode 24", "Pallavi Prashanth", "Kitchen Fight", "Risk Score"
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-3 sm:pt-20 bg-black/70 backdrop-blur-xs p-2.5 sm:p-4 animate-in fade-in duration-150"
    >
      <div className="bg-[#FFFFFF] dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl w-full max-w-[620px] shadow-2xl overflow-hidden relative text-[#09090B] dark:text-[#F4F4F5] max-h-[88vh] flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-3.5 sm:px-4 py-3 sm:py-3.5 border-b border-[#E4E4E7] dark:border-[#232328] gap-2.5 sm:gap-3 bg-white dark:bg-[#141416]">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#71717A] dark:text-[#A1A1AA] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search housemates, dispatches, episodes..."
            className="w-full text-xs sm:text-sm outline-hidden bg-transparent text-[#09090B] dark:text-[#F4F4F5] placeholder-[#71717A] dark:placeholder-[#A1A1AA]"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#F4F4F5] px-1.5 py-0.5 rounded cursor-pointer"
            >
              Clear
            </button>
          ) : (
            <kbd className="hidden sm:inline text-[10px] bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] text-[#71717A] dark:text-[#A1A1AA] px-1.5 py-0.5 rounded-sm font-mono">
              ESC
            </kbd>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#F4F4F5] p-1.5 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1F1F23] transition-colors ml-1 cursor-pointer active:scale-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#F4F4F5] dark:bg-[#111113] border-b border-[#E4E4E7] dark:border-[#232328] text-xs overflow-x-auto no-scrollbar font-mono">
          {(["all", "contestants", "discussions", "episodes"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-sm text-[10px] uppercase tracking-wider transition-colors cursor-pointer active:scale-95 ${
                activeTab === tab
                  ? "bg-white dark:bg-[#1A1A1E] text-[#09090B] dark:text-[#F4F4F5] shadow-2xs border border-[#E4E4E7] dark:border-[#232328] font-bold"
                  : "text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Results / Default State */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 max-h-[60vh] sm:max-h-[420px] bg-[#FFFFFF] dark:bg-[#141416]">
          {query.trim() === "" ? (
            <div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#71717A] dark:text-[#A1A1AA] mb-2 font-bold">
                POPULAR SEARCHES
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs bg-[#F4F4F5] dark:bg-[#1A1A1E] hover:bg-[#E4E4E7] dark:hover:bg-[#232328] border border-[#E4E4E7] dark:border-[#232328] text-[#09090B] dark:text-[#F4F4F5] px-3 py-1.5 rounded-sm transition-colors cursor-pointer active:scale-95 font-mono"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="mt-5 font-mono text-[9px] uppercase tracking-widest text-[#71717A] dark:text-[#A1A1AA] mb-2 font-bold">
                EDITORIAL SHORTCUTS
              </div>
              <div className="space-y-1">
                <Link
                  href="/vote"
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] border border-transparent hover:border-[#E4E4E7] dark:hover:border-[#232328] text-xs text-[#09090B] dark:text-[#F4F4F5] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Flame className="w-4 h-4 text-[#FF4500]" />
                    <span className="font-serif">Cast your ballot in active Week 4 Eviction Poll</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#71717A] dark:text-[#A1A1AA]" />
                </Link>
                <Link
                  href="/debates/was-sivajis-outburst-justified"
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] border border-transparent hover:border-[#E4E4E7] dark:border-[#232328] text-xs text-[#09090B] dark:text-[#F4F4F5] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-[#10B981]" />
                    <span className="font-serif">Join Today's Debate: Was Sivaji's outburst justified?</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#71717A] dark:text-[#A1A1AA]" />
                </Link>
                <Link
                  href="/episodes/24"
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] border border-transparent hover:border-[#E4E4E7] dark:border-[#232328] text-xs text-[#09090B] dark:text-[#F4F4F5] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Film className="w-4 h-4 text-[#71717A] dark:text-[#A1A1AA]" />
                    <span className="font-serif">Episode 24 Timeline & Story Moments</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#71717A] dark:text-[#A1A1AA]" />
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {/* Contestants Results */}
              {(activeTab === "all" || activeTab === "contestants") && filteredContestants.length > 0 && (
                <div className="mb-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[#71717A] dark:text-[#A1A1AA] mb-2 font-bold">
                    HOUSEMATES ({filteredContestants.length})
                  </div>
                  <div className="space-y-1">
                    {filteredContestants.map(c => (
                      <Link
                        key={c.id}
                        href={`/contestants/${c.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] border border-transparent hover:border-[#E4E4E7] dark:border-[#232328] transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={c.avatar_url}
                            alt={c.name}
                            className="w-8 h-8 rounded-full object-cover border border-[#E4E4E7] dark:border-[#232328]"
                          />
                          <div>
                            <div className="font-serif font-normal text-xs sm:text-sm text-[#09090B] dark:text-[#F4F4F5]">
                              {c.name} {c.telugu_name && <span className="text-[#71717A] dark:text-[#A1A1AA] font-normal">({c.telugu_name})</span>}
                            </div>
                            <div className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA]">{c.profession}</div>
                          </div>
                        </div>
                        <div className="text-right font-mono">
                          <div className="text-xs font-bold text-[#09090B] dark:text-[#F4F4F5] tabular-nums">{c.pulse_score} Pulse</div>
                          <div className={`text-[10px] font-medium tabular-nums ${c.pulse_change >= 0 ? "text-[#10B981]" : "text-[#FF4500]"}`}>
                            {c.pulse_change >= 0 ? `↑ +${c.pulse_change}%` : `↓ ${c.pulse_change}%`}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Discussions Results */}
              {(activeTab === "all" || activeTab === "discussions") && filteredPosts.length > 0 && (
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[#71717A] dark:text-[#A1A1AA] mb-2 font-bold">
                    DELIBERATIONS ({filteredPosts.length})
                  </div>
                  <div className="space-y-1">
                    {filteredPosts.map(p => (
                      <Link
                        key={p.id}
                        href={`/discuss/${p.id}`}
                        onClick={onClose}
                        className="block p-2.5 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] border border-transparent hover:border-[#E4E4E7] dark:border-[#232328] transition-colors"
                      >
                        <div className="font-serif font-normal text-xs sm:text-sm text-[#09090B] dark:text-[#F4F4F5] line-clamp-1">{p.title}</div>
                        <div className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] line-clamp-1 mt-0.5">{p.body}</div>
                        <div className="flex items-center gap-3 font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA] mt-1">
                          <span>@{p.author_username || p.author?.username}</span>
                          <span>•</span>
                          <span>{p.agree_count} Agreed</span>
                          <span>•</span>
                          <span>{p.comment_count} Responses</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {filteredContestants.length === 0 && filteredPosts.length === 0 && (
                <div className="py-8 text-center text-xs text-[#71717A] dark:text-[#A1A1AA] font-mono">
                  No matching editorial records found for "{query}". Try checking another keyword.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
