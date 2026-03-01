import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">🛒 Freshly</div>
          <p>Groceries delivered in minutes. Fresh, fast, and reliable.</p>
          <div className="footer-social">
            {["Twitter", "Instagram", "Facebook"].map((s) => (
              <a key={s} href="#" className="social-link">{s[0]}</a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Blog</a>
          <a href="#">Press</a>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <a href="#">FAQ</a>
          <a href="#">Contact Us</a>
          <a href="#">Track Order</a>
          <a href="#">Returns</a>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Freshly. All rights reserved.</p>
      </div>
    </footer>
  );
}
