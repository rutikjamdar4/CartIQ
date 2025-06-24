// src/firebase.js

// Import the required Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrqVsR0gcGGudcPHWc7IkfhBm2QhCpFq4",
  authDomain: "cartiq-9fdf7.firebaseapp.com",
  projectId: "cartiq-9fdf7",
  storageBucket: "cartiq-9fdf7.firebasestorage.app",
  messagingSenderId: "1:192287325137:web:7ef842041c6353bf257ef0",
  appId: "1:192287325137:web:7ef842041c6353bf257ef0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore Database
export const auth = getAuth(app);
export const db = getFirestore(app);
