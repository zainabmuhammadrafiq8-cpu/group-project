// 1. Hide Preloader after 2.2 Seconds
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if(preloader) {
            preloader.classList.add('preloader-hidden');
        }
    }, 2200);
});

// 2. HERO SLIDER FUNCTIONALITY
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

if(nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    setInterval(nextSlide, 5000);
}

// 3. CARDS ENTRANCE MOVEMENT ON SCROLL
const cards = document.querySelectorAll('.move-card');

const checkCardsScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    cards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerBottom) {
            setTimeout(() => {
                card.classList.add('card-visible');
            }, index * 150);
        }
    });
};

window.addEventListener('scroll', checkCardsScroll);
checkCardsScroll();

// 4. Mobile Responsive Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if(hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 5. Mobile Dropdown Click Toggle
const dropdown = document.getElementById('galleryDropdown');
if(dropdown) {
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            dropdown.classList.toggle('active');
        }
    });
}