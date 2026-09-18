// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

// Firebase Firestore
import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ===============================
// YOUR FIREBASE CONFIG
// ===============================

const firebaseConfig = {
    apiKey: "AIzaSyBFmMidgKqXIkc339It9Papd9-vMgJpQrw",
    authDomain: "my-signup-app-43246.firebaseapp.com",
    projectId: "my-signup-app-43246",
    storageBucket: "my-signup-app-43246.firebasestorage.app",
    messagingSenderId: "940632201907",
    appId: "1:940632201907:web:59405d4121907b4a6faec6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore
const db = getFirestore(app);


// Export Firestore
export { db };