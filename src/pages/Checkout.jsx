import { useState } from "react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Checkout() {
  const { items, subtotal, deliveryCharge, totalAmount, clearCart } = useCart();
  const [payment, setPayment] = useState("upi");
  const [placed, setPlaced] = useState(false);

  const handleOrder = (e) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="page">
        <Navbar />
        <div className="empty-state" style={{ minHeight: "70vh" }}>
          <div style={{ fontSize: "5rem" }}>🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p>Your groceries are on the way. Expected in 10-15 minutes.</p>
          <a href="/" className="hero-cta" style={{ marginTop: "1rem", display: "inline-block" }}>Back to Home</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />
      <div className="checkout-page">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-layout">
          {/* Form */}
          <form className="checkout-form" onSubmit={handleOrder}>
            <div className="form-section">
              <h3>📍 Delivery Address</h3>
              <div className="form-grid">
                <input className="form-input" placeholder="Full Name" required />
                <input className="form-input" placeholder="Phone Number" required />
                <input className="form-input full" placeholder="Address Line 1" required />
                <input className="form-input full" placeholder="Landmark (Optional)" />
                <input className="form-input" placeholder="City" required />
                <input className="form-input" placeholder="PIN Code" required />
              </div>
            </div>

            <div className="form-section">
              <h3>💳 Payment Method</h3>
              <div className="payment-options">
                {[
                  { id: "upi", label: "UPI", icon: "⚡" },
                  { id: "card", label: "Credit / Debit Card", icon: "💳" },
                  { id: "cod", label: "Cash on Delivery", icon: "💵" },
                ].map((opt) => (
                  <label key={opt.id} className={`payment-option ${payment === opt.id ? "selected" : ""}`}>
                    <input type="radio" name="payment" value={opt.id} checked={payment === opt.id} onChange={() => setPayment(opt.id)} />
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>

              {payment === "upi" && (
                <input className="form-input" placeholder="Enter UPI ID (e.g. name@upi)" style={{ marginTop: "1rem" }} />
              )}
              {payment === "card" && (
                <div className="form-grid" style={{ marginTop: "1rem" }}>
                  <input className="form-input full" placeholder="Card Number" />
                  <input className="form-input" placeholder="MM/YY" />
                  <input className="form-input" placeholder="CVV" />
                </div>
              )}
            </div>

            <button type="submit" className="place-order-btn">Place Order 🛒</button>
          </form>

          {/* Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            {items.map((item) => (
              <div key={item.id} className="summary-row" style={{ fontSize: "0.875rem" }}>
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className="summary-divider" />
            <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>{deliveryCharge === 0 ? <span className="free-tag">FREE</span> : `₹${deliveryCharge}`}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total"><span>Total</span><span>₹{totalAmount}</span></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
