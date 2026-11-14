
import { useEffect, useState } from "react";
import "./App.css";

import Support from "./components/Support";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductHero from "./components/ProductHero";
import Categories from "./components/Categories";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Orders from "./components/Orders";

import { saveOrder, getCustomerOrders } from "./services/orderService";
import { logoutUser } from "./services/authService";
import { useAuth } from "./context/AuthContext";
import { useLocale } from "./context/LocaleContext";

function App() {
  const { user } = useAuth();
  const { formatPrice } = useLocale();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [savingOrder, setSavingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");

  // Account page states
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showProfile, setShowProfile] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  // Load customer orders from Firebase
  useEffect(() => {
    if (!user?.uid) {
      setOrders([]);
      return;
    }

    getCustomerOrders(user.uid)
      .then(setOrders)
      .catch((error) => {
        console.error("Could not load orders:", error);
      });
  }, [user?.uid]);

  // Add products to cart
  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
  };

  // Update product quantity
  const updateQuantity = (productId, change) => {
    setCart((previousCart) =>
      previousCart
        .map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity + change }
            : product
        )
        .filter((product) => product.quantity > 0)
    );
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((previousCart) =>
      previousCart.filter((product) => product.id !== productId)
    );
  };

  // Open checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;

    setIsCartOpen(false);
    setShowCheckout(true);
  };

  // Save customer order
  const handlePlaceOrder = async (orderDetails) => {
    try {
      setSavingOrder(true);
      setOrderError("");

      const savedOrder = await saveOrder(orderDetails, user);

      setCurrentOrder(savedOrder);
      setCart([]);
      setShowCheckout(false);

      if (user?.uid) {
        const updatedOrders = await getCustomerOrders(user.uid);
        setOrders(updatedOrders);
      }
    } catch (error) {
      console.error("Order saving failed:", error);

      setOrderError(
        "We couldn't save your order. Please check your connection and try again."
      );
    } finally {
      setSavingOrder(false);
    }
  };

  // Logout customer
  const handleLogout = async () => {
    try {
      await logoutUser();
      setShowProfile(false);
      setShowOrders(false);
      setShowAuth(false);

      alert("You have successfully logged out.");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  // Total cart items
  const cartCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  // Login and Register pages
  if (showAuth && !user) {
    return (
      <div className="app-container">
        <button
          className="auth-back-button"
          onClick={() => setShowAuth(false)}
        >
          ← Back to Shopping
        </button>

        {authMode === "login" ? (
          <Login
            onSwitchToRegister={() => setAuthMode("register")}
          />
        ) : (
          <Register
            onSwitchToLogin={() => setAuthMode("login")}
          />
        )}
      </div>
    );
  }

  // Customer Orders page
  if (showOrders && user) {
    return (
      <div className="app-container">
        <button
          className="auth-back-button"
          onClick={() => setShowOrders(false)}
        >
          ← Back to Shopping
        </button>

        <Orders
          orders={orders}
          formatPrice={formatPrice}
        />
      </div>
    );
  }

  // Customer Profile page
  if (showProfile && user) {
    return (
      <div className="app-container">
        <button
          className="auth-back-button"
          onClick={() => setShowProfile(false)}
        >
          ← Back to Shopping
        </button>

        <Profile
          user={user}
          orders={orders}
          onLogout={handleLogout}
        />
      </div>
    );
  }

  // Order receipt
  if (currentOrder) {
    return (
      <div className="app-container" id="top">
        <main className="receipt-page">
          <div className="receipt-card">
            <div className="receipt-success">✓</div>

            <h1>Thank you for shopping with us!</h1>
            <p>Your order has been received.</p>

            <h2>Order Receipt</h2>

            <div className="receipt-information">
              <p>
                <strong>Order ID:</strong> {currentOrder.orderId}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(currentOrder.createdAt).toLocaleString()}
              </p>

              <p>
                <strong>Customer:</strong> {currentOrder.customer}
              </p>

              <p>
                <strong>Email:</strong> {currentOrder.email}
              </p>

              <p>
                <strong>Customer Type:</strong>{" "}
                {currentOrder.customerType}
              </p>
            </div>

            <hr />

            <h3>Products</h3>

            {currentOrder.items.map((product) => (
              <div className="receipt-product" key={product.id}>
                <span>
                  {product.title} × {product.quantity}
                </span>

                <strong>
                  {formatPrice(product.price * product.quantity)}
                </strong>
              </div>
            ))}

            <hr />

            <div className="receipt-total">
              <span>Total</span>
              <strong>{formatPrice(currentOrder.total)}</strong>
            </div>

            <div className="receipt-information">
              <p>
                <strong>Payment Method:</strong>{" "}
                {currentOrder.paymentMethod === "demo-card"
                  ? "Demo Card Payment"
                  : "Cash on Delivery"}
              </p>

              <p>
                <strong>Payment Status:</strong>{" "}
                {currentOrder.paymentStatus}
              </p>

              <p>
                <strong>Delivery Address:</strong>{" "}
                {currentOrder.delivery.address},{" "}
                {currentOrder.delivery.city},{" "}
                {currentOrder.delivery.state}
              </p>

              <p>
                <strong>Phone:</strong> {currentOrder.delivery.phone}
              </p>
            </div>

            <p className="receipt-demo-note">
              Demo receipt only. No real payment was processed.
            </p>

            <button
              className="place-order-button"
              onClick={() => setCurrentOrder(null)}
            >
              Continue Shopping
            </button>
          </div>

          <section className="order-history">
            <h2>Order History</h2>

            {orders.length === 0 ? (
              <p>Your previous orders will appear here.</p>
            ) : (
              orders.map((order) => (
                <div className="order-history-item" key={order.orderId}>
                  <strong>Order #{order.orderId}</strong>
                  <p>Customer: {order.customer}</p>
                  <p>Total: {formatPrice(order.total)}</p>
                  <p>{order.paymentStatus}</p>
                </div>
              ))
            )}
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container" id="top">
      {!showCheckout ? (
        <>
          <Navbar
            search={search}
            setSearch={setSearch}
            cartCount={cartCount}
            onCartClick={() => setIsCartOpen(true)}
            onAccountClick={() => {
              if (user) {
                setShowProfile(true);
              } else {
                setAuthMode("login");
                setShowAuth(true);
              }
            }}
            onOrdersClick={() => {
              if (user) {
                setShowOrders(true);
              } else {
                setAuthMode("login");
                setShowAuth(true);
              }
            }}
          />

          <main>
            <ProductHero />

            <Categories
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <section id="holiday-gifts" className="holiday-gifts-section">
              <ProductList
                search={search}
                selectedCategory={selectedCategory}
                addToCart={addToCart}
              />
            </section>
          </main>

         <Support />
         
        
          <Footer
  onCartClick={() => setIsCartOpen(true)}
  onAccountClick={() => {
    if (user) setShowProfile(true);
    else {
      setAuthMode("login");
      setShowAuth(true);
    }
  }}
  onOrdersClick={() => {
    if (user) setShowOrders(true);
    else {
      setAuthMode("login");
      setShowAuth(true);
    }
  }}
/>

          <Cart
            cart={cart}
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            onCheckout={handleCheckout}
          />
        </>
      ) : (
        <>
          <Checkout
            cart={cart}
            onBack={() => {
              setShowCheckout(false);
              setIsCartOpen(true);
            }}
            onPlaceOrder={handlePlaceOrder}
          />

          {orderError && (
            <p className="checkout-error">{orderError}</p>
          )}

          {savingOrder && <p>Saving your order...</p>}
        </>
      )}
    </div>
  );
}

export default App;
