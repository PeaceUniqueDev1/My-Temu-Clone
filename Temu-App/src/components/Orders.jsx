
import { Package, CalendarDays, ShoppingBag } from "lucide-react";

function Orders({ orders = [], formatPrice }) {
  return (
    <main className="orders-page">
      <div className="orders-container">
        <div className="orders-heading">
          <div className="orders-icon">
            <Package size={30} />
          </div>

          <div>
            <h1>My Orders</h1>
            <p>Keep track of your UNIQMART purchases.</p>
          </div>
        </div>

        <div className="orders-summary">
          <ShoppingBag size={22} />
          <span>
            You have placed <strong>{orders.length}</strong> order(s).
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="orders-empty">
            <Package size={55} />
            <h2>No orders yet</h2>
            <p>
              Your purchases will appear here when you place
              your first order.
            </p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <article className="order-card" key={order.orderId}>
                <div className="order-card-header">
                  <div>
                    <span>Order ID</span>
                    <strong>#{order.orderId}</strong>
                  </div>

                  <span className="order-status">
                    {order.status || "Processing"}
                  </span>
                </div>

                <div className="order-date">
                  <CalendarDays size={17} />
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "Date unavailable"}
                </div>

                <div className="order-products">
                  {order.items?.map((product) => (
                    <div className="order-product" key={product.id}>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                      />

                      <div>
                        <strong>{product.title}</strong>
                        <span>Quantity: {product.quantity}</span>
                      </div>

                      <strong>
                        {formatPrice(product.price * product.quantity)}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <span>Total Amount</span>
                  <strong>{formatPrice(order.total)}</strong>
                </div>

                <p className="order-payment">
                  Payment:{" "}
                  {order.paymentMethod === "demo-card"
                    ? "Demo Card Payment"
                    : "Cash on Delivery"}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Orders;
