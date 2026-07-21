export default function PasswordPolicyChecker() {
  return (
    <section style={{ paddingTop: 14 }}>
      <div className="kicker">Java Project</div>
      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>
        Password Policy Checker
      </h1>

      <p className="sub">
        A Java password validation tool that enforces configurable security requirements and provides
        strength feedback based on character composition. Built with a clean separation between business
        logic and user interaction, with an emphasis on object-oriented software design.
      </p>

      {/* Buttons that jump to sections on THIS page */}
      <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
        <a className="btn" href="#javadocs">View JavaDocs</a>
        <a className="btn" href="#uml">View UML</a>
      </div>

      <div className="grid cols-2" style={{ marginTop: 22 }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="kicker">Software Design Focus</div>
          <h2 style={{ margin: "10px 0 0" }}>Object-Oriented Design and Separation of Concerns</h2>
          <ul style={{ marginTop: 10, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
            <li>Encapsulates password policy and strength rules inside a focused PasswordTool object.</li>
            <li>Separates the command-line driver and its I/O from reusable business logic.</li>
            <li>Keeps policy values as named constants so requirements can change without rewriting the algorithm.</li>
            <li>Exposes behavior through methods instead of allowing the driver to manage internal state directly.</li>
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

      {/* JavaDocs Section (embedded on page) */}
<div id="javadocs" className="card" style={{ padding: 18, marginTop: 18 }}>
  <div className="kicker">JavaDocs</div>

      <iframe
        title="Password Policy Checker JavaDocs"
        src="/projects/password-policy-checker/doc/index.html"
        style={{
            width: "100%",
            height: "85vh",
            marginTop: 12,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12,
            background: "rgba(0,0,0,0.25)",
          }}
        />
    </div>

              {/* UML Section */}
    <div id="uml" className="card" style={{ padding: 18, marginTop: 18 }}>
      <div className="kicker">UML Diagram</div>
      <div style={{ marginTop: 12 }}>
        <img
          src="/assets/password-policy-checker/UMLPasswordProgramSWD2026.png"
          alt="Password Policy Checker UML"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
