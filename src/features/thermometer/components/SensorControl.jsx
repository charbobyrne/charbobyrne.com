export default function SensorControl({ sensor, deviceOnline, onChange }) {
  const sensorName = sensor.sensorId === "sensor1" ? "Sensor 1" : "Sensor 2";
  const available = deviceOnline && sensor.connected;

  return (
    <div className="thermometerSensorControl">
      <div>
        <strong>{sensorName} Display</strong>
        <span>
          {available
            ? `Simulated display ${sensor.displayEnabled ? "on" : "off"}`
            : deviceOnline ? "Sensor unavailable" : "Device offline"}
        </span>
      </div>
      <button
        type="button"
        className={`thermometerSwitch ${sensor.displayEnabled ? "isOn" : ""}`}
        onClick={() => onChange(sensor.sensorId, !sensor.displayEnabled)}
        disabled={!available}
        role="switch"
        aria-checked={sensor.displayEnabled}
        aria-label={`${sensorName} simulated display`}
      >
        <span aria-hidden="true" />
        <b>{sensor.displayEnabled ? "ON" : "OFF"}</b>
      </button>
    </div>
  );
}

