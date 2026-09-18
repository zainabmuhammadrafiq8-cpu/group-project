// ===============================
// FIREBASE IMPORT
// ===============================

import { db } from "./firebase-config.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ===============================
// GET HTML ELEMENTS
// ===============================

const bookingForm = document.getElementById("bookingForm");

const successMessage = document.getElementById("successMessage");


// ===============================
// BOOKING FORM SUBMIT
// ===============================

bookingForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    // ===============================
    // GET FORM VALUES
    // ===============================

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const service = document.getElementById("service").value;

    const date = document.getElementById("date").value;

    const time = document.getElementById("time").value;

    const message = document.getElementById("message").value.trim();


    // ===============================
    // BASIC VALIDATION
    // ===============================

    if (
        !name ||
        !email ||
        !phone ||
        !service ||
        !date ||
        !time
    ) {

        successMessage.textContent =
            "Please fill all required fields.";

        return;
    }


    // ===============================
    // BUTTON
    // ===============================

    const submitButton = bookingForm.querySelector("button");

    submitButton.disabled = true;

    submitButton.textContent = "Submitting...";


    try {

        // ===============================
        // SAVE BOOKING TO FIRESTORE
        // ===============================

        const bookingData = {

            name: name,

            email: email,

            phone: phone,

            service: service,

            date: date,

            time: time,

            message: message,

            status: "pending",

            createdAt: serverTimestamp()

        };


        const bookingRef = await addDoc(
            collection(db, "bookings"),
            bookingData
        );


        console.log(
            "Booking saved:",
            bookingRef.id
        );


        // ===============================
        // SUCCESS MESSAGE
        // ===============================

        successMessage.textContent =
            `Thank you ${name}! Your appointment request has been received.`;


        // ===============================
        // RESET FORM
        // ===============================

        bookingForm.reset();


    } catch (error) {

        console.error(
            "Booking Error:",
            error
        );


        successMessage.textContent =
            "Something went wrong. Please try again.";


    } finally {

        submitButton.disabled = false;

        submitButton.textContent =
            "Request Appointment";

    }

});