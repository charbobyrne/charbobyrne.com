export default function Home() {
  return (
    <section style={{ paddingTop: 26 }}>
      <div className="kicker">Portfolio</div>

      <h1 className="h1">Charles B O&apos;Byrne</h1>

      <p className="sub">
        Computer Engineering student at the University of Iowa (Graduation: May 2027). I build
        open-source work in Python, Java, and C++, and I share practical engineering builds,
        including Unity WebGL.
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
        <a className="btn" href="/projects">Projects</a>
        <a className="btn" href="/play">Play (Unity)</a>
        <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
        <a
          className="btn"
          href="https://www.linkedin.com/in/charles-o-byrne-816454293/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>

      <div className="grid cols-3" style={{ marginTop: 28 }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="kicker">Education</div>
          <div style={{ fontSize: 18, marginTop: 8 }}>University of Iowa</div>
          <div style={{ color: "rgba(255,255,255,0.68)", marginTop: 6 }}>
            B.S.E. • Electrical Engineering: Computer (Expected minors: Math & Computer Science)
          </div>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <div className="kicker">Engineering Experience</div>
          <div style={{ fontSize: 18, marginTop: 8 }}>Leister Technologies (Summer 2025)</div>
          <div style={{ color: "rgba(255,255,255,0.68)", marginTop: 6 }}>
            Automation testing and tooling using Excel VBA, Java-based macros, and HTML/JavaScript.
          </div>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <div className="kicker">Builds</div>
          <div style={{ fontSize: 18, marginTop: 8 }}>30+ custom PCs • 10+ workshops</div>
          <div style={{ color: "rgba(255,255,255,0.68)", marginTop: 6 }}>
            Computer builder & consultant (personal business).
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Skills</div>
        <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span className="btn">Java</span>
          <span className="btn">Python</span>
          <span className="btn">C++</span>
          <span className="btn">MATLAB</span>
          <span className="btn">Git/GitHub</span>
          <span className="btn">Circuit Analysis</span>
          <span className="btn">Breadboarding</span>
        </div>
      </div>

      <div style={{ marginTop: 14, color: "rgba(255,255,255,0.62)" }}>
        Eagle Scout.
      </div>
    </section>
  );
}