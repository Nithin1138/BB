import { NextRequest } from "next/server";
import { WikipediaSyncService } from "@/lib/wikipedia-sync";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Send initial connection state
        const state = await WikipediaSyncService.getSyncState();
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "init", state, timestamp: new Date().toISOString() })}\n\n`)
        );
      } catch {
        // Continue
      }

      // Check Wikipedia revision periodically (every 15s) for live low-latency updates
      const intervalId = setInterval(async () => {
        if (req.signal.aborted) {
          clearInterval(intervalId);
          return;
        }

        try {
          const [latest, curr] = await Promise.all([
            WikipediaSyncService.checkLatestRevision(),
            WikipediaSyncService.getSyncState()
          ]);

          if (latest && curr && latest.revisionId > Number(curr.last_revision_id)) {
            // An update was made on Wikipedia! Trigger immediate sync and notify client
            const syncResult = await WikipediaSyncService.syncNow(false);
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: "wiki_update", ...syncResult })}\n\n`)
            );
          } else {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: "ping", rev: curr?.last_revision_id, timestamp: new Date().toISOString() })}\n\n`)
            );
          }
        } catch {
          // Stream error guard
        }
      }, 15000);

      req.signal.addEventListener("abort", () => {
        clearInterval(intervalId);
        try {
          controller.close();
        } catch {
          // Ignore
        }
      });
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive"
    }
  });
}
