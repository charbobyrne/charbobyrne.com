import { Link } from "react-router-dom";

export default function EmbeddedParkingSensor() {
  return (
    <section style={{ paddingTop: 14 }}>
      <div className="kicker">Embedded Systems</div>
      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>
        Ultrasonic Parking Assistor
      </h1>
      <p className="sub">
        A microcontroller-based parking aid that measures the distance to an
        approaching object and communicates safe, warning, and stop conditions
        through three LEDs and distinct buzzer patterns.
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
        <a className="btn" href="#system-design">View System Design</a>
        <a className="btn" href="#hardware">View Hardware</a>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 22 }}>
        <div className="kicker">Embedded Design Focus</div>
        <h2 style={{ margin: "10px 0 0" }}>Reliable Sensor Processing and State Control</h2>
        <ul className="caseStudyList">
          <li>Divides the firmware into focused functions for I/O initialization, sensing, filtering, motion classification, state decisions, and output control.</li>
          <li>Uses a seven-sample median filter and rejects invalid readings to reduce ultrasonic sensor noise.</li>
          <li>Applies hysteresis and requires repeated matching measurements before changing states, preventing LED flicker and unstable buzzer behavior near thresholds.</li>
          <li>Models warning modes as explicit green, yellow, and red states with predictable transitions.</li>
          <li>Detects sustained inactivity and enters a low-distraction sleep mode, then resumes feedback when motion returns.</li>
        </ul>
      </div>

      <div className="grid cols-2" style={{ marginTop: 18 }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="kicker">Hardware Integration</div>
          <ul className="caseStudyList">
            <li>ATmega microcontroller programmed in embedded C.</li>
            <li>Ultrasonic trigger and echo signals used to calculate distance.</li>
            <li>Green, yellow, and red LEDs provide immediate visual states.</li>
            <li>A buzzer supplies slow warning beeps and faster stop alerts.</li>
          </ul>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <div className="kicker">Tested Behavior</div>
          <ul className="caseStudyList">
            <li>Green and silent when an object remains at a safe distance.</li>
            <li>Yellow with slow beeps as the object enters the warning range.</li>
            <li>Red with fast beeps at the stop threshold.</li>
            <li>Outputs turn off after the object remains stationary and wake when movement resumes.</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Project Context</div>
        <p className="artifactNote">
          Collaborator: Alexander Tackney, alexander-tackney@uiowa.edu
        </p>
        <p className="artifactNote">
          The implementation remains private for academic-integrity purposes; the
          diagrams and results below communicate the system architecture and engineering
          decisions.
        </p>
      </div>

      <div id="system-design" className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">System Design</div>
        <div className="grid cols-2 artifactGrid">
          <figure className="artifactFigure">
            <img className="umlDiagram" src="/assets/parking-sensor/system-block-diagram.png" alt="Parking assistor system block diagram" />
            <figcaption>Signal flow from ultrasonic sensing through processing and driver feedback.</figcaption>
          </figure>
          <figure className="artifactFigure">
            <img className="umlDiagram" src="/assets/parking-sensor/software-flow.png" alt="Parking assistor software flow diagram" />
            <figcaption>Firmware loop, filtering, sleep logic, state confirmation, and output updates.</figcaption>
          </figure>
        </div>
      </div>

      <div id="hardware" className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Hardware</div>
        <div className="grid cols-2 artifactGrid">
          <figure className="artifactFigure">
            <img className="umlDiagram" src="/assets/parking-sensor/circuit-schematic.png" alt="Ultrasonic parking assistor circuit schematic" />
            <figcaption>Sensor, LED, buzzer, resistor, and microcontroller connections.</figcaption>
          </figure>
          <figure className="artifactFigure">
            <img className="umlDiagram" src="/assets/parking-sensor/hardware-setup.jpeg" alt="Completed ultrasonic parking assistor hardware" />
            <figcaption>The completed prototype used during distance and state testing.</figcaption>
          </figure>
        </div>
      </div>

      <Link className="btn backLink" to="/projects/electrical">
        Back to Electrical Engineering projects
      </Link>
    </section>
  );
}
