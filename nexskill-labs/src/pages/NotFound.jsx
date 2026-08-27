import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-px py-32 text-center">
      <p className="font-mono text-cyan mb-4">404</p>
      <h1 className="font-display text-3xl font-semibold mb-4">Page not found</h1>
      <p className="text-paper/70 mb-8">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link to="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}
