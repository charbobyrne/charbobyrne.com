export default function PasswordPolicyChecker() {
  return (
    <section style={{ paddingTop: 14 }}>
      <div className="kicker">Java Project</div>
      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>Password Policy Checker</h1>

      <p className="sub">
        A Java password validation tool that enforces configurable security requirements and provides
        strength feedback based on character composition. Built with a clean separation between business
        logic and user interaction.
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          <a className="btn"
            href={`${import.meta.env.BASE_URL}projects/password-policy-checker/doc/index.html`}
            target="_blank"
            rel="noreferrer">
            View JavaDocs
          </a>

          <a className="btn"
            href={`${import.meta.env.BASE_URL}assets/password-policy-checker/UMLPasswordProgramSWD2026.png`}
            target="_blank"
            rel="noreferrer">
            View UML
          </a>

      </div>

      <div className="grid cols-2" style={{ marginTop: 22 }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="kicker">Design</div>
          <ul style={{ marginTop: 10, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
            <li>Two-class structure: driver (CLI) + core tool (business logic).</li>
            <li>Business logic contains no I/O, improving testability and maintainability.</li>
            <li>Policy values are defined as constants for easy future updates.</li>
          </ul>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <div className="kicker">Behavior</div>
          <ul style={{ marginTop: 10, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
            <li>Checks minimum length, digit count, and special character count.</li>
            <li>Computes a weighted strength score and maps it to a label.</li>
            <li>Allows repeated password checks until the user exits.</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Source Code</div>
        <div style={{ color: "rgba(255,255,255,0.72)", marginTop: 8 }}>
          Maintained in a private academic repository. Available upon request.
        </div>
      </div>
    </section>
  );
}