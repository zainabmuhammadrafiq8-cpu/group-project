document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader Timeout
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add("fade-out");
            }
        }, 2500);
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // 3. Hero Slider Logic
    const slides = document.querySelectorAll(".hero-slider .slide");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });
    }

    if (slides.length > 0) {
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }

        // Auto slide switch
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 6000);
    }

    // 4. Scroll Reveal Animation for Cards
    const cards = document.querySelectorAll(".move-card");

    function checkCards() {
        const triggerBottom = window.innerHeight * 0.88;
        cards.forEach((card, idx) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                setTimeout(() => {
                    card.classList.add("show-card");
                }, idx * 120); // Staggered entry delay
            }
        });
    }

    window.addEventListener("scroll", checkCards);
    checkCards(); // Trigger once on load
});