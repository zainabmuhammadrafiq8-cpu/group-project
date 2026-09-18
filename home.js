// Home page JavaScript

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(
        ".feature-card, .service-card"
    );

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";

        setTimeout(() => {

            card.style.transition =
                "all .7s ease";

            card.style.opacity = "1";
            card.style.transform =
                "translateY(0)";

        }, index * 180);

    });

});