import { INITIAL_CONTESTANTS } from "@/lib/mock-data";
import type { Contestant } from "@/types";

export const portraits = [
  { slug: "thrigun", name: "Thrigun", image: "thrigun", note: "Quiet confidence. Loud impact.", color: "peach" },
  { slug: "varshini-sounderajan", name: "Varshini", image: "varshini", note: "A spirit that won’t be silenced.", color: "lavender" },
  { slug: "nihar-mukesh-gowda", name: "Mukesh", image: "mukesh", note: "Every move tells a story.", color: "sage" },
  { slug: "jhansi", name: "Jhansi", image: "jhansi", note: "A voice straight from the heart.", color: "yellow" },
];

export const housemates = portraits.flatMap((portrait) => {
  const contestant = INITIAL_CONTESTANTS.find((person) => person.slug === portrait.slug);
  return contestant ? [{
    ...portrait,
    id: contestant.id,
    fullName: contestant.name,
    status: contestant.status,
  }] : [];
});

export type HouseData = {
  housemates: typeof housemates;
  source: "snapshot" | "synced" | "stale";
};

export const statusLabels: Record<Contestant["status"], string> = {
  active: "IN THE HOUSE",
  nominated: "NOMINATED",
  captain: "HOUSE CAPTAIN",
  evicted: "EVICTED",
  walked: "LEFT THE HOUSE",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStatus(value: unknown): value is Contestant["status"] {
  return typeof value === "string" && Object.hasOwn(statusLabels, value);
}

// The API also returns partial DB rows. Only consume the identity and status
// fields we need; keep the curated portraits and canonical profile destinations.
export function resolveHouseData(payload: unknown): HouseData | null {
  if (!isRecord(payload) || payload.success === false || !Array.isArray(payload.contestants) || !payload.contestants.length) {
    return null;
  }

  const rows = payload.contestants.filter(isRecord);
  let matched = 0;
  const updated = housemates.map((person) => {
    const row = rows.find((candidate) => candidate.id === person.id || candidate.slug === person.slug || candidate.name === person.fullName);
    if (!row || !isStatus(row.status)) return person;
    matched += 1;
    return { ...person, status: row.status };
  });

  if (!matched) return null;
  return {
    housemates: updated,
    source: payload.source === "neon_postgres_wikipedia_synced" && matched === housemates.length ? "synced" : "snapshot",
  };
}
