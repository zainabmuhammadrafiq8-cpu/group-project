// =========================================================
// HOME PAGE JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       HEADER / MOBILE MENU
    ===================================================== */

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
            .forEach(link => {

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
       HEADER SCROLL EFFECT
    ===================================================== */

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


    /* =====================================================
       HOME PAGE CARDS ANIMATION
    ===================================================== */

    const cards = document.querySelectorAll(
        ".feature-card, .service-card"
    );


    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(40px)";


        setTimeout(() => {

            card.style.transition =
                "all .7s ease";

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0)";

        }, index * 180);

    });

});