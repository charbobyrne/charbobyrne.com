const API_URL = (import.meta.env.VITE_LAB1_API_URL || "http://localhost:8000").replace(/\/$/, "");
const CURRENT_INTERVAL_MS = 1000;
const HISTORY_INTERVAL_MS = 5000;
const REQUEST_TIMEOUT_MS = 4000;

const listeners = new Set();
let currentTimerId = null;
let historyTimerId = null;
let starting = false;

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
};

function notify() {
  listeners.forEach((listener) => listener());
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
  try {
    const current = await fetchJson("/api/lab1/current");
    snapshot = { ...snapshot, ...current, loading: false, error: null };
  } catch (error) {
    snapshot = {
      ...snapshot,
      loading: false,
      error: error.name === "AbortError"
        ? "The thermometer API timed out."
        : "Live thermometer data is unavailable.",
    };
  }
  notify();
}

async function refreshHistory() {
  try {
    const response = await fetchJson("/api/lab1/history?seconds=300");
    snapshot = { ...snapshot, history: response.history };
    notify();
  } catch {
    // Keep current readings usable if only the history request fails.
  }
}

async function start() {
  if (starting || currentTimerId !== null) return;
  starting = true;
  try {
    await Promise.all([refreshCurrent(), refreshHistory()]);
    if (listeners.size > 0) {
      currentTimerId = window.setInterval(refreshCurrent, CURRENT_INTERVAL_MS);
      historyTimerId = window.setInterval(refreshHistory, HISTORY_INTERVAL_MS);
    }
  } finally {
    starting = false;
  }
}

function stop() {
  if (currentTimerId !== null) window.clearInterval(currentTimerId);
  if (historyTimerId !== null) window.clearInterval(historyTimerId);
  currentTimerId = null;
  historyTimerId = null;
}

export const httpThermometerService = {
  getSnapshot() {
    return snapshot;
  },
  subscribe(listener) {
    listeners.add(listener);
    start();
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) stop();
    };
  },
};
