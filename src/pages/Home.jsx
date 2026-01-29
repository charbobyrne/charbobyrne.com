import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section style={{ paddingTop: 26 }}>
      <h1 className="h1">Charles B O&apos;Byrne</h1>

      <p className="sub">
        Electrical Engineering: Computer student at the University of Iowa (Graduation: May 2027). 
        I use this site to share my software design projects, game development work, 
        and electrical engineering designs.
      </p>

      <div className="projectCards">
        <div className="kicker" style={{ marginBottom: 10 }}>Projects</div>

        <div className="grid cols-3">
          <Link className="projectCardLink" to="/projects/software">
            <div className="card projectCard">
              <div className="projectCardTop">
                <h3 className="projectCardTitle">Software Design</h3>
                <div className="projectCardArrow">→</div>
              </div>
              <div className="projectCardDesc">
                Java, C++, and Python projects with diagrams, documentation, and write-ups.
              </div>
            </div>
          </Link>

          <Link className="projectCardLink" to="/projects/games">
            <div className="card projectCard">
              <div className="projectCardTop">
                <h3 className="projectCardTitle">Game Design</h3>
                <div className="projectCardArrow">→</div>
              </div>
              <div className="projectCardDesc">
                Unity builds and gameplay systems. WebGL versions will live here.
              </div>
            </div>
          </Link>

          <Link className="projectCardLink" to="/projects/electrical">
            <div className="card projectCard">
              <div className="projectCardTop">
                <h3 className="projectCardTitle">Electrical Engineering</h3>
                <div className="projectCardArrow">→</div>
              </div>
              <div className="projectCardDesc">
                Circuit and hardware design work. Projects coming soon.
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}