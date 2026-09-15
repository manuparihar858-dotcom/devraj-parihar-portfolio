document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       FOOTER YEAR
    ========================================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            const icon = menuToggle.querySelector("i");

            if (navMenu.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                const icon = menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =========================================
       SCROLL PROGRESS
    ========================================= */

    const progress = document.createElement("div");

    progress.className = "scroll-progress";

    progress.innerHTML = `
        <div class="scroll-progress-bar"></div>
    `;

    document.body.appendChild(progress);

    const progressBar =
        progress.querySelector(".scroll-progress-bar");


    /* =========================================
       SCROLL STATE
    ========================================= */

    let ticking = false;

    function updateScroll() {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? scrollTop / documentHeight
                : 0;

        progressBar.style.transform =
            `scaleX(${percentage})`;


        /* =====================================
           HERO PARALLAX
        ===================================== */

        const hero = document.querySelector(".hero");

        if (hero) {

            const heroBottom =
                hero.offsetTop + hero.offsetHeight;

            if (scrollTop < heroBottom) {

                const heroProgress =
                    Math.min(scrollTop / hero.offsetHeight, 1);

                const heroCopy =
                    document.querySelector(".hero-copy");

                const heroPhoto =
                    document.querySelector(".hero-photo");

                const heroGrid =
                    document.querySelector(".hero-grid");

                const orbOne =
                    document.querySelector(".orb-one");

                const orbTwo =
                    document.querySelector(".orb-two");


                if (heroCopy) {

                    heroCopy.style.transform =
                        `translate3d(0, ${heroProgress * -45}px, 0)`;

                }


                if (heroPhoto) {

                    heroPhoto.style.transform =
                        `translate3d(0, ${heroProgress * 35}px, 0)`;

                }


                if (heroGrid) {

                    heroGrid.style.transform =
                        `translate3d(0, ${heroProgress * 70}px, 0)`;

                }


                if (orbOne) {

                    orbOne.style.transform =
                        `translate3d(${heroProgress * 40}px, ${heroProgress * 80}px, 0)`;

                }


                if (orbTwo) {

                    orbTwo.style.transform =
                        `translate3d(${heroProgress * -30}px, ${heroProgress * -60}px, 0)`;

                }

            }

        }


        ticking = false;

    }


    function requestScrollUpdate() {

        if (!ticking) {

            window.requestAnimationFrame(updateScroll);

            ticking = true;

        }

    }

    window.addEventListener(
        "scroll",
        requestScrollUpdate,
        { passive: true }
    );


    /* =========================================
       SCROLL REVEALS
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const scrollElements =
        document.querySelectorAll("[data-scroll]");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");
                        entry.target.classList.add("is-visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    scrollElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================================
       PROJECT ACTIVE STATE
    ========================================= */

    const projectRows =
        document.querySelectorAll(".project-row");


    const projectObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        projectRows.forEach(row => {
                            row.classList.remove("is-active");
                        });

                        entry.target.classList.add("is-active");

                    }

                });

            },
            {
                threshold: 0.55
            }
        );


    projectRows.forEach(row => {
        projectObserver.observe(row);
    });


    /* =========================================
       APP CARD ACTIVE STATE
    ========================================= */

    const appCards =
        document.querySelectorAll(".app-card");


    const appObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-active");

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    appCards.forEach(card => {
        appObserver.observe(card);
    });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections =
        document.querySelectorAll("section[id]");


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId =
                        entry.target.getAttribute("id");


                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        const href =
                            link.getAttribute("href");

                        if (href === `#${currentId}`) {

                            link.classList.add("active");

                        }

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =========================================
       CURSOR GLOW
    ========================================= */

    const cursorGlow =
        document.querySelector(".cursor-glow");


    if (
        cursorGlow &&
        window.innerWidth > 800 &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        });


        function animateCursor() {

            currentX +=
                (mouseX - currentX) * 0.08;

            currentY +=
                (mouseY - currentY) * 0.08;


            cursorGlow.style.left =
                `${currentX}px`;

            cursorGlow.style.top =
                `${currentY}px`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();

    }


    /* =========================================
       SMOOTH ANCHOR NAVIGATION
    ========================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute("href");

                    if (
                        targetId === "#" ||
                        !targetId
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =========================================
       INITIAL UPDATE
    ========================================= */

    updateScroll();

});
