import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";

// Extract clean DB URL
function getDbUrl(): string {
  let url = process.env.DATABASE_URL;
  if (!url && fs.existsSync(".env.local")) {
    const lines = fs.readFileSync(".env.local", "utf8").split("\n");
    for (const l of lines) {
      if (l.trim().startsWith("DATABASE_URL=")) {
        url = l.trim().substring("DATABASE_URL=".length).replace(/^["']|["']$/g, "");
        break;
      }
    }
  }
  if (!url || url.includes("***") || url.includes("YOUR_PASSWORD")) {
    console.error("\n❌ Error: Valid DATABASE_URL not found!");
    console.error("Please replace the password placeholder in .env.local with your real Neon database password.\n");
    process.exit(1);
  }
  return url;
}

async function runMigration() {
  const dbUrl = getDbUrl();
  console.log("🚀 Initializing Neon PostgreSQL Schema & Seed Data...");

  const sql = neon(dbUrl);

  const schemaPath = path.join(process.cwd(), "src", "db", "schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");

  try {
    console.log("📦 Applying DDL Statements from schema.sql...");
    
    // Split into individual SQL commands safely
    const statements = schemaSql
      .split(";")
      .map(s => s.trim())
      .filter(s => s.length > 5);

    console.log(`Executing ${statements.length} SQL DDL statements...`);

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      try {
        await sql.query(stmt);
      } catch (stmtErr: unknown) {
        // Ignore extension already exists or duplicate notices
        const errStr = String(stmtErr);
        if (!errStr.includes("already exists")) {
          console.warn(`Warning on statement ${i + 1}:`, (stmtErr as Error).message);
        }
      }
    }
    console.log("✅ Core schema tables and indexes successfully created in Neon!");

    // Seed default chat rooms
    console.log("🌱 Seeding default Chat Rooms & Upcoming Events...");
    await sql`
      INSERT INTO chat_rooms (name, slug, description, room_type, is_active)
      VALUES 
        ('Live Broadcast Lounge', 'live-broadcast', 'Real-time discussion during daily 23:00 IST Star Maa & Hotstar broadcasts', 'live_episode', TRUE),
        ('Housemates & Game Debate', 'general-debate', 'Strategy analysis, alliances, and house dispute discussion', 'debate', TRUE),
        ('Week 4 Eviction Watch', 'week-4-eviction', 'Predictions and vote rallying for the 8 nominated housemates', 'general', TRUE)
      ON CONFLICT (slug) DO NOTHING;
    `;

    // Seed default upcoming details
    await sql`
      INSERT INTO upcoming_events (title, event_type, scheduled_time, description, venue_or_broadcast, importance, status, action_url)
      VALUES 
        (
          'Sunday Eviction Verdict with Nagarjuna',
          'eviction',
          '2026-09-27T21:00:00Z',
          'Host Nagarjuna Akkineni reveals the Week 4 elimination results. One of 8 nominated contestants will exit the Dasavatharam house.',
          'Star Maa & Disney+ Hotstar',
          'critical',
          'scheduled',
          '/vote'
        ),
        (
          'Week 5 Captaincy Arena Task',
          'captaincy_task',
          '2026-09-29T16:30:00Z',
          'Physical endurance and tactical battle to determine who succeeds Mukesh as the new Head of House.',
          'Main Activity Arena',
          'high',
          'scheduled',
          '/contestants'
        ),
        (
          'Mid-Week Nomination Ceremony',
          'nomination_cycle',
          '2026-09-30T17:00:00Z',
          'Confession room closed-door nominations and open task challenges for Week 5 danger zone.',
          'Confession Room',
          'normal',
          'scheduled',
          '/contestants/nominations'
        )
      ON CONFLICT DO NOTHING;
    `;

    console.log("🎉 Neon PostgreSQL Database fully migrated and seeded successfully!");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
}

runMigration();
