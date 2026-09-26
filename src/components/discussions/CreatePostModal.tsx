"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { INITIAL_CONTESTANTS } from "@/lib/mock-data";
import { X, Sparkles, MessageSquare } from "lucide-react";
import { Post } from "@/types";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: (post: Post) => void;
  onCreated?: (post: Post) => void;
}

const MEME_PRESETS = [
  { label: "Shivaji Confused Reaction", url: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80" },
  { label: "Prashanth Intense Focus", url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80" },
  { label: "House Nomination Shock", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80" }
];

export function CreatePostModal({ isOpen, onClose, onPostCreated, onCreated }: CreatePostModalProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<"opinion" | "debate" | "meme" | "nomination" | "task">("opinion");
  const [contestantId, setContestantId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim() || !user) return;

    setIsSubmitting(true);

    const selectedContestant = INITIAL_CONTESTANTS.find(c => c.id === contestantId);

    const newPost: Post = {
      id: `post_${Date.now()}`,
      user_id: user.id,
      author_username: user.username,
      author_name: user.display_name,
      author_avatar: user.avatar_url,
      author: {
        id: user.id,
        username: user.username,
        display_name: user.display_name,
        avatar_url: user.avatar_url,
        is_verified: true,
        reputation_score: user.reputation_score || 90
      },
      season_id: "s_telugu_v1",
      title: title.trim(),
      body: body.trim(),
      category,
      contestant_id: contestantId || undefined,
      contestant_name: selectedContestant?.name,
      image_url: category === "meme" && imageUrl ? imageUrl : undefined,
      agree_count: 1,
      disagree_count: 0,
      upvotes: 1,
      comment_count: 0,
      status: "published",
      created_at: "Just now"
    };

    setTimeout(() => {
      const callback = onPostCreated || onCreated;
      if (callback) callback(newPost);
      setIsSubmitting(false);
      onClose();
      setTitle("");
      setBody("");
      setContestantId("");
      setImageUrl("");
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-post-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-150"
    >
      <div className="bg-[#FFFFFF] dark:bg-[#141416] border-t sm:border border-[#E4E4E7] dark:border-[#232328] rounded-t-2xl sm:rounded-xl w-full max-w-[560px] p-5 sm:p-6 shadow-2xl relative text-[#09090B] dark:text-[#F4F4F5] max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        {/* Mobile Grab Handle */}
        <div className="w-10 h-1 bg-[#E4E4E7] dark:bg-[#27272A] rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E4E4E7] dark:border-[#232328]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF4500] font-bold">
                COMMUNITY DOSSIER • NEW ENTRY
              </span>
            </div>
            <h2 id="create-post-title" className="font-serif italic font-normal text-xl sm:text-2xl text-[#09090B] dark:text-[#F4F4F5] mt-1">
              Start a Conversation
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F4F4F5] p-1.5 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1F1F23] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 mt-4 p-1 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-lg text-xs overflow-x-auto no-scrollbar">
          {(["opinion", "debate", "meme", "nomination", "task"] as const).map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`flex-1 min-w-[68px] sm:min-w-0 py-1.5 px-2.5 rounded-md font-mono text-[10px] uppercase tracking-wider text-center transition-all cursor-pointer whitespace-nowrap ${
                category === cat
                  ? "bg-[#09090B] dark:bg-[#F4F4F5] text-[#FFFFFF] dark:text-[#09090B] font-bold shadow-xs"
                  : "text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#F4F4F5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] mb-1.5">
              Discussion Premise
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What is your core observation or argument?"
              maxLength={150}
              className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] focus:border-[#FF4500] dark:focus:border-[#FF4500] rounded-md outline-hidden text-[#09090B] dark:text-[#F4F4F5] transition-colors placeholder:text-[#A1A1AA]"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] mb-1.5">
              Body & Episode Context
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Elaborate with episode timestamps, game strategy breakdown, or house dynamics..."
              rows={4}
              className="w-full p-3.5 text-xs bg-[#FFFFFF] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] focus:border-[#FF4500] dark:focus:border-[#FF4500] rounded-md outline-hidden text-[#09090B] dark:text-[#F4F4F5] transition-colors leading-relaxed placeholder:text-[#A1A1AA]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] mb-1.5">
                Link Housemate (Optional)
              </label>
              <select
                value={contestantId}
                onChange={(e) => setContestantId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FFFFFF] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-md outline-hidden text-[#09090B] dark:text-[#F4F4F5] cursor-pointer"
              >
                <option value="">General House Dynamics</option>
                {INITIAL_CONTESTANTS.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.telugu_name})
                  </option>
                ))}
              </select>
            </div>

            {category === "meme" && (
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] mb-1.5">
                  Meme Asset Preset
                </label>
                <select
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FFFFFF] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-md outline-hidden text-[#09090B] dark:text-[#F4F4F5] cursor-pointer"
                >
                  <option value="">Select clean scene</option>
                  {MEME_PRESETS.map((m, idx) => (
                    <option key={idx} value={m.url}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="p-3 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-md text-[11px] text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
            <span className="font-semibold text-[#09090B] dark:text-[#F4F4F5]">Editorial Standards:</span> Discussions must focus on in-show gameplay, nominations, and tasks. Personal life speculation, character defamation, and toxicity are strictly moderated.
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-3 text-xs text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5] rounded-md transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !body.trim()}
              className="py-2 px-5 bg-[#FF4500] hover:bg-[#E03D00] active:scale-95 text-white rounded-md text-xs font-mono font-medium transition-all disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
