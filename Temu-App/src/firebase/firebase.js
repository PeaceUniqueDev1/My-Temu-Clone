
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9SBXj7cOzzmW35X536BRNndC493t89l4",
  authDomain: "uniqmart-be57b.firebaseapp.com",
  projectId: "uniqmart-be57b",
  storageBucket: "uniqmart-be57b.firebasestorage.app",
  messagingSenderId: "825178221844",
  appId: "1:825178221844:web:2598c649b06c07bf42e601"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
