import { NextRequest, NextResponse } from "next/server";
import { DirectMessageRepository, isDbConfigured } from "@/lib/db";
import { DirectMessage } from "@/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
  }

  if (isDbConfigured) {
    const messages = await DirectMessageRepository.getInbox(userId);
    return NextResponse.json({ messages, source: "neon" });
  }

  // Sample fallback message
  const fallbackMessages: DirectMessage[] = [
    {
      id: "dm-1",
      sender_id: "system-mod",
      sender_name: "BBPulse Editorial Desk",
      sender_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      receiver_id: userId,
      subject: "Welcome to BBPulse Telugu Community",
      content: "Your account is verified. You can cast your daily eviction ballot, track Pulse velocity, and debate contestant tactics.",
      is_read: false,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    }
  ];

  return NextResponse.json({ messages: fallbackMessages, source: "default" });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { senderId, receiverId, subject, content } = body;

    if (!senderId || !receiverId || !content?.trim()) {
      return NextResponse.json({ error: "Missing senderId, receiverId, or content" }, { status: 400 });
    }

    if (isDbConfigured) {
      const created = await DirectMessageRepository.send({
        senderId,
        receiverId,
        subject,
        content: content.trim()
      });
      if (created) {
        return NextResponse.json({ message: created, source: "neon" });
      }
    }

    const fallback: DirectMessage = {
      id: `dm-${Date.now()}`,
      sender_id: senderId,
      receiver_id: receiverId,
      subject,
      content: content.trim(),
      is_read: false,
      created_at: new Date().toISOString()
    };

    return NextResponse.json({ message: fallback, source: "local" });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
