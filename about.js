/* =========================
   ABOUT PAGE ANIMATIONS
========================= */


/* Select elements that should
   appear when scrolling */

const animatedItems = document.querySelectorAll(
    ".story-image, .story-content, .special-item, .value-card"
);



/* Create Intersection Observer */

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

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
