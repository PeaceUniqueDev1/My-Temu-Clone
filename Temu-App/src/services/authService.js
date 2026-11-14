
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

// Register a new customer
export const registerUser = async (fullName, phone, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: fullName,
  });

  await setDoc(doc(db, "users", userCredential.user.uid), {
    fullName,
    phone,
    email,
    createdAt: serverTimestamp(),
  });

  return userCredential;
};

// Login an existing customer
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout a customer
export const logoutUser = () => {
  return signOut(auth);
};
