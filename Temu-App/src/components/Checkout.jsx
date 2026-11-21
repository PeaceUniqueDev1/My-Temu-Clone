 
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  ShoppingBag,
  ShieldCheck,
  Lock,
  CheckCircle,
  XCircle,
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
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [error, setError] = useState("");

  const [cardDetails, setCardDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

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

  const handleCardChange = (event) => {
    const { name, value } = event.target;

    setCardDetails((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      fullName,
      email,
      phone,
      address,
      city,
      state,
    } = delivery;

    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state
    ) {
      setError("Please complete all delivery information.");
      return;
    }

    setError("");

    if (paymentMethod === "demo-card") {
      setShowPayment(true);
      return;
    }

    // Cash on Delivery
    onPlaceOrder({
      delivery,
      paymentMethod: "cash",
      paymentStatus: "pending",
      items: cart,
      subtotal,
      deliveryFee,
      total,
    });
  };

  const handleCardPayment = (event) => {
    event.preventDefault();

    const { cardName, cardNumber, expiry, cvv } = cardDetails;

    if (!cardName || !cardNumber || !expiry || !cvv) {
      setPaymentStatus("failed");
      return;
    }

    // DEMO ONLY: This does not process a real card payment.
    setPaymentStatus("success");

    onPlaceOrder({
      delivery,
      paymentMethod: "demo-card",
      paymentStatus: "paid-demo",
      paymentReference: `UNIQ-DEMO-${Date.now()}`,
      items: cart,
      subtotal,
      deliveryFee,
      total,
    });
  };

  // CARD PAYMENT SCREEN
  if (showPayment) {
    return (
      <div className="checkout-page">
        <button
          className="checkout-back"
          onClick={() => {
            setShowPayment(false);
            setPaymentStatus("idle");
          }}
        >
          <ArrowLeft size={18} />
          Back to checkout
        </button>

        <div className="checkout-heading">
          <h1>Card Payment</h1>
          <p>Enter your demo card details to continue.</p>
        </div>

        <div className="checkout-card card-payment-container">
          <div className="card-payment-top">
            <div className="card-payment-icon">
              <CreditCard size={27} />
            </div>

            <div>
              <h2>UNIQMART Secure Payment</h2>
              <p>Complete your demo payment safely.</p>
            </div>
          </div>

          <div className="card-amount">
            <span>Amount to Pay</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          <form onSubmit={handleCardPayment}>
            <label>
              Cardholder Name
              <input
                type="text"
                name="cardName"
                value={cardDetails.cardName}
                onChange={handleCardChange}
                placeholder="Name on card"
                required
              />
            </label>

            <label>
              Card Number
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardChange}
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                inputMode="numeric"
                required
              />
            </label>

            <div className="card-input-row">
              <label>
                Expiry Date
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
              </label>

              <label>
                CVV
                <input
                  type="password"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                  placeholder="123"
                  maxLength={4}
                  inputMode="numeric"
                  required
                />
              </label>
            </div>

            {paymentStatus === "failed" && (
              <div className="checkout-error">
                <XCircle size={18} />
                Please complete all card fields.
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="checkout-success">
                <CheckCircle size={18} />
                Demo payment successful!
              </div>
            )}

            <button
              className="place-order-button"
              type="submit"
            >
              <Lock size={16} />
              Pay {formatPrice(total)}
            </button>
          </form>

          <p className="checkout-security">
            <ShieldCheck size={16} />
            Demo payment only. No real money is charged.
          </p>

          <p className="demo-card-warning">
            Use fictional card details only. Never enter a real
            bank card number or CVV here.
          </p>
        </div>
      </div>
    );
  }

  // MAIN CHECKOUT SCREEN
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
                <strong>Card Payment</strong>
                <small>
                  Pay using our simulated card checkout.
                </small>
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

          {error && (
            <p className="checkout-error">{error}</p>
          )}

          <button className="place-order-button" type="submit">
            {paymentMethod === "demo-card"
              ? "Continue to Payment"
              : "Place Order"}
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
