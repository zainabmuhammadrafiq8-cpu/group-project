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
    apiKey: "AIzaSyAWAyxSAgTAGALsfTTFe-N3xY-si2s8dgM",
    authDomain: "javeriyah-firebase-project.firebaseapp.com",
    projectId: "javeriyah-firebase-project",
    storageBucket: "javeriyah-firebase-project.firebasestorage.app",
    messagingSenderId: "63860956015",
    appId: "1:63860956015:web:eb713b648cb7edb6bbe69a",
    measurementId: "G-G9F1RPC342"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore
const db = getFirestore(app);


// Export Firestore
export { db };