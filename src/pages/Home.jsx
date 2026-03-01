import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";

const BANNERS = [
  {
    id: 1,
    title: "Fresh Groceries",
    subtitle: "Delivered in 10 minutes",
    cta: "Shop Now",
    bg: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #60a5fa 100%)",
    emoji: "🥦",
  },
  {
    id: 2,
    title: "Up to 40% OFF",
    subtitle: "On dairy & beverages today",
    cta: "Grab Deals",
    bg: "linear-gradient(135deg, #1e40af 0%, #3b82f6 60%, #93c5fd 100%)",
    emoji: "🥛",
  },
  {
    id: 3,
    title: "Free Delivery",
    subtitle: "On orders above ₹500",
    cta: "Order Now",
    bg: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #bfdbfe 100%)",
    emoji: "🚀",
  },
];

const CATEGORIES = [
  { name: "Fruits & Vegetables", emoji: "🥗", color: "#dcfce7" },
  { name: "Dairy & Eggs", emoji: "🥚", color: "#fef9c3" },
  { name: "Snacks", emoji: "🍿", color: "#fee2e2" },
  { name: "Beverages", emoji: "🥤", color: "#dbeafe" },
  { name: "Atta, Rice & Dal", emoji: "🌾", color: "#fef3c7" },
  { name: "Personal Care", emoji: "🧴", color: "#f3e8ff" },
  { name: "Cleaning Supplies", emoji: "🧹", color: "#d1fae5" },
];

export default function Home() {
  const [bannerIdx, setBannerIdx] = useState(0);
  const { toasts, addToast, removeToast } = useToast();
  const navigate = useNavigate();
  const bestSellers = productsData.filter((p) => p.bestSeller);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx((i) => (i + 1) % BANNERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const handleSearch = (q) => {
    navigate(`/products?search=${encodeURIComponent(q)}`);
  };

  return (
    <div className="page">
      <Navbar onSearch={handleSearch} />
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Hero Banner */}
      <section className="hero">
        {BANNERS.map((b, i) => (
          <div key={b.id} className={`hero-slide ${i === bannerIdx ? "active" : ""}`} style={{ background: b.bg }}>
            <div className="hero-content">
              <p className="hero-tag">⚡ Quick Commerce</p>
              <h1 className="hero-title">{b.title}</h1>
              <p className="hero-sub">{b.subtitle}</p>
              <Link to="/products" className="hero-cta">{b.cta} →</Link>
            </div>
            <div className="hero-emoji">{b.emoji}</div>
          </div>
        ))}
        <div className="hero-dots">
          {BANNERS.map((_, i) => (
            <button key={i} className={`dot ${i === bannerIdx ? "active" : ""}`} onClick={() => setBannerIdx(i)} />
          ))}
        </div>
      </section>

      {/* Delivery promise bar */}
      <div className="promise-bar">
        {["🕐 10-min delivery", "🌿 100% Fresh", "💳 Easy Returns", "🚚 Free above ₹500"].map((item) => (
          <span key={item} className="promise-item">{item}</span>
        ))}
      </div>

      {/* Categories */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <Link to="/products" className="section-link">View All →</Link>
        </div>
        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="category-card"
              style={{ background: cat.color }}
            >
              <span className="cat-emoji">{cat.emoji}</span>
              <span className="cat-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">⭐ Best Sellers</h2>
          <Link to="/products" className="section-link">See All →</Link>
        </div>
        <div className="products-grid">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={(name) => addToast(`${name} added to cart!`)} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter-inner">
          <h2>Get Exclusive Offers 🎁</h2>
          <p>Subscribe and get 10% off on your first order</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
