import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { verifySessionToken } from "@/lib/auth";
import { PollRepository, isDbConfigured } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pollId, optionId } = body || {};

    if (!pollId || !optionId) {
      return NextResponse.json(
        { success: false, error: "pollId and optionId are required." },
        { status: 400 }
      );
    }

    // 1. Identify user from session cookie or body
    let userId: string | undefined = undefined;
    const sessionCookie = req.cookies.get("bbpulse_session")?.value;

    if (sessionCookie) {
      const payload = verifySessionToken(sessionCookie);
      if (payload?.userId) {
        userId = payload.userId;
      }
    }

    if (!userId && body?.userId) {
      userId = body.userId;
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Verified account required. Please sign in or verify your email to vote." },
        { status: 401 }
      );
    }

    // 2. Generate anonymized IP hash for duplicate protection
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "unknown";
    const ipHash = crypto
      .createHash("sha256")
      .update(ip + (process.env.SESSION_SECRET || "bbpulse"))
      .digest("hex")
      .slice(0, 32);

    // 3. Submit vote to Neon PostgreSQL
    if (isDbConfigured) {
      const result = await PollRepository.submitVote({
        pollId,
        userIdOrEmail: userId,
        optionId,
        ipHash
      });

      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            error: result.error || "Unable to cast vote.",
            alreadyVoted: Boolean(result.alreadyVoted),
            userVote: result.userVote
          },
          { status: result.alreadyVoted ? 409 : 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Your verified ballot has been recorded in the database.",
        poll: result.poll,
        userVote: result.userVote
      });
    }

    return NextResponse.json(
      { success: false, error: "Database not configured." },
      { status: 503 }
    );
  } catch (err) {
    console.error("[Polls API] Error recording vote:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while casting your ballot." },
      { status: 500 }
    );
  }
}
