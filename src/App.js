import "./App.css";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import CartSummary from "./components/CartSummary";
import Controls from "./components/Controls";
import { useMemo, useState } from "react";

function App() {
  // Cart state (Milestone 2)
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

  // Milestone 3 UI state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  // Build category list from products (All + unique categories)
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  // Derived products: filter + search + sort
  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1) Filter by search + category
    let result = products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;

      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });

    // 2) Sort
    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sort === "name-asc") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    // "featured" = leave in original order

    return result;
  }, [query, category, sort]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Arwin&apos;s Furniture Store</h1>
        <div className="cart-badge">🛒 {cartCount}</div>
      </header>

      <Controls
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
        categories={categories}
      />

      <div className="layout">
        <div>
          <div className="products-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart[product.id] ?? 0}
                onAdd={() => addToCart(product.id)}
                onRemove={() => removeFromCart(product.id)}
              />
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <p className="empty">No products match your search.</p>
          )}
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

