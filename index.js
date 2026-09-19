
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuBtn.innerHTML = isOpen
                ? '<i class="fas fa-xmark"></i>'
                : '<i class="fas fa-bars"></i>';

        });

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.innerHTML =
                    '<i class="fas fa-bars"></i>';

            });

        });

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const mainHeader = document.getElementById("mainHeader");

    if (mainHeader) {

        window.addEventListener("scroll", () => {

            mainHeader.classList.toggle(
                "scrolled",
                window.scrollY > 30
            );

        }, { passive: true });

    }


    /* =====================================================
       PREMIUM HERO SLIDER
    ===================================================== */

    const heroSlides =
        document.querySelectorAll(".hero-slide");

    const heroContents =
        document.querySelectorAll(".hero-content-item");

    const heroDots =
        document.querySelectorAll(".slider-dot");

    const heroPrev =
        document.getElementById("heroPrev");

    const heroNext =
        document.getElementById("heroNext");

    let currentSlide = 0;
    let sliderTimer = null;


    function showHeroSlide(index) {

        if (heroSlides.length === 0) return;

        if (index < 0) {
            index = heroSlides.length - 1;
        }

        if (index >= heroSlides.length) {
            index = 0;
        }

        currentSlide = index;

        heroSlides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });

        heroContents.forEach((content, i) => {

            content.classList.toggle(
                "active",
                i === currentSlide
            );

        });

        heroDots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    }


    function nextHeroSlide() {
        showHeroSlide(currentSlide + 1);
    }


    function previousHeroSlide() {
        showHeroSlide(currentSlide - 1);
    }


    function startHeroSlider() {

        clearInterval(sliderTimer);

        if (heroSlides.length > 1) {

            sliderTimer = setInterval(() => {

                nextHeroSlide();

            }, 5500);

        }

    }


    if (heroSlides.length > 0) {

        showHeroSlide(0);
        startHeroSlider();

        if (heroNext) {

            heroNext.addEventListener("click", () => {

                nextHeroSlide();
                startHeroSlider();

            });

        }

        if (heroPrev) {

            heroPrev.addEventListener("click", () => {

                previousHeroSlide();
                startHeroSlider();

            });

        }

        heroDots.forEach(dot => {

            dot.addEventListener("click", () => {

                const slideIndex =
                    Number(dot.dataset.slide);

                showHeroSlide(slideIndex);
                startHeroSlider();

            });

        });

        document.addEventListener(
            "visibilitychange",
            () => {

                if (document.hidden) {

                    clearInterval(sliderTimer);

                } else {

                    startHeroSlider();

                }

            }
        );

    }


    /* =====================================================
       3D SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if (revealElements.length > 0) {

        const revealObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0) rotateX(0deg)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


        revealElements.forEach(element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(60px) rotateX(12deg)";

            element.style.transition =
                "opacity 1s ease, transform 1s ease";

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       3D MOUSE EFFECT ON HERO IMAGE
    ===================================================== */

    const heroImage =
        document.querySelector(".hero-image");

    if (heroImage) {

        heroImage.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroImage.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateY =
                    ((x / rect.width) - 0.5) * 12;

                const rotateX =
                    ((y / rect.height) - 0.5) * -12;

                heroImage.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     scale(1.02)`;

            }
        );


        heroImage.addEventListener(
            "mouseleave",
            () => {

                heroImage.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

            }
        );

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                alert(
                    "Thank you! Your message has been received."
                );

                contactForm.reset();

            }
        );

    }

});