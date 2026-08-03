// 1. Dark / Light Mode Toggle
const themeBtn = document.getElementById('themeToggle');

themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeBtn.textContent = isLight ? '🌙 Dark' : '☀️ Light';
});

// 2. Main Booking Form Submit
document.getElementById('fullBookingForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    status.textContent = "Processing your request at Grace & Glow...";
    status.style.color = "#d946ef";

    setTimeout(() => {
        status.textContent = "✨ Appointment Booked Successfully!";
        status.style.color = "#10b981";
        e.target.reset();
    }, 1200);
});

// 3. Quick Booking Form Submit
document.getElementById('quickForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Call Request Sent to Grace & Glow!");
    e.target.reset();
});