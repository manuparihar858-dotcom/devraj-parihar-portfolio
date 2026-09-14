/* =========================================================
   DEVRAJ PARIHAR PORTFOLIO
   ========================================================= */


/* ================= FOOTER YEAR ================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}



/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

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


    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}



/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
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

    revealObserver.observe(element);

});



/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll("#navMenu a");


const sectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                const id =
                    entry.target.getAttribute("id");


                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        `#${id}`
                    ) {

                        link.classList.add("active");

                    }

                });

            });

        },

        {
            rootMargin:
                "-35% 0px -55% 0px",

            threshold:
                0
        }

    );


sections.forEach(section => {

    sectionObserver.observe(section);

});



/* ================= CURSOR GLOW ================= */

const cursorGlow =
    document.getElementById("cursorGlow");


if (
    cursorGlow &&
    window.matchMedia("(pointer: fine)").matches
) {

    document.addEventListener("mousemove", event => {

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    });

}
