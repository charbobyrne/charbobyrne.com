import { useEffect, useState } from "react";
import { DEFAULT_EMAIL_SETTINGS, emailRequest, startEmailChecks } from "../services/emailAlertsService";

export default function EmailAlerts() {
  const [tokenInput, setTokenInput] = useState("");
  const [token, setToken] = useState("");
  const [settings, setSettings] = useState(DEFAULT_EMAIL_SETTINGS);
  const [draft, setDraft] = useState(DEFAULT_EMAIL_SETTINGS);
  const [configured, setConfigured] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Connect to configure email alerts.");
  const [lastAccepted, setLastAccepted] = useState("");

  useEffect(() => {
    if (!token || !settings.enabled || !configured) return;
    return startEmailChecks(token, (result) => {
      setError("");
      const results = result.results || [];
      if (results.some((item) => item.state === "accepted")) {
        setLastAccepted(`Email accepted for sending at ${new Date().toLocaleTimeString()}.`);
      }
      if (results.some((item) => item.state === "send_failed" || item.state === "retrying")) {
        setError("Email could not be confirmed. Retrying while the reading remains outside the limits.");
      }
      setStatus(result.state === "paused" ? "Monitoring paused while this tab is hidden."
        : result.state === "disabled" ? "Email alerts are disabled in the saved settings."
          : results.length && results.every((item) => item.state === "unavailable")
            ? "Waiting for fresh readings from the device."
            : "Monitoring both sensors for high and low temperatures.");
    }, (failure) => setError(failure.message));
  }, [token, settings.enabled, configured]);

  function updateDraft(event) {
    const { name, type, checked, value } = event.target;
    setDraft((previous) => ({ ...previous, [name]: type === "checkbox" ? checked : value }));
  }

  async function connect(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await emailRequest("settings", tokenInput.trim());
      setToken(tokenInput.trim());
      setTokenInput("");
      setSettings(result.settings);
      setDraft(result.settings);
      setConfigured(result.configured);
      setStatus(result.settings.enabled ? "Email monitoring enabled." : "Email alerts are disabled.");
    } catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  }

  async function save(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const next = { ...draft, recipient: draft.recipient.trim(), minC: Number(draft.minC), maxC: Number(draft.maxC) };
      if (draft.minC === "" || draft.maxC === "" || next.minC >= next.maxC) {
        throw new Error("Enter a minimum temperature below the maximum.");
      }
      const result = await emailRequest("settings", token, next);
      setSettings(result.settings);
      setDraft(result.settings);
      setConfigured(result.configured);
      setStatus(next.enabled ? "Settings saved. Email monitoring enabled." : "Settings saved. Email alerts disabled.");
    } catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  }

  async function setTestThreshold(event) {
    const enabled = event.target.checked;
    setBusy(true);
    setError("");
    try {
      const next = { ...settings, enabled: true, maxC: enabled ? 20 : 35 };
      if (Number(next.minC) >= next.maxC) {
        throw new Error(`The minimum must be below ${next.maxC} degrees C before using this test.`);
      }
      const result = await emailRequest("settings", token, next);
      setSettings(result.settings);
      setDraft(result.settings);
      setConfigured(result.configured);
      setStatus(enabled
        ? "20 degrees C email test enabled. Waiting for a fresh reading above 20 degrees C."
        : "Test threshold removed. Maximum restored to 35 degrees C.");
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="card thermometerEmailPanel" aria-labelledby="email-alert-title">
      <div className="kicker">Temperature notifications</div>
      <h2 id="email-alert-title">Email alerts</h2>
      <p>Receive an email when either sensor goes above or below your limits. Keep this page visible and the device online to monitor.</p>
      {!token ? (
        <form onSubmit={connect} className="thermometerEmailForm">
          <label>Alert access token
            <input type="password" value={tokenInput} onChange={(event) => setTokenInput(event.target.value)} required autoComplete="off" />
          </label>
          <small>Use your project control token. It stays in this page’s memory.</small>
          <button type="submit" disabled={busy}>{busy ? "Connecting…" : "Connect email alerts"}</button>
        </form>
      ) : (
        <form onSubmit={save} className="thermometerEmailForm">
          {!configured && <p className="thermometerApiNotice">Email delivery needs a verified sender and API key configured on the server. You can save settings now.</p>}
          <label className="thermometerEmailEnabled"><input name="enabled" type="checkbox" checked={draft.enabled} onChange={updateDraft} />Enable email alerts</label>
          <label className="thermometerEmailEnabled">
            <input type="checkbox" checked={settings.enabled && Number(settings.maxC) === 20}
              onChange={setTestThreshold} disabled={busy || !configured} />
            20 degrees C email test
          </label>
          <small>Immediately saves a 20 degrees C maximum and enables alerts. A fresh reading above 20 degrees C sends one email per sensor.</small>
          <label>Recipient email<input name="recipient" type="email" value={draft.recipient} onChange={updateDraft} required maxLength={254} /></label>
          <div className="thermometerEmailLimits">
            <label>Minimum (°C)<input name="minC" type="number" min="-55" max="125" step="any" value={draft.minC} onChange={updateDraft} required /></label>
            <label>Maximum (°C)<input name="maxC" type="number" min="-55" max="125" step="any" value={draft.maxC} onChange={updateDraft} required /></label>
          </div>
          <label>Low-temperature message<textarea name="lowMessage" value={draft.lowMessage} onChange={updateDraft} required maxLength={1000} rows={3} /></label>
          <label>High-temperature message<textarea name="highMessage" value={draft.highMessage} onChange={updateDraft} required maxLength={1000} rows={3} /></label>
          <p className="thermometerChartNote">Limits apply to both sensors and are saved in Celsius. One email is sent per high/low episode; a fresh in-range reading re-arms the alert. Emails are limited to one per sensor per minute.</p>
          <div className="thermometerEmailActions">
            <button type="submit" disabled={busy}>{busy ? "Saving…" : "Save email settings"}</button>
            <button type="button" onClick={() => { setToken(""); setStatus("Disconnected. This page is no longer monitoring."); }}>Disconnect</button>
          </div>
        </form>
      )}
      <p role="status">{status}</p>
      {lastAccepted && <p>{lastAccepted} Check your inbox or spam folder.</p>}
      {error && <p className="thermometerApiError" role="alert">{error}</p>}
    </section>
  );
}
