import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";

import products from "./data/products";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";

function App() {
  // Cart state (shared across pages)
  const [cart, setCart] = useState({});

  function addToCart(productId) {
    setCart((prev) => {
      const current = prev[productId] ?? 0;
      return { ...prev, [productId]: current + 1 };
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => {
      const current = prev[productId] ?? 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: current - 1 };
    });
  }

  function clearCart() {
    setCart({});
  }

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  // Totals (so cart page + summary can reuse)
  const subtotal = useMemo(() => {
    return Object.entries(cart).reduce((sum, [productId, qty]) => {
      const p = products.find((x) => x.id === Number(productId));
      return p ? sum + p.price * qty : sum;
    }, 0);
  }, [cart]);

  const tax = useMemo(() => subtotal * 0.13, [subtotal]);

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 500 ? 0 : 25;
  }, [subtotal]);

  const total = useMemo(() => subtotal + tax + shipping, [subtotal, tax, shipping]);

  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="brand">
          Arwin&apos;s Furniture Store
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Shop
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            🛒 {cartCount}
          </Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              cart={cart}
              onAdd={addToCart}
              onRemove={removeFromCart}
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
              onClearCart={clearCart}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              products={products}
              cart={cart}
              onAdd={addToCart}
              onRemove={removeFromCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <CartPage
              products={products}
              cart={cart}
              onAdd={addToCart}
              onRemove={removeFromCart}
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
              onClearCart={clearCart}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
