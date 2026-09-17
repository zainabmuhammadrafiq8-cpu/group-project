
/* MOBILE MENU */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuBtn.textContent =
        navLinks.classList.contains("active") ? "✕" : "☰";

});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";

    });

});


/* GALLERY */

const filterButtons = [
    ...document.querySelectorAll(".filter-btn")
];

const cards = [
    ...document.querySelectorAll(".gallery-card")
];

let timers = [];


/* CLEAR ANIMATIONS */

function clearTimers() {

    timers.forEach(timer => clearTimeout(timer));

    timers = [];

}


/* ACTIVE FILTER */

function setActive(category) {

    filterButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.category === category
        );

    });

}


/* SHOW CARDS */

function showCategory(category) {

    clearTimers();

    setActive(category);

    const selectedCards = cards.filter(card => {

        return category === "all" ||
               card.dataset.category === category;

    });

    cards.forEach(card => {

        const shouldShow = selectedCards.includes(card);

        card.style.display = shouldShow ? "block" : "none";

        card.classList.remove("visible");

    });

    selectedCards.forEach((card,index) => {

        const timer = setTimeout(() => {

            card.classList.add("visible");

        },80 + index * 100);

        timers.push(timer);

    });

}


/* FILTER BUTTONS */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        showCategory(button.dataset.category);

    });

});


/* CARD CLICK */

cards.forEach(card => {

    card.setAttribute("tabindex","0");
    card.setAttribute("role","button");

    function openCard() {

        const category = card.dataset.category;

        showCategory(category);

        document.querySelector(".gallery-section")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }

    card.addEventListener("click",openCard);

    card.addEventListener("keydown",event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openCard();

        }

    });

});


/* 3D TILT */

if (
    window.matchMedia(
        "(hover:hover) and (pointer:fine)"
    ).matches
) {

    cards.forEach(card => {

        card.addEventListener("pointermove",event => {

            const rect = card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width - .5;

            const y =
                (event.clientY - rect.top) /
                rect.height - .5;

            card.style.setProperty(
                "--rx",
                `${-y * 5}deg`
            );

            card.style.setProperty(
                "--ry",
                `${x * 5}deg`
            );

        });

        card.addEventListener("pointerleave",() => {

            card.style.setProperty("--rx","0deg");
            card.style.setProperty("--ry","0deg");

        });

    });

}


/* INITIAL LOAD */

window.addEventListener("DOMContentLoaded",() => {

    showCategory("all");

});

