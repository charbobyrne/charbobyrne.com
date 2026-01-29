import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/theme.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Play from "./pages/Play";
import NotFound from "./pages/NotFound";

import ProjectsSoftware from "./pages/ProjectsSoftware";
import ProjectsSoftwareJava from "./pages/ProjectsSoftwareJava";
import ProjectsGames from "./pages/ProjectsGames";
import ProjectsElectrical from "./pages/ProjectsElectrical";
import PasswordPolicyChecker from "./pages/PasswordPolicyChecker";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/projects" element={<Projects />} />


          <Route path="/projects/software" element={<ProjectsSoftware />} />
          <Route path="/projects/software/java" element={<ProjectsSoftwareJava />} />
          <Route path="/projects/software/java/password-policy-checker" element={<PasswordPolicyChecker />} />

          <Route path="/projects/games" element={<ProjectsGames />} />
          <Route path="/projects/electrical" element={<ProjectsElectrical />} />

          <Route path="/play" element={<Play />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
