import { NextRequest, NextResponse } from "next/server";
import { getAuthConfig, getGoogleOAuthUrl } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const returnTo = searchParams.get("returnTo") || "/";

  const { isGoogleConfigured } = getAuthConfig();

  if (!isGoogleConfigured) {
    return NextResponse.json({
      configured: false,
      message: "Google OAuth credentials (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET) need to be configured in your environment variables."
    }, { status: 503 });
  }

  const oauthUrl = getGoogleOAuthUrl(encodeURIComponent(returnTo));
  return NextResponse.redirect(oauthUrl);
}
