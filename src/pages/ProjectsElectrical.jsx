import { Link } from "react-router-dom";

export default function ProjectsElectrical() {
  return (
    <section style={{ paddingTop: 14 }}>
      <div className="kicker">Projects</div>
      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>Electrical Engineering</h1>
      <p className="sub">
        Embedded systems, circuit design, sensor integration, and hardware-focused
        projects supported by engineering diagrams and test results.
      </p>

      <div className="grid cols-2" style={{ marginTop: 22 }}>
        <Link className="projectCardLink" to="/projects/electrical/parking-sensor">
          <div className="card projectCard">
            <div className="projectCardTop">
              <h3 className="projectCardTitle">Parking Sensor</h3>
              <div className="projectCardArrow" aria-hidden="true">→</div>
            </div>
            <div className="projectCardDesc">
              An ultrasonic embedded system with filtered distance sensing,
              stable warning states, LED feedback, and adaptive buzzer patterns.
            </div>
          </div>
        </Link>

        <Link className="projectCardLink" to="/projects/electrical/iot-drone-controller">
          <div className="card projectCard">
            <div className="projectCardTop">
              <h3 className="projectCardTitle">IoT Drone Controller</h3>
              <div className="projectCardArrow" aria-hidden="true">→</div>
            </div>
            <div className="projectCardDesc">
              A hand-and-whistle control system connecting wearable sensing,
              edge processing, drone simulation, and cloud telemetry analytics.
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
