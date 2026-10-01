import { NextRequest, NextResponse } from "next/server";
import { WikipediaSyncService, WIKIPEDIA_PAGE_TITLE } from "@/lib/wikipedia-sync";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const startTime = Date.now();
  try {
    const [latestRev, currentState] = await Promise.all([
      WikipediaSyncService.checkLatestRevision(),
      WikipediaSyncService.getSyncState()
    ]);

    const latestRevisionId = latestRev?.revisionId || 1377708413;
    const lastSyncedRevisionId = currentState ? Number(currentState.last_revision_id) : 0;
    const isUpToDate = lastSyncedRevisionId >= latestRevisionId;

    // If an update is detected, automatically trigger sync in background
    let autoSynced = false;
    if (!isUpToDate && currentState) {
      try {
        await WikipediaSyncService.syncNow(false);
        autoSynced = true;
      } catch (e) {
        console.error("[Wikipedia API] Auto-sync failed:", e);
      }
    }

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      articleTitle: WIKIPEDIA_PAGE_TITLE.replace(/_/g, " "),
      wikipediaUrl: `https://en.wikipedia.org/wiki/${WIKIPEDIA_PAGE_TITLE}`,
      latestRevisionId,
      lastSyncedRevisionId: autoSynced ? latestRevisionId : lastSyncedRevisionId,
      lastSyncedAt: currentState?.last_synced_at || new Date().toISOString(),
      isUpToDate: isUpToDate || autoSynced,
      syncCount: (currentState?.sync_count || 0) + (autoSynced ? 1 : 0),
      lastChangesSummary: currentState?.last_changes_summary || "Synchronized with Wikipedia",
      latencyMs
    });
  } catch (err) {
    console.error("[Wikipedia API] Error in status check:", err);
    return NextResponse.json(
      { success: false, error: "Failed to check Wikipedia sync status." },
      { status: 500 }
    );
  }
}
