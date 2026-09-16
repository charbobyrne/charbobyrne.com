import test from "node:test";
import assert from "node:assert/strict";
import { getTemperaturePresentation } from "../src/features/thermometer/utils/temperature.js";

const sensor = (overrides = {}) => ({
  connected: true,
  stale: false,
  temperature: 22,
  ...overrides,
});

test("live cards show a temperature only for a fresh connected reading", () => {
  assert.deepEqual(getTemperaturePresentation(true, sensor()), {
    hasReading: true,
    message: "Live reading",
  });
});

test("an unplugged sensor replaces its temperature with the required message", () => {
  assert.deepEqual(getTemperaturePresentation(true, sensor({ connected: false, stale: true, temperature: null })), {
    hasReading: false,
    message: "Unplugged sensor",
  });
});

test("box-off and stale readings replace temperatures with no data available", () => {
  const expected = { hasReading: false, message: "No data available" };
  assert.deepEqual(getTemperaturePresentation(false, sensor()), expected);
  assert.deepEqual(getTemperaturePresentation(true, sensor({ stale: true })), expected);
  assert.deepEqual(getTemperaturePresentation(true, sensor({ temperature: null })), expected);
});
