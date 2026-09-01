import { useState } from "react";
import ThermometerDashboard from "../features/thermometer/ThermometerDashboard";

const PASSCODE = "4880";

export default function InProgressProjects() {
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (passcode === PASSCODE) {
      setIsUnlocked(true);
      setError("");
      return;
    }

    setError("Incorrect passcode. Please try again.");
    setPasscode("");
  }

  if (isUnlocked) {
    return <ThermometerDashboard />;
  }

  return (
    <section className="inProgressPage">
      <div className="card passcodeCard">
        <div className="kicker">Restricted access</div>
        <h1>In Progress Projects</h1>
        <p className="sub">Enter the passcode to view this page.</p>

        <form className="passcodeForm" onSubmit={handleSubmit}>
          <label htmlFor="in-progress-passcode">Passcode</label>
          <input
            id="in-progress-passcode"
            type="password"
            inputMode="numeric"
            autoComplete="current-password"
            value={passcode}
            onChange={(event) => {
              setPasscode(event.target.value);
              setError("");
            }}
            aria-describedby={error ? "passcode-error" : undefined}
            autoFocus
          />
          {error && <p id="passcode-error" className="passcodeError" role="alert">{error}</p>}
          <button className="btn passcodeSubmit" type="submit">Enter</button>
        </form>
      </div>
    </section>
  );
}
