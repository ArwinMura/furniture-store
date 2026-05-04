import "./CartSummary.css";

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  onClearCart: () => void;
}

function CartSummary({
  subtotal,
  tax,
  shipping,
  total,
  onClearCart,
}: CartSummaryProps) {
  return (
    <div className="cart-summary">
      <h2 className="cart-summary__title">Cart Summary</h2>

      <div className="cart-summary__row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="cart-summary__row">
        <span>Estimated tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      <div className="cart-summary__row">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>

      <div className="cart-summary__divider" />

      <div className="cart-summary__row cart-summary__total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button className="cart-summary__clear" onClick={onClearCart} type="button">
        Clear cart
      </button>
    </div>
  );
}

export default CartSummary;
