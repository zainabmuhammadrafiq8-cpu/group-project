const animatedItems = document.querySelectorAll(
    ".story-image, .story-content, .stat-card, .value-card"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);


animatedItems.forEach((item, index) => {

    item.style.transitionDelay = `${index * 0.12}s`;

    observer.observe(item);

});