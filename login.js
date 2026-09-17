// ========================================
// FIREBASE AUTH IMPORT
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
// LOGIN / SIGNUP BOXES
// ========================================

const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");


// ========================================
// SWITCH BUTTONS
// ========================================

const showSignup =
    document.getElementById("showSignup");

const showLogin =
    document.getElementById("showLogin");


// ========================================
// LOGIN ELEMENTS
// ========================================

const loginActualForm =
    document.getElementById("loginActualForm");

const loginEmail =
    document.getElementById("loginEmail");

const loginPassword =
    document.getElementById("loginPassword");

const loginMessage =
    document.getElementById("loginMessage");


// ========================================
// SIGNUP ELEMENTS
// ========================================

const signupActualForm =
    document.getElementById("signupActualForm");

const signupName =
    document.getElementById("signupName");

const signupEmail =
    document.getElementById("signupEmail");

const signupPassword =
    document.getElementById("signupPassword");

const signupMessage =
    document.getElementById("signupMessage");


// ========================================
// GOOGLE BUTTONS
// ========================================

const googleLoginBtn =
    document.getElementById("googleLoginBtn");

const googleSignupBtn =
    document.getElementById("googleSignupBtn");


// ========================================
// PHONE BUTTONS
// ========================================

const phoneLoginBtn =
    document.getElementById("phoneLoginBtn");

const phoneSignupBtn =
    document.getElementById("phoneSignupBtn");


// ========================================
// RECAPTCHA CONTAINER
// ========================================

const recaptchaContainer =
    document.getElementById("recaptcha-container");


// ========================================
// CHECK ELEMENTS
// ========================================

console.log("Login JS loaded successfully.");


// ========================================
// SWITCH TO SIGNUP
// ========================================

showSignup.addEventListener("click", function () {

    loginForm.classList.remove("active");

    signupForm.classList.add("active");

    loginMessage.textContent = "";

    signupMessage.textContent = "";

});


// ========================================
// SWITCH TO LOGIN
// ========================================

showLogin.addEventListener("click", function () {

    signupForm.classList.remove("active");

    loginForm.classList.add("active");

    loginMessage.textContent = "";

    signupMessage.textContent = "";

});


// ========================================
// EMAIL SIGNUP
// ========================================

signupActualForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const name =
            signupName.value.trim();

        const email =
            signupEmail.value.trim();

        const password =
            signupPassword.value;


        signupMessage.textContent =
            "Creating account...";


        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user =
                userCredential.user;


            // Save user's name

            await updateProfile(
                user,
                {
                    displayName: name
                }
            );


            console.log(
                "Signup successful:",
                user
            );


            signupMessage.textContent =
                "Account created successfully!";


            signupActualForm.reset();


            setTimeout(function () {

                signupForm.classList.remove("active");

                loginForm.classList.add("active");

            }, 1000);


        } catch (error) {

            console.error(
                "Signup Error:",
                error
            );


            signupMessage.textContent =
                firebaseError(error);

        }

    }
);


// ========================================
// EMAIL LOGIN
// ========================================

loginActualForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const email =
            loginEmail.value.trim();

        const password =
            loginPassword.value;


        loginMessage.textContent =
            "Logging in...";


        try {

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user =
                userCredential.user;


            console.log(
                "Login successful:",
                user
            );


            loginMessage.textContent =
                "Login successful!";


            setTimeout(function () {

                window.location.href =
                    "index.html";

            }, 1000);


        } catch (error) {

            console.error(
                "Login Error:",
                error
            );


            loginMessage.textContent =
                firebaseError(error);

        }

    }
);


// ========================================
// GOOGLE AUTH
// ========================================

const googleProvider =
    new GoogleAuthProvider();


async function googleAuth() {

    try {

        const result =
            await signInWithPopup(
                auth,
                googleProvider
            );


        const user =
            result.user;


        console.log(
            "Google login successful:",
            user
        );


        loginMessage.textContent =
            "Google login successful!";


        setTimeout(function () {

            window.location.href =
                "index.html";

        }, 1000);


    } catch (error) {

        console.error(
            "Google Error:",
            error
        );


        loginMessage.textContent =
            firebaseError(error);

    }

}


// ========================================
// GOOGLE LOGIN BUTTON
// ========================================

googleLoginBtn.addEventListener(
    "click",
    googleAuth
);


// ========================================
// GOOGLE SIGNUP BUTTON
// ========================================

googleSignupBtn.addEventListener(
    "click",
    googleAuth
);


// ========================================
// PHONE AUTH
// ========================================

let confirmationResult = null;

let recaptchaVerifier = null;


// ========================================
// CREATE RECAPTCHA
// ========================================

function createRecaptcha() {

    if (recaptchaVerifier) {

        return recaptchaVerifier;

    }


    recaptchaVerifier =
        new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
                size: "normal",

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


    return recaptchaVerifier;

}


// ========================================
// PHONE AUTH FUNCTION
// ========================================

async function phoneAuth() {

    const phoneNumber =
        prompt(
            "Enter phone number with country code:\nExample: +923001234567"
        );


    if (!phoneNumber) {

        return;

    }


    try {

        // Create reCAPTCHA

        const appVerifier =
            createRecaptcha();


        // Send OTP

        confirmationResult =
            await signInWithPhoneNumber(
                auth,
                phoneNumber,
                appVerifier
            );


        console.log(
            "OTP sent successfully."
        );


        const code =
            prompt(
                "Enter the OTP sent to your phone:"
            );


        if (!code) {

            return;

        }


        // Confirm OTP

        const result =
            await confirmationResult.confirm(
                code
            );


        console.log(
            "Phone authentication successful:",
            result.user
        );


        alert(
            "Phone login successful!"
        );


        window.location.href =
            "index.html";


    } catch (error) {

        console.error(
            "Phone Error:",
            error
        );


        alert(
            firebaseError(error)
        );


        // Reset reCAPTCHA

        if (recaptchaVerifier) {

            recaptchaVerifier.clear();

            recaptchaVerifier = null;

        }

    }

}


// ========================================
// PHONE LOGIN
// ========================================

phoneLoginBtn.addEventListener(
    "click",
    phoneAuth
);


// ========================================
// PHONE SIGNUP
// ========================================

phoneSignupBtn.addEventListener(
    "click",
    phoneAuth
);


// ========================================
// FIREBASE ERROR HANDLER
// ========================================

function firebaseError(error) {

    switch (error.code) {

        case "auth/email-already-in-use":
            return "This email is already registered.";

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/weak-password":
            return "Password must be at least 6 characters.";

        case "auth/invalid-credential":
            return "Email or password is incorrect.";

        case "auth/user-not-found":
            return "No account found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/popup-closed-by-user":
            return "Google login was cancelled.";

        case "auth/popup-blocked":
            return "Please allow popups for this website.";

        case "auth/operation-not-allowed":
            return "This login method is not enabled in Firebase.";

        case "auth/invalid-phone-number":
            return "Please enter a valid phone number.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        case "auth/quota-exceeded":
            return "Firebase SMS limit has been reached.";

        default:
            return error.message;
    }

}
