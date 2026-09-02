import { formatTemperature } from "../utils/temperature";

export default function TemperatureCard({ label, sensor, deviceOnline, unit }) {
  const hasReading = deviceOnline && sensor.connected && sensor.temperature !== null;
  const message = !deviceOnline
    ? "No Data Available"
    : sensor.stale
      ? "Reading is stale"
      : sensor.connected
        ? "Live reading"
        : "Sensor unavailable";

  return (
    <article className="card thermometerTemperatureCard">
      <div className="thermometerCardHeader">
        <div>
          <div className="kicker">{label}</div>
          <h2>{sensor.sensorId === "sensor1" ? "Sensor 1" : "Sensor 2"}</h2>
        </div>
        <span
          className={`thermometerStatusDot ${hasReading ? "isOnline" : "isOffline"}`}
          aria-hidden="true"
        />
      </div>

      <div className="thermometerReading" aria-label={`${label} temperature`}>
        <span>{formatTemperature(sensor.temperature, unit)}</span>
        {hasReading && <small>°{unit}</small>}
      </div>
      <p className="thermometerCardMessage">{message}</p>
    </article>
  );
}
