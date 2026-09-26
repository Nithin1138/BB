import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, getAuthConfig } from "@/lib/auth";
import { UserRepository, isDbConfigured } from "@/lib/db";
import { User } from "@/types";

export async function GET(req: NextRequest) {
  const { isGoogleConfigured } = getAuthConfig();
  const sessionCookie = req.cookies.get("bbpulse_session")?.value;

  if (!sessionCookie) {
    return NextResponse.json({ user: null, isGoogleConfigured });
  }

  const payload = verifySessionToken(sessionCookie);
  if (!payload) {
    return NextResponse.json({ user: null, isGoogleConfigured });
  }

  // If DB is configured, fetch latest profile info
  let user: User | null = null;
  if (isDbConfigured) {
    user = await UserRepository.findById(payload.userId);
  }

  // Fallback to session payload
  if (!user) {
    user = {
      id: payload.userId,
      email_private: payload.email,
      username: payload.username,
      display_name: payload.displayName,
      avatar_url: payload.avatarUrl,
      bio: "Bigg Boss Telugu Community Member",
      role: payload.role || "user",
      age_confirmed: true,
      joined_date: new Date().toISOString().split("T")[0],
      followed_contestants: [],
      blocked_users: [],
      predictions_count: 0,
      accuracy_rate: 85
    };
  }

  return NextResponse.json({ user, isGoogleConfigured });
}
