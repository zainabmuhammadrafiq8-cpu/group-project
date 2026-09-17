// ========================================
// FIREBASE IMPORT
// ========================================

import { auth } from "./firebase-config.js";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


// ========================================
// GET LOGIN & SIGNUP BOXES
// ========================================

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");


// ========================================
// GET SWITCH BUTTONS
// ========================================

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");


// ========================================
// LOGIN FORM
// ========================================

const loginActualForm = document.getElementById("loginActualForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");


// ========================================
// SIGNUP FORM
// ========================================

const signupActualForm = document.getElementById("signupActualForm");

const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");


// ========================================
// MESSAGE ELEMENTS
// ========================================

const loginMessage = document.getElementById("loginMessage");
const signupMessage = document.getElementById("signupMessage");


// ========================================
// GOOGLE BUTTONS
// ========================================

const googleLoginBtn = document.querySelector(
    "#loginForm .google-btn"
);

const googleSignupBtn = document.getElementById("googleSignupBtn");


// ========================================
// PHONE BUTTONS
// ========================================

const phoneLoginBtn = document.getElementById("phoneLoginBtn");
const phoneSignupBtn = document.getElementById("phoneSignupBtn");


// ========================================
// SHOW SIGNUP
// ========================================

showSignup.addEventListener("click", function () {

    loginForm.classList.remove("active");

    signupForm.classList.add("active");

});


// ========================================
// SHOW LOGIN
// ========================================

showLogin.addEventListener("click", function () {

    signupForm.classList.remove("active");

    loginForm.classList.add("active");

});


// ========================================
// EMAIL LOGIN
// ========================================

loginActualForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = loginEmail.value.trim();

    const password = loginPassword.value;


    try {

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user = userCredential.user;


        console.log("Login successful:", user);


        loginMessage.textContent =
            "Login Successful!";


        setTimeout(function () {

            window.location.href = "index.html";

        }, 1000);


    } catch (error) {

        console.log("Login Error:", error);

        loginMessage.textContent =
            error.message;

    }

});


// ========================================
// EMAIL SIGNUP
// ========================================

signupActualForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = signupName.value.trim();

    const email = signupEmail.value.trim();

    const password = signupPassword.value;


    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user = userCredential.user;


        // Save full name

        await updateProfile(user, {

            displayName: name

        });


        console.log("Signup successful:", user);


        signupMessage.textContent =
            "Account Created Successfully!";


        signupActualForm.reset();


        setTimeout(function () {

            signupForm.classList.remove("active");

            loginForm.classList.add("active");

        }, 1000);


    } catch (error) {

        console.log("Signup Error:", error);

        signupMessage.textContent =
            error.message;

    }

});


// ========================================
// GOOGLE AUTH
// ========================================

const googleProvider = new GoogleAuthProvider();


async function googleLogin() {

    try {

        const result =
            await signInWithPopup(
                auth,
                googleProvider
            );


        const user = result.user;


        console.log("Google Login Successful:", user);


        if (loginMessage) {

            loginMessage.textContent =
                "Google Login Successful!";

        }


        setTimeout(function () {

            window.location.href = "index.html";

        }, 1000);


    } catch (error) {

        console.log("Google Login Error:", error);

        if (loginMessage) {

            loginMessage.textContent =
                error.message;

        }

    }

}


// ========================================
// GOOGLE LOGIN BUTTON
// ========================================

googleLoginBtn.addEventListener("click", googleLogin);


// ========================================
// GOOGLE SIGNUP BUTTON
// ========================================

googleSignupBtn.addEventListener("click", googleLogin);


// ========================================
// PHONE AUTH
// ========================================

// Firebase Phone Authentication needs reCAPTCHA.

let confirmationResult;


// Create invisible reCAPTCHA

function setupRecaptcha() {

    if (!window.recaptchaVerifier) {

        window.recaptchaVerifier =
            new RecaptchaVerifier(
                auth,
                "phoneLoginBtn",
                {
                    size: "invisible",

                    callback: function () {

                        console.log(
                            "reCAPTCHA solved"
                        );

                    },

                    "expired-callback": function () {

                        console.log(
                            "reCAPTCHA expired"
                        );

                    }
                }
            );

    }

}


// ========================================
// PHONE LOGIN
// ========================================

async function phoneLogin() {

    const phoneNumber =
        prompt(
            "Enter your phone number with country code:\nExample: +923001234567"
        );


    if (!phoneNumber) {

        return;

    }


    try {

        setupRecaptcha();


        confirmationResult =
            await signInWithPhoneNumber(
                auth,
                phoneNumber,
                window.recaptchaVerifier
            );


        const code =
            prompt(
                "Enter the OTP sent to your phone:"
            );


        if (!code) {

            return;

        }


        const result =
            await confirmationResult.confirm(code);


        console.log(
            "Phone Login Successful:",
            result.user
        );


        alert("Phone Login Successful!");


        window.location.href =
            "index.html";


    } catch (error) {

        console.log(
            "Phone Login Error:",
            error
        );


        alert(error.message);


        if (window.recaptchaVerifier) {

            window.recaptchaVerifier.clear();

            window.recaptchaVerifier = null;

        }

    }

}


// ========================================
// PHONE SIGNUP
// ========================================

async function phoneSignup() {

    const phoneNumber =
        prompt(
            "Enter your phone number with country code:\nExample: +923001234567"
        );


    if (!phoneNumber) {

        return;

    }


    try {

        setupRecaptcha();


        confirmationResult =
            await signInWithPhoneNumber(
                auth,
                phoneNumber,
                window.recaptchaVerifier
            );


        const code =
            prompt(
                "Enter the OTP sent to your phone:"
            );


        if (!code) {

            return;

        }


        const result =
            await confirmationResult.confirm(code);


        console.log(
            "Phone Signup Successful:",
            result.user
        );


        alert("Phone Account Created Successfully!");


        window.location.href =
            "index.html";


    } catch (error) {

        console.log(
            "Phone Signup Error:",
            error
        );


        alert(error.message);


        if (window.recaptchaVerifier) {

            window.recaptchaVerifier.clear();

            window.recaptchaVerifier = null;

        }

    }

}


// ========================================
// PHONE BUTTONS
// ========================================

phoneLoginBtn.addEventListener(
    "click",
    phoneLogin
);


phoneSignupBtn.addEventListener(
    "click",
    phoneSignup
);
