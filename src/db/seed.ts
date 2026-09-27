import { neon } from "@neondatabase/serverless";
import * as fs from "fs";

// Load .env.local if DATABASE_URL not already in environment
if (!process.env.DATABASE_URL && fs.existsSync(".env.local")) {
  const envContent = fs.readFileSync(".env.local", "utf8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value.trim();
    }
  }
}

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const sql = neon(dbUrl);

const CONTESTANTS_DATA = [
  {
    name: "Thrigun (Adith Eswaran)",
    telugu_name: "త్రిగుణ్ (ఆదిత్ ఈశ్వరన్)",
    slug: "thrigun",
    avatar_url: "https://b374dd683233.blob.upstash.io/THRIGUN.jpg",
    profession: "Film Actor",
    short_bio: "Acclaimed actor known for lead and supporting roles in Katha, Chennai Love Story, and PSV Garuda Vega. Strategic, composed, and holder of the Takeover special power.",
    status: "nominated",
    pulse_score: 78.0,
    pulse_change: 6.4,
    quote: "In this house, staying grounded while others play to the gallery is the real strength."
  },
  {
    name: "Varshini Sounderajan",
    telugu_name: "వర్షిణి సౌందరరాజన్",
    slug: "varshini-sounderajan",
    avatar_url: "https://b374dd683233.blob.upstash.io/VARSHINI.jpg",
    profession: "Actress & Television Host",
    short_bio: "Celebrated anchor and actress famous for Pelli Gola web series and Dhee championship. Fearless, outspoken, and holder of the Grab Any Win power.",
    status: "nominated",
    pulse_score: 72.0,
    pulse_change: 4.8,
    quote: "You can assign me house penalties or nominations, but you cannot shake my spirit."
  },
  {
    name: "Nihar Mukesh Gowda",
    telugu_name: "నిహార్ ముఖేష్ గౌడ",
    slug: "nihar-mukesh-gowda",
    avatar_url: "https://b374dd683233.blob.upstash.io/MUKESH.jpg",
    profession: "Television Lead Actor",
    short_bio: "Television heartthrob known for Guppedantha Manasu and Kannadathi. Current House Captain of Week 4 after winning the captaincy task with Apoorva.",
    status: "captain",
    pulse_score: 84.0,
    pulse_change: 9.1,
    quote: "Captaincy is not a throne to order people; it is a test of fairness under constant scrutiny."
  },
  {
    name: "Jhansi",
    telugu_name: "ఝాన్సీ",
    slug: "jhansi",
    avatar_url: "https://b374dd683233.blob.upstash.io/JHANSI.jpg",
    profession: "Veteran Anchor & Actress",
    short_bio: "Legendary Telugu television presenter with over 25 years in entertainment. Week 2 House Captain, fierce task performer, and holder of Eviction-Free shield power.",
    status: "nominated",
    pulse_score: 69.0,
    pulse_change: -1.2,
    quote: "Experience teaches you when to speak with fire and when to let others extinguish themselves."
  },
  {
    name: "Auto Ramprasad",
    telugu_name: "ఆటో రాంప్రసాద్",
    slug: "auto-ramprasad",
    avatar_url: "https://b374dd683233.blob.upstash.io/RAMPRASAD.jpg",
    profession: "Comedian & Satirist",
    short_bio: "Jabardasth comedy stalwart known for razor-sharp punchlines and spontaneous wit. Survived Week 1 mid-week eviction vote (9-4 vs Charan). Holder of Save Shield power.",
    status: "active",
    pulse_score: 74.0,
    pulse_change: 3.2,
    quote: "Life threw a punch, so I wrote ten punchlines in return."
  },
  {
    name: "Temper Vamsi",
    telugu_name: "టెంపర్ వంశీ",
    slug: "temper-vamsi",
    avatar_url: "https://b374dd683233.blob.upstash.io/VAMSI.jpg",
    profession: "Action Actor & Stunt Performer",
    short_bio: "High-voltage action performer from Puri Jagannadh's Temper and iSmart Shankar. Aggressive, emotional, and holder of Captain's Roadblock power.",
    status: "nominated",
    pulse_score: 61.0,
    pulse_change: -3.5,
    quote: "I fight with everything I have. If that makes me extreme, so be it."
  },
  {
    name: "Sudheer Reddy",
    telugu_name: "సుధీర్ రెడ్డి",
    slug: "sudheer-reddy",
    avatar_url: "https://b374dd683233.blob.upstash.io/SUDHEER.jpg",
    profession: "Social Media Commentator",
    short_bio: "Outspoken digital creator known for hard-hitting reviews and unfiltered opinions. Won the Curse of Nomination power in Week 1 task showdown.",
    status: "nominated",
    pulse_score: 63.0,
    pulse_change: -0.8,
    quote: "Truth is always unpalatable in a house built on diplomacy."
  },
  {
    name: "Charan Mahadev",
    telugu_name: "చరణ్ మహాదేవ్",
    slug: "charan-mahadev",
    avatar_url: "https://b374dd683233.blob.upstash.io/CHARAN.jpg",
    profession: "Fitness Icon & Model",
    short_bio: "Mr. India finalist and celebrated fitness model. Evicted Day 4, then brought back Day 11 by overwhelming public vote in the Power of People twist.",
    status: "nominated",
    pulse_score: 67.0,
    pulse_change: 8.5,
    quote: "The people brought me back. I play for every fan who voted to keep me in."
  },
  {
    name: "Rohit Naidu Patnam",
    telugu_name: "రోహిత్ నాయుడు పట్నం",
    slug: "rohit-naidu-patnam",
    avatar_url: "https://b374dd683233.blob.upstash.io/ROHIT.jpg",
    profession: "Television Actor",
    short_bio: "Popular daily serial lead known for subtle and emotional portrayals. Earned official housemate status on Day 3 by winning the opening Mahapariksha challenge.",
    status: "active",
    pulse_score: 65.0,
    pulse_change: 1.1,
    quote: "Calm water runs deep. Not every game needs loud shouting."
  },
  {
    name: "Debjani Modak",
    telugu_name: "దేబ్జాని మోదక్",
    slug: "debjani-modak",
    avatar_url: "https://b374dd683233.blob.upstash.io/DHEBJANI.jpg",
    profession: "Film & Serial Actress",
    short_bio: "Talented Bengali and South Indian actress who starred in Ennenno Janmala Bandham. Known for poised composure and strategic alliance building.",
    status: "active",
    pulse_score: 58.0,
    pulse_change: 0.4,
    quote: "Dignity is not weakness; it is the hardest thing to hold on to in here."
  },
  {
    name: "Aman Masud",
    telugu_name: "అమన్ మసూద్",
    slug: "aman-masud",
    avatar_url: "https://b374dd683233.blob.upstash.io/AMAN.jpg",
    profession: "Fashion Designer & Influencer",
    short_bio: "High-fashion couture stylist and social influencer. Creative, expressive, and nominated for Week 4 eviction.",
    status: "nominated",
    pulse_score: 52.0,
    pulse_change: -2.1,
    quote: "Originality is my currency. I won't wear a mask to please anyone."
  },
  {
    name: "Shalini Damera Patel",
    telugu_name: "శాలిని దామెర పటేల్",
    slug: "shalini-damera-patel",
    avatar_url: "https://b374dd683233.blob.upstash.io/SHALINI.jpg",
    profession: "Theatre Artist & Activist",
    short_bio: "Acclaimed theatre powerhouse known for bold stances. Used the House Duty Penalty on Varshini in Week 1. Currently in Week 4 eviction danger.",
    status: "nominated",
    pulse_score: 50.0,
    pulse_change: -4.3,
    quote: "Rules exist to create order. If people break them, consequences must follow."
  },
  {
    name: "Naresh",
    telugu_name: "నరేష్",
    slug: "naresh",
    avatar_url: "https://b374dd683233.blob.upstash.io/NARESH.jpg",
    profession: "Folk Singer & Performer",
    short_bio: "Rooted Telangana folk artiste whose songs went viral across millions. Holder of Double Vote (2X) power.",
    status: "active",
    pulse_score: 70.0,
    pulse_change: 2.7,
    quote: "My voice comes from the red soil. I sing what the common people feel."
  },
  {
    name: "Shiva Srishti Vyakaranam",
    telugu_name: "శివ సృష్టి వ్యాకరణం",
    slug: "shiva-srishti-vyakaranam",
    avatar_url: "https://b374dd683233.blob.upstash.io/SRISHTI.jpg",
    profession: "Miss India Asia Pacific & Model",
    short_bio: "International beauty pageant winner and model. Elegant, observant, and determined contender.",
    status: "active",
    pulse_score: 59.0,
    pulse_change: 1.0,
    quote: "Grace under fire is the truest test of character."
  },
  {
    name: "Krishnudu",
    telugu_name: "కృష్ణుడు",
    slug: "krishnudu",
    avatar_url: "https://b374dd683233.blob.upstash.io/KRISHNUDU.jpg",
    profession: "Character Actor & Comedian",
    short_bio: "Beloved Tollywood actor famous for Vinayakudu and Village lo Vinayakudu. Evicted on Day 14 in Week 2 eviction.",
    status: "evicted",
    pulse_score: 45.0,
    pulse_change: 0.0,
    quote: "I gave my warmth to the house. Leaving with no regrets and pure love."
  },
  {
    name: "Chaitra Rai",
    telugu_name: "చైత్ర రాయ్",
    slug: "chaitra-rai",
    avatar_url: "https://b374dd683233.blob.upstash.io/CHAITRA%20RAI.jpg",
    profession: "Television Lead Actress",
    short_bio: "Popular serial actress known for Radhamma Kuthuru. Evicted on Day 5 after an internal 4-way housemate vote.",
    status: "evicted",
    pulse_score: 42.0,
    pulse_change: 0.0,
    quote: "Five days was short, but every hour was genuine."
  }
];

async function seed() {
  console.log("🚀 Starting BBPulse Neon DB Seed...");

  // 1. Upsert Season 10
  const seasonRows = await sql`
    INSERT INTO seasons (name, language, status, current_week, start_date, end_date)
    VALUES (
      'Bigg Boss Telugu Season 10 (Dasavatharam)',
      'Telugu',
      'active',
      4,
      '2026-09-06',
      '2026-12-20'
    )
    ON CONFLICT DO NOTHING
    RETURNING id
  `;

  let seasonId: string;
  if (seasonRows && seasonRows.length > 0) {
    seasonId = seasonRows[0].id as string;
  } else {
    const existingSeason = await sql`SELECT id FROM seasons WHERE name LIKE 'Bigg Boss Telugu Season 10%' LIMIT 1`;
    seasonId = existingSeason[0].id as string;
  }
  console.log(`✅ Season active: ${seasonId}`);

  // 2. Upsert Contestants
  const contestantMap = new Map<string, string>(); // slug -> id
  for (const c of CONTESTANTS_DATA) {
    const rows = await sql`
      INSERT INTO contestants (
        season_id, name, telugu_name, slug, avatar_url, profession, short_bio, status, pulse_score, pulse_change, quote
      ) VALUES (
        ${seasonId}, ${c.name}, ${c.telugu_name}, ${c.slug}, ${c.avatar_url}, ${c.profession}, ${c.short_bio}, ${c.status}, ${c.pulse_score}, ${c.pulse_change}, ${c.quote}
      )
      ON CONFLICT (slug) DO UPDATE SET
        avatar_url = EXCLUDED.avatar_url,
        status = EXCLUDED.status,
        pulse_score = EXCLUDED.pulse_score,
        pulse_change = EXCLUDED.pulse_change,
        updated_at = NOW()
      RETURNING id, slug
    `;
    contestantMap.set(rows[0].slug as string, rows[0].id as string);
  }
  console.log(`✅ Seeded ${contestantMap.size} contestants`);

  // 3. Upsert Week 4 Active Poll
  const pollRows = await sql`
    INSERT INTO polls (
      season_id, title, description, week_number, status, start_at, closes_at, integrity_note
    ) VALUES (
      ${seasonId},
      'Week 4 Community Eviction Poll (Dasavatharam)',
      '8 housemates face the public vote this week. Vote to save your favorite contender. (Audited Fan Ballot)',
      4,
      'active',
      NOW() - INTERVAL '2 days',
      NOW() + INTERVAL '1 day',
      'One verified vote per BBPulse account. Sourced from Wikipedia Bigg Boss 10 Dasavatharam Week 4 nominations.'
    )
    RETURNING id
  `;

  const pollId = pollRows[0].id as string;
  console.log(`✅ Active Poll created: ${pollId}`);

  // 4. Seed Poll Options for 8 Nominated Contestants
  const nominatedSlugs = [
    { slug: "thrigun", initialVotes: 8535, sort: 1 },
    { slug: "varshini-sounderajan", initialVotes: 6543, sort: 2 },
    { slug: "charan-mahadev", initialVotes: 4267, sort: 3 },
    { slug: "jhansi", initialVotes: 3414, sort: 4 },
    { slug: "temper-vamsi", initialVotes: 2276, sort: 5 },
    { slug: "sudheer-reddy", initialVotes: 1707, sort: 6 },
    { slug: "aman-masud", initialVotes: 996, sort: 7 },
    { slug: "shalini-damera-patel", initialVotes: 712, sort: 8 }
  ];

  for (const item of nominatedSlugs) {
    const cId = contestantMap.get(item.slug);
    if (!cId) continue;
    await sql`
      INSERT INTO poll_options (poll_id, contestant_id, sort_order, vote_count)
      VALUES (${pollId}, ${cId}, ${item.sort}, ${item.initialVotes})
      ON CONFLICT (poll_id, contestant_id) DO UPDATE SET
        vote_count = EXCLUDED.vote_count
    `;
  }
  console.log(`✅ Seeded 8 poll options for active poll`);

  // 5. Seed Chat Rooms
  const rooms = [
    { name: "Live Episode Chat", slug: "live-episode", desc: "Live discussion during Star Maa & Disney+ Hotstar broadcast", type: "live_episode" },
    { name: "General Fandom Lounge", slug: "general-fandom", desc: "Open discussions on strategy, nominations, and Telugu fandom", type: "general" },
    { name: "10 Special Powers Debate", slug: "dasavatharam-powers", desc: "Deep-dive analysis on Takeover, Eviction-Free, and game twists", type: "debate" },
    { name: "Week 4 Eviction Watch", slug: "eviction-watch", desc: "Tracking voting trends, danger zone, and weekend forecasts", type: "general" }
  ];

  for (const r of rooms) {
    await sql`
      INSERT INTO chat_rooms (name, slug, description, room_type, is_active)
      VALUES (${r.name}, ${r.slug}, ${r.desc}, ${r.type}, TRUE)
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description
    `;
  }
  console.log(`✅ Seeded 4 chat rooms`);

  console.log("🎉 Seed completed successfully!");
}

seed().catch(err => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
