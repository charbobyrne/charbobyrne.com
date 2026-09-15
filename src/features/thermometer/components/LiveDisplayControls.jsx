import { useEffect, useState } from "react";
import { displayConfirmed } from "../utils/history.js";

const API_URL = (import.meta.env.VITE_LAB1_API_URL || "http://localhost:8787").replace(/\/$/, "");

export default function LiveDisplayControls({ data }) {
  const [token, setToken] = useState("");
  const [commands, setCommands] = useState({});
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCommands((previous) => {
        const next = { ...previous };
        let changed = false;
        for (const sensor of data.sensors) {
          const command = next[sensor.sensorId];
          if (!command || command.state !== "pending") continue;
          if (displayConfirmed(sensor, command, data.online)) {
            next[sensor.sensorId] = { ...command, state: "confirmed", message: "Device reported the requested display state." };
            changed = true;
          } else if (Date.now() > command.deadline) {
            next[sensor.sensorId] = { ...command, state: "failed", message: "No device confirmation received. The command may have applied; check the reported state before retrying." };
            changed = true;
          }
        }
        return changed ? next : previous;
      });
    }, 250);
    return () => window.clearInterval(timer);
  }, [data]);

  async function change(sensor) {
    const enabled = !sensor.displayEnabled;
    setCommands((previous) => ({ ...previous, [sensor.sensorId]: { state: "sending", message: "Sending command…" } }));
    try {
      const response = await fetch(`${API_URL}/api/lab1/display/${sensor.sensorId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token.trim()}`, "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
        signal: AbortSignal.timeout(6000),
      });
      const result = await response.json();
      if (response.status !== 202) throw new Error(result.error?.message || "Display command failed.");
      if (!result.commandId || !Number.isFinite(Date.parse(result.requestedAt))) throw new Error("The control API needs the latest deployment before confirmation is available.");
      setCommands((previous) => ({ ...previous, [sensor.sensorId]: {
        state: "pending", enabled, requestedAt: result.requestedAt, commandId: result.commandId,
        deadline: Date.now() + 12000, message: "Command accepted. Waiting for the device’s reported state…",
      } }));
    } catch (error) {
      setCommands((previous) => ({ ...previous, [sensor.sensorId]: {
        state: "failed", message: error.name === "TimeoutError" ? "Command timed out. Check the reported state before retrying." : error.message,
      } }));
    }
  }

  return (
    <section className="card thermometerDisplayPanel" aria-labelledby="live-display-title">
      <div className="kicker">Remote device controls</div>
      <h2 id="live-display-title">Sensor displays</h2>
      <p className="thermometerDisplayNote">These switches control the display on the ESP32 box. Temperature measurement and cloud storage continue when a display is off.</p>
      <label className="thermometerEmailForm">Control token
        <input type="password" autoComplete="off" value={token} onChange={(event) => setToken(event.target.value)} />
      </label>
      <p className="thermometerChartNote">The token stays in this page’s memory. Switches show the device’s reported state, not an assumed result.</p>
      <div className="thermometerDisplayGrid">
        {data.sensors.map((sensor) => {
          const command = commands[sensor.sensorId];
          const busy = command?.state === "sending" || command?.state === "pending";
          const available = data.online && typeof sensor.displayEnabled === "boolean";
          return <div key={sensor.sensorId}>
            <div className="thermometerSensorControl">
              <strong>{sensor.sensorId === "sensor1" ? "Sensor 1" : "Sensor 2"} display</strong>
              <button type="button" className={`thermometerSwitch ${sensor.displayEnabled ? "isOn" : ""}`}
                role="switch" aria-checked={sensor.displayEnabled === true} aria-label={`${sensor.sensorId} device display`}
                disabled={!available || !token.trim() || busy} onClick={() => change(sensor)}>
                <span aria-hidden="true" /><b>{sensor.displayEnabled === null ? "?" : sensor.displayEnabled ? "ON" : "OFF"}</b>
              </button>
            </div>
            {!available && <p>Waiting for current device status.</p>}
            {command && <p role={command.state === "failed" ? "alert" : "status"}>{command.message}</p>}
          </div>;
        })}
      </div>
    </section>
  );
}
