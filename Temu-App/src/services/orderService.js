
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const ordersCollection = collection(db, "orders");

// Save a customer's order
export const saveOrder = async (orderDetails, user) => {
  const orderId = Date.now().toString();

  const order = {
    ...orderDetails,
    orderId,
    userId: user?.uid || null,
    customer: user?.displayName || orderDetails.delivery.fullName,
    email: user?.email || orderDetails.delivery.email,
    customerType: user ? "Registered Customer" : "Guest",
    createdAt: new Date().toISOString(),
    paymentStatus:
      orderDetails.paymentMethod === "demo-card"
        ? "Demo payment successful"
        : "Payment pending - Cash on Delivery",
    status: "Processing",
  };

  const documentRef = await addDoc(ordersCollection, order);

  return {
    ...order,
    documentId: documentRef.id,
  };
};

// Get a customer's previous orders
export const getCustomerOrders = async (userId) => {
  if (!userId) return [];

  const ordersQuery = query(
    ordersCollection,
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(ordersQuery);

  return snapshot.docs
    .map((document) => ({
      ...document.data(),
      documentId: document.id,
    }))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
};
