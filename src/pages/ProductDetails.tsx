import { Link, useParams } from "react-router-dom";
import type { Cart, Product } from "../types";

interface ProductDetailsProps {
  products: Product[];
  cart: Cart;
  onAdd: (productId: number) => void;
  onRemove: (productId: number) => void;
}

function ProductDetails({
  products,
  cart,
  onAdd,
  onRemove,
}: ProductDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div>
        <p>Product not found.</p>
        <Link to="/">Back to shop</Link>
      </div>
    );
  }

  const quantity = cart[product.id] ?? 0;

  return (
    <div className="details">
      <Link to="/" className="back-link">
        ← Back
      </Link>

      <div className="details-card">
        <img className="details-img" src={product.imageUrl} alt={product.name} />

        <div className="details-body">
          <h2 className="details-title">{product.name}</h2>
          <p className="details-category">{product.category}</p>
          <p className="details-desc">{product.description}</p>
          <p className="details-price">${product.price}</p>

          {quantity > 0 ? (
            <div className="qty-controls">
              <button className="qty-btn" onClick={() => onRemove(product.id)} type="button">
                −
              </button>
              <span className="qty-number">{quantity}</span>
              <button className="qty-btn primary" onClick={() => onAdd(product.id)} type="button">
                +
              </button>
            </div>
          ) : (
            <button className="product-button" onClick={() => onAdd(product.id)} type="button">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
