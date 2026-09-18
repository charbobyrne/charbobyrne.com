import test from "node:test";
import assert from "node:assert/strict";
import { classifyGraphValue, getSensorStatusPresentation, getTemperaturePresentation } from "../src/features/thermometer/utils/temperature.js";

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

test("system status uses the same required user-facing states", () => {
  assert.deepEqual(getSensorStatusPresentation(true, sensor()), {
    online: true,
    detail: "Connected",
  });
  assert.deepEqual(getSensorStatusPresentation(true, sensor({ connected: false, stale: true, temperature: null })), {
    online: false,
    detail: "Unplugged sensor",
  });
  assert.deepEqual(getSensorStatusPresentation(true, sensor({ stale: true })), {
    online: false,
    detail: "No data available",
  });
  assert.deepEqual(getSensorStatusPresentation(false, sensor()), {
    online: false,
    detail: "No data available",
  });
});

test("graph values distinguish low, in-range, and high readings", () => {
  const celsiusRange = { minimum: 10, maximum: 50 };
  assert.equal(classifyGraphValue(9.9, celsiusRange), "offScaleLow");
  assert.equal(classifyGraphValue(10, celsiusRange), "inRange");
  assert.equal(classifyGraphValue(50, celsiusRange), "inRange");
  assert.equal(classifyGraphValue(50.1, celsiusRange), "offScaleHigh");
});
