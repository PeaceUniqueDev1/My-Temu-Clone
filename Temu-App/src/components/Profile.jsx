
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import {
  UserRound,
  Mail,
  Phone,
  Package,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { db } from "../firebase/firebase";

function Profile({ user, orders = [], onLogout }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        const profileRef = doc(db, "users", user.uid);
        const profileSnapshot = await getDoc(profileRef);

        if (profileSnapshot.exists()) {
          setPhone(profileSnapshot.data().phone || "");
        }
      } catch (error) {
        console.error("Could not load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  if (!user) return null;

  return (
    <main className="profile-page">
      <div className="profile-card">
        <div className="profile-heading">
          <div className="profile-avatar">
            <UserRound size={38} />
          </div>

          <h1>My Account</h1>
          <p>Welcome to your UNIQMART profile.</p>
        </div>

        <section className="profile-information">
          <h2>Personal Information</h2>

          <div className="profile-detail">
            <UserRound size={20} />
            <div>
              <span>Full Name</span>
              <strong>{user.displayName || "Customer"}</strong>
            </div>
          </div>

          <div className="profile-detail">
            <Mail size={20} />
            <div>
              <span>Email Address</span>
              <strong>{user.email}</strong>
            </div>
          </div>

          <div className="profile-detail">
            <Phone size={20} />
            <div>
              <span>Phone Number</span>
              <strong>
                {loading ? "Loading..." : phone || "Not provided"}
              </strong>
            </div>
          </div>

          <div className="profile-detail">
            <ShieldCheck size={20} />
            <div>
              <span>Account Status</span>
              <strong>Registered Customer</strong>
            </div>
          </div>
        </section>

        <section className="profile-orders">
          <div className="profile-orders-heading">
            <Package size={22} />
            <h2>My Orders</h2>
          </div>

          <p>
            You have placed <strong>{orders.length}</strong> order(s).
          </p>

          {orders.length === 0 ? (
            <p className="profile-empty">
              Your orders will appear here when you make a purchase.
            </p>
          ) : (
            orders.map((order) => (
              <div className="profile-order-item" key={order.orderId}>
                <strong>Order #{order.orderId}</strong>
                <span>{order.status}</span>
              </div>
            ))
          )}
        </section>

        <button className="profile-logout" onClick={onLogout}>
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </main>
  );
}

export default Profile;
