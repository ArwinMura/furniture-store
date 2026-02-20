import "./App.css";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import CartSummary from "./components/CartSummary";
import { useMemo, useState } from "react";

function App() {
  const [cart, setCart] = useState({});

  function addToCart(productId) {
    setCart((prevCart) => {
      const currentQty = prevCart[productId] ?? 0;
      return { ...prevCart, [productId]: currentQty + 1 };
    });
  }

  function removeFromCart(productId) {
    setCart((prevCart) => {
      const currentQty = prevCart[productId] ?? 0;

      if (currentQty <= 1) {
        const copy = { ...prevCart };
        delete copy[productId];
        return copy;
      }

      return { ...prevCart, [productId]: currentQty - 1 };
    });
  }

  function clearCart() {
    setCart({});
  }

  const cartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  // Subtotal: sum(price * qty) across cart
  const subtotal = useMemo(() => {
    return Object.entries(cart).reduce((sum, [productId, qty]) => {
      const product = products.find((p) => p.id === Number(productId));
      if (!product) return sum;
      return sum + product.price * qty;
    }, 0);
  }, [cart]);

  // Simple rules for learning (you can change later):
  // - tax = 13% of subtotal (common Ontario example, but just a demo rule)
  // - shipping = $0 if subtotal >= 500, else $25 (demo rule)
  const tax = useMemo(() => subtotal * 0.13, [subtotal]);

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 500 ? 0 : 25;
  }, [subtotal]);

  const total = useMemo(() => subtotal + tax + shipping, [subtotal, tax, shipping]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Arwin&apos;s Furniture Store</h1>
        <div className="cart-badge">🛒 {cartCount}</div>
      </header>

      <div className="layout">
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id] ?? 0}
              onAdd={() => addToCart(product.id)}
              onRemove={() => removeFromCart(product.id)}
            />
          ))}
        </div>

        <div className="sidebar">
          <CartSummary
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
            total={total}
            onClearCart={clearCart}
          />
        </div>
      </div>
    </div>
  );
}

export default App;



