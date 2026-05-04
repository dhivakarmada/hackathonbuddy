import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDYPsDpffZnbehQBTOfNDswKVHdSP8HksE",
  authDomain: "hackathonbuddy-36abb.firebaseapp.com",
  projectId: "hackathonbuddy-36abb",
  storageBucket: "hackathonbuddy-36abb.firebasestorage.app",
  messagingSenderId: "27431712245",
  appId: "1:27431712245:web:8404af8a334d4413ef5cbc",
  measurementId: "G-TPVNZEW60Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
