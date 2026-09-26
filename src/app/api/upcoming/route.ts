import { NextRequest, NextResponse } from "next/server";
import { UpcomingRepository, isDbConfigured } from "@/lib/db";
import { UpcomingEvent } from "@/types";

// Default upcoming schedule
const DEFAULT_UPCOMING: UpcomingEvent[] = [
  {
    id: "evt-eviction-wk4",
    title: "Sunday Eviction Verdict with Host Nagarjuna",
    event_type: "eviction",
    scheduled_time: "2026-09-27T21:00:00Z",
    description: "Nagarjuna Akkineni announces the Week 4 eviction results on Star Maa & Disney+ Hotstar. 8 housemates currently face elimination.",
    venue_or_broadcast: "Star Maa & Disney+ Hotstar (21:00 IST)",
    importance: "critical",
    status: "scheduled",
    action_url: "/vote"
  },
  {
    id: "evt-captaincy-wk5",
    title: "Week 5 Captaincy Arena Challenge",
    event_type: "captaincy_task",
    scheduled_time: "2026-09-29T16:30:00Z",
    description: "Physical and endurance trial determining who succeeds Mukesh as house captain.",
    venue_or_broadcast: "Main Activity Arena",
    importance: "high",
    status: "scheduled",
    action_url: "/contestants"
  },
  {
    id: "evt-nominations-wk5",
    title: "Week 5 Closed-Door Nominations Ceremony",
    event_type: "nomination_cycle",
    scheduled_time: "2026-09-30T17:00:00Z",
    description: "Housemates enter the Confession Room to cast their two confidential nomination ballots for Week 5.",
    venue_or_broadcast: "Confession Room",
    importance: "normal",
    status: "scheduled",
    action_url: "/contestants/nominations"
  },
  {
    id: "evt-dasavatharam-pwr",
    title: "Dasavatharam Special Power Phase 2 Activation",
    event_type: "special_task",
    scheduled_time: "2026-10-02T18:00:00Z",
    description: "Bigg Boss unseals the remaining special power cards. Captaincy roadblock and eviction-free shields come into play.",
    venue_or_broadcast: "Bigg Boss Garden Arena",
    importance: "high",
    status: "scheduled",
    action_url: "/contestants/nominations"
  }
];

export async function GET() {
  if (isDbConfigured) {
    const events = await UpcomingRepository.getAll(20);
    if (events && events.length > 0) {
      // Deduplicate by title to ensure clean single representation
      const seen = new Set<string>();
      const cleanEvents = events.filter(e => {
        const key = e.title.trim().toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      return NextResponse.json({ events: cleanEvents, source: "neon" });
    }
  }

  return NextResponse.json({ events: DEFAULT_UPCOMING, source: "default" });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, event_type, scheduled_time, description, venue_or_broadcast, importance, action_url } = body;

    if (!title || !event_type || !scheduled_time || !description) {
      return NextResponse.json({ error: "Missing required event fields" }, { status: 400 });
    }

    if (isDbConfigured) {
      const created = await UpcomingRepository.create({
        title,
        event_type,
        scheduled_time,
        description,
        venue_or_broadcast,
        importance,
        action_url
      });
      if (created) {
        return NextResponse.json({ event: created, source: "neon" });
      }
    }

    const fallbackEvent: UpcomingEvent = {
      id: `evt-${Date.now()}`,
      title,
      event_type,
      scheduled_time,
      description,
      venue_or_broadcast: venue_or_broadcast || "Star Maa & Disney+ Hotstar",
      importance: importance || "normal",
      status: "scheduled",
      action_url
    };

    return NextResponse.json({ event: fallbackEvent, source: "local" });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
