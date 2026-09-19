/* =========================
   ABOUT PAGE JAVASCRIPT
========================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =========================================================
       HEADER / MOBILE MENU
    ========================================================= */

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");


    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("open");


            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            menuBtn.innerHTML = isOpen

                ? '<i class="fas fa-xmark"></i>'

                : '<i class="fas fa-bars"></i>';

        });


        document
            .querySelectorAll(".nav-links a")
            .forEach((link) => {

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



    /* =========================================================
       HEADER SCROLL EFFECT
    ========================================================= */

    const mainHeader =
        document.getElementById("mainHeader");


    if (mainHeader) {

        window.addEventListener(
            "scroll",
            () => {

                mainHeader.classList.toggle(
                    "scrolled",
                    window.scrollY > 30
                );

            },
            {
                passive: true
            }
        );

    }



    /* =========================================================
       ABOUT PAGE ANIMATIONS
    ========================================================= */

    const animatedItems =
        document.querySelectorAll(
            ".story-image, .story-content, .special-item, .value-card"
        );



    /* Create Intersection Observer */

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );



    /* Observe every animated element */

    animatedItems.forEach((item, index) => {

        item.style.transitionDelay =
            `${index * 0.10}s`;

        observer.observe(item);

    });

});