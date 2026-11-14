
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  ShoppingBag,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { useLocale } from "../context/LocaleContext";

function Checkout({ cart, onBack, onPlaceOrder }) {
  const { formatPrice } = useLocale();

  const [delivery, setDelivery] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [error, setError] = useState("");

  const subtotal = cart.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setDelivery((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { fullName, email, phone, address, city, state } = delivery;

    if (!fullName || !email || !phone || !address || !city || !state) {
      setError("Please complete all delivery information.");
      return;
    }

    setError("");

    onPlaceOrder({
      delivery,
      paymentMethod,
      items: cart,
      subtotal,
      deliveryFee,
      total,
    });
  };

  return (
    <div className="checkout-page">
      <button className="checkout-back" onClick={onBack}>
        <ArrowLeft size={18} />
        Back to cart
      </button>

      <div className="checkout-heading">
        <h1>Complete Your Order</h1>
        <p>You're just a few steps away from your purchase.</p>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-details">
          <section className="checkout-card">
            <h2>
              <MapPin size={21} />
              Delivery Information
            </h2>

            <div className="checkout-form-grid">
              <label>
                Full Name
                <input
                  name="fullName"
                  value={delivery.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  value={delivery.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </label>

              <label>
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  value={delivery.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </label>

              <label className="checkout-full-width">
                Delivery Address
                <input
                  name="address"
                  value={delivery.address}
                  onChange={handleChange}
                  placeholder="House number, street name"
                  required
                />
              </label>

              <label>
                City
                <input
                  name="city"
                  value={delivery.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                />
              </label>

              <label>
                State
                <input
                  name="state"
                  value={delivery.state}
                  onChange={handleChange}
                  placeholder="Enter your state"
                  required
                />
              </label>
            </div>
          </section>

          <section className="checkout-card">
            <h2>
              <CreditCard size={21} />
              Payment Method
            </h2>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(event) =>
                  setPaymentMethod(event.target.value)
                }
              />
              <span>
                <strong>Cash on Delivery</strong>
                <small>Pay when your order arrives.</small>
              </span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="demo-card"
                checked={paymentMethod === "demo-card"}
                onChange={(event) =>
                  setPaymentMethod(event.target.value)
                }
              />
              <span>
                <strong>Demo Card Payment</strong>
                <small>Demonstration only. No real payment is taken.</small>
              </span>
            </label>
          </section>
        </div>

        <aside className="checkout-card order-summary">
          <h2>
            <ShoppingBag size={21} />
            Order Summary
          </h2>

          {cart.map((product) => (
            <div className="checkout-product" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>{product.title}</strong>
                <small>Quantity: {product.quantity}</small>
              </div>
              <span>
                {formatPrice(product.price * product.quantity)}
              </span>
            </div>
          ))}

          <div className="summary-line">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>

          <div className="summary-line">
            <span>Delivery</span>
            <strong>Free</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          {error && <p className="checkout-error">{error}</p>}

          <button className="place-order-button" type="submit">
            Place Order
          </button>

          <p className="checkout-security">
            <ShieldCheck size={16} />
            Safe and secure demo checkout
          </p>
        </aside>
      </form>
    </div>
  );
}

export default Checkout;
