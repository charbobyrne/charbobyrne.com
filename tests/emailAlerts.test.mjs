/* global setImmediate */
import test from "node:test";
import assert from "node:assert/strict";
import { startEmailChecks } from "../src/features/thermometer/services/emailAlertsService.js";

const settle = () => new Promise((resolve) => setImmediate(resolve));

test("email monitoring waits for the previous check and cancels on disconnect", async () => {
  let finish;
  let calls = 0;
  let scheduleCount = 0;
  let signal;
  const stop = startEmailChecks("token", () => {}, () => {}, {
    hidden: () => false,
    request: (_path, _token, _settings, requestSignal) => {
      calls++;
      signal = requestSignal;
      return new Promise((resolve) => { finish = resolve; });
    },
    schedule: () => { scheduleCount++; },
    cancel: () => {},
  });
  await settle();
  assert.equal(calls, 1);
  assert.equal(scheduleCount, 0);
  stop();
  assert.equal(signal.aborted, true);
  finish({ state: "monitoring" });
  await settle();
  assert.equal(scheduleCount, 0);
});

test("hidden tabs do not request email checks and resume when visible", async () => {
  let hidden = true;
  let next;
  let calls = 0;
  const results = [];
  const stop = startEmailChecks("token", (value) => results.push(value), () => {}, {
    hidden: () => hidden,
    request: async () => { calls++; return { state: "monitoring" }; },
    schedule: (callback) => { next = callback; },
    cancel: () => {},
  });
  await settle();
  assert.equal(calls, 0);
  assert.equal(results[0].state, "paused");
  hidden = false;
  await next();
  assert.equal(calls, 1);
  stop();
});

test("authentication failure stops polling instead of retrying indefinitely", async () => {
  let schedules = 0;
  let failure;
  const stop = startEmailChecks("invalid", () => {}, (error) => { failure = error; }, {
    hidden: () => false,
    request: async () => { throw Object.assign(new Error("Access denied"), { status: 401 }); },
    schedule: () => { schedules++; },
    cancel: () => {},
  });
  await settle();
  assert.equal(failure.status, 401);
  assert.equal(schedules, 0);
  stop();
});
