import test from "node:test";
import assert from "node:assert/strict";

import {
  formatDisplayLine,
  sensorReadingAvailable,
} from "../src/features/thermometerProject/simulation.js";

const sensor = { connected: true, temperature: 22.25 };

test("LCD simulation distinguishes live, disabled, unplugged, and system-off states", () => {
  assert.equal(formatDisplayLine("sensor1", sensor, true, true), "S1: 22.3 C");
  assert.equal(formatDisplayLine("sensor1", sensor, false, true), "S1: OFF");
  assert.equal(formatDisplayLine("sensor2", { ...sensor, connected: false }, true, true), "S2: Disconnected");
  assert.equal(formatDisplayLine("sensor1", sensor, true, false), "");
});

test("a reading is available only while the box is on and the cable is connected", () => {
  assert.equal(sensorReadingAvailable(true, true), true);
  assert.equal(sensorReadingAvailable(true, false), false);
  assert.equal(sensorReadingAvailable(false, true), false);
});
