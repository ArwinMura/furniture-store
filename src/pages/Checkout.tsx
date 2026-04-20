import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Cart, Product } from "../types";

interface CheckoutProps {
  products: Product[];
  cart: Cart;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  onClearCart: () => void;
}

interface CheckoutForm {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postal: string;
}

interface CheckoutErrors {
  fullName?: string;
  email?: string;
  address?: string;
  city?: string;
  postal?: string;
  cart?: string;
}

function Checkout({
  products,
  cart,
  subtotal,
  tax,
  shipping,
  total,
  onClearCart,
}: CheckoutProps) {
  const navigate = useNavigate();

  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postal: "",
  });

  const [errors, setErrors] = useState<CheckoutErrors>({});

  const items = useMemo(() => {
    return Object.entries(cart)
      .map(([productId, qty]) => {
        const product = products.find((p) => p.id === Number(productId));
        if (!product) return null;
        return { product, qty };
      })
      .filter((item): item is { product: Product; qty: number } => item !== null);
  }, [cart, products]);

  function onChange(field: keyof CheckoutForm, value: string): void {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): boolean {
    const nextErrors: CheckoutErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (form.email && !form.email.includes("@")) nextErrors.email = "Enter a valid email.";
    if (!form.address.trim()) nextErrors.address = "Address is required.";
    if (!form.city.trim()) nextErrors.city = "City is required.";
    if (!form.postal.trim()) nextErrors.postal = "Postal code is required.";
    if (items.length === 0) nextErrors.cart = "Your cart is empty.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function placeOrder(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!validate()) return;

    onClearCart();
    navigate("/success");
  }

  return (
    <div className="checkout">
      <Link to="/cart" className="back-link">
        ← Back to cart
      </Link>

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

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
}

function Field({ label, value, onChange, error }: FieldProps) {
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

interface RowProps {
  label: string;
  value: number;
}

function Row({ label, value }: RowProps) {
  return (
    <div className="order-row">
      <span>{label}</span>
      <span>${value.toFixed(2)}</span>
    </div>
  );
}

export default Checkout;
