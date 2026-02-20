import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notfound">
      <h2>Page not found (404)</h2>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="success-link">
        Back to shop
      </Link>
    </div>
  );
}

export default NotFound;
