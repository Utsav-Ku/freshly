import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";

const CATEGORIES = ["All", "Fruits & Vegetables", "Dairy & Eggs", "Snacks", "Beverages", "Atta, Rice & Dal", "Personal Care", "Cleaning Supplies"];
const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Popularity", value: "rating" },
  { label: "Discount", value: "discount" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [sort, setSort] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const filtered = useMemo(() => {
    let data = [...productsData];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (category !== "All") data = data.filter((p) => p.category === category);
    data = data.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (onlyInStock) data = data.filter((p) => p.inStock);

    if (sort === "price_asc") data.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") data.sort((a, b) => b.price - a.price);
    else if (sort === "rating") data.sort((a, b) => b.rating - a.rating);
    else if (sort === "discount") data.sort((a, b) => b.discount - a.discount);

    return data;
  }, [searchQuery, category, sort, priceRange, onlyInStock]);

  const handleSearch = (q) => setSearchQuery(q);

  return (
    <div className="page">
      <Navbar onSearch={handleSearch} />
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="products-page">
        {/* Sidebar Toggle (mobile) */}
        <button className="filter-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰ Filters
        </button>

        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <h3 className="sidebar-title">Filters</h3>

          {/* Category */}
          <div className="filter-group">
            <h4>Category</h4>
            {CATEGORIES.map((cat) => (
              <label key={cat} className="filter-label">
                <input
                  type="radio"
                  name="category"
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <h4>Max Price: ₹{priceRange[1]}</h4>
            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="price-slider"
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748b" }}>
              <span>₹0</span>
              <span>₹500</span>
            </div>
          </div>

          {/* In Stock */}
          <div className="filter-group">
            <label className="filter-label">
              <input type="checkbox" checked={onlyInStock} onChange={(e) => setOnlyInStock(e.target.checked)} />
              In Stock Only
            </label>
          </div>

          <button className="clear-filters" onClick={() => { setCategory("All"); setPriceRange([0, 500]); setOnlyInStock(false); setSearchQuery(""); }}>
            Clear All Filters
          </button>
        </aside>

        {/* Main */}
        <main className="products-main">
          <div className="products-topbar">
            <p className="results-count">{filtered.length} products found</p>
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div style={{ fontSize: "4rem" }}>🛒</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={(name) => addToast(`${name} added to cart!`)} />
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
