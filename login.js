// ========================================
// FIREBASE AUTH IMPORT
// ========================================

import { auth } from "./firebase-config.js";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,

    // GOOGLE
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,

    // PHONE
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
// FORGOT PASSWORD
// ========================================

const forgotPassword =
    document.querySelector(".forgot-password");


// ========================================
// RECAPTCHA CONTAINER
// ========================================

const recaptchaContainer =
    document.getElementById("recaptcha-container");


// ========================================
// CHECK
// ========================================

console.log(
    "LOGIN JS LOADED SUCCESSFULLY"
);


// ========================================
// LOGIN → SIGNUP
// ========================================

showSignup.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        loginForm.classList.remove("active");

        signupForm.classList.add("active");

        loginMessage.textContent = "";

        signupMessage.textContent = "";

    }
);


// ========================================
// SIGNUP → LOGIN
// ========================================

showLogin.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        signupForm.classList.remove("active");

        loginForm.classList.add("active");

        loginMessage.textContent = "";

        signupMessage.textContent = "";

    }
);


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


        if (!name || !email || !password) {

            signupMessage.textContent =
                "Please fill all fields.";

            return;
        }


        signupMessage.textContent =
            "Creating account...";


        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            await updateProfile(
                userCredential.user,
                {
                    displayName: name
                }
            );


            signupMessage.textContent =
                "Account created successfully!";


            signupActualForm.reset();


            setTimeout(
                function () {

                    signupForm.classList.remove(
                        "active"
                    );

                    loginForm.classList.add(
                        "active"
                    );

                },
                1000
            );


        } catch (error) {

            console.error(
                "SIGNUP ERROR:",
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


        if (!email || !password) {

            loginMessage.textContent =
                "Please enter email and password.";

            return;
        }


        loginMessage.textContent =
            "Logging in...";


        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            loginMessage.textContent =
                "Login successful!";


            setTimeout(
                function () {

                    window.location.href =
                        "index.html";

                },
                1000
            );


        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );

            loginMessage.textContent =
                firebaseError(error);

        }

    }
);


// ========================================
// FORGOT PASSWORD
// ========================================

if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        async function (event) {

            event.preventDefault();


            const email =
                loginEmail.value.trim();


            if (!email) {

                loginMessage.textContent =
                    "Pehle apna email enter karo.";

                loginEmail.focus();

                return;
            }


            loginMessage.textContent =
                "Sending reset email...";


            try {

                await sendPasswordResetEmail(
                    auth,
                    email
                );


                loginMessage.textContent =
                    "Password reset email sent. Check your inbox.";


            } catch (error) {

                console.error(
                    "FORGOT PASSWORD ERROR:",
                    error
                );


                loginMessage.textContent =
                    firebaseError(error);

            }

        }
    );


    console.log(
        "Forgot Password loaded successfully."
    );

}


// ========================================
// GOOGLE AUTH
// ========================================

const googleProvider =
    new GoogleAuthProvider();


googleProvider.setCustomParameters({
    prompt: "select_account"
});


let googleAuthRunning = false;


// ========================================
// GOOGLE AUTH FUNCTION
// ========================================

async function googleAuth(messageElement) {

    if (googleAuthRunning) {

        return;

    }


    googleAuthRunning = true;


    messageElement.textContent =
        "Opening Google...";


    try {

        await signInWithRedirect(
            auth,
            googleProvider
        );

    } catch (error) {

        console.error(
            "GOOGLE REDIRECT ERROR:",
            error
        );


        messageElement.textContent =
            firebaseError(error);


        googleAuthRunning = false;

    }

}


// ========================================
// CHECK GOOGLE REDIRECT RESULT
// ========================================

async function checkGoogleRedirect() {

    try {

        const result =
            await getRedirectResult(auth);


        if (result) {

            console.log(
                "GOOGLE LOGIN SUCCESS:",
                result.user
            );


            loginMessage.textContent =
                "Google login successful!";


            setTimeout(
                function () {

                    window.location.href =
                        "index.html";

                },
                1000
            );

        }

    } catch (error) {

        console.error(
            "GOOGLE REDIRECT RESULT ERROR:",
            error
        );


        loginMessage.textContent =
            firebaseError(error);

    }

}


// ========================================
// RUN GOOGLE REDIRECT CHECK
// ========================================

checkGoogleRedirect();


// ========================================
// GOOGLE LOGIN BUTTON
// ========================================

googleLoginBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        googleAuth(loginMessage);

    }
);


// ========================================
// GOOGLE SIGNUP BUTTON
// ========================================

googleSignupBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        googleAuth(signupMessage);

    }
);


// ========================================
// PHONE AUTH
// ========================================

let confirmationResult = null;

let recaptchaVerifier = null;

let phoneAuthRunning = false;


// ========================================
// CREATE RECAPTCHA ONLY ONCE
// ========================================

function createRecaptcha() {

    // IMPORTANT:
    // Agar verifier already bana hua hai,
    // usi ko reuse karo.
    // Dobara render nahi karna.

    if (recaptchaVerifier) {

        return recaptchaVerifier;

    }


    if (!recaptchaContainer) {

        throw new Error(
            "reCAPTCHA container not found."
        );

    }


    recaptchaVerifier =
        new RecaptchaVerifier(
            auth,
            recaptchaContainer,
            {

                size: "invisible",

                callback: function () {

                    console.log(
                        "reCAPTCHA solved"
                    );

                },

                "expired-callback":
                    function () {

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

async function phoneAuth(messageElement) {

    if (phoneAuthRunning) {

        return;

    }


    phoneAuthRunning = true;


    const phoneNumber =
        prompt(
            "Enter phone number with country code:\nExample: +923001234567"
        );


    if (!phoneNumber) {

        phoneAuthRunning = false;

        return;

    }


    const cleanPhoneNumber =
        phoneNumber.trim();


    // ====================================
    // PHONE NUMBER FORMAT CHECK
    // ====================================

    if (!cleanPhoneNumber.startsWith("+")) {

        messageElement.textContent =
            "Please use country code. Example: +923001234567";

        phoneAuthRunning = false;

        return;

    }


    if (!/^\+[1-9]\d{7,14}$/.test(cleanPhoneNumber)) {

        messageElement.textContent =
            "Invalid phone number. Example: +923001234567";

        phoneAuthRunning = false;

        return;

    }


    messageElement.textContent =
        "Sending OTP...";


    try {

        // =================================
        // CREATE / REUSE RECAPTCHA
        // =================================

        const appVerifier =
            createRecaptcha();


        // =================================
        // SEND OTP
        // =================================

        confirmationResult =
            await signInWithPhoneNumber(
                auth,
                cleanPhoneNumber,
                appVerifier
            );


        messageElement.textContent =
            "OTP sent. Check your phone.";


        // =================================
        // ENTER OTP
        // =================================

        const code =
            prompt(
                "Enter the OTP sent to your phone:"
            );


        if (!code) {

            messageElement.textContent =
                "OTP verification cancelled.";

            phoneAuthRunning = false;

            return;

        }


        // =================================
        // VERIFY OTP
        // =================================

        await confirmationResult.confirm(
            code.trim()
        );


        messageElement.textContent =
            "Phone login successful!";


        // =================================
        // GO TO INDEX
        // =================================

        setTimeout(
            function () {

                window.location.href =
                    "index.html";

            },
            1000
        );


    } catch (error) {

        console.error(
            "PHONE ERROR:",
            error
        );


        messageElement.textContent =
            firebaseError(error);

    }


    // IMPORTANT:
    // reCAPTCHA ko yahan CLEAR nahi karna.
    // Next phone attempt par same verifier reuse hoga.

    phoneAuthRunning = false;

}


// ========================================
// PHONE LOGIN BUTTON
// ========================================

phoneLoginBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        phoneAuth(loginMessage);

    }
);


// ========================================
// PHONE SIGNUP BUTTON
// ========================================

phoneSignupBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        phoneAuth(signupMessage);

    }
);


// ========================================
// FIREBASE ERROR HANDLER
// ========================================

function firebaseError(error) {

    console.error(
        "Firebase Error Code:",
        error.code
    );


    switch (error.code) {


        // ====================================
        // EMAIL
        // ====================================

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


        // ====================================
        // GOOGLE
        // ====================================

        case "auth/popup-closed-by-user":

            return "Google login was cancelled.";


        case "auth/popup-blocked":

            return "Google popup was blocked.";


        case "auth/cancelled-popup-request":

            return "Google login request was cancelled. Please try again.";


        case "auth/unauthorized-domain":

            return "This website domain is not authorized in Firebase.";


        // ====================================
        // PHONE
        // ====================================

        case "auth/operation-not-allowed":

            return "Phone login is not allowed for this region. Make sure Pakistan is enabled in SMS region policy.";


        case "auth/invalid-phone-number":

            return "Enter a valid phone number like +923001234567.";


        case "auth/missing-phone-number":

            return "Please enter your phone number with country code.";


        case "auth/invalid-verification-code":

            return "The OTP is incorrect.";


        case "auth/code-expired":

            return "The OTP has expired. Try again.";


        case "auth/captcha-check-failed":

            return "reCAPTCHA verification failed. Please try again.";


        case "auth/quota-exceeded":

            return "Firebase SMS limit has been reached.";


        case "auth/too-many-requests":

            return "Too many attempts. Please try again later.";


        // ====================================
        // NETWORK
        // ====================================

        case "auth/network-request-failed":

            return "Internet connection problem.";


        // ====================================
        // DEFAULT
        // ====================================

        default:

            return error.message ||
                "Something went wrong.";

    }

}
