"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ChatRoom, ChatMessage } from "@/types";
import {
  MessageSquare,
  Send,
  Users,
  Radio,
  Sparkles,
  Database,
  CheckCircle2,
  Clock,
  Flame,
  ShieldAlert
} from "lucide-react";

export default function ChatsPage() {
  const { user, openAuthModal } = useAuth();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [dbSource, setDbSource] = useState<string>("connecting");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Fetch chat rooms
  useEffect(() => {
    async function loadRooms() {
      try {
        const res = await fetch("/api/chats");
        const data = await res.json();
        if (data.rooms && data.rooms.length > 0) {
          setRooms(data.rooms);
          setActiveRoomId(data.rooms[0].id);
          setDbSource(data.source || "neon");
        }
      } catch (err) {
        console.error("Failed to load chat rooms:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadRooms();
  }, []);

  // Fetch messages for active room
  useEffect(() => {
    if (!activeRoomId) return;
    async function loadMessages() {
      try {
        const res = await fetch(`/api/chats?roomId=${activeRoomId}`);
        const data = await res.json();
        if (data.messages) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    }
    loadMessages();
  }, [activeRoomId]);

  // Scroll to bottom of message container only when new messages arrive (without moving window)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    if (!user) {
      openAuthModal("google");
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: activeRoomId,
          userId: user.id,
          message: newMessage.trim()
        })
      });
      const data = await res.json();
      if (data.message) {
        setMessages(prev => [...prev, data.message]);
        setNewMessage("");
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setIsSending(false);
    }
  };

  const activeRoom = rooms.find(r => r.id === activeRoomId) || rooms[0];

  return (
    <div className="max-w-[1180px] mx-auto space-y-6">
      {/* Editorial Header */}
      <div className="pb-6 border-b border-[#E4E4E7] dark:border-[#232328]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-[#FF4500] uppercase font-bold">
                COMMUNITY LIVE CONVERSATIONS
              </span>
              <span className="text-xs text-[#71717A] dark:text-[#A1A1AA]">•</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                NEON POSTGRESQL LIVE
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-normal text-[#09090B] dark:text-[#F4F4F5] mt-1.5">
              Live Fan Lounges & <span className="italic">Chats</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] mt-1">
              Real-time audience room debates, episode commentary, and alliance discussions powered by Neon Serverless Postgres.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <Link
              href="/upcoming"
              className="px-3 py-1.5 rounded-md border border-[#E4E4E7] dark:border-[#232328] hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] text-[#09090B] dark:text-[#F4F4F5] transition-colors"
            >
              Upcoming Schedule →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Chat Rooms Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] dark:border-[#232328]">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#09090B] dark:text-[#F4F4F5]">
              Active Channels
            </span>
            <span className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
              {rooms.length} Channels
            </span>
          </div>

          <div className="space-y-1.5">
            {rooms.map(room => (
              <button
                key={room.id}
                onClick={() => setActiveRoomId(room.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                  activeRoomId === room.id
                    ? "bg-[#09090B] text-white dark:bg-[#F4F4F5] dark:text-[#09090B] border-transparent font-medium shadow-xs"
                    : "border-transparent hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1E] text-[#09090B] dark:text-[#F4F4F5]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{room.name}</span>
                  </div>
                  {room.member_count && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      activeRoomId === room.id
                        ? "bg-white/20 text-white dark:bg-black/10 dark:text-black"
                        : "bg-[#F4F4F5] dark:bg-[#1A1A1E] text-[#71717A]"
                    }`}>
                      {room.member_count}
                    </span>
                  )}
                </div>
                {room.description && (
                  <p className={`text-[11px] mt-1 line-clamp-1 ${
                    activeRoomId === room.id ? "text-white/80 dark:text-black/80" : "text-[#71717A] dark:text-[#A1A1AA]"
                  }`}>
                    {room.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Message Stream & Input (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl flex flex-col h-[600px] shadow-xs overflow-hidden">
          {/* Channel Header */}
          <div className="p-4 border-b border-[#E4E4E7] dark:border-[#232328] flex items-center justify-between bg-[#F4F4F5]/50 dark:bg-[#1A1A1E]/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base text-[#09090B] dark:text-[#F4F4F5]">
                  #{activeRoom?.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-0.5 line-clamp-1">
                {activeRoom?.description}
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] hidden sm:inline">
              Messages Persisted
            </span>
          </div>

          {/* Messages Stream */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length > 0 ? (
              messages.map(msg => (
                <div key={msg.id} className="flex items-start gap-3 group">
                  <img
                    src={msg.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                    alt={msg.display_name || "User"}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover shrink-0 border-2 border-[#E4E4E7] dark:border-[#27272A] shadow-2xs"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold text-[#09090B] dark:text-[#F4F4F5]">
                        {msg.display_name || msg.username || "Verified Fan"}
                      </span>
                      <span className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-[#09090B] dark:text-[#E4E4E7] leading-relaxed bg-[#F4F4F5] dark:bg-[#1A1A1E] p-2.5 rounded-lg inline-block max-w-full break-words">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-2 text-[#71717A] dark:text-[#A1A1AA]">
                <MessageSquare className="w-8 h-8 stroke-1 text-[#71717A]" />
                <p className="text-xs font-medium">No messages yet in this lounge.</p>
                <p className="text-[11px] max-w-xs">Be the first to share your analysis or reaction.</p>
              </div>
            )}
          </div>

          {/* Message Input Bar */}
          <div className="p-3 border-t border-[#E4E4E7] dark:border-[#232328] bg-white dark:bg-[#141416]">
            {user ? (
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Post message to #${activeRoom?.name}...`}
                  autoComplete="off"
                  enterKeyHint="send"
                  className="flex-1 text-base sm:text-xs px-3.5 py-2.5 bg-[#F4F4F5] dark:bg-[#1A1A1E] border border-[#E4E4E7] dark:border-[#232328] rounded-md outline-hidden text-[#09090B] dark:text-[#F4F4F5] focus:border-[#FF4500] dark:focus:border-[#FF4500] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isSending}
                  className="px-4 py-2.5 bg-[#FF4500] hover:bg-[#E03D00] disabled:opacity-50 text-white rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between p-2 text-xs bg-[#F4F4F5] dark:bg-[#1A1A1E] rounded-md">
                <span className="text-[#71717A] dark:text-[#A1A1AA]">
                  Sign in with Google to post messages and participate in live chats.
                </span>
                <button
                  onClick={() => openAuthModal("google")}
                  className="px-3 py-1 bg-[#09090B] dark:bg-[#F4F4F5] text-white dark:text-[#09090B] rounded text-xs font-mono font-semibold"
                >
                  Authenticate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
