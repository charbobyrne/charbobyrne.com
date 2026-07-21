import { Link, useParams } from "react-router-dom";

const projects = {
  "classroom-program": {
    title: "Classroom Program",
    focus: "Object-Oriented Modeling and Inheritance",
    overview:
      "A classroom management program that represents teachers, students, and classroom membership as collaborating objects. The project models a real-world domain while keeping shared person data separate from role-specific behavior.",
    practices: [
      "Uses a Person superclass to centralize shared state and behavior for Student and Teacher subclasses.",
      "Applies inheritance and method overriding to specialize related domain objects without duplicating their common implementation.",
      "Encapsulates classroom membership and teacher assignment inside a dedicated Classroom class.",
      "Separates the domain model from the driver responsible for constructing objects and demonstrating the program.",
    ],
    behavior: [
      "Creates student and teacher records with role-specific information.",
      "Assigns a teacher and a collection of students to a classroom.",
      "Produces readable classroom and person information through the object model.",
    ],
    uml: "/assets/java-projects/classroom-program-uml.png",
    docs: "/projects/classroom-program/doc/index.html",
  },
  "log-processing-system": {
    title: "Log Processing System",
    focus: "Polymorphism, Abstraction, and Concurrent Pipelines",
    overview:
      "An evolving log-processing system developed across multiple assignments. It began as a hierarchy of typed log records, grew into a polymorphic file analyzer, and was ultimately redesigned as a multithreaded reader–worker–writer pipeline.",
    practices: [
      "Defines an abstract LogRecord contract with specialized message, encryption, and error record subclasses.",
      "Uses polymorphism so processing code works through the common abstraction instead of duplicating logic for every record type.",
      "Separates input, analysis, and output into focused Runnable components with single responsibilities.",
      "Coordinates stages with bounded blocking queues, executor services, and explicit termination records.",
      "Builds on earlier iterations without discarding the stable domain model, demonstrating incremental design and refactoring.",
    ],
    behavior: [
      "Reads raw log entries and converts each entry into its appropriate record type.",
      "Processes records concurrently and routes results into separate output streams.",
      "Uses termination markers to shut down the processing pipeline predictably after all work is complete.",
    ],
    uml: "/assets/java-projects/log-processing-system-uml.png",
    docs: "/projects/log-processing-system/doc/index.html",
  },
  "unit-converter-gui-swing": {
    title: "Unit Converter GUI (Swing)",
    focus: "Separation of Concerns, Event-Driven Design, and Testing",
    overview:
      "A desktop metric-conversion application built with Java Swing. Users select conversion units, enter a value, reverse the conversion direction, and receive the converted result through an event-driven interface.",
    practices: [
      "Keeps conversion rules in a UnitConverter class instead of coupling calculations to Swing components.",
      "Uses a dedicated JFrame class to compose the interface and focused event-handler classes to respond to user actions.",
      "Separates application startup into a small driver, keeping construction and domain behavior in their appropriate classes.",
      "Exercises conversion behavior with JUnit tests independently of the graphical interface.",
    ],
    behavior: [
      "Converts entered values between supported metric units.",
      "Allows the source and destination units to be swapped from the interface.",
      "Validates user input and presents results within the desktop application.",
    ],
    uml: "/assets/java-projects/unit-converter-uml.png",
    docs: "/projects/unit-converter/doc/index.html",
  },
  "networked-javafx-painter": {
    title: "Networked JavaFX Painter",
    focus: "MVC-Inspired Design, Persistence, and Client–Server Architecture",
    overview:
      "A JavaFX drawing application that progressed from a local painter into a networked client–server system. It supports freehand drawing, local persistence, and remote storage and retrieval of drawings through a TCP service.",
    practices: [
      "Separates drawing state into a model, interface behavior into a controller, and layout into an FXML view.",
      "Represents drawings as strokes composed of paint dots, producing a clear object model rather than storing UI nodes as application data.",
      "Keeps network communication in a DrawingClient instead of embedding socket operations throughout the GUI controller.",
      "Implements a server with a small command protocol for listing, loading, and saving drawings.",
      "Extends the earlier local JavaFX design while retaining its model and persistence responsibilities.",
    ],
    behavior: [
      "Draws with selectable colors and brush sizes and supports undo and clear operations.",
      "Saves and restores drawings locally using the application’s data model.",
      "Connects to a TCP server to list, upload, and retrieve remotely stored drawings.",
    ],
    uml: "/assets/java-projects/networked-javafx-painter-uml.png",
    docs: "/projects/networked-javafx-painter/doc/index.html",
  },
  "weather-comparison-app": {
    title: "Weather Comparison App",
    focus: "Service Abstraction, Asynchronous Work, and Data Modeling",
    overview:
      "A JavaFX application that searches for two locations, retrieves their current conditions from OpenWeatherMap, and presents a direct comparison of temperature, humidity, wind, and weather descriptions.",
    practices: [
      "Encapsulates HTTP requests and JSON translation inside an OpenWeatherService rather than coupling API logic to the interface.",
      "Models returned location and weather data with immutable Java records.",
      "Uses JavaFX background tasks and an executor service so network requests do not block the interface thread.",
      "Separates the FXML view, controller logic, service layer, and data-transfer objects into distinct responsibilities.",
      "Loads the API credential from an environment variable instead of storing it in source code.",
    ],
    behavior: [
      "Searches for matching geographic locations and lets the user disambiguate city names.",
      "Retrieves current conditions for two selected locations in the background.",
      "Displays both results and produces a concise comparison of their conditions.",
    ],
    uml: "/assets/java-projects/weather-comparison-app-uml.png",
    docs: "/projects/weather-comparison-app/doc/index.html",
  },
};

export default function JavaProjectCaseStudy() {
  const { projectSlug } = useParams();
  const project = projects[projectSlug];

  if (!project) {
    return <h1>Not Found</h1>;
  }

  return (
    <section style={{ paddingTop: 14 }}>
      <div className="kicker">Java Project</div>
      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>{project.title}</h1>
      <p className="sub">{project.overview}</p>

      <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
        <a className="btn" href="#javadocs">View JavaDocs</a>
        <a className="btn" href="#uml">View UML</a>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 22 }}>
        <div className="kicker">Software Design Focus</div>
        <h2 style={{ margin: "10px 0 0" }}>{project.focus}</h2>
        <ul className="caseStudyList">
          {project.practices.map((practice) => <li key={practice}>{practice}</li>)}
        </ul>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Program Behavior</div>
        <ul className="caseStudyList">
          {project.behavior.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Source Code</div>
        <p className="artifactNote">
          Source code is maintained privately to comply with academic-integrity requirements.
          The design artifacts below document the work without publishing the implementation.
        </p>
      </div>

      <div id="uml" className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">UML Diagram</div>
        <img className="umlDiagram" src={project.uml} alt={`${project.title} UML diagram`} />
      </div>

      <div id="javadocs" className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">JavaDocs</div>
        <iframe className="javadocsFrame" title={`${project.title} JavaDocs`} src={project.docs} />
      </div>

      <Link className="btn backLink" to="/projects/software/java">Back to Java projects</Link>
    </section>
  );
}
