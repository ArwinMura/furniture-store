import "./ProductCard.css";

function ProductCard({ product, quantity, onAdd, onRemove }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />

      <div className="product-body">
        <div className="product-top">
          <h3 className="product-title">{product.name}</h3>
          <span className="product-pill">{product.category}</span>
        </div>

        <p className="product-desc">{product.description}</p>

        <div className="product-bottom">
          <p className="product-price">${product.price}</p>

          {quantity > 0 ? (
            <div className="qty-controls">
              <button className="qty-btn" onClick={onRemove}>
                −
              </button>
              <span className="qty-number">{quantity}</span>
              <button className="qty-btn primary" onClick={onAdd}>
                +
              </button>
            </div>
          ) : (
            <button className="product-button" onClick={onAdd}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

