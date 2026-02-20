import { Link, useNavigate } from "react-router-dom";
import CartSummary from "../components/CartSummary";

function CartPage({
  products,
  cart,
  onAdd,
  onRemove,
  subtotal,
  tax,
  shipping,
  total,
  onClearCart,
}) {
  const navigate = useNavigate();

  const cartItems = Object.entries(cart)
    .map(([productId, qty]) => {
      const product = products.find((p) => p.id === Number(productId));
      if (!product) return null;
      return { product, qty };
    })
    .filter(Boolean);

  return (
    <div className="layout">
      <div>
        <h2 style={{ marginTop: 0 }}>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>
            Your cart is empty. <Link to="/">Go shopping</Link>
          </p>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map(({ product, qty }) => (
                <div key={product.id} className="cart-item">
                  <img
                    className="cart-item__img"
                    src={product.image}
                    alt={product.name}
                  />

                  <div className="cart-item__info">
                    <Link to={`/product/${product.id}`} className="product-link">
                      <strong>{product.name}</strong>
                    </Link>
                    <div style={{ color: "#555" }}>${product.price}</div>
                  </div>

                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => onRemove(product.id)}
                      type="button"
                    >
                      −
                    </button>
                    <span className="qty-number">{qty}</span>
                    <button
                      className="qty-btn primary"
                      onClick={() => onAdd(product.id)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout button */}
            <button
              className="checkout-btn"
              type="button"
              onClick={() => navigate("/checkout")}
            >
              Go to Checkout
            </button>
          </>
        )}
      </div>

      <div className="sidebar">
        <CartSummary
          subtotal={subtotal}
          tax={tax}
          shipping={shipping}
          total={total}
          onClearCart={onClearCart}
        />
      </div>
    </div>
  );
}

export default CartPage;


