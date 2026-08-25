import { Link } from "react-router-dom";

export default function ClashRoyaleReviewAnalysis() {
  return (
    <section style={{ paddingTop: 14 }}>
      <div className="kicker">Artificial Intelligence Project</div>
      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>Play Store Review Analysis</h1>
      <p className="sub">
        A local AI application that uses Ollama, LangChain, and Chroma to answer
        natural-language questions about a large collection of player reviews.
      </p>

      <div className="card" style={{ padding: 18, marginTop: 22 }}>
        <div className="kicker">Project Overview</div>
        <h2 style={{ margin: "10px 0 0" }}>What the project does</h2>
        <p className="artifactNote">
          The application collects reviews from the Google Play Store and Apple App Store,
          cleans the text, and stores it in a searchable vector database. A user can then ask
          questions about the reviews. The application finds text related to the question and
          gives it to a local language model, which produces a concise answer.
        </p>
        <p className="artifactNote">
          Play Store reviews are the example used to demonstrate the system. The main focus
          is the AI workflow used to search and interpret unstructured text.
        </p>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Why Artificial Intelligence?</div>
        <h2 style={{ margin: "10px 0 0" }}>AI makes unstructured data easier to query</h2>
        <p className="artifactNote">
          Reviews are written in natural language, so the same idea can be expressed with many
          different words. A keyword search may miss useful reviews when the exact search term
          is not present. An embedding model represents the meaning of each review as a numeric
          vector, allowing the application to find conceptually related text even when the wording differs.
        </p>
        <p className="artifactNote">
          A language model then combines the retrieved information into a readable response.
          The user does not need to know the exact words in the dataset or manually read hundreds
          of individual records.
        </p>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Why Ollama?</div>
        <h2 style={{ margin: "10px 0 0" }}>Running the AI models locally</h2>
        <p className="artifactNote">
          Ollama provides a simple way to download and run language models on a local computer.
          Here, it runs both the embedding model and the model that generates the final response.
          The data and questions remain on the machine instead of being sent to an external AI service.
        </p>
        <ul className="caseStudyList">
          <li>No API key or paid cloud AI service is required.</li>
          <li>Private or sensitive datasets can remain on the local system.</li>
          <li>Models can be changed without redesigning the rest of the application.</li>
          <li>The complete AI process can be developed and tested locally.</li>
        </ul>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Application Process</div>
        <h2 style={{ margin: "10px 0 0" }}>How a question is answered</h2>
        <ol className="caseStudyList">
          <li>The review text is cleaned, divided into chunks, and prepared for indexing.</li>
          <li>Ollama runs mxbai-embed-large to create an embedding for each chunk.</li>
          <li>Chroma stores the embeddings and their associated review text.</li>
          <li>A user question is embedded and compared with the stored embeddings.</li>
          <li>The most relevant reviews are added to a prompt as supporting context.</li>
          <li>Ollama runs gpt-oss:20b to answer the question using that context.</li>
        </ol>
        <p className="artifactNote">
          This is retrieval-augmented generation, or RAG. Retrieval gives the model information
          from the selected dataset, while generation turns it into a natural-language answer.
        </p>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Scalability</div>
        <h2 style={{ margin: "10px 0 0" }}>Applying the system to other applications</h2>
        <p className="artifactNote">
          The AI pipeline is separate from the subject of the data. To reuse the application,
          the review scraper can be replaced with another data-loading step while the embedding,
          vector search, retrieval, and Ollama query process remain mostly unchanged.
        </p>
        <p className="artifactNote">The same design could query:</p>
        <ul className="caseStudyList">
          <li>Product reviews and customer feedback</li>
          <li>Technical documentation and instruction manuals</li>
          <li>Support tickets and troubleshooting records</li>
          <li>Research papers, class notes, or internal reports</li>
          <li>Company policies and private document collections</li>
        </ul>
        <p className="artifactNote">
          Larger datasets can be processed in batches and stored in a persistent vector database.
          The local model can also be replaced with a larger model or a hosted service without
          changing the basic RAG architecture.
        </p>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Technologies</div>
        <p className="artifactNote">
          Python · Ollama · LangChain · Chroma · Pandas · mxbai-embed-large · gpt-oss:20b
        </p>
      </div>

      <Link className="btn backLink" to="/projects/ai">Back to AI projects</Link>
    </section>
  );
}
