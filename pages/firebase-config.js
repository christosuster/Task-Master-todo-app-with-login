import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "todo-list-with-login.firebaseapp.com",
  projectId: "todo-list-with-login",
  storageBucket: "todo-list-with-login.appspot.com",
  messagingSenderId: "921218061866",
  appId: "1:921218061866:web:508a3c4c369f92e6531553",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
