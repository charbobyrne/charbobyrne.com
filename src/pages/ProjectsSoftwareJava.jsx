import { Link } from "react-router-dom";

export default function ProjectsSoftwareJava() {
  return (
    <section style={{ paddingTop: 14 }}>
      <div className="kicker">Software Design</div>

      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>Java</h1>

      <p className="sub">
        Java projects focused on object-oriented design, documentation, and
        maintainable structure. Some source code is kept private for academic
        integrity.
      </p>

      <div className="grid cols-2" style={{ marginTop: 22 }}>
        <Link
          className="projectCardLink"
          to="/projects/software/java/password-policy-checker"
        >
          <div className="card projectCard">
            <div className="projectCardTop">
              <h3 className="projectCardTitle">Password Policy Checker</h3>
              <div className="projectCardArrow">→</div>
            </div>

            <div className="projectCardDesc">
              A Java-based password validation tool that enforces configurable
              security policies and evaluates password strength. Includes UML
              diagrams and JavaDocs.
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}