import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onAddToCart }) {
  const { items, addToCart, updateQty } = useCart();
  const cartItem = items.find((i) => i.id === product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    if (onAddToCart) onAddToCart(product.name);
  };

  const handleInc = (e) => {
    e.preventDefault();
    updateQty(product.id, cartItem.qty + 1);
  };

  const handleDec = (e) => {
    e.preventDefault();
    updateQty(product.id, cartItem.qty - 1);
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      {/* Badges */}
      <div className="card-badges">
        {product.discount > 0 && (
          <span className="badge-discount">{product.discount}% OFF</span>
        )}
        {product.bestSeller && <span className="badge-best">⭐ Best Seller</span>}
        {product.stockCount <= 2 && product.inStock && (
          <span className="badge-low">Only {product.stockCount} left!</span>
        )}
      </div>

      {/* Wishlist */}
      <button className="wishlist-btn" onClick={(e) => e.preventDefault()}>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      </button>

      {/* Image */}
      <div className="card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
        />
        {!product.inStock && <div className="out-of-stock-overlay">Out of Stock</div>}
      </div>

      {/* Info */}
      <div className="card-body">
        <div className="card-delivery">🕐 {product.deliveryTime}</div>
        <h3 className="card-name">{product.name}</h3>
        <p className="card-weight">{product.weight}</p>

        {/* Rating */}
        <div className="card-rating">
          <span className="stars">{"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}</span>
          <span className="rating-count">({product.reviews})</span>
        </div>

        {/* Price + Cart */}
        <div className="card-footer">
          <div className="price-wrap">
            <span className="price-current">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="price-original">₹{product.originalPrice}</span>
            )}
          </div>

          {product.inStock ? (
            cartItem ? (
              <div className="qty-control" onClick={(e) => e.preventDefault()}>
                <button className="qty-btn" onClick={handleDec}>−</button>
                <span className="qty-num">{cartItem.qty}</span>
                <button className="qty-btn" onClick={handleInc}>+</button>
              </div>
            ) : (
              <button className="add-btn" onClick={handleAdd}>Add +</button>
            )
          ) : (
            <button className="add-btn disabled" disabled>Unavailable</button>
          )}
        </div>
      </div>
    </Link>
  );
}
