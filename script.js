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

/* =========================================
   DATA DETECTIVE GAME
========================================= */

const detectiveCases = [

    {
        headers: ["Customer", "Age", "City", "Purchase"],

        rows: [
            ["Aarav", "24", "Delhi", "₹2,400"],
            ["Riya", "29", "Mumbai", "₹3,100"],
            ["Kabir", "-7", "Pune", "₹1,800"],
            ["Neha", "31", "Delhi", "₹4,200"]
        ],

        correct: {
            row: 2,
            col: 1
        },

        explanation:
            "An age of -7 is impossible."
    },

    {
        headers: ["Order ID", "Customer", "Amount", "Status"],

        rows: [
            ["ORD-101", "Aarav", "₹2,400", "Completed"],
            ["ORD-102", "Riya", "₹1,800", "Completed"],
            ["ORD-103", "Kabir", "₹3,200", "Pending"],
            ["ORD-103", "Neha", "₹2,100", "Completed"]
        ],

        correct: {
            row: 3,
            col: 0
        },

        explanation:
            "ORD-103 appears twice. That's a duplicate order ID."
    },

    {
        headers: ["Customer", "Region", "Orders", "Revenue"],

        rows: [
            ["Aarav", "North", "12", "₹18,400"],
            ["Riya", "West", "9", "₹14,200"],
            ["Kabir", "", "15", "₹22,100"],
            ["Neha", "South", "11", "₹16,800"]
        ],

        correct: {
            row: 2,
            col: 1
        },

        explanation:
            "Kabir's region is missing."
    },

    {
        headers: ["Product", "Units", "Price", "Revenue"],

        rows: [
            ["Laptop", "4", "₹55,000", "₹220,000"],
            ["Mouse", "12", "₹900", "₹10,800"],
            ["Keyboard", "8", "₹1,500", "₹12,000"],
            ["Monitor", "3", "₹18,000", "₹540,000"]
        ],

        correct: {
            row: 3,
            col: 3
        },

        explanation:
            "3 × ₹18,000 = ₹54,000, not ₹540,000."
    },

    {
        headers: ["Customer", "Orders", "Average Order", "Segment"],

        rows: [
            ["Aarav", "8", "₹2,400", "Regular"],
            ["Riya", "11", "₹3,100", "Regular"],
            ["Kabir", "7", "₹2,700", "Premium"],
            ["Neha", "9", "₹2,900", "Regular"]
        ],

        correct: {
            row: 2,
            col: 3
        },

        explanation:
            "Kabir has the Premium label despite having the lowest order count."
    }

];


let detectiveIndex = 0;
let detectiveScore = 0;
let detectiveAnswered = false;


const detectiveHead =
    document.getElementById("detectiveHead");

const detectiveBody =
    document.getElementById("detectiveBody");

const detectiveQuestion =
    document.getElementById("detectiveQuestion");

const detectiveMessage =
    document.getElementById("detectiveMessage");

const detectiveScoreElement =
    document.getElementById("detectiveScore");

const caseNumber =
    document.getElementById("caseNumber");

const detectiveProgress =
    document.getElementById("detectiveProgress");

const nextCase =
    document.getElementById("nextCase");

const detectiveResult =
    document.getElementById("detectiveResult");

const finalScore =
    document.getElementById("finalScore");

const finalMessage =
    document.getElementById("finalMessage");

const restartGame =
    document.getElementById("restartGame");


function loadDetectiveCase() {

    const current =
        detectiveCases[detectiveIndex];

    detectiveAnswered = false;

    nextCase.disabled = true;

    caseNumber.textContent =
        `${String(detectiveIndex + 1).padStart(2, "0")} / ${detectiveCases.length}`;

    detectiveProgress.textContent =
        `Case ${detectiveIndex + 1} of ${detectiveCases.length}`;

    detectiveMessage.textContent =
        "Select the value you think is wrong.";

    detectiveMessage.className =
        "detective-message";


    detectiveHead.innerHTML =
        current.headers
            .map(header => `<th>${header}</th>`)
            .join("");


    detectiveBody.innerHTML =
        current.rows
            .map((row, rowIndex) => {

                return `
                    <tr>
                        ${row.map((value, colIndex) => `
                            <td
                                class="selectable"
                                data-row="${rowIndex}"
                                data-col="${colIndex}"
                            >
                                ${value || "—"}
                            </td>
                        `).join("")}
                    </tr>
                `;

            })
            .join("");


    detectiveBody
        .querySelectorAll("td")
        .forEach(cell => {

            cell.addEventListener(
                "click",
                () => {

                    if (detectiveAnswered) {
                        return;
                    }

                    const row =
                        Number(cell.dataset.row);

                    const col =
                        Number(cell.dataset.col);


                    const correct =
                        current.correct;


                    detectiveAnswered = true;


                    if (
                        row === correct.row &&
                        col === correct.col
                    ) {

                        detectiveScore++;

                        detectiveScoreElement.textContent =
                            detectiveScore;

                        cell.classList.add("correct");

                        detectiveMessage.textContent =
                            `✓ Correct. ${current.explanation}`;

                        detectiveMessage.classList.add(
                            "success"
                        );

                    } else {

                        cell.classList.add("wrong");

                        detectiveMessage.textContent =
                            `Not quite. ${current.explanation}`;

                        detectiveMessage.classList.add(
                            "error"
                        );


                        const correctCell =
                            detectiveBody.querySelector(
                                `[data-row="${correct.row}"][data-col="${correct.col}"]`
                            );


                        if (correctCell) {
                            correctCell.classList.add(
                                "correct"
                            );
                        }

                    }


                    nextCase.disabled = false;

                }
            );

        });

}


function finishDetective() {

    finalScore.textContent =
        detectiveScore;


    if (detectiveScore === 5) {

        finalMessage.textContent =
            "Outstanding. You're a Data Detective.";

    } else if (detectiveScore >= 3) {

        finalMessage.textContent =
            "Nice work. Your analyst instincts are solid.";

    } else {

        finalMessage.textContent =
            "Good start. Every analyst gets better with practice.";

    }


    detectiveResult.classList.add("show");

    detectiveResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


if (nextCase) {

    nextCase.addEventListener(
        "click",
        () => {

            if (!detectiveAnswered) {
                return;
            }


            detectiveIndex++;


            if (
                detectiveIndex >=
                detectiveCases.length
            ) {

                finishDetective();

                return;

            }


            loadDetectiveCase();

        }
    );

}


if (restartGame) {

    restartGame.addEventListener(
        "click",
        () => {

            detectiveIndex = 0;
            detectiveScore = 0;

            detectiveScoreElement.textContent =
                "0";

            detectiveResult.classList.remove(
                "show"
            );

            loadDetectiveCase();

        }
    );

}


if (
    detectiveHead &&
    detectiveBody
) {

    loadDetectiveCase();

}});
