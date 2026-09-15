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
            console.error("Data Detective: required elements are missing.");
            return;
        }

        const cases = [

            {
                question: "Which value is suspicious?",
                columns: ["Type", "Name", "Age"],
                rows: [
                    ["Customer", "Aarav", "22"],
                    ["Customer", "Riya", "31"],
                    ["Customer", "Kabir", "-7"],
                    ["Customer", "Meera", "27"]
                ],
                answer: 2,
                explanation:
                    "Kabir's age is -7. This is an invalid data value."
            },

            {
                question: "Which order looks like a duplicate?",
                columns: ["Type", "Order ID", "Amount"],
                rows: [
                    ["Order", "ORD-101", "₹2,500"],
                    ["Order", "ORD-102", "₹3,200"],
                    ["Order", "ORD-103", "₹1,850"],
                    ["Order", "ORD-103", "₹1,850"]
                ],
                answer: 3,
                explanation:
                    "ORD-103 appears twice with the same amount."
            },

            {
                question: "Which record has a missing value?",
                columns: ["Type", "Customer", "Region"],
                rows: [
                    ["Customer", "Aarav", "North"],
                    ["Customer", "Riya", "West"],
                    ["Customer", "Kabir", ""],
                    ["Customer", "Meera", "South"]
                ],
                answer: 2,
                explanation:
                    "Kabir's region is missing."
            },

            {
                question: "Which revenue value is clearly wrong?",
                columns: ["Store", "Month", "Revenue"],
                rows: [
                    ["Store A", "January", "₹52,000"],
                    ["Store B", "January", "₹48,000"],
                    ["Store C", "January", "₹54,000"],
                    ["Store D", "January", "₹540,000"]
                ],
                answer: 3,
                explanation:
                    "₹540,000 is a major outlier and likely contains an extra zero."
            },

            {
                question: "Which value contains a likely data-entry error?",
                columns: ["Product", "Metric", "Value"],
                rows: [
                    ["Product A", "Sales", "₹58,000"],
                    ["Product B", "Sales", "₹61,000"],
                    ["Product C", "Sales", "₹60,000"],
                    ["Product D", "Sales", "₹6,000"]
                ],
                answer: 3,
                explanation:
                    "₹6,000 is unusually low compared with the other values and likely lost a zero."
            }

        ];

        let currentCase = 0;
        let score = 0;
        let answered = false;

        function renderCase() {

            const current = cases[currentCase];

            answered = false;

            question.textContent = current.question;

            scoreEl.textContent = score;

            caseNumberEl.textContent =
                `${String(currentCase + 1).padStart(2, "0")} / ${cases.length}`;

            progressEl.textContent =
                `Case ${currentCase + 1} of ${cases.length}`;

            message.textContent =
                "Select the value you think is wrong.";

            message.className = "detective-message";

            result.classList.remove("show");

            /*
             * IMPORTANT:
             * Enable the button again for every new case.
             */
            nextBtn.disabled = true;
            nextBtn.style.display = "none";

            /*
             * Build table header
             */
            head.innerHTML = `
                <tr>
                    <th>#</th>
                    <th>${current.columns[0]}</th>
                    <th>${current.columns[1]}</th>
                    <th>${current.columns[2]}</th>
                </tr>
            `;

            /*
             * Build table body
             */
            body.innerHTML = "";

            current.rows.forEach((row, index) => {

                const tr = document.createElement("tr");

                tr.dataset.index = index;

                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${row[0]}</td>
                    <td>${row[1]}</td>
                    <td>${row[2] || "—"}</td>
                `;

                tr.addEventListener("click", function () {

                    if (answered) return;

                    answered = true;

                    const selectedIndex = Number(this.dataset.index);

                    /*
                     * Stop additional clicks.
                     */
                    body.querySelectorAll("tr").forEach(rowEl => {
                        rowEl.style.pointerEvents = "none";
                    });

                    if (selectedIndex === current.answer) {

                        this.classList.add("correct");

                        score++;

                        scoreEl.textContent = score;

                        message.textContent =
                            `Correct! ${current.explanation}`;

                        message.classList.add("success");

                    } else {

                        this.classList.add("wrong");

                        const correctRow =
                            body.querySelector(
                                `tr[data-index="${current.answer}"]`
                            );

                        if (correctRow) {
                            correctRow.classList.add("correct");
                        }

                        message.textContent =
                            `Not quite. ${current.explanation}`;

                        message.classList.add("error");
                    }

                    /*
                     * NOW enable Next Case.
                     */
                    nextBtn.disabled = false;
                    nextBtn.style.display = "inline-flex";

                    if (currentCase === cases.length - 1) {
                        nextBtn.innerHTML =
                            `See Result <i class="fa-solid fa-arrow-right"></i>`;
                    } else {
                        nextBtn.innerHTML =
                            `Next Case <i class="fa-solid fa-arrow-right"></i>`;
                    }

                });

                body.appendChild(tr);
            });
        }

        function showResult() {

            result.classList.add("show");

            finalScore.textContent =
                `${score}`;

            if (score === 5) {

                finalMessage.textContent =
                    "Perfect score. Your data detective instincts are sharp.";

            } else if (score >= 3) {

                finalMessage.textContent =
                    "Great work. You have a strong eye for data quality.";

            } else if (score >= 2) {

                finalMessage.textContent =
                    "Good start. Keep improving your data validation instincts.";

            } else {

                finalMessage.textContent =
                    "Keep investigating. Every analyst gets better with practice.";
            }

            nextBtn.style.display = "none";
        }

        nextBtn.addEventListener("click", function () {

            if (nextBtn.disabled) return;

            if (currentCase < cases.length - 1) {

                currentCase++;

                renderCase();

            } else {

                showResult();
            }

        });

        restartBtn.addEventListener("click", function () {

            currentCase = 0;

            score = 0;

            result.classList.remove("show");

            renderCase();

        });

      const certifications = [
    {
        title: "SQL (Intermediate)",
        issuer: "HackerRank",
        date: "September 2026",
        credentialId: "351E7CD555C0",
        credentialUrl:
            "https://www.hackerrank.com/certificates/351e7cd555c0"
    },
    {
        title: "Data Science & Analytics",
        issuer: "HP LIFE",
        date: "September 2026",
        credentialId:
            "6f00221c-9ecb-4472-8d88-5ff9f224d666",
        credentialUrl: null
    }
];  /*
         * Start the first case.
         */
        renderCase();

        console.log("Data Detective loaded successfully.");

    }

    /*
     * Make sure the DOM exists before starting.
     */
    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            startGame
        );

    } else {

        startGame();

    }

})();
    });
