import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />

      <main className="container" style={{ padding: "34px 0 70px" }}>
        {children}
      </main>

      <footer
        className="container"
        style={{
          paddingBottom: 40,
          color: "rgba(255,255,255,0.65)",
        }}
      >
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.10)",
            paddingTop: 18,
          }}
        >
          © {new Date().getFullYear()} Charles B O&apos;Byrne
        </div>
      </footer>
    </>
  );
}
