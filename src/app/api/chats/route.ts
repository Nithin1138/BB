import { NextRequest, NextResponse } from "next/server";
import { ChatRepository, isDbConfigured } from "@/lib/db";
import { ChatRoom, ChatMessage } from "@/types";

// Default fallback chat rooms
const DEFAULT_ROOMS: ChatRoom[] = [
  {
    id: "room-broadcast",
    name: "Live Broadcast Lounge",
    slug: "live-broadcast",
    description: "Real-time discussion during daily 23:00 IST Star Maa & Hotstar broadcasts",
    room_type: "live_episode",
    is_active: true,
    member_count: 1420
  },
  {
    id: "room-debate",
    name: "Housemates & Strategy Debate",
    slug: "general-debate",
    description: "Contestant alliances, physical task disputes, and gameplay analysis",
    room_type: "debate",
    is_active: true,
    member_count: 980
  },
  {
    id: "room-eviction",
    name: "Week 4 Eviction Watch",
    slug: "week-4-eviction",
    description: "Ballot forecasts and fan discussions for the 8 nominated housemates",
    room_type: "general",
    is_active: true,
    member_count: 2310
  }
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  // If roomId is provided, fetch messages for that room
  if (roomId) {
    if (isDbConfigured) {
      const messages = await ChatRepository.getMessages(roomId, 50);
      return NextResponse.json({ messages, source: "neon" });
    }

    // Default sample messages
    const sampleMessages: ChatMessage[] = [
      {
        id: "msg-1",
        room_id: roomId,
        user_id: "u-1",
        username: "sivaji_fan",
        display_name: "Sivaji Army",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        message: "Week 4 public voting is extremely tight between Thrigun and Varshini.",
        created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString()
      },
      {
        id: "msg-2",
        room_id: roomId,
        user_id: "u-2",
        username: "bb_analyst",
        display_name: "Telugu TV Pulse",
        avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        message: "Mithilesh walking away with ₹15L cash briefcase completely shifted house dynamics.",
        created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString()
      }
    ];

    return NextResponse.json({ messages: sampleMessages, source: "default" });
  }

  // Otherwise return available rooms
  if (isDbConfigured) {
    const rooms = await ChatRepository.getRooms();
    if (rooms && rooms.length > 0) {
      return NextResponse.json({ rooms, source: "neon" });
    }
  }

  return NextResponse.json({ rooms: DEFAULT_ROOMS, source: "default" });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { roomId, userId, message } = body;

    if (!roomId || !userId || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields (roomId, userId, message)" }, { status: 400 });
    }

    if (isDbConfigured) {
      const created = await ChatRepository.postMessage(roomId, userId, message.trim());
      if (created) {
        return NextResponse.json({ message: created, source: "neon" });
      }
    }

    // Local fallback message echo
    const fallbackMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      room_id: roomId,
      user_id: userId,
      username: "you",
      display_name: "Verified Voter",
      message: message.trim(),
      created_at: new Date().toISOString()
    };

    return NextResponse.json({ message: fallbackMessage, source: "local" });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
