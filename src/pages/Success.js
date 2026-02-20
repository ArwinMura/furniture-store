import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="success">
      <h2>Order Confirmed ✅</h2>
      <p>Thanks for your purchase! This is a mock checkout flow.</p>
      <Link to="/" className="success-link">
        Back to shop
      </Link>
    </div>
  );
}

export default Success;
