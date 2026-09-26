import { NextRequest, NextResponse } from "next/server";
import { UserSettingsRepository, isDbConfigured } from "@/lib/db";
import { UserSettings } from "@/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
  }

  if (isDbConfigured) {
    const settings = await UserSettingsRepository.getByUserId(userId);
    if (settings) {
      return NextResponse.json({ settings, source: "neon" });
    }
  }

  // Fallback defaults
  const defaultSettings: UserSettings = {
    user_id: userId,
    theme: "system",
    email_notifications: true,
    in_app_notifications: true,
    poll_reminder: true,
    episode_reminder: true,
    show_predictions_publicly: true,
    language: "en"
  };

  return NextResponse.json({ settings: defaultSettings, source: "default" });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, ...settings } = body;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId in request body" }, { status: 400 });
    }

    if (isDbConfigured) {
      const success = await UserSettingsRepository.update(userId, settings);
      return NextResponse.json({ success, source: "neon" });
    }

    return NextResponse.json({
      success: true,
      message: "Settings saved locally (Neon database credentials require real password)",
      source: "local"
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
