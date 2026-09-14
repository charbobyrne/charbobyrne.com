const API_URL = (import.meta.env?.VITE_LAB1_API_URL || "http://localhost:8787").replace(/\/$/, "");

export const DEFAULT_EMAIL_SETTINGS = {
  enabled: false,
  recipient: "charobyrne@gmail.com",
  minC: 10,
  maxC: 35,
  lowMessage: "The temperature is below the minimum limit.",
  highMessage: "The temperature is above the maximum limit.",
};

export async function emailRequest(path, token, settings, signal) {
  const timeout = AbortSignal.timeout(25000);
  const response = await fetch(`${API_URL}/api/lab1/alerts/${path}`, {
    method: path === "check" || settings !== undefined ? "POST" : "GET",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: settings === undefined ? undefined : JSON.stringify(settings),
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
  });
  let result;
  try { result = await response.json(); } catch { throw new Error("Email service returned an invalid response."); }
  if (!response.ok) {
    const error = new Error(result.error?.message || "Email service is unavailable.");
    error.status = response.status;
    throw error;
  }
  return result;
}

// Serial polling avoids overlapping deliveries. Unmount aborts the client request;
// an email already accepted by the server/provider cannot be recalled.
export function startEmailChecks(token, onResult, onError, dependencies = {}) {
  const request = dependencies.request || emailRequest;
  const schedule = dependencies.schedule || setTimeout;
  const cancel = dependencies.cancel || clearTimeout;
  const hidden = dependencies.hidden || (() => document.hidden);
  let stopped = false;
  let timer;
  const controller = new AbortController();
  async function check() {
    let delay = 1000;
    try {
      if (hidden()) onResult({ state: "paused" });
      else {
        const result = await request("check", token, undefined, controller.signal);
        if (!stopped) onResult(result);
      }
    } catch (error) {
      if (!stopped) onError(error);
      if (error.status === 401) stopped = true;
      delay = 30000;
    }
    if (!stopped) timer = schedule(check, delay);
  }
  void check();
  return () => { stopped = true; controller.abort(); cancel(timer); };
}
