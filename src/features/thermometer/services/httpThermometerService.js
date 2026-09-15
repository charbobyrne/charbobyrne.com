import { mergeHistoryRefresh, mergeReadings } from "../utils/history.js";
const API_URL = (import.meta.env?.VITE_LAB1_API_URL || "http://localhost:8787").replace(/\/$/, "");
const CURRENT_INTERVAL_MS = 1000;
const HISTORY_INTERVAL_MS = 30000;
const REQUEST_TIMEOUT_MS = 4000;

const listeners = new Set();
let currentTimerId = null;
let historyTimerId = null;
let starting = false;
let currentRequestPending = false;
let historyRequestPending = false;
let nextHistoryAt = 0;

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
    const wasOnline = snapshot.online;
    const current = await fetchJson("/api/lab1/current");
    snapshot = {
      ...snapshot,
      ...current,
      history: mergeReadings(snapshot.history, current),
      loading: false,
      error: null,
    };
    if (current.online && !wasOnline) void refreshHistory();
  } catch (error) {
    snapshot = {
      ...snapshot,
      loading: false,
      online: false,
      sensors: snapshot.sensors.map((sensor) => ({ ...sensor, temperature: null, timestamp: null, stale: true })),
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
  const startedAt = Date.now();
  try {
    const response = await fetchJson("/api/lab1/history?seconds=300");
    const localWindow = snapshot.history.filter((point) => Date.parse(point.timestamp) >= startedAt - 301000);
    snapshot = { ...snapshot, history: mergeHistoryRefresh(response.history, localWindow), historyError: null };
    nextHistoryAt = Date.now() + HISTORY_INTERVAL_MS;
  } catch {
    nextHistoryAt = Date.now() + 1000;
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
  historyTimerId = window.setInterval(() => {
    if (Date.now() >= nextHistoryAt) void refreshHistory();
    const now = Date.now();
    snapshot = { ...snapshot, history: snapshot.history.filter((point) => Date.parse(point.timestamp) >= now - 301000),
      sensors: snapshot.sensors.map((sensor) => now - Date.parse(sensor.timestamp) > 5000
        ? { ...sensor, temperature: null, timestamp: null, stale: true } : sensor) };
    notify();
  }, 1000);
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
  scheduleTimers();
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
