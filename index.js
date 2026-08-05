// PRELOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if(preloader) preloader.classList.add('fade-out');
  }, 1500);
});

// MOBILE MENU
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// HERO SLIDER
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
      const video = slide.querySelector('video');
      if (video) {
        video.currentTime = 0;
        video.play();
      }
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

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

if(nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });
}

// WATCH VIDEO BUTTON CLICK EVENT
const watchVideoBtns = document.querySelectorAll('.btn-watch-video');
watchVideoBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentSlide = 0; // Video slide (Slide 1)
    showSlide(currentSlide);
    stopAutoSlide();
    startAutoSlide();

    // Smooth scroll to top/hero if needed
    document.getElementById('hero-slider').scrollIntoView({ behavior: 'smooth' });
  });
});

startAutoSlide();