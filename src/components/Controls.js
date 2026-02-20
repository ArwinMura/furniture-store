import "./Controls.css";

function Controls({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  categories,
}) {
  return (
    <div className="controls">
      <div className="control">
        <label className="control__label" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          className="control__input"
          placeholder="Try 'sofa' or 'wood'..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>

      <div className="control">
        <label className="control__label" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          className="control__select"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label className="control__label" htmlFor="sort">
          Sort
        </label>
        <select
          id="sort"
          className="control__select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
        </select>
      </div>
    </div>
  );
}

export default Controls;
