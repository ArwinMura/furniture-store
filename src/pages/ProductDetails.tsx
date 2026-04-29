import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";
import type { Cart, Product } from "../types";

interface ProductDetailsProps {
  cart: Cart;
  onAdd: (productId: number) => void;
  onRemove: (productId: number) => void;
}

function ProductDetails({ cart, onAdd, onRemove }: ProductDetailsProps) {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const productId = Number(id);

        if (Number.isNaN(productId)) {
          setError("Invalid product ID.");
          return;
        }

        const data = await fetchProductById(productId);
        setProduct(data);
      } catch {
        setError("Could not load product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error || !product) {
    return (
      <div className="empty">
        <h3>Product not found</h3>
        <p>{error || "This product does not exist."}</p>
        <Link to="/" className="success-link">
          Back to shop
        </Link>
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
              <button
                className="qty-btn"
                onClick={() => onRemove(product.id)}
                type="button"
              >
                −
              </button>

              <span className="qty-number">{quantity}</span>

              <button
                className="qty-btn primary"
                onClick={() => onAdd(product.id)}
                type="button"
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="product-button"
              onClick={() => onAdd(product.id)}
              type="button"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
