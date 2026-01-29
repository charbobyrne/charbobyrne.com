import { Link } from "react-router-dom";

export default function ProjectsSoftware() {
  return (
    <section style={{ paddingTop: 14 }}>
      <div className="kicker">Projects</div>
      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>Software Design</h1>
      <p className="sub">
        Organized by language. Each project page includes a short case study and supporting artifacts.
      </p>

      <div className="grid cols-3" style={{ marginTop: 22 }}>
        <Link className="projectCardLink" to="/projects/software/java">
          <div className="card projectCard">
            <div className="projectCardTop">
              <h3 className="projectCardTitle">Java</h3>
              <div className="projectCardArrow">→</div>
            </div>
            <div className="projectCardDesc">OOP design, UML, and documentation-first projects.</div>
          </div>
        </Link>

        <Link className="projectCardLink" to="/projects/software/cpp">
          <div className="card projectCard">
            <div className="projectCardTop">
              <h3 className="projectCardTitle">C++</h3>
              <div className="projectCardArrow">→</div>
            </div>
            <div className="projectCardDesc">Coming soon.</div>
          </div>
        </Link>

        <Link className="projectCardLink" to="/projects/software/python">
          <div className="card projectCard">
            <div className="projectCardTop">
              <h3 className="projectCardTitle">Python</h3>
              <div className="projectCardArrow">→</div>
            </div>
            <div className="projectCardDesc">Coming soon.</div>
          </div>
        </Link>
      </div>
    </section>
  );
}
