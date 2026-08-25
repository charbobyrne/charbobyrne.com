import { Link } from "react-router-dom";

export default function ProjectsAI() {
  return (
    <section className="aiSection" style={{ paddingTop: 14 }}>
      <div className="kicker">Projects</div>
      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>Artificial Intelligence</h1>
      <p className="sub">
        Applied AI projects that turn real-world data into useful answers with local models,
        retrieval pipelines, and reproducible analysis.
      </p>

      <div className="grid cols-2" style={{ marginTop: 22 }}>
        <Link className="projectCardLink" to="/projects/ai/play-store-review-analysis">
          <article className="card projectCard projectCardAi">
            <div className="projectCardTop">
              <h2 className="projectCardTitle">Play Store Review Analysis</h2>
              <div className="projectCardArrow">→</div>
            </div>
            <div className="projectCardDesc">
              An exploration of locally hosted AI with Ollama, demonstrating how embeddings,
              vector search, and an LLM work together in a retrieval-augmented generation system.
            </div>
            <div className="tagRow" aria-label="Technologies">
              <span>Python</span><span>Ollama</span><span>Chroma</span><span>LangChain</span>
            </div>
          </article>
        </Link>

        <Link className="projectCardLink" to="/projects/ai/movie-recommendation-system">
          <article className="card projectCard projectCardAi">
            <div className="projectCardTop">
              <h2 className="projectCardTitle">Movie Recommendation System</h2>
              <div className="projectCardArrow">→</div>
            </div>
            <div className="projectCardDesc">
              A machine-learning project that predicts movie ratings with demographic,
              genre-based, and user-based collaborative filtering methods.
            </div>
            <div className="tagRow" aria-label="Technologies">
              <span>Python</span><span>Machine Learning</span><span>k-NN</span><span>RMSE</span>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
}
