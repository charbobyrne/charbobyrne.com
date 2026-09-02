function StatusItem({ label, online, detail }) {
  return (
    <div className="thermometerStatusItem">
      <span
        className={`thermometerStatusDot ${online ? "isOnline" : "isOffline"}`}
        aria-hidden="true"
      />
      <div>
        <strong>{label}</strong>
        <span>{detail}</span>
      </div>
    </div>
  );
}

export default function DeviceStatus({ deviceOnline, sensors }) {
  return (
    <section className="card thermometerStatusPanel" aria-labelledby="system-status-title">
      <div className="kicker">Inferred connection state</div>
      <h2 id="system-status-title">System Status</h2>
      <div className="thermometerStatusGrid">
        <StatusItem
          label="Thermometer Device"
          online={deviceOnline}
          detail={deviceOnline ? "Online" : "No Data Available"}
        />
        {sensors.map((sensor) => (
          <StatusItem
            key={sensor.sensorId}
            label={sensor.sensorId === "sensor1" ? "Sensor 1" : "Sensor 2"}
            online={deviceOnline && sensor.connected && !sensor.stale}
            detail={deviceOnline
              ? sensor.stale ? "Stale reading" : sensor.connected ? "Connected" : "No reading"
              : "Device offline"}
          />
        ))}
      </div>
    </section>
  );
}
