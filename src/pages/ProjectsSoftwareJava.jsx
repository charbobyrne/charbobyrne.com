import { Link } from "react-router-dom";

const javaProjects = [
  {
    title: "Password Policy Checker",
    slug: "password-policy-checker",
    description:
      "A Java-based password validation tool that enforces configurable security policies and evaluates password strength. Includes UML diagrams and JavaDocs.",
  },
  {
    title: "Classroom Program",
    slug: "classroom-program",
    description: "Object-oriented domain modeling using inheritance, encapsulation, and specialized person types.",
  },
  {
    title: "Log Processing System",
    slug: "log-processing-system",
    description: "An evolving polymorphic log analyzer redesigned as a concurrent reader–worker–writer pipeline.",
  },
  {
    title: "Unit Converter GUI (Swing)",
    slug: "unit-converter-gui-swing",
    description: "A tested Swing application that separates conversion rules from its event-driven interface.",
  },
  {
    title: "Networked JavaFX Painter",
    slug: "networked-javafx-painter",
    description: "An MVC-inspired drawing application extended with persistence and a TCP client–server architecture.",
  },
  {
    title: "Weather Comparison App",
    slug: "weather-comparison-app",
    description: "A layered JavaFX application using service abstraction, immutable data models, and asynchronous API work.",
  },
];

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
        {javaProjects.map((project) => (
          <Link
            className="projectCardLink"
            to={`/projects/software/java/${project.slug}`}
            key={project.slug}
          >
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
