import { useState } from "react";
import DeviceStatus from "./components/DeviceStatus";
import DisplayControls from "./components/DisplayControls";
import SimulationControls from "./components/SimulationControls";
import TemperatureCard from "./components/TemperatureCard";
import TemperatureChart from "./components/TemperatureChart";
import UnitToggle from "./components/UnitToggle";
import { useThermometerData } from "./hooks/useThermometerData";
import { thermometerService } from "./services/thermometerService";
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
            A developing two-sensor temperature monitoring system. This Phase 1
            interface currently uses local simulated data only.
          </p>
        </div>
        <div className="thermometerHeroControls">
          <span className="thermometerDemoBadge">In Progress · Mock Data</span>
          <UnitToggle unit={unit} onChange={setUnit} />
        </div>
      </div>

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

      <DisplayControls
        deviceOnline={data.online}
        sensors={data.sensors}
        onChange={thermometerService.setDisplayEnabled}
      />

      <SimulationControls
        scenario={data.scenario}
        onChange={thermometerService.setScenario}
      />
    </section>
  );
}
