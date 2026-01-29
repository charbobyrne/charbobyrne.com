import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <section style={{ paddingTop: 26 }}>
      <h1 className="h1">Projects</h1>

      <p className="sub" style={{ maxWidth: 640 }}>
        A collection of my software design, game development, and electrical
        engineering projects. Each category contains detailed write-ups,
        diagrams, and documentation where applicable.
      </p>

      <div className="grid cols-3" style={{ marginTop: 28 }}>
        {/* Software Design */}
        <Link className="projectCardLink" to="/projects/software">
          <div className="card projectCard">
            <div className="projectCardTop">
              <h3 className="projectCardTitle">Software Design</h3>
              <div className="projectCardArrow">→</div>
            </div>
            <div className="projectCardDesc">
              Java, C++, and Python projects focused on structure, documentation,
              and maintainability.
            </div>
          </div>
        </Link>

        {/* Game Design */}
        <Link className="projectCardLink" to="/projects/games">
          <div className="card projectCard">
            <div className="projectCardTop">
              <h3 className="projectCardTitle">Game Design</h3>
              <div className="projectCardArrow">→</div>
            </div>
            <div className="projectCardDesc">
              Unity-based gameplay systems and interactive builds, including
              WebGL deployments.
            </div>
          </div>
        </Link>

        {/* Electrical Engineering */}
        <Link className="projectCardLink" to="/projects/electrical">
          <div className="card projectCard">
            <div className="projectCardTop">
              <h3 className="projectCardTitle">Electrical Engineering</h3>
              <div className="projectCardArrow">→</div>
            </div>
            <div className="projectCardDesc">
              Circuit design, hardware projects, and applied electrical systems.
              Content coming soon.
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}