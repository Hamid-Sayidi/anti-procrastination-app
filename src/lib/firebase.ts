import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkOnBMx1V0Xl2-oIQUlqJbLMTxEdLdJc",
  authDomain: "anti-procrastination-3953c.firebaseapp.com",
  projectId: "anti-procrastination-3953c",
  storageBucket: "anti-procrastination-3953c.firebasestorage.app",
  messagingSenderId: "946226334618",
  appId: "1:946226334618:web:b9900476f3e2ed8fa20823",
  measurementId: "G-3MCNFWLDQV",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
