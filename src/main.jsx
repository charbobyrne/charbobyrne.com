import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/theme.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Play from "./pages/Play";
import NotFound from "./pages/NotFound";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/play" element={<Play />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
