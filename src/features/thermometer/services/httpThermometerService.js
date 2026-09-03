const API_URL = (import.meta.env.VITE_LAB1_API_URL || "http://localhost:8787").replace(/\/$/, "");
const CURRENT_INTERVAL_MS = 1000;
const HISTORY_INTERVAL_MS = 30000;
const REQUEST_TIMEOUT_MS = 4000;

const listeners = new Set();
let currentTimerId = null;
let historyTimerId = null;
let starting = false;
let currentRequestPending = false;
let historyRequestPending = false;

let snapshot = {
  deviceId: "device1",
  online: false,
  lastSeen: null,
  sensors: ["sensor1", "sensor2"].map((sensorId) => ({
    sensorId,
    temperature: null,
    unit: "C",
    timestamp: null,
    connected: false,
    stale: true,
    displayEnabled: null,
  })),
  history: [],
  loading: true,
  error: null,
  historyError: null,
};

function notify() {
  listeners.forEach((listener) => listener());
}

function appendCurrentToHistory(current) {
  const liveSensors = current.sensors.filter((sensor) => !sensor.stale && sensor.timestamp);
  if (liveSensors.length === 0) return snapshot.history;
  const timestampMs = Math.max(...liveSensors.map((sensor) => Date.parse(sensor.timestamp)));
  if (!Number.isFinite(timestampMs)) return snapshot.history;
  const timestamp = new Date(Math.floor(timestampMs / 1000) * 1000).toISOString();
  const point = { timestamp, sensor1: null, sensor2: null };
  for (const sensor of liveSensors) point[sensor.sensorId] = sensor.temperature;
  const withoutSameTimestamp = snapshot.history.filter((item) => item.timestamp !== timestamp);
  const cutoff = timestampMs - 300000;
  return [...withoutSameTimestamp, point]
    .filter((item) => Date.parse(item.timestamp) >= cutoff)
    .sort((left, right) => Date.parse(left.timestamp) - Date.parse(right.timestamp));
}

async function fetchJson(path) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`API request failed (${response.status})`);
    return await response.json();
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function refreshCurrent() {
  if (currentRequestPending) return;
  currentRequestPending = true;
  try {
    const current = await fetchJson("/api/lab1/current");
    snapshot = {
      ...snapshot,
      ...current,
      history: appendCurrentToHistory(current),
      loading: false,
      error: null,
    };
  } catch (error) {
    snapshot = {
      ...snapshot,
      loading: false,
      error: error.name === "AbortError"
        ? "The thermometer API timed out."
        : "Live thermometer data is unavailable.",
    };
  } finally {
    currentRequestPending = false;
    notify();
  }
}

async function refreshHistory() {
  if (historyRequestPending) return;
  historyRequestPending = true;
  try {
    const response = await fetchJson("/api/lab1/history?seconds=300");
    snapshot = { ...snapshot, history: response.history, historyError: null };
  } catch {
    snapshot = {
      ...snapshot,
      historyError: "Recorded temperature history is unavailable.",
    };
  } finally {
    historyRequestPending = false;
    notify();
  }
}

function clearTimers() {
  if (currentTimerId !== null) window.clearInterval(currentTimerId);
  if (historyTimerId !== null) window.clearInterval(historyTimerId);
  currentTimerId = null;
  historyTimerId = null;
}

function scheduleTimers() {
  if (document.hidden || currentTimerId !== null) return;
  currentTimerId = window.setInterval(refreshCurrent, CURRENT_INTERVAL_MS);
  historyTimerId = window.setInterval(refreshHistory, HISTORY_INTERVAL_MS);
}

function handleVisibilityChange() {
  if (document.hidden) {
    clearTimers();
    return;
  }
  void Promise.all([refreshCurrent(), refreshHistory()]);
  scheduleTimers();
}

async function start() {
  if (starting || currentTimerId !== null) return;
  starting = true;
  try {
    await Promise.all([refreshCurrent(), refreshHistory()]);
    if (listeners.size > 0) {
      scheduleTimers();
    }
  } finally {
    starting = false;
  }
}

function stop() {
  clearTimers();
  document.removeEventListener("visibilitychange", handleVisibilityChange);
}

export const httpThermometerService = {
  getSnapshot() {
    return snapshot;
  },
  subscribe(listener) {
    listeners.add(listener);
    if (listeners.size === 1) {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }
    start();
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) stop();
    };
  },
};
