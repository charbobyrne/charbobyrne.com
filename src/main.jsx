import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./styles/theme.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

import ProjectsSoftware from "./pages/ProjectsSoftware";
import ProjectsSoftwareJava from "./pages/ProjectsSoftwareJava";
import ProjectsSoftwareCCpp from "./pages/ProjectsSoftwareCCpp";
import ProjectsSoftwarePython from "./pages/ProjectsSoftwarePython";
import CCppProjectCaseStudy from "./pages/CCppProjectCaseStudy";
import ProjectsElectrical from "./pages/ProjectsElectrical";
import EmbeddedParkingSensor from "./pages/EmbeddedParkingSensor";
import IoTDroneController from "./pages/IoTDroneController";
import SiscProcessor from "./pages/SiscProcessor";
import PasswordPolicyChecker from "./pages/PasswordPolicyChecker";
import JavaProjectCaseStudy from "./pages/JavaProjectCaseStudy";
import ProjectsAI from "./pages/ProjectsAI";
import ClashRoyaleReviewAnalysis from "./pages/ClashRoyaleReviewAnalysis";
import MovieRecommendationSystem from "./pages/MovieRecommendationSystem";
import InProgressProjects from "./pages/InProgressProjects";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/in-progress" element={<InProgressProjects />} />
          <Route path="/projects/ai" element={<ProjectsAI />} />
          <Route path="/projects/ai/play-store-review-analysis" element={<ClashRoyaleReviewAnalysis />} />
          <Route path="/projects/ai/movie-recommendation-system" element={<MovieRecommendationSystem />} />
          <Route
            path="/projects/ai/clash-royale-review-analysis"
            element={<Navigate to="/projects/ai/play-store-review-analysis" replace />}
          />


          <Route path="/projects/software" element={<ProjectsSoftware />} />
          <Route path="/projects/software/java" element={<ProjectsSoftwareJava />} />
          <Route path="/projects/software/java/password-policy-checker" element={<PasswordPolicyChecker />} />
          <Route path="/projects/software/java/:projectSlug" element={<JavaProjectCaseStudy />} />
          <Route path="/projects/software/c-cpp" element={<ProjectsSoftwareCCpp />} />
          <Route path="/projects/software/c-cpp/:projectSlug" element={<CCppProjectCaseStudy />} />
          <Route path="/projects/software/python" element={<ProjectsSoftwarePython />} />

          <Route path="/projects/electrical" element={<ProjectsElectrical />} />
          <Route path="/projects/electrical/parking-sensor" element={<EmbeddedParkingSensor />} />
          <Route path="/projects/electrical/iot-drone-controller" element={<IoTDroneController />} />
          <Route path="/projects/electrical/custom-32-bit-processor" element={<SiscProcessor />} />
          <Route path="/projects/electrical/sisc-processor" element={<SiscProcessor />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
