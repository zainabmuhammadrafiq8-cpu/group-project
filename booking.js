const bookingForm = document.getElementById("bookingForm");

const successMessage = document.getElementById("successMessage");


bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;

    successMessage.textContent =
        `Thank you ${name}! Your appointment request has been received.`;

    bookingForm.reset();

});