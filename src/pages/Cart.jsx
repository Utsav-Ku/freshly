import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {
  const { items, updateQty, removeFromCart, subtotal, deliveryCharge, totalAmount } = useCart();

  return (
    <div className="page">
      <Navbar />
      <div className="cart-page">
        <h1 className="page-title">Your Cart 🛒</h1>

        {items.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: "5rem" }}>🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some items to get started!</p>
            <Link to="/products" className="hero-cta" style={{ marginTop: "1rem", display: "inline-block" }}>
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Items */}
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="cart-item-weight">{item.weight}</p>
                    <p className="cart-item-price">₹{item.price}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span className="qty-num">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                    <p className="cart-item-total">₹{item.price * item.qty}</p>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>{deliveryCharge === 0 ? <span className="free-tag">FREE</span> : `₹${deliveryCharge}`}</span>
              </div>
              {deliveryCharge > 0 && (
                <p className="delivery-hint">Add ₹{500 - subtotal} more for free delivery</p>
              )}
              <div className="summary-divider" />
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
              <Link to="/checkout" className="checkout-btn">Proceed to Checkout →</Link>
              <Link to="/products" className="continue-shopping">← Continue Shopping</Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
