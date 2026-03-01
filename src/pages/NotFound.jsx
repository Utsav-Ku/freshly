import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="empty-state" style={{ minHeight: "100vh" }}>
      <div style={{ fontSize: "5rem" }}>🛒</div>
      <h1 style={{ fontSize: "5rem", color: "#2563eb", fontWeight: 900 }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="hero-cta" style={{ marginTop: "1rem", display: "inline-block" }}>
        ← Back to Home
      </Link>
    </div>
  );
}
