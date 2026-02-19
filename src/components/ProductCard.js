function ProductCard({ product }) {
    return (
      <div style={cardStyle}>
        <img
          src={product.image}
          alt={product.name}
          style={imageStyle}
        />

        <div style={bodyStyle}>
          <div style={topRowStyle}>
            <h3 style={titleStyle}>{product.name}</h3>
            <span style={pillStyle}>{product.category}</span>
          </div>

          <p style={descStyle}>{product.description}</p>

          <div style={bottomRowStyle}>
            <p style={priceStyle}>${product.price}</p>
            <button style={buttonStyle}>Add to Cart</button>
          </div>
        </div>
      </div>
    );
  }

  /* --- Styles (inline for now so you can see everything in one file) --- */
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "white",
    width: "320px",
  };

  const imageStyle = {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  };

  const bodyStyle = {
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const topRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  };

  const titleStyle = {
    margin: 0,
    fontSize: "16px",
  };

  const pillStyle = {
    fontSize: "12px",
    padding: "6px 10px",
    borderRadius: "999px",
    backgroundColor: "#f2f2f2",
    whiteSpace: "nowrap",
  };

  const descStyle = {
    margin: 0,
    color: "#555",
    fontSize: "14px",
    lineHeight: "1.3",
  };

  const bottomRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const priceStyle = {
    margin: 0,
    fontWeight: "700",
    fontSize: "16px",
  };

  const buttonStyle = {
    border: "none",
    backgroundColor: "#111",
    color: "white",
    padding: "10px 12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  };

  export default ProductCard;

