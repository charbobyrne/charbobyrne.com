import test from "node:test";
import assert from "node:assert/strict";
import { historyWindow, mergeReadings, displayConfirmed } from "../src/features/thermometer/utils/history.js";

const now = Date.parse("2026-09-14T20:00:00Z");
const at = (seconds) => new Date(now + seconds * 1000).toISOString();

test("empty and sparse history preserve the full 300-second axis and outage duration", () => {
  const window = historyWindow([{ timestamp: at(-120), sensor1: 22, sensor2: null }, { timestamp: at(-60), sensor1: 23, sensor2: 24 }], now);
  assert.equal(window.length, 301);
  assert.equal(window[0].timestamp, at(-300));
  assert.equal(window[300].timestamp, at(0));
  assert.equal(window[180].sensor1, 22);
  assert.equal(window[240].sensor1, 23);
  assert.ok(window.slice(181, 240).every((row) => row.sensor1 === null));
  assert.ok(historyWindow([], now).every((row) => row.sensor1 === null && row.sensor2 === null));
});

test("clock advances existing points left and ages them out without new samples", () => {
  const history = [{ timestamp: at(0), sensor1: 22, sensor2: 23 }];
  assert.equal(historyWindow(history, now)[300].sensor1, 22);
  assert.equal(historyWindow(history, now + 1000)[299].sensor1, 22);
  assert.ok(historyWindow(history, now + 301000).every((row) => row.sensor1 === null));
});

test("each sensor keeps its own acquisition second and never fills newer seconds", () => {
  const current = { online: true, sensors: [
    { sensorId: "sensor1", timestamp: at(-3), temperature: 22, connected: true, stale: false },
    { sensorId: "sensor2", timestamp: at(0), temperature: 23, connected: true, stale: false },
  ] };
  const rows = mergeReadings([], current, now);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].sensor1, 22);
  assert.equal(rows[1].sensor1, null);
  assert.equal(rows[1].sensor2, 23);
  assert.deepEqual(mergeReadings(rows, current, now), rows);
  assert.deepEqual(mergeReadings([], { ...current, online: false }, now), []);
});

test("off-scale readings remain real values, while missing readings stay null", () => {
  const row = historyWindow([{ timestamp: at(0), sensor1: -10, sensor2: 63 }], now)[300];
  assert.equal(row.sensor1, -10);
  assert.equal(row.sensor2, 63);
});

test("display confirmation requires matching actual state and a post-request timestamp", () => {
  const command = { enabled: false, requestedAt: at(0) };
  assert.equal(displayConfirmed({ displayEnabled: false, displayTimestamp: at(-1) }, command, true), false);
  assert.equal(displayConfirmed({ displayEnabled: true, displayTimestamp: at(1) }, command, true), false);
  assert.equal(displayConfirmed({ displayEnabled: false, displayTimestamp: at(1) }, command, false), false);
  assert.equal(displayConfirmed({ displayEnabled: false, displayTimestamp: at(1) }, command, true), true);
});
