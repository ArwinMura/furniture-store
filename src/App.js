import "./App.css";
import products from "./data/products";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Arwin's Furniture Store</h1>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}


export default App;

