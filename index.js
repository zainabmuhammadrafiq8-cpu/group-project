
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
===================================== */

gsap.registerPlugin(ScrollTrigger);

const revealElements = document.querySelectorAll(".reveal");

revealElements.forEach((element) => {
    gsap.fromTo(
        element,
        {
            opacity: 0,
            y: 70
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 88%",
                end: "top 55%",
                toggleActions: "play none none none",
                once: true
            }
        }
    );
});
/* ACTIVE NAVIGATION */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* CONTACT FORM DEMO */

document.getElementById("contactForm").addEventListener("submit", event => {
    event.preventDefault();

    alert("Thank you! Your message form is ready to connect with Firebase.");

    event.target.reset();
});

/* NEWSLETTER DEMO */

document.getElementById("newsletterForm").addEventListener("submit", event => {
    event.preventDefault();

    alert("Thank you for subscribing to Glamora!");

    event.target.reset();
});

