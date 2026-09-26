import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens, getGoogleUserProfile, createSessionToken, getAuthConfig } from "@/lib/auth";
import { UserRepository, isDbConfigured } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const returnTo = state ? decodeURIComponent(state) : "/";
  const { baseUrl } = getAuthConfig();

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/?auth_error=missing_code`);
  }

  // 1. Exchange authorization code for Google tokens
  const tokenData = await exchangeCodeForTokens(code);
  if (!tokenData || !tokenData.access_token) {
    return NextResponse.redirect(`${baseUrl}/?auth_error=token_exchange_failed`);
  }

  // 2. Fetch Google profile info
  const profile = await getGoogleUserProfile(tokenData.access_token);
  if (!profile || !profile.email) {
    return NextResponse.redirect(`${baseUrl}/?auth_error=profile_fetch_failed`);
  }

  // Generate safe username from email
  const baseUsername = profile.email.split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 15);
  const username = baseUsername || `user_${profile.sub.slice(-6)}`;
  const displayName = profile.name || username;
  const avatarUrl = profile.picture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

  let userId = `usr_${profile.sub}`;

  // 3. Upsert user into Neon PostgreSQL if database is active
  if (isDbConfigured) {
    const dbUser = await UserRepository.upsert({
      auth_provider_id: `google_${profile.sub}`,
      email: profile.email,
      username,
      display_name: displayName,
      avatar_url: avatarUrl,
      role: 'user'
    });
    if (dbUser) {
      userId = dbUser.id;
    }
  }

  // 4. Create signed session cookie
  const sessionToken = createSessionToken({
    userId,
    email: profile.email,
    username,
    displayName,
    avatarUrl,
    role: 'user'
  });

  const response = NextResponse.redirect(`${baseUrl}${returnTo}`);

  // Set secure cookie
  response.cookies.set("bbpulse_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  });

  return response;
}
