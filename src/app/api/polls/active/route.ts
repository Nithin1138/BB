import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";
import { PollRepository, isDbConfigured } from "@/lib/db";
import { INITIAL_POLL } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  try {
    // 1. Identify user from session cookie or query param
    const sessionCookie = req.cookies.get("bbpulse_session")?.value;
    let userId: string | undefined = undefined;

    if (sessionCookie) {
      const payload = verifySessionToken(sessionCookie);
      if (payload?.userId) {
        userId = payload.userId;
      }
    }

    if (!userId) {
      const { searchParams } = new URL(req.url);
      userId = searchParams.get("userId") || undefined;
    }

    // 2. Fetch from Neon PostgreSQL
    if (isDbConfigured) {
      const data = await PollRepository.getActivePoll(userId);
      if (data) {
        return NextResponse.json({
          success: true,
          poll: data.poll,
          userVote: data.userVote,
          isLiveDb: true
        });
      }
    }

    // 3. Fallback to mock poll if DB not ready
    return NextResponse.json({
      success: true,
      poll: INITIAL_POLL,
      userVote: null,
      isLiveDb: false
    });
  } catch (err) {
    console.error("[Polls API] Error fetching active poll:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch active poll.", poll: INITIAL_POLL },
      { status: 500 }
    );
  }
}
