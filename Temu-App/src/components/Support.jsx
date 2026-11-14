
import {
  Headphones,
  ShoppingBag,
  CreditCard,
  Truck,
  Package,
  UserRound,
  ChevronDown
} from "lucide-react";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our products, select the items you like, add them to your cart and proceed to checkout. Enter your delivery information and place your order."
  },
  {
    question: "What payment methods are available?",
    answer:
      "UNIQMART currently provides Cash on Delivery and a demonstration card payment option. The card option does not process real payments."
  },
  {
    question: "How can I check my order?",
    answer:
      "Log in to your account and open My Orders to view your previous orders and their current status."
  },
  {
    question: "Can I change the quantity of a product?",
    answer:
      "Yes! Open your shopping cart to increase or decrease product quantities or remove items before checkout."
  },
  {
    question: "How do I create an account?",
    answer:
      "Click Account on the navigation bar, choose Register and enter your details to create your UNIQMART account."
  },
  {
    question: "Can I get a refund or return a product?",
    answer:
      "UNIQMART is currently a graduation project demonstration. Real returns and refunds are not processed through this application."
  },
  {
    question: "Can I shop without an account?",
    answer:
      "You can browse products as a visitor. However, you need to sign in to save and view your personal order history."
  }
];

function Support() {
  return (
    <section className="support-section" id="support">
      <div className="support-container">

        <div className="support-heading">
          <div className="support-icon">
            <Headphones size={28} />
          </div>

          <h2>How Can We Help You?</h2>

          <p>
            Find answers to common questions about shopping
            with UNIQMART.
          </p>
        </div>

        <div className="support-content">

          <div className="support-intro">
            <h3>We're Here to Help!</h3>
            <p>
              Whether you're shopping, checking your orders
              or managing your account, find helpful answers
              below.
            </p>

            <div className="support-benefits">
              <div>
                <ShoppingBag size={20} />
                <span>Shopping Help</span>
              </div>

              <div>
                <CreditCard size={20} />
                <span>Payment Information</span>
              </div>

              <div>
                <Truck size={20} />
                <span>Delivery Information</span>
              </div>

              <div>
                <Package size={20} />
                <span>Order Information</span>
              </div>

              <div>
                <UserRound size={20} />
                <span>Account Assistance</span>
              </div>
            </div>
          </div>

          <div className="support-faqs">
            <h3>Frequently Asked Questions</h3>

            {faqs.map((faq, index) => (
              <details className="support-faq" key={index}>
                <summary>
                  {faq.question}
                  <ChevronDown size={19} />
                </summary>

                <p>{faq.answer}</p>
              </details>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Support;
