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

/* =========================================
   DATA DETECTIVE GAME
   ========================================= */

(function initDataDetective() {
    function startGame() {
        const head = document.getElementById("detectiveHead");
        const body = document.getElementById("detectiveBody");
        const question = document.getElementById("detectiveQuestion");
        const message = document.getElementById("detectiveMessage");
        const scoreEl = document.getElementById("detectiveScore");
        const caseNumberEl = document.getElementById("caseNumber");
        const progressEl = document.getElementById("detectiveProgress");
        const nextBtn = document.getElementById("nextCase");
        const result = document.getElementById("detectiveResult");
        const finalScore = document.getElementById("finalScore");
        const finalMessage = document.getElementById("finalMessage");
        const restartBtn = document.getElementById("restartGame");

        // If the game HTML isn't on the page, simply stop.
        if (
            !head ||
            !body ||
            !question ||
            !message ||
            !scoreEl ||
            !caseNumberEl ||
            !progressEl ||
            !nextBtn ||
            !result ||
            !finalScore ||
            !finalMessage ||
            !restartBtn
        ) {
            console.warn("Data Detective: required HTML elements were not found.");
            return;
        }

        const cases = [
            {
                question: "Which value is suspicious?",
                rows: [
                    ["Customer", "Aarav", "22"],
                    ["Customer", "Riya", "31"],
                    ["Customer", "Kabir", "-7"],
                    ["Customer", "Meera", "27"]
                ],
                answer: 2,
                explanation: "Age cannot reasonably be -7. This is an invalid data value."
            },

            {
                question: "Which order looks like a duplicate?",
                rows: [
                    ["Order", "ORD-101", "₹2,500"],
                    ["Order", "ORD-102", "₹3,200"],
                    ["Order", "ORD-103", "₹1,850"],
                    ["Order", "ORD-103", "₹1,850"]
                ],
                answer: 3,
                explanation: "ORD-103 appears twice with the same value, indicating a duplicate record."
            },

            {
                question: "Which record has a missing value?",
                rows: [
                    ["Customer", "Aarav", "North"],
                    ["Customer", "Riya", "West"],
                    ["Customer", "Kabir", ""],
                    ["Customer", "Meera", "South"]
                ],
                answer: 2,
                explanation: "Kabir has no region value. This is a missing-data issue."
            },

            {
                question: "Which revenue value is clearly wrong?",
                rows: [
                    ["Store A", "January", "₹52,000"],
                    ["Store B", "January", "₹48,000"],
                    ["Store C", "January", "₹54,000"],
                    ["Store D", "January", "₹540,000"]
                ],
                answer: 3,
                explanation: "₹540,000 is a major outlier compared with the other stores and likely contains an extra zero."
            },

            {
                question: "Which value contains a likely data-entry error?",
                rows: [
                    ["Product A", "Sales", "₹58,000"],
                    ["Product B", "Sales", "₹61,000"],
                    ["Product C", "Sales", "₹60,000"],
                    ["Product D", "Sales", "₹6,000"]
                ],
                answer: 3,
                explanation: "₹6,000 is unusually low compared with the other values and likely lost a zero."
            }
        ];

        let currentCase = 0;
        let score = 0;
        let answered = false;

        function renderCase() {
            const current = cases[currentCase];

            answered = false;

            result.classList.remove("show");
            message.textContent = "";
            message.className = "detective-message";

            nextBtn.style.display = "none";
            head.textContent = `Case ${currentCase + 1}`;
            question.textContent = current.question;
            scoreEl.textContent = score;
            caseNumberEl.textContent = `${currentCase + 1}/${cases.length}`;

            const progress = ((currentCase) / cases.length) * 100;
            progressEl.style.width = `${progress}%`;

            body.innerHTML = "";

            current.rows.forEach((row, index) => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${row[0]}</td>
                    <td>${row[1]}</td>
                    <td>${row[2] || "—"}</td>
                `;

                tr.dataset.index = index;

                tr.addEventListener("click", () => {
                    if (answered) return;

                    answered = true;

                    const selectedIndex = Number(tr.dataset.index);

                    document
                        .querySelectorAll("#detectiveBody tr")
                        .forEach(rowEl => {
                            rowEl.style.pointerEvents = "none";
                        });

                    if (selectedIndex === current.answer) {
                        tr.classList.add("correct");
                        score++;
                        scoreEl.textContent = score;

                        message.textContent = `Correct! ${current.explanation}`;
                        message.classList.add("success");
                    } else {
                        tr.classList.add("wrong");

                        const correctRow = document.querySelector(
                            `#detectiveBody tr[data-index="${current.answer}"]`
                        );

                        if (correctRow) {
                            correctRow.classList.add("correct");
                        }

                        message.textContent =
                            `Not quite. ${current.explanation}`;

                        message.classList.add("error");
                    }

                    if (currentCase < cases.length - 1) {
                        nextBtn.style.display = "inline-flex";
                        nextBtn.textContent = "Next Case →";
                    } else {
                        nextBtn.style.display = "inline-flex";
                        nextBtn.textContent = "See Result";
                    }
                });

                body.appendChild(tr);
            });
        }

        function showResult() {
            progressEl.style.width = "100%";

            result.classList.add("show");

            finalScore.textContent = `${score}/${cases.length}`;

            if (score === cases.length) {
                finalMessage.textContent =
                    "Perfect score. Your data detective instincts are sharp.";
            } else if (score >= 3) {
                finalMessage.textContent =
                    "Great work. You have a strong eye for data-quality issues.";
            } else if (score >= 2) {
                finalMessage.textContent =
                    "Good start. Keep practicing your data-validation instincts.";
            } else {
                finalMessage.textContent =
                    "Every analyst misses things sometimes. Keep investigating.";
            }

            nextBtn.style.display = "none";
        }

        nextBtn.addEventListener("click", () => {
            if (currentCase < cases.length - 1) {
                currentCase++;
                renderCase();
            } else {
                showResult();
            }
        });

        restartBtn.addEventListener("click", () => {
            currentCase = 0;
            score = 0;
            result.classList.remove("show");
            renderCase();
        });

        renderCase();

        console.log("Data Detective initialized successfully.");
    }

    // Works whether this script loads before or after DOMContentLoaded.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startGame);
    } else {
        startGame();
    }
})();
