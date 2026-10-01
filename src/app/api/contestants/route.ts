import { NextResponse } from "next/server";
import { WikipediaSyncService } from "@/lib/wikipedia-sync";
import { INITIAL_CONTESTANTS } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dbContestants = await WikipediaSyncService.getContestants();
    if (dbContestants && dbContestants.length > 0) {
      // Index mock metadata by id, slug, and name
      const mockMap = new Map<string, any>();
      INITIAL_CONTESTANTS.forEach(c => {
        mockMap.set(c.id, c);
        mockMap.set(c.slug.toLowerCase(), c);
        mockMap.set(c.name.toLowerCase(), c);
      });

      const contestants = dbContestants.map((dbRow: any) => {
        const rowSlug = (dbRow.slug || "").toLowerCase();
        const rowName = (dbRow.name || "").toLowerCase();
        const mock = mockMap.get(dbRow.id) || mockMap.get(rowSlug) || mockMap.get(rowName) || {};
        return {
          id: dbRow.id,
          name: dbRow.name,
          telugu_name: dbRow.telugu_name || (mock as any).telugu_name || "",
          slug: dbRow.slug,
          avatar_url: dbRow.avatar_url,
          profession: dbRow.profession || (mock as any).profession || "Housemate",
          status: dbRow.status,
          votes_count: Number(dbRow.votes_count || (mock as any).votes_count || 0),
          pulse_score: Number(dbRow.pulse_score || (mock as any).pulse_score || 60),
          special_power: dbRow.special_power || (mock as any).special_power || null,
          short_bio: dbRow.short_bio || (mock as any).short_bio || "",
          quote: dbRow.quote || (mock as any).quote || "",
          trend_direction: (mock as any).trend_direction || "neutral",
          trend_delta: (mock as any).trend_delta || "+0.0%",
          sparkline: (mock as any).sparkline || [60, 62, 61, 63, 62, 64, 65],
          exit_day: dbRow.exit_day || (mock as any).exit_day || undefined,
          exit_reason: dbRow.exit_reason || (mock as any).exit_reason || undefined
        };
      });

      return NextResponse.json({
        success: true,
        contestants,
        source: "neon_postgres_wikipedia_synced"
      });
    }

    return NextResponse.json({
      success: true,
      contestants: INITIAL_CONTESTANTS,
      source: "mock_fallback"
    });
  } catch (err) {
    console.error("[Contestants API] Error:", err);
    return NextResponse.json({
      success: true,
      contestants: INITIAL_CONTESTANTS,
      source: "mock_fallback"
    });
  }
}
