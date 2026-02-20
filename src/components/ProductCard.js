import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product, quantity, onAdd, onRemove }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>

      <div className="product-body">
        <div className="product-top">
          <Link to={`/product/${product.id}`} className="product-link">
            <h3 className="product-title">{product.name}</h3>
          </Link>
          <span className="product-pill">{product.category}</span>
        </div>

        <p className="product-desc">{product.description}</p>

        <div className="product-bottom">
          <p className="product-price">${product.price}</p>

          {quantity > 0 ? (
            <div className="qty-controls">
              <button className="qty-btn" onClick={onRemove} type="button">
                −
              </button>
              <span className="qty-number">{quantity}</span>
              <button className="qty-btn primary" onClick={onAdd} type="button">
                +
              </button>
            </div>
          ) : (
            <button className="product-button" onClick={onAdd} type="button">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
