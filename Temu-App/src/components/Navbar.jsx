
import {
  Search,
  ShoppingCart,
  UserRound,
  Headset,
  Package,
} from "lucide-react";

function Navbar({
  search,
  setSearch,
  cartCount = 0,
  onAccountClick,
  onCartClick,
  onOrdersClick,
}) {
  return (
    <header className="temu-header">
      <div className="top-bar">
        <span>Free shipping on every order</span>
        <span>Delivery guarantee</span>
        <span>Welcome to UNIQMART</span>
      </div>

      <nav className="navbar">
        <a href="#top" className="logo">
          UNIQMART
        </a>

        <form
          className="search-box"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <Search size={20} />
          </button>
        </form>

        <div className="nav-actions">
          <button type="button" onClick={onAccountClick}>
            <UserRound size={21} />
            <span>Account</span>
          </button>

          <a href="#support">
            <Headset size={21} />
            <span>Support</span>
          </a>

          <button type="button" onClick={onOrdersClick}>
            <Package size={21} />
            <span>Orders</span>
          </button>

          <button
            type="button"
            className="cart-link"
            onClick={onCartClick}
          >
            <ShoppingCart size={23} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
