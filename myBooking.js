
import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    where,
    getDocs,
    serverTimestamp
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


 const firebaseConfig = {
    apiKey: "AIzaSyBFmMidgKqXIkc339It9Papd9-vMgJpQrw",
    authDomain: "my-signup-app-43246.firebaseapp.com",
    projectId: "my-signup-app-43246",
    storageBucket: "my-signup-app-43246.firebasestorage.app",
    messagingSenderId: "940632201907",
    appId: "1:940632201907:web:59405d4121907b4a6faec6"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


const guestView = document.getElementById("guestView");
const bookingView = document.getElementById("bookingView");
const authForm = document.getElementById("authForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authTitle = document.getElementById("authTitle");
const authDescription = document.getElementById("authDescription");
const authSubmitBtn = document.getElementById("authSubmitBtn");
const switchText = document.getElementById("switchText");
const switchBtn = document.getElementById("switchBtn");
const googleBtn = document.getElementById("googleBtn");
const authMessage = document.getElementById("authMessage");
const logoutBtn = document.getElementById("logoutBtn");
const bookingTable = document.getElementById("bookingTable");
const mobileBookings = document.getElementById("mobileBookings");
const userEmail = document.getElementById("userEmail");
const refreshBtn = document.getElementById("refreshBtn");


let isSignupMode = false;
let currentUser = null;
let isLoadingBookings = false;


function setAuthMessage(message, color = "") {
    authMessage.textContent = message;
    authMessage.style.color = color;
}


function escapeHTML(value) {
    return String(value ?? "-")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function getStatusClass(status) {
    const value = String(status || "Pending").toLowerCase().trim();

    if (["pending", "confirmed", "cancelled"].includes(value)) {
        return value;
    }

    return "pending";
}


function getFirebaseError(code) {
    const errors = {
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/invalid-credential": "Incorrect email or password.",
        "auth/wrong-password": "Incorrect email or password.",
        "auth/user-not-found": "Account not found. Please create an account.",
        "auth/email-already-in-use": "This email is already registered.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/popup-closed-by-user": "Google sign-in was cancelled.",
        "auth/popup-blocked": "Please allow popups and try again.",
        "auth/operation-not-allowed": "This sign-in method is not enabled in Firebase.",
        "auth/network-request-failed": "Network error. Check your internet.",
        "auth/too-many-requests": "Too many attempts. Try again later.",
        "auth/user-disabled": "This account has been disabled."
    };

    return errors[code] || "Something went wrong. Please try again.";
}


function showGuestView() {
    guestView.style.display = "block";
    bookingView.style.display = "none";
    logoutBtn.style.display = "none";
}


function showBookingView(user) {
    guestView.style.display = "none";
    bookingView.style.display = "block";
    logoutBtn.style.display = "inline-flex";
    userEmail.textContent = user.email || "Glamora Customer";
}


switchBtn.addEventListener("click", () => {
    isSignupMode = !isSignupMode;

    setAuthMessage("");
    passwordInput.value = "";

    if (isSignupMode) {
        authTitle.textContent = "Create Account";
        authDescription.textContent =
            "Join Glamora and book your beauty appointments.";
        authSubmitBtn.textContent = "Create Account";
        switchText.textContent = "Already have an account?";
        switchBtn.textContent = "Sign In";
        passwordInput.autocomplete = "new-password";
    } else {
        authTitle.textContent = "Welcome to Glamora";
        authDescription.textContent =
            "Sign in to view your beauty appointments.";
        authSubmitBtn.textContent = "Sign In";
        switchText.textContent = "Don't have an account?";
        switchBtn.textContent = "Create Account";
        passwordInput.autocomplete = "current-password";
    }
});


authForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        setAuthMessage("Please fill in all fields.", "#ff6b6b");
        return;
    }

    if (isSignupMode && password.length < 6) {
        setAuthMessage(
            "Password must be at least 6 characters.",
            "#ff6b6b"
        );
        return;
    }

    authSubmitBtn.disabled = true;
    googleBtn.disabled = true;

    setAuthMessage(
        isSignupMode ? "Creating account..." : "Signing in...",
        "#ffc107"
    );

    try {
        if (isSignupMode) {
            const credential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = credential.user;

            try {
                await setDoc(
                    doc(db, "users", user.uid),
                    {
                        email: user.email,
                        role: "user",
                        createdAt: serverTimestamp()
                    },
                    { merge: true }
                );
            } catch (profileError) {
                console.warn("Profile creation warning:", profileError);
            }

            setAuthMessage("Account created successfully!", "#67e480");
        } else {
            await signInWithEmailAndPassword(auth, email, password);
            setAuthMessage("Login successful!", "#67e480");
        }

    } catch (error) {
        console.error("Authentication error:", error);

        setAuthMessage(
            getFirebaseError(error.code),
            "#ff6b6b"
        );
    } finally {
        authSubmitBtn.disabled = false;
        googleBtn.disabled = false;
    }
});


googleBtn.addEventListener("click", async () => {
    googleBtn.disabled = true;
    authSubmitBtn.disabled = true;

    setAuthMessage("Opening Google...", "#ffc107");

    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    email: user.email,
                    role: "user",
                    createdAt: serverTimestamp()
                });
            }
        } catch (profileError) {
            console.warn("Google profile warning:", profileError);
        }

        setAuthMessage("Google login successful!", "#67e480");

    } catch (error) {
        console.error("Google login error:", error);

        setAuthMessage(
            getFirebaseError(error.code),
            "#ff6b6b"
        );
    } finally {
        googleBtn.disabled = false;
        authSubmitBtn.disabled = false;
    }
});


onAuthStateChanged(auth, async (user) => {

    if (!user) {
        currentUser = null;
        showGuestView();
        return;
    }

    currentUser = user;

    // Booking view immediately show hoga.
    // Firestore profile error ki wajah se login hide nahi hoga.
    showBookingView(user);

    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        let userData = {};

        if (userSnap.exists()) {
            userData = userSnap.data();
        } else {
            await setDoc(userRef, {
                email: user.email,
                role: "user",
                createdAt: serverTimestamp()
            });

            userData = { role: "user" };
        }

        if (userData.role === "admin") {
            window.location.href = "admin-dashboard.html";
            return;
        }

    } catch (error) {
        console.warn("Profile check warning:", error);
        // Yahan guest view show nahi karna.
        // User already authenticated hai.
    }

    await loadBookings(user.uid);
});


function showLoading() {
    bookingTable.innerHTML = `
        <tr>
            <td colspan="6">
                <div class="loading-message">
                    <div class="loading-spinner"></div>
                    Loading your bookings...
                </div>
            </td>
        </tr>
    `;

    mobileBookings.innerHTML = `
        <div class="loading-message">
            <div class="loading-spinner"></div>
            Loading your bookings...
        </div>
    `;
}


function showEmptyBookings() {
    bookingTable.innerHTML = `
        <tr>
            <td colspan="6" class="empty-message">
                ✦ No bookings found yet.
                <br><br>
                Book your first beauty appointment!
            </td>
        </tr>
    `;

    mobileBookings.innerHTML = `
        <div class="empty-message">
            ✦ No bookings found yet.
            <br><br>
            Book your first beauty appointment!
        </div>
    `;
}


function showBookingError() {
    bookingTable.innerHTML = `
        <tr>
            <td colspan="6" class="empty-message">
                Unable to load bookings.
                <br><br>
                Please try refreshing the page.
            </td>
        </tr>
    `;

    mobileBookings.innerHTML = `
        <div class="empty-message">
            Unable to load bookings.
            <br><br>
            Please try refreshing the page.
        </div>
    `;
}


async function loadBookings(uid) {

    if (!uid || isLoadingBookings) return;

    isLoadingBookings = true;
    showLoading();

    try {
        const bookingsQuery = query(
            collection(db, "bookings"),
            where("customerId", "==", uid)
        );

        const snapshot = await getDocs(bookingsQuery);

        if (snapshot.empty) {
            showEmptyBookings();
            return;
        }

        bookingTable.innerHTML = "";
        mobileBookings.innerHTML = "";

        const bookings = [];

        snapshot.forEach((bookingDoc) => {
            bookings.push({
                id: bookingDoc.id,
                data: bookingDoc.data()
            });
        });

        bookings.sort((a, b) => {
            const dateA = a.data.createdAt?.seconds || 0;
            const dateB = b.data.createdAt?.seconds || 0;
            return dateB - dateA;
        });

        bookings.forEach((item) => {
            const booking = item.data;
            const status = booking.status || "Pending";
            const statusClass = getStatusClass(status);

            bookingTable.innerHTML += `
                <tr>
                    <td>
                        <span class="booking-id">
                            ${escapeHTML(item.id.substring(0, 8))}
                        </span>
                    </td>

                    <td>${escapeHTML(booking.service)}</td>
                    <td>${escapeHTML(booking.staff)}</td>
                    <td>${escapeHTML(booking.date)}</td>
                    <td>${escapeHTML(booking.time)}</td>

                    <td>
                        <span class="badge ${statusClass}">
                            ${escapeHTML(status)}
                        </span>
                    </td>
                </tr>
            `;
        });

        bookings.forEach((item, index) => {
            const booking = item.data;
            const status = booking.status || "Pending";
            const statusClass = getStatusClass(status);

            mobileBookings.innerHTML += `
                <div class="booking-mobile-card"
                     style="animation-delay:${index * .08}s;">

                    <div class="mobile-booking-top">
                        <div>
                            <div class="mobile-booking-service">
                                ${escapeHTML(booking.service)}
                            </div>

                            <div class="mobile-booking-id">
                                #${escapeHTML(item.id.substring(0, 8))}
                            </div>
                        </div>

                        <span class="badge ${statusClass}">
                            ${escapeHTML(status)}
                        </span>
                    </div>

                    <div class="mobile-booking-row">
                        <span class="mobile-booking-label">Staff</span>
                        <span class="mobile-booking-value">
                            ${escapeHTML(booking.staff)}
                        </span>
                    </div>

                    <div class="mobile-booking-row">
                        <span class="mobile-booking-label">Date</span>
                        <span class="mobile-booking-value">
                            ${escapeHTML(booking.date)}
                        </span>
                    </div>

                    <div class="mobile-booking-row">
                        <span class="mobile-booking-label">Time</span>
                        <span class="mobile-booking-value">
                            ${escapeHTML(booking.time)}
                        </span>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error loading bookings:", error);
        showBookingError();
    } finally {
        isLoadingBookings = false;
    }
}


refreshBtn.addEventListener("click", async () => {
    if (currentUser) {
        await loadBookings(currentUser.uid);
    }
});


logoutBtn.addEventListener("click", async () => {
    logoutBtn.disabled = true;

    try {
        await signOut(auth);
        showGuestView();
    } catch (error) {
        console.error("Logout error:", error);
        logoutBtn.disabled = false;
    }
});


