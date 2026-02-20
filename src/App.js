import "./App.css";
import products from "./data/products";
import ProductCard from "./components/ProductCard";

import { useMemo, useState } from "react";

function App() {
  // cart is an object that maps productId -> quantity
  // example: { 1: 2, 3: 1 } means 2 sofas, 1 office chair
  const [cart, setCart] = useState({});

  // Add one item
  function addToCart(productId) {
    // IMPORTANT: never mutate state directly
    // always create a new object so React detects the change
    setCart((prevCart) => {
      const currentQty = prevCart[productId] ?? 0;
      return { ...prevCart, [productId]: currentQty + 1 };
    });
  }

  // Remove one item
  function removeFromCart(productId) {
    setCart((prevCart) => {
      const currentQty = prevCart[productId] ?? 0;

      // If quantity would become 0, remove the key entirely
      if (currentQty <= 1) {
        const copy = { ...prevCart };
        delete copy[productId];
        return copy;
      }

      return { ...prevCart, [productId]: currentQty - 1 };
    });
  }

  // Total items in cart (badge number)
  const cartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Arwin's Furniture Store</h1>
        <div className="cart-badge">🛒 {cartCount}</div>
      </header>

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
    </div>
  );
}

export default App;


