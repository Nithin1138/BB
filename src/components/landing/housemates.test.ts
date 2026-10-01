import assert from "node:assert/strict";
import test from "node:test";
import { housemates, resolveHouseData } from "./housemates";

const syncedPayload = (status = "active") => ({
  success: true,
  source: "neon_postgres_wikipedia_synced",
  contestants: housemates.map((person) => ({ id: person.id, status })),
});

test("synced statuses retain curated portraits and canonical profile destinations", () => {
  const originalStatuses = housemates.map((person) => person.status);
  const payload = syncedPayload();
  payload.contestants.reverse();
  payload.contestants.find((row) => row.id === housemates[0].id)!.status = "evicted";
  const data = resolveHouseData(payload);
  assert.equal(data?.source, "synced");
  assert.equal(data.housemates[0].status, "evicted");
  assert.deepEqual(data.housemates.map(({ slug, image, name }) => ({ slug, image, name })), housemates.map(({ slug, image, name }) => ({ slug, image, name })));
  assert.deepEqual(housemates.map((person) => person.status), originalStatuses, "Do not mutate the fallback snapshot");
});

test("slug and full-name matches support database-generated contestant IDs", () => {
  const payload = syncedPayload("captain");
  const contestants = housemates.map((person, index) => index % 2
    ? { slug: person.slug, status: "captain" }
    : { name: person.fullName, status: "captain" });
  const data = resolveHouseData({ ...payload, contestants });
  assert.equal(data?.source, "synced");
  assert(data.housemates.every((person) => person.status === "captain"));
});

test("fallback responses never claim Wikipedia-synced status", () => {
  const data = resolveHouseData({ ...syncedPayload(), source: "mock_fallback" });
  assert.equal(data?.source, "snapshot");
});

test("partial responses preserve missing cards and disclose the snapshot", () => {
  const payload = syncedPayload("walked");
  payload.contestants = payload.contestants.slice(0, 1);
  const data = resolveHouseData(payload);
  assert.equal(data?.source, "snapshot");
  assert.equal(data.housemates.length, housemates.length);
  assert.equal(data.housemates[0].status, "walked");
  assert.deepEqual(data.housemates.slice(1), housemates.slice(1));
});

test("empty, unsuccessful, unrelated and malformed data cannot replace the snapshot", () => {
  for (const payload of [
    null, {}, { contestants: [] }, { contestants: "not an array" },
    { ...syncedPayload(), success: false },
    { contestants: [null, 7, { name: "Someone else", status: "active" }] },
    syncedPayload("invalid-status"), syncedPayload("__proto__"),
  ]) {
    assert.equal(resolveHouseData(payload), null);
  }
});
