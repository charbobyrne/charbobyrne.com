/* global setImmediate */
import test from "node:test";
import assert from "node:assert/strict";

test("history retries after one second, current calls never overlap, and API failure clears live values", async () => {
  const original = { fetch: globalThis.fetch, window: globalThis.window, document: globalThis.document, now: Date.now };
  let now = Date.parse("2026-09-14T20:00:00Z");
  let historyCalls = 0;
  let currentCalls = 0;
  let failCurrent = false;
  let finishCurrent;
  const intervals = new Map();
  let nextId = 0;
  const settle = () => new Promise((resolve) => setImmediate(resolve));
  globalThis.window = {
    setInterval: (callback) => { const id = ++nextId; intervals.set(id, callback); return id; },
    clearInterval: (id) => intervals.delete(id),
    setTimeout: () => ++nextId, clearTimeout: () => {},
  };
  globalThis.document = { hidden: false, addEventListener: () => {}, removeEventListener: () => {} };
  Date.now = () => now;
  const current = () => ({ deviceId: "device1", online: currentCalls > 1, sensors: [
    { sensorId: "sensor1", temperature: 22, connected: true, stale: false, timestamp: new Date(now).toISOString() },
  ] });
  globalThis.fetch = async (url) => {
    if (url.includes("history")) {
      historyCalls++;
      if (historyCalls === 1) throw new Error("Temporary history outage");
      return Response.json({ history: [{ timestamp: new Date(now - 10000).toISOString(), sensor1: 21, sensor2: null }] });
    }
    currentCalls++;
    if (failCurrent) throw new Error("API unavailable");
    if (currentCalls > 1) return new Promise((resolve) => { finishCurrent = () => resolve(Response.json(current())); });
    return Response.json(current());
  };
  let stop;
  try {
    const { httpThermometerService: service } = await import("../src/features/thermometer/services/httpThermometerService.js");
    stop = service.subscribe(() => {});
    await settle();
    assert.equal(historyCalls, 1);
    assert.ok(service.getSnapshot().historyError);
    const [pollCurrent, tick] = [...intervals.values()];
    now += 1000;
    tick(); await settle();
    assert.equal(historyCalls, 2);
    assert.equal(service.getSnapshot().historyError, null);
    const first = pollCurrent();
    await settle();
    await pollCurrent();
    assert.equal(currentCalls, 2);
    finishCurrent(); await first;
    failCurrent = true;
    await pollCurrent();
    assert.equal(service.getSnapshot().online, false);
    assert.equal(service.getSnapshot().sensors[0].temperature, null);
    stop();
    assert.equal(intervals.size, 0);
  } finally {
    stop?.();
    globalThis.fetch = original.fetch; globalThis.window = original.window; globalThis.document = original.document; Date.now = original.now;
  }
});
