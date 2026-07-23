document.addEventListener('DOMContentLoaded', () => {

  // 1. PRELOADER HIDE
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('hidden');
    });
    // Fallback if load event fires too fast
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1000);
  }

  // 2. MOBILE MENU TOGGLE
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 3. MOBILE FRIENDLY DROPDOWN CLICK HANDLER
  const galleryDropdown = document.getElementById('galleryDropdown');
  const dropdownBtn = document.getElementById('dropdownBtn');

  if (dropdownBtn && galleryDropdown) {
    dropdownBtn.addEventListener('click', (e) => {
      // Small screen / Touch device check
      if (window.innerWidth <= 768) {
        e.preventDefault(); // Prevent navigating immediately on tap
        galleryDropdown.classList.toggle('open');
      }
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (galleryDropdown && !galleryDropdown.contains(e.target)) {
      galleryDropdown.classList.remove('open');
    }
  });

  // 4. SCROLL ANIMATION OBSERVER
  const animatedElements = document.querySelectorAll('.scroll-anim');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));
  } else {
    // Fallback for older browsers
    animatedElements.forEach(el => el.classList.add('appear'));
  }

});