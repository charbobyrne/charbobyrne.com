import { Link } from "react-router-dom";

const projects = [
  {
    title: "Ultrasonic Parking Assistor",
    slug: "parking-assistor",
    description: "Embedded C firmware for ultrasonic sampling, median filtering, stable warning-state control, and direct microcontroller I/O.",
  },
  {
    title: "IoT Drone Controller",
    slug: "iot-drone-controller",
    description: "C/C++ sensing and edge-control software for IMU fusion, packed BLE data, audio interpretation, and real-time UDP commands.",
  },
];

export default function ProjectsSoftwareCCpp() {
  return (
    <section style={{ paddingTop: 14 }}>
      <div className="kicker">Software Design</div>
      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>C/C++</h1>
      <p className="sub">
        Systems-oriented projects focused on embedded firmware, hardware interfaces,
        signal processing, communication protocols, and predictable real-time behavior.
      </p>

      <div className="grid cols-2" style={{ marginTop: 22 }}>
        {projects.map((project) => (
          <Link className="projectCardLink" to={`/projects/software/c-cpp/${project.slug}`} key={project.slug}>
            <div className="card projectCard">
              <div className="projectCardTop">
                <h3 className="projectCardTitle">{project.title}</h3>
                <div className="projectCardArrow" aria-hidden="true">→</div>
              </div>
              <div className="projectCardDesc">{project.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
