import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  formatDisplayLine,
  formatTemperature,
  sensorReadingAvailable,
} from "../features/thermometerProject/simulation";
import "../features/thermometerProject/thermometerProject.css";

const SENSOR_DEFAULTS = {
  sensor1: { label: "Sensor 1", temperature: 22, connected: true },
  sensor2: { label: "Sensor 2", temperature: 24, connected: true },
};

function Switch({ checked, disabled = false, label, onChange }) {
  return (
    <button
      type="button"
      className={`labSwitch ${checked ? "isOn" : ""}`}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <span aria-hidden="true" />
      <b>{checked ? "On" : "Off"}</b>
    </button>
  );
}

function SensorSimulator({ sensor, systemOn, onChange }) {
  const available = sensorReadingAvailable(systemOn, sensor.connected);
  return (
    <article className={`sensorSimulator ${available ? "isActive" : "isUnavailable"}`}>
      <div className="sensorSimulatorHeader">
        <div>
          <span className="simEyebrow">DS18B20 input</span>
          <h3>{sensor.label}</h3>
        </div>
        <span className={`simStatus ${available ? "good" : "bad"}`}>
          {!systemOn ? "System off" : sensor.connected ? "Connected" : "Unplugged"}
        </span>
      </div>

      <div className="simTemperature">
        {available ? formatTemperature(sensor.temperature) : "--.-"}
        <small>°C</small>
      </div>

      <label className="temperatureSlider">
        <span>
          Simulated temperature
          <output>{formatTemperature(sensor.temperature)} °C</output>
        </span>
        <input
          type="range"
          min="-10"
          max="63"
          step="0.5"
          value={sensor.temperature}
          disabled={!available}
          onChange={(event) => onChange({ temperature: Number(event.target.value) })}
        />
        <span className="sliderBounds"><i>-10 °C</i><i>63 °C</i></span>
      </label>

      <div className="cableControl">
        <span>Cable</span>
        <Switch
          checked={sensor.connected}
          label={`${sensor.label} cable connected`}
          onChange={(connected) => onChange({ connected })}
        />
      </div>
      <p className="sensorHint">
        {sensor.connected
          ? "The probe is sending a valid digital reading."
          : "The ESP32 reports this probe as unplugged and stores no temperature point."}
      </p>
    </article>
  );
}

function WorkflowNode({ active = false, alert = false, eyebrow, title, detail, pulse = false, step = 0 }) {
  return (
    <div
      className={`workflowNode ${active ? "isActive" : ""} ${alert ? "isAlert" : ""} ${pulse ? "isPulse" : ""}`}
      style={{ "--flow-step": step }}
    >
      <span>{eyebrow}</span>
      <strong>{title}</strong>
      <small>{detail}</small>
    </div>
  );
}

function FlowArrow({ active = false, label }) {
  return (
    <div className={`flowArrow ${active ? "isActive" : ""}`} aria-label={label}>
      <span>{label}</span>
      <i aria-hidden="true" />
    </div>
  );
}

export default function WebThermometerProject() {
  const [systemOn, setSystemOn] = useState(true);
  const [sensors, setSensors] = useState(SENSOR_DEFAULTS);
  const [displayEnabled, setDisplayEnabled] = useState({ sensor1: true, sensor2: true });
  const [activeCommand, setActiveCommand] = useState(null);
  const [dataFlowStep, setDataFlowStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDataFlowStep((current) => (current + 1) % 5);
    }, 720);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!activeCommand) return undefined;
    const timeout = window.setTimeout(() => setActiveCommand(null), 1300);
    return () => window.clearTimeout(timeout);
  }, [activeCommand]);

  const updateSensor = (sensorId, change) => {
    setSensors((current) => ({
      ...current,
      [sensorId]: { ...current[sensorId], ...change },
    }));
  };

  const sendDisplayCommand = (sensorId, enabled) => {
    setDisplayEnabled((current) => ({ ...current, [sensorId]: enabled }));
    setActiveCommand({ sensorId, enabled });
  };

  const lcdLines = useMemo(() => {
    if (!systemOn) return ["SYSTEM OFF", ""];
    return ["sensor1", "sensor2"].map((sensorId) =>
      formatDisplayLine(sensorId, sensors[sensorId], displayEnabled[sensorId], systemOn),
    );
  }, [displayEnabled, sensors, systemOn]);

  const connectedCount = Object.values(sensors).filter((sensor) => sensor.connected).length;
  const dataActive = systemOn;
  const commandActive = Boolean(activeCommand);

  return (
    <section className="thermometerProjectPage">
      <Link className="backLink" to="/projects/electrical">← Electrical engineering projects</Link>

      <header className="thermometerProjectHero">
        <div>
          <div className="kicker">ECE 4880 · Embedded systems · Cloud telemetry</div>
          <h1>Web-Connected Dual-Sensor Thermometer</h1>
          <p className="sub">
            An ESP32 thermometer that combines two removable probes, a local 16x2 display,
            persistent cloud history, remote LCD control, and configurable email alerts.
          </p>
          <div className="projectResultRow" aria-label="Project results">
            <span><strong>20 / 20</strong> verification tests passed</span>
            <span><strong>1 s</strong> sampling interval</span>
            <span><strong>300 s</strong> recorded history</span>
            <span><strong>0.7 s</strong> measured remote response</span>
          </div>
        </div>
        <div className="completionBadge"><i /> Completed project</div>
      </header>

      <div className="projectInteractiveGrid">
      <section className="simulationSection" aria-labelledby="simulation-title">
        <div className="sectionIntro">
          <div>
            <span className="simEyebrow">Interactive system model</span>
            <h2 id="simulation-title">Operate the thermometer</h2>
          </div>
          <p>Change the probe temperatures, unplug either cable, switch the box off, or send website commands to the LCD.</p>
        </div>

        <div className="simulationGrid">
          <div className="sensorControlGrid">
            {Object.entries(sensors).map(([sensorId, sensor]) => (
              <SensorSimulator
                key={sensorId}
                sensor={sensor}
                systemOn={systemOn}
                onChange={(change) => updateSensor(sensorId, change)}
              />
            ))}
          </div>

          <article className="deviceSimulator">
            <div className="deviceTopbar">
              <div>
                <span className="simEyebrow">ESP32 third box</span>
                <h3>Local display</h3>
              </div>
              <div className="masterControl">
                <span>Power switch</span>
                <Switch checked={systemOn} label="Third box power switch" onChange={setSystemOn} />
              </div>
            </div>

            <div className={`lcdDisplay ${systemOn ? "isOn" : "isOff"}`} aria-live="polite">
              <div>{lcdLines[0] || " "}</div>
              <div>{lcdLines[1] || " "}</div>
            </div>

            <div className="webDisplayControls">
              <div>
                <span className="simEyebrow">Website to LCD</span>
                <h4>Remote display controls</h4>
              </div>
              {Object.keys(sensors).map((sensorId) => (
                <div className="webControlRow" key={sensorId}>
                  <span>{sensors[sensorId].label} row</span>
                  <Switch
                    checked={displayEnabled[sensorId]}
                    disabled={!systemOn}
                    label={`${sensors[sensorId].label} LCD row enabled`}
                    onChange={(enabled) => sendDisplayCommand(sensorId, enabled)}
                  />
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="workflowSection" aria-labelledby="workflow-title">
        <div className="sectionIntro">
          <div>
            <span className="simEyebrow">Live architecture</span>
            <h2 id="workflow-title">What the system is doing</h2>
          </div>
          <p className="workflowSummary" aria-live="polite">
            {systemOn
              ? `${connectedCount} probe${connectedCount === 1 ? " is" : "s are"} supplying data; the ESP32 is publishing status and available readings.`
              : "The third-box switch is off; the cloud reports no live temperatures and waits for recovery."}
          </p>
        </div>

        <div className="workflowPanel">
          <div className="workflowLabel">Temperature and status path</div>
          <div className="dataFlow">
            <div className="workflowSensors">
              {Object.entries(sensors).map(([sensorId, sensor]) => {
                const available = sensorReadingAvailable(systemOn, sensor.connected);
                return (
                  <WorkflowNode
                    key={sensorId}
                    active={available}
                    alert={systemOn && !sensor.connected}
                    eyebrow="Probe"
                    title={sensor.label}
                    detail={!systemOn ? "No power" : sensor.connected ? `${formatTemperature(sensor.temperature)} °C` : "Unplugged"}
                    pulse={available && dataFlowStep === 0}
                    step={0}
                  />
                );
              })}
            </div>
            <FlowArrow active={dataActive && connectedCount > 0} label="OneWire" />
            <WorkflowNode active={dataActive} eyebrow="Controller" title="ESP32" detail={systemOn ? "Sampling every second" : "System off"} pulse={dataActive && dataFlowStep === 1} step={1} />
            <FlowArrow active={dataActive} label="HTTPS write" />
            <WorkflowNode active={dataActive} eyebrow="Time-series storage" title="InfluxDB" detail={systemOn ? "Recording readings and status" : "History retained"} pulse={dataActive && dataFlowStep === 2} step={2} />
            <FlowArrow active label="HTTPS query" />
            <WorkflowNode active eyebrow="API and logic" title="Cloudflare Worker" detail={systemOn ? "Returning fresh JSON" : "Returning no data available"} pulse={dataFlowStep === 3} step={3} />
            <FlowArrow active label="JSON API" />
            <WorkflowNode active eyebrow="User interface" title="React website" detail="Rendering this simulation" pulse={dataFlowStep === 4} step={4} />
          </div>

          <div className="workflowDivider" />
          <div className="workflowLabel">Remote LCD control path</div>
          <div className="controlFlow">
            <WorkflowNode active={commandActive} eyebrow="User action" title="Website toggle" detail={activeCommand ? `${activeCommand.sensorId === "sensor1" ? "Sensor 1" : "Sensor 2"} ${activeCommand.enabled ? "ON" : "OFF"}` : "Ready for a command"} step={0} />
            <FlowArrow active={commandActive} label="Authenticated request" />
            <WorkflowNode active={commandActive} eyebrow="Command API" title="Cloudflare Worker" detail={commandActive ? "Creating command ID" : "Waiting"} step={1} />
            <FlowArrow active={commandActive} label="Publish API" />
            <WorkflowNode active={commandActive} alert={!systemOn} eyebrow="MQTT broker" title="EMQX" detail={!systemOn ? "Device offline" : commandActive ? "QoS 1 command in transit" : "Connected and ready"} step={2} />
            <FlowArrow active={commandActive} label="MQTTS" />
            <WorkflowNode active={commandActive} alert={!systemOn} eyebrow="Physical output" title="ESP32 LCD" detail={!systemOn ? "Command unavailable" : commandActive ? "Display row updated" : "Showing current state"} step={3} />
          </div>
        </div>
      </section>
      </div>

      <section className="projectEvidence" aria-labelledby="project-evidence-title">
        <div className="sectionIntro">
          <div>
            <span className="simEyebrow">Built and tested</span>
            <h2 id="project-evidence-title">Circuit and finished prototype</h2>
          </div>
          <p>The final design combined independent digital probe buses, a breadboard-mounted ESP32, a local LCD, removable terminals, and portable USB power.</p>
        </div>
        <div className="evidenceGrid">
          <figure className="schematicFigure">
            <img src="/images/projects/thermometer/circuit-schematic.jpg" alt="Complete thermometer circuit schematic showing the ESP32, two temperature probes, LCD, buttons, terminal blocks, and portable power" />
            <figcaption><strong>Final circuit schematic.</strong> Separate OneWire buses and 4.7 kΩ pull-ups connect both probes; the ESP32 also drives the LCD and reads the local controls.</figcaption>
          </figure>
          <div className="prototypePhotos">
            <figure>
              <img src="/images/projects/thermometer/enclosure-exterior.jpg" alt="Finished thermometer enclosure with LCD, two sensor buttons, power switch, and removable probe connectors" />
              <figcaption><strong>Finished enclosure.</strong> The front panel exposes the LCD, two local sensor controls, master switch, and removable probe terminals.</figcaption>
            </figure>
            <figure>
              <img src="/images/projects/thermometer/enclosure-interior.jpg" alt="Interior of the thermometer enclosure showing the ESP32 breadboard, wiring, terminals, display connections, and battery pack" />
              <figcaption><strong>Internal assembly.</strong> The ESP32, breadboard, wiring, connector backs, and rechargeable power bank were secured for inverted and drop testing.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="projectStory" aria-labelledby="project-story-title">
        <div className="sectionIntro">
          <div>
            <span className="simEyebrow">Project summary</span>
            <h2 id="project-story-title">Engineering areas covered</h2>
          </div>
        </div>
        <p className="projectLead">
          Our four-person team carried the design from sensor wiring and embedded firmware through secure cloud services, a responsive website, alerts, enclosure construction, and final verification.
        </p>
        <div className="storyGrid">
          <article>
            <span>01</span>
            <h3>Sensing and electronics</h3>
            <p>Two waterproof DS18B20 probes use independent OneWire buses with 4.7 kΩ pull-ups. The ESP32 interfaces with a parallel 16x2 LCD, two debounced sensor buttons, a master power switch, and separate 3.3 V and 5 V device rails.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Embedded firmware</h3>
            <p>A nonblocking loop starts a 9-bit sensor conversion every second, validates each result, detects unplugged probes, debounces local controls, updates the LCD immediately, and continues local operation when Wi-Fi is unavailable.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Cloud data pipeline</h3>
            <p>The ESP32 writes valid temperatures and complete device status to InfluxDB over HTTPS. The Cloudflare Worker queries current values and 300 seconds of history, then returns stable JSON to the React interface.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Bidirectional control</h3>
            <p>Website LCD commands pass through an authenticated Worker endpoint to EMQX as QoS 1 MQTT messages. The ESP32 validates each command, changes the selected LCD row, and publishes state for confirmation.</p>
          </article>
          <article>
            <span>05</span>
            <h3>Web interface and alerts</h3>
            <p>The dashboard shows large live values, Celsius or Fahrenheit units, explicit disconnected and system-off states, and a right-to-left history graph. Resend provides configurable high- and low-temperature email alerts.</p>
          </article>
          <article>
            <span>06</span>
            <h3>Mechanical design and verification</h3>
            <p>The rapid-prototype enclosure secures the circuit, battery, controls, display, and removable terminals. All 20 final tests passed, including ice-water accuracy, recovery, remote response, inverted operation, and a drop test.</p>
          </article>
        </div>
      </section>
    </section>
  );
}
