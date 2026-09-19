// ========================================
// FIREBASE APP
// ========================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";


// ========================================
// FIREBASE AUTH
// ========================================

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


// ========================================
// FIREBASE CONFIG
// ========================================

const firebaseConfig = {
    apiKey: "AIzaSyBFmMidgKqXIkc339It9Papd9-vMgJpQrw",
    authDomain: "my-signup-app-43246.firebaseapp.com",
    projectId: "my-signup-app-43246",
    storageBucket: "my-signup-app-43246.firebasestorage.app",
    messagingSenderId: "940632201907",
    appId: "1:940632201907:web:59405d4121907b4a6faec6"
  };

// ========================================
// INITIALIZE FIREBASE
// ========================================

const app = initializeApp(firebaseConfig);


// ========================================
// INITIALIZE AUTH
// ========================================

const auth = getAuth(app);


// ========================================
// EXPORT
// ========================================

export { auth };