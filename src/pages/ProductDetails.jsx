import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../data/products.json";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";

export default function ProductDetails() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === Number(id));
  const related = productsData.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4);
  const { addToCart, items, updateQty } = useCart();
  const cartItem = items.find((i) => i.id === product?.id);
  const { toasts, addToast, removeToast } = useToast();
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <div className="page">
        <Navbar />
        <div className="empty-state" style={{ minHeight: "60vh" }}>
          <div style={{ fontSize: "4rem" }}>😕</div>
          <h2>Product not found</h2>
          <Link to="/products" className="hero-cta" style={{ marginTop: "1rem", display: "inline-block" }}>← Back to Products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="detail-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.name}</span>
        </div>

        <div className="detail-grid">
          {/* Image */}
          <div className="detail-image-wrap">
            <img src={product.image} alt={product.name} className="detail-image" />
            {product.discount > 0 && (
              <div className="detail-badge">{product.discount}% OFF</div>
            )}
          </div>

          {/* Info */}
          <div className="detail-info">
            {product.bestSeller && <span className="badge-best">⭐ Best Seller</span>}
            <h1 className="detail-name">{product.name}</h1>
            <p className="detail-weight">{product.weight}</p>

            <div className="detail-rating">
              <span className="stars">{"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}</span>
              <span>{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="detail-price">
              <span className="detail-price-current">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="detail-price-old">₹{product.originalPrice}</span>
              )}
              {product.discount > 0 && (
                <span className="detail-savings">You save ₹{product.originalPrice - product.price}</span>
              )}
            </div>

            <div className="detail-delivery">
              🕐 Delivery in {product.deliveryTime}
            </div>

            {product.stockCount <= 2 && product.inStock && (
              <div className="detail-stock-warn">⚠️ Only {product.stockCount} left in stock!</div>
            )}

            {/* Cart Controls */}
            <div className="detail-cart">
              {product.inStock ? (
                cartItem ? (
                  <div className="qty-control large">
                    <button className="qty-btn" onClick={() => updateQty(product.id, cartItem.qty - 1)}>−</button>
                    <span className="qty-num">{cartItem.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(product.id, cartItem.qty + 1)}>+</button>
                  </div>
                ) : (
                  <button className="detail-add-btn" onClick={() => { addToCart(product); addToast(`${product.name} added to cart!`); }}>
                    Add to Cart 🛒
                  </button>
                )
              ) : (
                <button className="detail-add-btn disabled" disabled>Out of Stock</button>
              )}
              <Link to="/cart" className="detail-checkout-btn">Go to Cart →</Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {["description", "nutrition", "reviews"].map((tab) => (
            <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {activeTab === "description" && <p>{product.description}</p>}
          {activeTab === "nutrition" && (
            <div className="nutrition-table">
              <div className="nutrition-row"><span>Calories</span><span>~85 kcal</span></div>
              <div className="nutrition-row"><span>Carbohydrates</span><span>22g</span></div>
              <div className="nutrition-row"><span>Protein</span><span>1.1g</span></div>
              <div className="nutrition-row"><span>Fat</span><span>0.3g</span></div>
              <div className="nutrition-row"><span>Fiber</span><span>2.6g</span></div>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="reviews-list">
              {["Great quality!", "Fast delivery, fresh product.", "Would buy again!"].map((r, i) => (
                <div key={i} className="review-item">
                  <span className="stars">★★★★★</span>
                  <p>{r}</p>
                  <small>Verified Buyer</small>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="section">
            <h2 className="section-title">Related Products</h2>
            <div className="products-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={(name) => addToast(`${name} added to cart!`)} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
