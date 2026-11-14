
import { ArrowRight, ShieldCheck, Truck, ShoppingBag } from "lucide-react";

function ProductHero() {
  return (
    <section className="product-hero">
      <div className="hero-content">
        <span className="hero-eyebrow">
          WELCOME TO UNIQMART
        </span>

        <h1>
          Discover More.
          <br />
          <span>Shop Better.</span>
        </h1>

        <p>
          Find the products you love, explore exciting collections
          and enjoy a smarter shopping experience.
        </p>

        <a href="#holiday-gifts" className="hero-button">
          Start Shopping <ArrowRight size={18} />
        </a>

        <div className="hero-benefits">
          <span><Truck size={17} /> Easy Shopping</span>
          <span><ShieldCheck size={17} /> Secure Checkout</span>
          <span><ShoppingBag size={17} /> Great Finds</span>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
          alt="Beautiful modern shopping store"
        />
      </div>
    </section>
  );
}

export default ProductHero;
