import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "task-master-fbecc.firebaseapp.com",
  projectId: "task-master-fbecc",
  storageBucket: "task-master-fbecc.appspot.com",
  messagingSenderId: "1017338456115",
  appId: "1:1017338456115:web:a6be3771937a7620111b46",
};

const app = initializeApp(FirebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
