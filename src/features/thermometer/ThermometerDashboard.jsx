import { useState } from "react";
import DeviceStatus from "./components/DeviceStatus";
import DisplayControls from "./components/DisplayControls";
import SimulationControls from "./components/SimulationControls";
import TemperatureCard from "./components/TemperatureCard";
import TemperatureChart from "./components/TemperatureChart";
import UnitToggle from "./components/UnitToggle";
import { useThermometerData } from "./hooks/useThermometerData";
import {
  thermometerService,
  USING_MOCK_DATA,
} from "./services/thermometerService";
import "./thermometer.css";

export default function ThermometerDashboard() {
  const data = useThermometerData();
  const [unit, setUnit] = useState("C");

  return (
    <section className="thermometerDashboard">
      <div className="thermometerHero">
        <div>
          <div className="kicker">ECE 4880 · Senior Design Lab 1</div>
          <h1>Internet-Connected Digital Thermometer</h1>
          <p className="sub">
            Live temperature readings from the ECE 4880 two-sensor telemetry
            pipeline. Device status is currently inferred from reading age.
          </p>
        </div>
        <div className="thermometerHeroControls">
          <span className="thermometerDemoBadge">
            {USING_MOCK_DATA ? "In Progress · Mock Data" : "In Progress · Live Data"}
          </span>
          <UnitToggle unit={unit} onChange={setUnit} />
        </div>
      </div>

      {data.loading && (
        <p className="thermometerApiNotice" role="status">Loading live thermometer data…</p>
      )}
      {data.error && <p className="thermometerApiError" role="alert">{data.error}</p>}
      {data.historyError && (
        <p className="thermometerApiError" role="alert">{data.historyError}</p>
      )}

      <div className="thermometerTemperatureGrid">
        {data.sensors.map((sensor) => (
          <TemperatureCard
            key={sensor.sensorId}
            label="Current temperature"
            sensor={sensor}
            deviceOnline={data.online}
            unit={unit}
          />
        ))}
      </div>

      <DeviceStatus deviceOnline={data.online} sensors={data.sensors} />

      <TemperatureChart history={data.history} unit={unit} />

      {USING_MOCK_DATA && (
        <>
          <DisplayControls
            deviceOnline={data.online}
            sensors={data.sensors}
            onChange={thermometerService.setDisplayEnabled}
          />
          <SimulationControls
            scenario={data.scenario}
            onChange={thermometerService.setScenario}
          />
        </>
      )}
    </section>
  );
}
