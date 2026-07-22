import { Link, useParams } from "react-router-dom";

const projects = {
  "parking-assistor": {
    kicker: "Embedded C",
    title: "Ultrasonic Parking Assistor Software",
    overview: "Firmware for an ATmega-based parking aid that samples an ultrasonic sensor, filters noisy measurements, classifies distance and motion, and drives LEDs and a buzzer through direct microcontroller I/O.",
    focus: "Functional Decomposition and Robust State Logic",
    practices: [
      "Decomposes the control loop into focused functions for initialization, sensing, validation, sorting, filtering, motion classification, state classification, and output control.",
      "Represents warning and motion modes with enumerated types instead of unexplained numeric state values.",
      "Centralizes thresholds, sample counts, timing values, and pin assignments as named constants for readable configuration.",
      "Uses fixed-size integer types and bounded arrays appropriate for predictable embedded execution.",
      "Keeps hardware manipulation behind small output functions so state decisions remain separate from register-level LED and buzzer control.",
    ],
    algorithms: [
      "Collects seven readings, rejects invalid distances, sorts valid samples, and selects the median to suppress outliers.",
      "Applies asymmetric hysteresis around warning thresholds to prevent rapid state oscillation.",
      "Requires several consecutive candidate-state matches before committing a transition.",
      "Classifies movement from consecutive measurements to enter sleep mode and wake when motion resumes.",
      "Uses loop-based timing to generate distinct slow and fast buzzer patterns without duplicating state behavior.",
    ],
    diagram: "/assets/parking-sensor/software-flow.png",
    diagramAlt: "Ultrasonic parking assistor firmware control flow",
    architecture: "/assets/parking-sensor/system-block-diagram.png",
    architectureAlt: "Parking assistor input processing and output architecture",
    electricalPath: "/projects/electrical/parking-sensor",
  },
  "iot-drone-controller": {
    kicker: "C/C++ and Edge Software",
    title: "IoT Drone Controller Software",
    overview: "The systems-software portion of a hand-and-voice drone-control platform. An Arduino sensing layer produces fused orientation data, while a Raspberry Pi bridge interprets motion and audio before sending high-level commands to a simulated Crazyflie drone.",
    focus: "Layered Interfaces and Low-Latency Data Flow",
    practices: [
      "Separates sensing, edge interpretation, transport, flight control, telemetry, and visualization into independently responsible layers.",
      "Uses a Madgwick filter to transform raw accelerometer, gyroscope, and magnetometer samples into useful orientation values.",
      "Defines a compact binary interface by packing roll, pitch, and yaw into one 12-byte little-endian BLE characteristic.",
      "Converts continuous sensor values into a small command vocabulary, preventing user input code from directly manipulating motor output.",
      "Treats credentials and deployment configuration as external concerns rather than hardcoding service tokens in shared code.",
    ],
    algorithms: [
      "Applies deadbands and thresholds so small involuntary movements do not become flight commands.",
      "Checks audio energy, pitch confidence, frequency range, and duration before accepting whistle input.",
      "Combines simultaneous inputs into compound command tokens such as directional movement plus altitude change.",
      "Uses UDP because current control intent is more valuable than delayed guaranteed delivery of stale commands.",
      "Logs pose, velocity, orientation, command state, and flight identifiers as time-series telemetry for later analysis.",
    ],
    diagram: "/assets/iot-drone/system-architecture.png",
    diagramAlt: "IoT drone software and communication architecture",
    architecture: "/assets/iot-drone/gesture-controls.png",
    architectureAlt: "Gesture and pitch input mapped to drone commands",
    electricalPath: "/projects/electrical/iot-drone-controller",
    mixedLanguage: true,
  },
};

export default function CCppProjectCaseStudy() {
  const { projectSlug } = useParams();
  const project = projects[projectSlug];
  if (!project) return <h1>Not Found</h1>;

  return (
    <section style={{ paddingTop: 14 }}>
      <div className="kicker">{project.kicker}</div>
      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>{project.title}</h1>
      <p className="sub">{project.overview}</p>

      <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
        <a className="btn" href="#software-design">View Software Design</a>
        <a className="btn" href="#control-flow">View Diagrams</a>
      </div>

      {project.mixedLanguage && (
        <div className="card" style={{ padding: 18, marginTop: 22 }}>
          <div className="kicker">Language Scope</div>
          <p className="artifactNote">
            The Arduino sensing and Raspberry Pi bridge layers are C/C++ systems work.
            The complete platform also uses Python for Webots flight control and InfluxDB
            logging, plus React and Plotly.js for telemetry visualization.
          </p>
        </div>
      )}

      <div id="software-design" className="card" style={{ padding: 18, marginTop: 22 }}>
        <div className="kicker">Software Design Focus</div>
        <h2 style={{ margin: "10px 0 0" }}>{project.focus}</h2>
        <ul className="caseStudyList">{project.practices.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Control and Data Processing</div>
        <ul className="caseStudyList">{project.algorithms.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>

      <div id="control-flow" className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Software Diagrams</div>
        <div className="grid cols-2 artifactGrid">
          <figure className="artifactFigure">
            <img className="umlDiagram" src={project.diagram} alt={project.diagramAlt} />
            <figcaption>Primary software and data-flow structure.</figcaption>
          </figure>
          <figure className="artifactFigure">
            <img className="umlDiagram" src={project.architecture} alt={project.architectureAlt} />
            <figcaption>How software decisions connect inputs to system behavior.</figcaption>
          </figure>
        </div>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Related Engineering Case Study</div>
        <p className="artifactNote">The Electrical Engineering version covers hardware, system integration, results, and the complete project context.</p>
        <Link className="btn backLink" to={project.electricalPath}>View Electrical Engineering page</Link>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Source Code</div>
        <p className="artifactNote">Source code remains private to comply with academic-integrity requirements.</p>
      </div>

      <Link className="btn backLink" to="/projects/software/c-cpp">Back to C/C++ projects</Link>
    </section>
  );
}
