// ======================================== // FIREBASE APP // ========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  
// ======================================== // FIREBASE AUTHENTICATION // ========================================
   
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
  
// ======================================== // FIREBASE CONFIG // ========================================

const firebaseConfig = {
    apiKey: "AIzaSyAWAyxSAgTAGALsfTTFe-N3xY-si2s8dgM",
    authDomain: "javeriyah-firebase-project.firebaseapp.com",
    projectId: "javeriyah-firebase-project",
    storageBucket: "javeriyah-firebase-project.firebasestorage.app",
    messagingSenderId: "63860956015",
    appId: "1:63860956015:web:eb713b648cb7edb6bbe69a",
    measurementId: "G-G9F1RPC342"
  };

// ======================================== // INITIALIZE FIREBASE // ========================================
  const app = initializeApp(firebaseConfig);

// ======================================== // INITIALIZE AUTH // ========================================
  const auth = getAuth(app);

// ======================================== // EXPORT AUTH // ========================================

export { auth };