import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout({ products, cart, subtotal, tax, shipping, total, onClearCart }) {
  const navigate = useNavigate();

  // Simple form state
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postal: "",
  });

  const [errors, setErrors] = useState({});

  // Build cart line items for summary
  const items = useMemo(() => {
    return Object.entries(cart)
      .map(([productId, qty]) => {
        const product = products.find((p) => p.id === Number(productId));
        if (!product) return null;
        return { product, qty };
      })
      .filter(Boolean);
  }, [cart, products]);

  function onChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (form.email && !form.email.includes("@")) nextErrors.email = "Enter a valid email.";
    if (!form.address.trim()) nextErrors.address = "Address is required.";
    if (!form.city.trim()) nextErrors.city = "City is required.";
    if (!form.postal.trim()) nextErrors.postal = "Postal code is required.";

    // Cart must not be empty
    if (items.length === 0) nextErrors.cart = "Your cart is empty.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function placeOrder(e) {
    e.preventDefault();

    if (!validate()) return;

    // "Mock" order placement:
    // - clear cart
    // - go to success page
    onClearCart();
    navigate("/success");
  }

  return (
    <div className="checkout">
      <Link to="/cart" className="back-link">← Back to cart</Link>

      <h2 className="checkout-title">Checkout</h2>

      {errors.cart && <p className="error-text">{errors.cart}</p>}

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          <Field
            label="Full Name"
            value={form.fullName}
            onChange={(v) => onChange("fullName", v)}
            error={errors.fullName}
          />

          <Field
            label="Email"
            value={form.email}
            onChange={(v) => onChange("email", v)}
            error={errors.email}
          />

          <Field
            label="Address"
            value={form.address}
            onChange={(v) => onChange("address", v)}
            error={errors.address}
          />

          <div className="two-col">
            <Field
              label="City"
              value={form.city}
              onChange={(v) => onChange("city", v)}
              error={errors.city}
            />
            <Field
              label="Postal Code"
              value={form.postal}
              onChange={(v) => onChange("postal", v)}
              error={errors.postal}
            />
          </div>

          <button className="place-order-btn" type="submit">
            Place Order
          </button>
        </form>

        <aside className="order-summary">
          <h3 className="order-summary__title">Order Summary</h3>

          <div className="order-items">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="order-item">
                <span>
                  {qty}× {product.name}
                </span>
                <span>${(product.price * qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="order-divider" />

          <Row label="Subtotal" value={subtotal} />
          <Row label="Tax" value={tax} />
          <Row label="Shipping" value={shipping} />

          <div className="order-divider" />

          <div className="order-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <input
        className={`field-input ${error ? "field-input--error" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <div className="field-error">{error}</div>}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="order-row">
      <span>{label}</span>
      <span>${value.toFixed(2)}</span>
    </div>
  );
}

export default Checkout;
