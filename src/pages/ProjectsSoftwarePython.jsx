import { Link } from "react-router-dom";

export default function ProjectsSoftwarePython() {
  return (
    <section style={{ paddingTop: 14 }}>
      <div className="kicker">Software Design</div>
      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>Python</h1>
      <p className="sub">
        Python projects focused on data processing, machine learning, and applied artificial intelligence.
      </p>

      <div className="grid cols-3" style={{ marginTop: 22 }}>
        <Link className="projectCardLink" to="/projects/ai">
          <div className="card projectCard projectCardAi">
            <div className="projectCardTop">
              <h2 className="projectCardTitle">AI Projects</h2>
              <div className="projectCardArrow">→</div>
            </div>
            <div className="projectCardDesc">
              View my Python-based machine learning, local AI, and retrieval projects.
            </div>
          </div>
        </Link>
      </div>

      <Link className="btn backLink" to="/projects/software">Back to software projects</Link>
    </section>
  );
}
