import { neon } from "@neondatabase/serverless";
import fs from "fs";

let dbUrl = process.env.DATABASE_URL;

if (!dbUrl && fs.existsSync(".env.local")) {
  const envContent = fs.readFileSync(".env.local", "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("DATABASE_URL=")) {
      dbUrl = trimmed.substring("DATABASE_URL=".length).replace(/^["']|["']$/g, "");
      break;
    }
  }
}

if (!dbUrl) {
  console.error("DATABASE_URL not found in environment or .env.local");
  process.exit(1);
}

if (dbUrl.includes("***")) {
  console.log("\n⚠️ Notice: DATABASE_URL in .env.local contains a masked password with asterisks (***).");
  console.log("Please replace the masked asterisks with your real Neon database password in .env.local.");
  console.log("Expected format: postgresql://neondb_owner:YOUR_REAL_PASSWORD@ep-cool-wind-b4cj02bw-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require\n");
  process.exit(0);
}

let sql: ReturnType<typeof neon>;
try {
  sql = neon(dbUrl);
} catch (err: unknown) {
  console.error("\n❌ Invalid Database Connection URL:", (err as Error).message);
  console.error("Ensure your connection string includes '@ep-' between the password and the Neon host.");
  console.error("Example: postgresql://neondb_owner:PASSWORD@ep-cool-wind-b4cj02bw-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require\n");
  process.exit(1);
}

async function testConnection() {
  try {
    console.log("Connecting to Neon Postgres...");
    const result = await sql`SELECT NOW() as current_time, version() as pg_version`;
    console.log("Successfully connected to Neon Postgres!");
    console.log("Database response:", (result as unknown as Record<string, unknown>[])[0]);
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

testConnection();
