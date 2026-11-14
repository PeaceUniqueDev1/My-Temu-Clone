
import {
  ShoppingBag,
  UserRound,
  Package,
  Headphones,
  ArrowUp
} from "lucide-react";

function Footer({ onAccountClick, onOrdersClick, onCartClick }) {
  return (
    <footer className="uniqmart-footer" id="footer">
      <div className="footer-container">

        <div className="footer-top">
          <div className="footer-brand">
            <h2>UNIQMART<span>.</span></h2>
            <p>
              Discover more. Shop better.
              Your shopping experience made simple.
            </p>
          </div>

          <div className="footer-links">

            <div className="footer-column">
              <h3>Explore</h3>
              <a href="#top">Home</a>
              <a href="#categories">Categories</a>
              <a href="#top">Shop Products</a>
            </div>

            <div className="footer-column">
              <h3>My Shopping</h3>
              <button onClick={onCartClick}>
                <ShoppingBag size={15} /> Shopping Cart
              </button>
              <button onClick={onAccountClick}>
                <UserRound size={15} /> My Account
              </button>
              <button onClick={onOrdersClick}>
                <Package size={15} /> My Orders
              </button>
            </div>

            <div className="footer-column">
              <h3>Need Help?</h3>
              <a href="#support">
                <Headphones size={15} /> Customer Support
              </a>
              <a href="#support">Frequently Asked Questions</a>
            </div>

          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} UNIQMART.
            All rights reserved.
          </p>

          <a href="#top" className="footer-back-top">
            Back to top <ArrowUp size={15} />
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
