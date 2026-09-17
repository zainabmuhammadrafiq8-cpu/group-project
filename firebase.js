// Firebase SDK
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
  orderBy,
  serverTimestamp
} from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ==========================================
// PASTE YOUR FIREBASE CONFIG HERE
// ==========================================

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

const auth = getAuth(app);

const db = getFirestore(app);


// Export

export {

  auth,
  db,

  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,

  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
  orderBy,
  serverTimestamp

};
