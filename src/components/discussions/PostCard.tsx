"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Post, ShareCardConfig } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { StorageService } from "@/lib/storage";
import { ShareModal } from "@/components/share/ShareModal";
import { ReportModal } from "@/components/moderation/ReportModal";
import {
  MessageSquare,
  Share2,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  ShieldAlert,
  UserX
} from "lucide-react";

interface PostCardProps {
  post: Post;
  onPostUpdated?: () => void;
}

export function PostCard({ post, onPostUpdated }: PostCardProps) {
  const { user, openAuthModal } = useAuth();
  const [agreeCount, setAgreeCount] = useState(post.agree_count);
  const [disagreeCount, setDisagreeCount] = useState(post.disagree_count);
  const [userReaction, setUserReaction] = useState<'agree' | 'disagree' | null>(() =>
    user ? StorageService.getUserReaction(user.id, 'post', post.id) : null
  );
  const [showMenu, setShowMenu] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [shareConfig, setShareConfig] = useState<ShareCardConfig | null>(null);
  const [blocked, setBlocked] = useState(false);

  const handleReaction = (type: 'agree' | 'disagree') => {
    if (!user) {
      openAuthModal("google");
      return;
    }

    const res = StorageService.toggleReaction(user.id, 'post', post.id, type);
    setAgreeCount(res.agreeCount);
    setDisagreeCount(res.disagreeCount);
    setUserReaction(userReaction === type ? null : type);
  };

  const handleBlock = () => {
    if (!user) {
      openAuthModal("google");
      return;
    }
    if (confirm(`Block @${post.author_username}? You will no longer see their dispatches or comments.`)) {
      StorageService.blockUser(post.author_username);
      setBlocked(true);
      if (onPostUpdated) onPostUpdated();
    }
    setShowMenu(false);
  };

  const handleShare = () => {
    setShareConfig({
      type: "debate",
      headline: post.title,
      main_metric: `${agreeCount} Agreed`,
      secondary_metric: `Discussion by @${post.author_username}`,
      contestant_name: post.contestant_name,
      disclaimer: "BBPulse Community Deliberation",
      url: `/discuss/${post.id}`
    });
  };

  if (blocked) return null;

  return (
    <article className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] hover:border-[#09090B]/30 dark:hover:border-[#F4F4F5]/30 rounded-xl p-4 sm:p-5 shadow-2xs transition-all duration-150 relative">
      {/* Post Top Row: Author Identity & Category Tag */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5">
          <Link href={`/u/${post.author_username}`} className="shrink-0">
            <img
              src={post.author_avatar}
              alt=""
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl object-cover border-2 border-[#E4E4E7] dark:border-[#27272A] shadow-2xs shrink-0"
            />
          </Link>
          <div>
            <div className="flex items-center gap-1.5">
              <Link
                href={`/u/${post.author_username}`}
                className="font-mono text-xs font-bold text-[#09090B] dark:text-[#F4F4F5] hover:text-[#FF4500] transition-colors"
              >
                @{post.author_username}
              </Link>
              <span className="text-[10px] text-[#71717A]">•</span>
              <span className="font-mono text-[10px] text-[#71717A]">{post.created_at}</span>
            </div>
            {post.contestant_name && (
              <div className="text-[10px] text-[#71717A]">
                Regarding <strong className="text-[#09090B] dark:text-[#F4F4F5] font-serif">{post.contestant_name}</strong>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-[#F4F4F5] dark:bg-[#1B1B1F] text-[#71717A] border border-[#E4E4E7] dark:border-[#232328]">
            {post.category}
          </span>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F4F4F5] rounded hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F] transition-colors cursor-pointer"
              aria-label="More options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-[#1B1B1F] border border-[#E4E4E7] dark:border-[#232328] rounded-xl shadow-lg p-1 z-30 text-xs animate-in fade-in duration-100">
                <button
                  onClick={() => { setIsReportOpen(true); setShowMenu(false); }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-[#FF4500]/10 text-[#FF4500] flex items-center gap-2 cursor-pointer font-medium"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Report Post</span>
                </button>
                <button
                  onClick={handleBlock}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-[#F4F4F5] dark:hover:bg-[#232328] text-[#71717A] flex items-center gap-2 cursor-pointer"
                >
                  <UserX className="w-3.5 h-3.5" />
                  <span>Block @{post.author_username}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Title & Body */}
      <Link href={`/discuss/${post.id}`} className="block group">
        <h3 className="font-serif italic font-bold text-base sm:text-lg text-[#09090B] dark:text-[#F4F4F5] group-hover:text-[#FF4500] transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] leading-relaxed mt-1.5 line-clamp-3">
          {post.body}
        </p>
      </Link>

      {/* Attached image if meme / media */}
      {post.image_url && (
        <div className="mt-3 rounded-lg overflow-hidden border border-[#E4E4E7] dark:border-[#232328] max-h-72">
          <img src={post.image_url} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Bottom Bar: Agree / Disagree / Comments / Share */}
      <div className="flex items-center justify-between pt-3 sm:pt-4 mt-3 border-t border-[#E4E4E7] dark:border-[#232328] text-xs gap-1.5">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Agree Button */}
          <button
            onClick={() => handleReaction('agree')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-md border transition-all active:scale-95 cursor-pointer font-mono ${
              userReaction === 'agree'
                ? "border-[#10B981] bg-[#10B981]/10 text-[#10B981] font-semibold"
                : "border-[#E4E4E7] dark:border-[#232328] text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F4F4F5] hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F]"
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Agree</span>
            <span className="text-[11px] tabular-nums">{agreeCount}</span>
          </button>

          {/* Disagree Button */}
          <button
            onClick={() => handleReaction('disagree')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-md border transition-all active:scale-95 cursor-pointer font-mono ${
              userReaction === 'disagree'
                ? "border-[#FF4500] bg-[#FF4500]/10 text-[#FF4500] font-semibold"
                : "border-[#E4E4E7] dark:border-[#232328] text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F4F4F5] hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F]"
            }`}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Disagree</span>
            <span className="text-[11px] tabular-nums">{disagreeCount}</span>
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 font-mono">
          <Link
            href={`/discuss/${post.id}`}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-md text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F4F4F5] hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F] transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{post.comment_count} <span className="hidden sm:inline">Responses</span></span>
          </Link>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-md text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F4F4F5] hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F] transition-colors cursor-pointer"
            aria-label="Share post"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Modals */}
      {isReportOpen && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          targetType="post"
          targetId={post.id}
          targetAuthor={post.author_username}
          contentSnippet={post.title}
        />
      )}

      {shareConfig && (
        <ShareModal
          isOpen={!!shareConfig}
          onClose={() => setShareConfig(null)}
          config={shareConfig}
        />
      )}
    </article>
  );
}
