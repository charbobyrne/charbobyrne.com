import { MOCK_SCENARIOS } from "../services/thermometerService";

const scenarios = [
  { value: MOCK_SCENARIOS.NORMAL, label: "Normal" },
  { value: MOCK_SCENARIOS.SENSOR_1_UNPLUGGED, label: "Sensor 1 Unplugged" },
  { value: MOCK_SCENARIOS.SENSOR_2_UNPLUGGED, label: "Sensor 2 Unplugged" },
  { value: MOCK_SCENARIOS.DEVICE_OFFLINE, label: "Device Offline" },
];

export default function SimulationControls({ scenario, onChange }) {
  return (
    <section className="card thermometerSimulationPanel" aria-labelledby="simulation-title">
      <div>
        <div className="kicker">Local testing only</div>
        <h2 id="simulation-title">Simulation Controls</h2>
        <p>
          Change the mock device state to preview dashboard errors. No API or
          external service is contacted.
        </p>
      </div>
      <div className="thermometerScenarioButtons">
        {scenarios.map((option) => (
          <button
            key={option.value}
            type="button"
            className={scenario === option.value ? "isActive" : ""}
            onClick={() => onChange(option.value)}
            aria-pressed={scenario === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}

