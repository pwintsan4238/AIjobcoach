
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6w8fSKHocH6c_rRWyDOBrBbm-owTA1JE",
  authDomain: "ai-project-8916b.firebaseapp.com",
  projectId: "ai-project-8916b",
  storageBucket: "ai-project-8916b.firebasestorage.app",
  messagingSenderId: "982568652838",
  appId: "1:982568652838:web:d4e277b93646f0054716e7",
  measurementId: "G-X7F88L3EDN"
};

// Initialize Firebase once with a singleton pattern
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/**
 * Export the auth service instance.
 * Passing 'app' explicitly ensures the auth component registers 
 * with the correct Firebase app instance even if multiple versions exist in cache.
 */
export const auth = getAuth(app);
