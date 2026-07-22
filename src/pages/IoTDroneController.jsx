import { Link } from "react-router-dom";

export default function IoTDroneController() {
  return (
    <section style={{ paddingTop: 14 }}>
      <div className="kicker">Internet of Things</div>
      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>
        Hand-and-Voice Controlled Drone Simulation
      </h1>
      <p className="sub">
        An end-to-end IoT system that turns hand orientation and whistle pitch
        into flight commands for a simulated Crazyflie drone. The project joins
        embedded sensing, wireless communication, edge computing, robotics
        simulation, cloud telemetry, and interactive analytics.
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
        <a className="btn" href="#architecture">View Architecture</a>
        <a className="btn" href="#analytics">View Analytics</a>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 22 }}>
        <div className="kicker">IoT Design Focus</div>
        <h2 style={{ margin: "10px 0 0" }}>Layered Sensing, Edge Control, and Telemetry</h2>
        <ul className="caseStudyList">
          <li>Follows a complete IoT pipeline: sensor node, wireless transport, edge interpretation, action system, cloud storage, and analytics.</li>
          <li>Separates user intent from low-level flight stabilization by converting sensor readings into high-level command tokens.</li>
          <li>Uses Madgwick sensor fusion to turn accelerometer, gyroscope, and magnetometer readings into roll, pitch, and yaw.</li>
          <li>Applies deadbands, thresholds, smoothing, pitch confidence, and cooldown timing to reject accidental gestures and background audio.</li>
          <li>Stores time-series telemetry by flight session so position, orientation, velocity, and commands can be reviewed together.</li>
        </ul>
      </div>

      <div id="architecture" className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">System Architecture</div>
        <div className="iotPipeline" aria-label="IoT system data flow">
          <span>Arduino IMU + microphone</span>
          <span>BLE</span>
          <span>Raspberry Pi edge hub</span>
          <span>UDP</span>
          <span>Webots Crazyflie</span>
          <span>InfluxDB + web analytics</span>
        </div>
        <img
          className="umlDiagram containedDiagram"
          src="/assets/iot-drone/system-architecture.png"
          alt="IoT drone controller system architecture"
        />
      </div>

      <div className="grid cols-2" style={{ marginTop: 18 }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="kicker">Communication Decisions</div>
          <ul className="caseStudyList">
            <li>BLE connects the low-power Arduino sensing node to the Raspberry Pi.</li>
            <li>Roll, pitch, and yaw are packed into one 12-byte characteristic to reduce notification backlog.</li>
            <li>UDP carries real-time commands because the newest control state matters more than delayed packet delivery.</li>
            <li>A HELLO exchange lets the simulation reconnect to the bridge after restarting.</li>
          </ul>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <div className="kicker">Control and Safety</div>
          <ul className="caseStudyList">
            <li>Hand tilt controls horizontal direction while whistle pitch controls altitude.</li>
            <li>Compound command tokens allow directional and altitude inputs to operate together.</li>
            <li>Webots provides realistic Crazyflie dynamics without risking physical hardware.</li>
            <li>The existing PID-based flight controller remains responsible for motor stabilization.</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Gesture and Sound Interface</div>
        <p className="artifactNote">
          The wearable Arduino acts as a virtual joystick: hand tilt maps to
          forward, backward, left, right, and yaw commands. A Raspberry Pi microphone
          pipeline uses ALSA and aubio pitch estimation to distinguish climb, descend,
          and hover input.
        </p>
        <img
          className="umlDiagram"
          src="/assets/iot-drone/gesture-controls.png"
          alt="Hand gestures mapped to drone movement commands"
        />
      </div>

      <div id="analytics" className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Telemetry and Analytics</div>
        <p className="artifactNote">
          Each flight logs timestamped position, orientation, velocity, command,
          and flight mode data to InfluxDB under a unique flight identifier. A React
          interface with Plotly.js queries those records and reconstructs an interactive
          three-dimensional flight path.
        </p>
        <div className="grid cols-2 artifactGrid">
          <figure className="artifactFigure">
            <img className="umlDiagram" src="/assets/iot-drone/influxdb-telemetry.png" alt="InfluxDB drone telemetry records" />
            <figcaption>Time-series drone pose data stored for later analysis.</figcaption>
          </figure>
          <figure className="artifactFigure">
            <img className="umlDiagram" src="/assets/iot-drone/flight-viewer.png" alt="Interactive three-dimensional drone flight viewer" />
            <figcaption>Web visualization reconstructing a recorded flight path.</figcaption>
          </figure>
        </div>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Engineering Iteration</div>
        <ul className="caseStudyList">
          <li>Replaced direct IMU-to-motor mapping after it destabilized the drone, preserving the simulator’s flight controller and treating gestures as intent.</li>
          <li>Consolidated three BLE characteristics into one packed packet to improve responsiveness.</li>
          <li>Evaluated magnetometer correction for yaw drift and rejected it when environmental interference reduced reliability.</li>
          <li>Moved physical-drone testing into simulation when hardware integration proved unsafe and impractical within the project constraints.</li>
        </ul>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Project Context</div>
        <p className="artifactNote">
          ECE:5550 Internet of Things team project. Collaborators: Will Pixley,
          Julian Gunther, and Prabha Basnet.
        </p>
        <p className="artifactNote">
          My contributions included the Arduino IMU gesture code, Webots and Crazyflie
          simulation setup, InfluxDB integration, and debugging control responsiveness,
          pitch/roll tuning, yaw drift, and simulated flight behavior.
        </p>
        <p className="artifactNote">
          Source code, service credentials, and the complete course report remain private.
        </p>
      </div>

      <Link className="btn backLink" to="/projects/electrical">
        Back to Electrical Engineering projects
      </Link>
    </section>
  );
}
