
/* MOBILE MENU */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.innerHTML = isOpen
        ? '<i class="fas fa-xmark"></i>'
        : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

/* HERO SLIDER */

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
let sliderTimer;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

function startSlider() {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

dots.forEach((dot,index) => {
    dot.addEventListener("click", () => {
        showSlide(index);
        startSlider();
    });
});

startSlider();

/* GALLERY FILTER */

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryCards = document.querySelectorAll(".gallery-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryCards.forEach(card => {
            const category = card.dataset.category;
            const shouldShow =
                filter === "all" || category === filter;

            if (shouldShow) {
                card.style.display = "block";

                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, 20);

            } else {
                card.style.opacity = "0";
                card.style.transform = "translateY(15px)";

                setTimeout(() => {
                    card.style.display = "none";
                }, 250);
            }
        });
    });
});

/* =====================================
   GSAP SCROLL REVEAL
