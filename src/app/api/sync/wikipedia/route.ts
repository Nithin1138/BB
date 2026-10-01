import { NextRequest, NextResponse } from "next/server";
import { WikipediaSyncService } from "@/lib/wikipedia-sync";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    let force = false;
    try {
      const body = await req.json();
      force = Boolean(body?.force);
    } catch {
      // empty body
    }

    const result = await WikipediaSyncService.syncNow(force);

    return NextResponse.json({
      success: true,
      message: result.hasUpdate
        ? "Successfully updated database from live Wikipedia article."
        : "Database is already synchronized with Wikipedia.",
      ...result
    });
  } catch (err: any) {
    console.error("[Wikipedia API] Sync trigger error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to sync with Wikipedia." },
      { status: 500 }
    );
  }
}
