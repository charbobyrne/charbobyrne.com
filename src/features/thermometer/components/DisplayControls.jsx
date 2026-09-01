import SensorControl from "./SensorControl";

export default function DisplayControls({ deviceOnline, sensors, onChange }) {
  return (
    <section className="card thermometerDisplayPanel" aria-labelledby="display-controls-title">
      <div className="thermometerDisplayHeader">
        <div>
          <div className="kicker">Local demonstration only</div>
          <h2 id="display-controls-title">Display Controls</h2>
        </div>
        <span className="thermometerSimulatedLabel">Simulated · No ESP32 connection</span>
      </div>
      <p className="thermometerDisplayNote">
        These switches change browser memory only and do not send commands to hardware.
      </p>
      <div className="thermometerDisplayGrid">
        {sensors.map((sensor) => (
          <SensorControl
            key={sensor.sensorId}
            sensor={sensor}
            deviceOnline={deviceOnline}
            onChange={onChange}
          />
        ))}
      </div>
    </section>
  );
}

