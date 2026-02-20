import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import CartSummary from "../components/CartSummary";
import Controls from "../components/Controls";

function Home({
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
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });

    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "name-asc") result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [products, query, category, sort]);

  return (
    <div className="layout">
      <div>
        <Controls
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          sort={sort}
          onSortChange={setSort}
          categories={categories}
        />

        <div className="products-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id] ?? 0}
              onAdd={() => onAdd(product.id)}
              onRemove={() => onRemove(product.id)}
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
          onClearCart={onClearCart}
        />
      </div>
    </div>
  );
}

export default Home;
