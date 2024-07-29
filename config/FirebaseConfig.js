// FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTeGJCXnv-5miQT9YO9mYdYDa62Zse0QU",
  authDomain: "ai-travel-planner-c9150.firebaseapp.com",
  projectId: "ai-travel-planner-c9150",
  storageBucket: "ai-travel-planner-c9150.appspot.com",
  messagingSenderId: "95441989900",
  appId: "1:95441989900:web:3ad7718d1649c73faa5929",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
