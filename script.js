const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


/* ================= MOBILE MENU ================= */

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const icon = menuBtn.querySelector("i");

        if (navMenu.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    document.querySelectorAll("#navMenu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");


function updateActiveLink() {

    let current = "home";


    sections.forEach(section => {

        const top =
            section.offsetTop - 180;


        if (window.scrollY >= top) {

            current = section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );

    });

}


window.addEventListener(
    "scroll",
    updateActiveLink,
    { passive: true }
);


updateActiveLink();


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* ================= CURRENT YEAR ================= */

const year =
    document.getElementById("year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* ================= SMOOTH SCROLL ================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const selector =
                    anchor.getAttribute("href");

                const target =
                    document.querySelector(selector);


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }
        );

    });


/* ================= CURSOR GLOW ================= */

const glow =
    document.getElementById("cursorGlow");


if (
    glow &&
    window.matchMedia("(pointer: fine)").matches
) {

    window.addEventListener(
        "pointermove",
        event => {

            glow.style.left =
                `${event.clientX}px`;

            glow.style.top =
                `${event.clientY}px`;

        },
        {
            passive: true
        }
    );

}
