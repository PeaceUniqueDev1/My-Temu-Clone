
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  X,
  Truck,
  Lock,
  ShoppingBag,
} from "lucide-react";

import { useLocale } from "../context/LocaleContext";

function Cart({
  cart = [],
  isOpen,
  onClose,
  updateQuantity,
  removeFromCart,
  onCheckout,
}) {
  const { formatPrice } = useLocale();

  const totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  return (
    <>
      {isOpen && (
        <div className="cart-overlay" onClick={onClose}>
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Cart header */}
            <div className="cart-header">
              <div className="cart-heading">
                <ShoppingCart size={23} />

                <div>
                  <h2>Your Shopping Cart</h2>
                  <p>
                    {totalQuantity}{" "}
                    {totalQuantity === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>

              <button
                className="cart-close"
                onClick={onClose}
                aria-label="Close cart"
              >
                <X size={23} />
              </button>
            </div>

            {/* Cart products */}
            <div className="cart-body">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={55} />
                  <h3>Your cart is empty</h3>
                  <p>
                    Looks like you haven't added anything yet.
                  </p>

                  <button onClick={onClose}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((product) => (
                  <div className="cart-item" key={product.id}>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                    />

                    <div className="cart-item-info">
                      <h3>{product.title}</h3>

                      <p className="cart-item-price">
                        {formatPrice(product.price)}
                      </p>

                      <div className="cart-item-actions">
                        <div className="quantity-control">
                          <button
                            onClick={() =>
                              updateQuantity(product.id, -1)
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>

                          <span>{product.quantity}</span>

                          <button
                            onClick={() =>
                              updateQuantity(product.id, 1)
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          className="remove-item"
                          onClick={() =>
                            removeFromCart(product.id)
                          }
                          aria-label="Remove product"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>

                    <strong className="cart-item-total">
                      {formatPrice(
                        product.price * product.quantity
                      )}
                    </strong>
                  </div>
                ))
              )}
            </div>

            {/* Cart footer */}
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-shipping">
                  <Truck size={19} />
                  <span>
                    Shopping made easy with UNIQMART
                  </span>
                </div>

                <div className="cart-subtotal">
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>

                <p className="cart-note">
                  Delivery fees and applicable taxes are
                  calculated at checkout.
                </p>

                <button
                  className="checkout-button"
                  onClick={onCheckout}
                >
                  Proceed to Checkout
                </button>

                <div className="secure-checkout">
                  <Lock size={15} />
                  <span>Secure checkout</span>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}

export default Cart;
