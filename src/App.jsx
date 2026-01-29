import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ marginBottom: "0.25rem" }}>Charles B O&apos;Byrne</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Computer Engineering · Open Source Projects · Unity WebGL
      </p>

      <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <a href="#projects">Projects</a>
        <a href="#play">Play (Unity)</a>
        <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
        <a href="https://www.linkedin.com/in/charles-o-byrne-816454293/" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>

      <hr style={{ margin: "1.5rem 0" }} />

      <h2 id="projects">Projects</h2>
      <p>Project cards go here next.</p>

      <h2 id="play" style={{ marginTop: "1.5rem" }}>Unity</h2>
      <p>Your Unity WebGL build will live at <code>/unity/your-game/</code> and be linked from a Play page.</p>
    </div>
  );
}
