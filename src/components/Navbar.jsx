import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  padding: "10px 12px",
  borderRadius: 999,
  border: "1px solid",
  borderColor: isActive ? "rgba(255,255,255,0.22)" : "transparent",
  background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
  color: "rgba(255,255,255,0.90)",
});

export default function Navbar() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(10px)",
        background: "rgba(11,12,15,0.55)",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "14px 0",
        }}
      >
        <div style={{ fontWeight: 700 }}>
          Charles B O&apos;Byrne
        </div>

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 6,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <NavLink to="/" end style={linkStyle}>Home</NavLink>
          <NavLink to="/projects" style={linkStyle}>Projects</NavLink>
          <NavLink to="/play" style={linkStyle}>Play</NavLink>

          <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>

          <a
            className="btn"
            href="https://www.linkedin.com/in/charles-o-byrne-816454293/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}