"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { StorageService } from "@/lib/storage";
import { Post, Comment, ShareCardConfig } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { ShareModal } from "@/components/share/ShareModal";
import { ReportModal } from "@/components/moderation/ReportModal";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Share2,
  ShieldAlert,
  MessageSquare,
  Send
} from "lucide-react";

export default function PostDetailPage() {
  const params = useParams();
  const postId = params?.id as string;
  const { user, openAuthModal } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [agreeCount, setAgreeCount] = useState(0);
  const [disagreeCount, setDisagreeCount] = useState(0);
  const [userReaction, setUserReaction] = useState<'agree' | 'disagree' | null>(null);

  // Threaded comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "c_1",
      post_id: postId,
      user_id: "usr_hyd",
      author_username: "telugu_critic_raj",
      author_name: "Rajesh",
      author_avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      body: "Completely agree with this analysis. In Week 2 people claimed Priya was just an anchor reading lines, but she proved she can withstand emotional provocation without losing dignity.",
      created_at: "2h ago",
      agree_count: 42,
      disagree_count: 3,
      replies: [
        {
          id: "c_1_1",
          post_id: postId,
          user_id: "usr_vzg",
          author_username: "ananya_k",
          author_name: "Ananya",
          author_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
          body: "Exactly! And the best part is she didn't play the sympathy card in the confession room later.",
          created_at: "1h ago",
          agree_count: 18,
          disagree_count: 1
        }
      ]
    },
    {
      id: "c_2",
      post_id: postId,
      user_id: "usr_warangal",
      author_username: "kalyan_fan_club",
      author_name: "Kalyan Fan",
      author_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      body: "Still feel Sivaji made some valid points regarding kitchen chores. It is easy to stay quiet when you are not the one cooking for 14 people daily.",
      created_at: "1h ago",
      agree_count: 24,
      disagree_count: 19
    }
  ]);

  const [commentInput, setCommentInput] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState("");
  const [shareConfig, setShareConfig] = useState<ShareCardConfig | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  useEffect(() => {
    const found = StorageService.getPostById(postId);
    if (found) {
      setPost(found);
      setAgreeCount(found.agree_count);
      setDisagreeCount(found.disagree_count);
      if (user) {
        setUserReaction(StorageService.getUserReaction(user.id, 'post', found.id));
      }
    }
  }, [postId, user]);

  if (!post) {
    const fallback = StorageService.getPosts()[0];
    if (!fallback) return notFound();
  }

  const activePost = post || StorageService.getPosts()[0];

  const handlePostReaction = (type: 'agree' | 'disagree') => {
    if (!user) {
      openAuthModal("google");
      return;
    }
    const res = StorageService.toggleReaction(user.id, 'post', activePost.id, type);
    setAgreeCount(res.agreeCount);
    setDisagreeCount(res.disagreeCount);
    setUserReaction(userReaction === type ? null : type);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal("google");
      return;
    }
    if (!commentInput.trim()) return;

    const newComment: Comment = {
      id: "com_" + Date.now(),
      post_id: activePost.id,
      user_id: user.id,
      author_username: user.username,
      author_name: user.display_name,
      author_avatar: user.avatar_url,
      body: commentInput.trim(),
      created_at: "Just now",
      agree_count: 0,
      disagree_count: 0
    };

    setComments([newComment, ...comments]);
    setCommentInput("");
  };

  const handleAddReply = (parentId: string) => {
    if (!user) {
      openAuthModal("google");
      return;
    }
    if (!replyInput.trim()) return;

    const newReply: Comment = {
      id: "rep_" + Date.now(),
      post_id: activePost.id,
      user_id: user.id,
      author_username: user.username,
      author_name: user.display_name,
      author_avatar: user.avatar_url,
      parent_id: parentId,
      body: replyInput.trim(),
      created_at: "Just now",
      agree_count: 0,
      disagree_count: 0
    };

    setComments(comments.map(c => {
      if (c.id === parentId) {
        return {
          ...c,
          replies: [...(c.replies || []), newReply]
        };
      }
      return c;
    }));

    setReplyingToId(null);
    setReplyInput("");
  };

  const handleShare = () => {
    setShareConfig({
      type: "debate",
      headline: activePost.title,
      main_metric: `${agreeCount} Agreed`,
      secondary_metric: `Discussion by @${activePost.author_username}`,
      contestant_name: activePost.contestant_name,
      disclaimer: "BBPulse Community Deliberation",
      url: `/discuss/${activePost.id}`
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top back button */}
      <Link
        href="/discuss"
        className="text-xs font-mono font-medium text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5] flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO DISCUSSIONS FEED</span>
      </Link>

      {/* Main Post Article Card */}
      <article className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 sm:p-8 shadow-xs space-y-6">
        {/* Author row */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E4E4E7] dark:border-[#232328]">
          <div className="flex items-center gap-3 min-w-0">
            <Link href={`/u/${activePost.author_username}`} className="shrink-0">
              <img
                src={activePost.author_avatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover border border-[#E4E4E7] dark:border-[#232328]"
              />
            </Link>
            <div className="min-w-0">
              <div className="flex items-center gap-2 truncate">
                <Link
                  href={`/u/${activePost.author_username}`}
                  className="font-mono text-xs font-bold text-[#09090B] dark:text-[#F4F4F5] hover:text-[#FF4500] dark:hover:text-[#FF4500] truncate"
                >
                  @{activePost.author_username}
                </Link>
                <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] shrink-0">•</span>
                <span className="font-mono text-xs text-[#71717A] dark:text-[#A1A1AA] shrink-0">{activePost.created_at}</span>
              </div>
              {activePost.contestant_name && (
                <div className="text-xs text-[#71717A] dark:text-[#A1A1AA] truncate">
                  Tagged Housemate: <strong className="text-[#09090B] dark:text-[#F4F4F5] font-serif">{activePost.contestant_name}</strong>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-[#F4F4F5] dark:bg-[#1A1A1E] text-[#71717A] dark:text-[#A1A1AA] border border-[#E4E4E7] dark:border-[#232328]">
              {activePost.category}
            </span>
            <button
              onClick={() => setIsReportOpen(true)}
              className="p-1.5 text-[#71717A] hover:text-[#FF4500] dark:text-[#A1A1AA] dark:hover:text-[#FF4500] rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] transition-colors cursor-pointer"
              title="Report Post"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title & Body */}
        <div>
          <h1 className="font-serif italic font-normal text-2xl sm:text-3xl text-[#09090B] dark:text-[#F4F4F5] leading-tight">
            {activePost.title}
          </h1>
          <div className="text-sm text-[#09090B] dark:text-[#F4F4F5] leading-relaxed mt-4 whitespace-pre-line font-normal">
            {activePost.body}
          </div>
        </div>

        {/* Image attachment if meme */}
        {activePost.image_url && (
          <div className="rounded-lg overflow-hidden border border-[#E4E4E7] dark:border-[#232328]">
            <img src={activePost.image_url} alt="" className="w-full object-cover" />
          </div>
        )}

        {/* Post Reactions & Share */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-[#E4E4E7] dark:border-[#232328]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePostReaction('agree')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-mono transition-all cursor-pointer active:scale-95 ${
                userReaction === 'agree'
                  ? "border-[#10B981] bg-[#10B981]/10 text-[#10B981] font-bold"
                  : "border-[#E4E4E7] dark:border-[#232328] text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#F4F4F5]"
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Agree ({agreeCount})</span>
            </button>

            <button
              onClick={() => handlePostReaction('disagree')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-mono transition-all cursor-pointer active:scale-95 ${
                userReaction === 'disagree'
                  ? "border-[#FF4500] bg-[#FF4500]/10 text-[#FF4500] font-bold"
                  : "border-[#E4E4E7] dark:border-[#232328] text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#F4F4F5]"
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>Disagree ({disagreeCount})</span>
            </button>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F4F4F5] dark:bg-[#1A1A1E] hover:bg-[#E4E4E7] dark:hover:bg-[#232328] border border-[#E4E4E7] dark:border-[#232328] text-[#09090B] dark:text-[#F4F4F5] rounded-md text-xs font-mono font-medium transition-all cursor-pointer active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Dispatch Card</span>
          </button>
        </div>
      </article>

      {/* Threaded Community Responses */}
      <section className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-5 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] dark:border-[#232328]">
          <h2 className="font-serif italic font-normal text-base sm:text-lg text-[#09090B] dark:text-[#F4F4F5] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#FF4500]" />
            <span>Responses & Deliberation ({comments.length})</span>
          </h2>
          <span className="font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA]">VERIFIED CITIZEN DISCOURSE</span>
        </div>

        {/* Add Comment Input */}
        <form onSubmit={handleAddComment} className="flex gap-2">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder={user ? "Write your respectful response..." : "Sign in with Google to respond..."}
            className="flex-1 px-3.5 py-2.5 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] focus:border-[#FF4500] dark:focus:border-[#FF4500] focus:bg-white dark:focus:bg-[#141416] rounded-md text-xs outline-hidden text-[#09090B] dark:text-[#F4F4F5] placeholder:text-[#A1A1AA]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-[#09090B] dark:bg-[#F4F4F5] hover:bg-[#FF4500] dark:hover:bg-[#FF4500] active:scale-95 text-white dark:text-[#09090B] dark:hover:text-white text-xs font-mono font-medium rounded-md flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reply</span>
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-4 pt-2">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              <div className="p-3.5 sm:p-4 bg-[#F4F4F5] dark:bg-[#1A1A1E] rounded-lg border border-[#E4E4E7] dark:border-[#232328] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={comment.author_avatar}
                      alt=""
                      className="w-6 h-6 rounded-full object-cover border border-[#E4E4E7] dark:border-[#232328] shrink-0"
                    />
                    <Link
                      href={`/u/${comment.author_username}`}
                      className="font-mono text-xs font-bold text-[#09090B] dark:text-[#F4F4F5] hover:text-[#FF4500] dark:hover:text-[#FF4500] truncate"
                    >
                      @{comment.author_username}
                    </Link>
                    <span className="font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA] shrink-0">• {comment.created_at}</span>
                  </div>

                  <button
                    onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                    className="font-mono text-[11px] font-semibold text-[#FF4500] hover:underline cursor-pointer shrink-0 ml-2"
                  >
                    Reply
                  </button>
                </div>

                <p className="text-xs text-[#09090B] dark:text-[#F4F4F5] leading-relaxed">
                  {comment.body}
                </p>

                <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3 text-[#10B981]" />
                    <span>{comment.agree_count}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsDown className="w-3 h-3 text-[#FF4500]" />
                    <span>{comment.disagree_count}</span>
                  </span>
                </div>
              </div>

              {/* Inline Reply Form */}
              {replyingToId === comment.id && (
                <div className="pl-3 sm:pl-6 flex gap-2">
                  <input
                    type="text"
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder={`Reply to @${comment.author_username}...`}
                    className="flex-1 px-3.5 py-2 bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] focus:border-[#FF4500] rounded-md text-xs outline-hidden text-[#09090B] dark:text-[#F4F4F5]"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddReply(comment.id)}
                    className="px-3.5 py-2 bg-[#FF4500] text-white text-xs font-mono font-medium rounded-md active:scale-95 transition-all cursor-pointer"
                  >
                    Reply
                  </button>
                </div>
              )}

              {/* Nested replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="pl-3 sm:pl-6 border-l-2 border-[#E4E4E7] dark:border-[#232328] space-y-2 ml-2 sm:ml-4">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="p-3 bg-white dark:bg-[#141416] rounded-md border border-[#E4E4E7] dark:border-[#232328] space-y-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={reply.author_avatar}
                          alt=""
                          className="w-5 h-5 rounded-full object-cover border border-[#E4E4E7] dark:border-[#232328] shrink-0"
                        />
                        <Link
                          href={`/u/${reply.author_username}`}
                          className="font-mono text-xs font-bold text-[#09090B] dark:text-[#F4F4F5] hover:text-[#FF4500] dark:hover:text-[#FF4500] truncate"
                        >
                          @{reply.author_username}
                        </Link>
                        <span className="font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA] shrink-0">• {reply.created_at}</span>
                      </div>
                      <p className="text-xs text-[#09090B] dark:text-[#F4F4F5] leading-relaxed">
                        {reply.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      {isReportOpen && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          targetType="post"
          targetId={activePost.id}
          targetAuthor={activePost.author_username}
          contentSnippet={activePost.title}
        />
      )}

      {shareConfig && (
        <ShareModal
          isOpen={!!shareConfig}
          onClose={() => setShareConfig(null)}
          config={shareConfig}
        />
      )}
    </div>
  );
}
