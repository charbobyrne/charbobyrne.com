import { Link } from "react-router-dom";

export default function MovieRecommendationSystem() {
  return (
    <section style={{ paddingTop: 14 }}>
      <div className="kicker">Machine Learning Project</div>
      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>Movie Recommendation System</h1>
      <p className="sub">
        A Python recommendation system that predicts how a user may rate a movie by learning
        from user preferences, movie genres, demographic information, and similar users.
      </p>

      <div className="card" style={{ padding: 18, marginTop: 22 }}>
        <div className="kicker">Project Overview</div>
        <h2 style={{ margin: "10px 0 0" }}>What the project does</h2>
        <p className="artifactNote">
          The application loads users, movies, genres, and historical ratings into data structures
          organized by both user and movie. It uses this information to estimate an unknown rating:
          how strongly a particular user is likely to rate a particular movie.
        </p>
        <p className="artifactNote">
          Several prediction strategies are implemented and compared, beginning with simple
          baselines and progressing to collaborative filtering. A predicted high rating can be
          used to recommend a movie that the user has not rated yet.
        </p>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Why Machine Learning?</div>
        <h2 style={{ margin: "10px 0 0" }}>Recommendations depend on patterns in past behavior</h2>
        <p className="artifactNote">
          People with similar movie preferences often respond similarly to movies they have not
          both seen. The system uses existing ratings to measure relationships between users and
          make predictions instead of relying on a fixed set of recommendation rules.
        </p>
        <p className="artifactNote">
          This makes recommendation a useful machine-learning problem: the application learns
          useful preference patterns from examples, applies those patterns to unseen user-movie
          combinations, and measures how closely its predictions match real ratings.
        </p>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Prediction Methods</div>
        <h2 style={{ margin: "10px 0 0" }}>Comparing multiple recommendation approaches</h2>
        <ul className="caseStudyList">
          <li><strong>Random baseline:</strong> predicts a rating from one to five for comparison.</li>
          <li><strong>User mean:</strong> uses the average rating previously given by the selected user.</li>
          <li><strong>Movie mean:</strong> uses the average rating previously received by the selected movie.</li>
          <li><strong>Demographic prediction:</strong> averages ratings from users with a similar age and gender.</li>
          <li><strong>Genre prediction:</strong> uses the selected user&apos;s ratings of movies with related genres.</li>
          <li><strong>Collaborative filtering:</strong> predicts ratings from the behavior of the most similar users.</li>
        </ul>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Collaborative Filtering</div>
        <h2 style={{ margin: "10px 0 0" }}>Finding users with similar preferences</h2>
        <p className="artifactNote">
          The application compares two users using the movies they have both rated. Their ratings
          are centered around each user&apos;s average, and a correlation-style similarity score is
          calculated. The k-nearest-neighbors step ranks every other user by this score and selects
          the most similar users.
        </p>
        <p className="artifactNote">
          To predict a movie rating, the system combines ratings from those neighbors, weighted
          by similarity, and adjusts the result around the target user&apos;s normal rating behavior.
          Different neighborhood sizes—including 10, 100, 500, and all users—are evaluated.
        </p>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Model Evaluation</div>
        <h2 style={{ margin: "10px 0 0" }}>Testing predictions against known ratings</h2>
        <p className="artifactNote">
          Ratings are randomly divided into training and test sets. Each algorithm predicts the
          withheld test ratings, and root mean squared error (RMSE) measures the distance between
          predicted and actual values. Lower RMSE indicates more accurate predictions.
        </p>
        <p className="artifactNote">
          The baseline methods are evaluated repeatedly across multiple random partitions. The
          program also compares collaborative-filtering results at several neighborhood sizes and
          displays the algorithm errors in a box plot.
        </p>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Scalability</div>
        <h2 style={{ margin: "10px 0 0" }}>Extending the recommendation system</h2>
        <p className="artifactNote">
          The same collaborative-filtering approach can recommend music, games, books, products,
          or other items whenever user interaction data is available. Users, movies, and ratings
          are kept separate from the prediction functions, so another catalog can replace the
          movie data while preserving the core algorithm.
        </p>
        <p className="artifactNote">
          For a larger production system, sparse matrices and indexed nearest-neighbor search could
          replace the current in-memory comparisons. Additional signals—such as tags, descriptions,
          clicks, or viewing history—could support a hybrid model combining collaborative and
          content-based recommendations.
        </p>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Technologies and Concepts</div>
        <p className="artifactNote">
          Python · Collaborative Filtering · k-Nearest Neighbors · User Similarity ·
          Train/Test Evaluation · RMSE · Matplotlib
        </p>
      </div>

      <Link className="btn backLink" to="/projects/ai">Back to AI projects</Link>
    </section>
  );
}
