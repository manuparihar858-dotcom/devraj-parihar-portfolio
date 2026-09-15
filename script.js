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

    const menuToggle =
        document.getElementById("menuToggle") ||
        document.getElementById("menuBtn");

    const navMenu =
        document.getElementById("navMenu");

    const navLinks =
        document.querySelectorAll("nav a");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                if (navMenu.classList.contains("open")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }


    /* =========================================
       SCROLL PROGRESS
    ========================================= */

    const progress =
        document.createElement("div");

    progress.className = "scroll-progress";

    progress.innerHTML = `
        <div class="scroll-progress-bar"></div>
    `;

    document.body.appendChild(progress);

    const progressBar =
        progress.querySelector(".scroll-progress-bar");


    /* =========================================
       HERO ELEMENTS
    ========================================= */

    const hero =
        document.querySelector(".hero");

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


    /* =========================================
       SCROLL HANDLING
    ========================================= */

    let scrollTicking = false;

    function updateScroll() {

        const scrollTop =
            window.scrollY || window.pageYOffset;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        /* -------------------------------------
           SCROLL PROGRESS
        ------------------------------------- */

        const percentage =
            documentHeight > 0
                ? Math.min(
                    scrollTop / documentHeight,
                    1
                )
                : 0;

        if (progressBar) {

            progressBar.style.transform =
                `scaleX(${percentage})`;

        }


        /* -------------------------------------
           HERO PARALLAX
        ------------------------------------- */

        if (hero) {

            const heroBottom =
                hero.offsetTop +
                hero.offsetHeight;

            if (scrollTop < heroBottom) {

                const heroProgress =
                    Math.min(
                        Math.max(
                            scrollTop / hero.offsetHeight,
                            0
                        ),
                        1
                    );


                if (
                    heroCopy &&
                    !window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) {

                    heroCopy.style.transform =
                        `translate3d(
                            0,
                            ${heroProgress * -45}px,
                            0
                        )`;

                }


                if (
                    heroPhoto &&
                    !window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) {

                    heroPhoto.style.transform =
                        `translate3d(
                            0,
                            ${heroProgress * 35}px,
                            0
                        )`;

                }


                if (
                    heroGrid &&
                    !window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) {

                    heroGrid.style.transform =
                        `translate3d(
                            0,
                            ${heroProgress * 70}px,
                            0
                        )`;

                }


                if (
                    orbOne &&
                    !window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) {

                    orbOne.style.transform =
                        `translate3d(
                            ${heroProgress * 40}px,
                            ${heroProgress * 80}px,
                            0
                        )`;

                }


                if (
                    orbTwo &&
                    !window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) {

                    orbTwo.style.transform =
                        `translate3d(
                            ${heroProgress * -30}px,
                            ${heroProgress * -60}px,
                            0
                        )`;

                }

            }

        }


        scrollTicking = false;

    }


    function requestScrollUpdate() {

        if (!scrollTicking) {

            window.requestAnimationFrame(
                updateScroll
            );

            scrollTicking = true;

        }

    }


    window.addEventListener(
        "scroll",
        requestScrollUpdate,
        {
            passive: true
        }
    );


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const scrollElements =
        document.querySelectorAll("[data-scroll]");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            entry.target.classList.add(
                                "is-visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin:
                        "0px 0px -45px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });


        scrollElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        /* Fallback for older browsers */

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

        scrollElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =========================================
       PROJECT ACTIVE STATE
    ========================================= */

    const projectRows =
        document.querySelectorAll(
            ".project-row"
        );


    if (
        projectRows.length &&
        "IntersectionObserver" in window
    ) {

        const projectObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            projectRows.forEach(
                                row => {
                                    row.classList.remove(
                                        "is-active"
                                    );
                                }
                            );

                            entry.target.classList.add(
                                "is-active"
                            );

                        }

                    });

                },
                {
                    threshold: 0.45
                }
            );


        projectRows.forEach(row => {

            projectObserver.observe(row);

        });

    }


    /* =========================================
       APP CARD ACTIVE STATE
    ========================================= */

    const appCards =
        document.querySelectorAll(
            ".app-card"
        );


    if (
        appCards.length &&
        "IntersectionObserver" in window
    ) {

        const appObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-active"
                            );

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );


        appCards.forEach(card => {

            appObserver.observe(card);

        });

    }


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const currentId =
                            entry.target.getAttribute(
                                "id"
                            );


                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );


                            const href =
                                link.getAttribute(
                                    "href"
                                );


                            if (
                                href ===
                                `#${currentId}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",
                    threshold: 0
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(
                section
            );

        });

    }


    /* =========================================
       CURSOR GLOW
    ========================================= */

    const cursorGlow =
        document.querySelector(
            ".cursor-glow"
        );


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        cursorGlow &&
        window.innerWidth > 800 &&
        !reducedMotion
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            }
        );


        function animateCursor() {

            currentX +=
                (mouseX - currentX) *
                0.08;

            currentY +=
                (mouseY - currentY) *
                0.08;


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
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
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
                        behavior:
                            reducedMotion
                                ? "auto"
                                : "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =========================================
       DATA DETECTIVE GAME
    ========================================= */

    const detectiveCases = [

        {
            headers: [
                "Customer",
                "Age",
                "City",
                "Purchase"
            ],

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
            headers: [
                "Order ID",
                "Customer",
                "Amount",
                "Status"
            ],

            rows: [
                [
                    "ORD-101",
                    "Aarav",
                    "₹2,400",
                    "Completed"
                ],
                [
                    "ORD-102",
                    "Riya",
                    "₹1,800",
                    "Completed"
                ],
                [
                    "ORD-103",
                    "Kabir",
                    "₹3,200",
                    "Pending"
                ],
                [
                    "ORD-103",
                    "Neha",
                    "₹2,100",
                    "Completed"
                ]
            ],

            correct: {
                row: 3,
                col: 0
            },

            explanation:
                "ORD-103 appears twice. That's a duplicate order ID."

        },


        {
            headers: [
                "Customer",
                "Region",
                "Orders",
                "Revenue"
            ],

            rows: [
                [
                    "Aarav",
                    "North",
                    "12",
                    "₹18,400"
                ],
                [
                    "Riya",
                    "West",
                    "9",
                    "₹14,200"
                ],
                [
                    "Kabir",
                    "",
                    "15",
                    "₹22,100"
                ],
                [
                    "Neha",
                    "South",
                    "11",
                    "₹16,800"
                ]
            ],

            correct: {
                row: 2,
                col: 1
            },

            explanation:
                "Kabir's region is missing."

        },


        {
            headers: [
                "Product",
                "Units",
                "Price",
                "Revenue"
            ],

            rows: [
                [
                    "Laptop",
                    "4",
                    "₹55,000",
                    "₹220,000"
                ],
                [
                    "Mouse",
                    "12",
                    "₹900",
                    "₹10,800"
                ],
                [
                    "Keyboard",
                    "8",
                    "₹1,500",
                    "₹12,000"
                ],
                [
                    "Monitor",
                    "3",
                    "₹18,000",
                    "₹540,000"
                ]
            ],

            correct: {
                row: 3,
                col: 3
            },

            explanation:
                "3 × ₹18,000 = ₹54,000, not ₹540,000."

        },


        {
            headers: [
                "Product",
                "Units Sold",
                "Unit Price",
                "Revenue"
            ],

            rows: [
                [
                    "Laptop",
                    "5",
                    "₹50,000",
                    "₹250,000"
                ],
                [
                    "Phone",
                    "8",
                    "₹25,000",
                    "₹200,000"
                ],
                [
                    "Tablet",
                    "6",
                    "₹20,000",
                    "₹120,000"
                ],
                [
                    "Monitor",
                    "4",
                    "₹15,000",
                    "₹45,000"
                ]
            ],

            correct: {
                row: 3,
                col: 3
            },

            explanation:
                "4 × ₹15,000 = ₹60,000, not ₹45,000."

        }

    ];


    let detectiveIndex = 0;

    let detectiveScore = 0;

    let detectiveAnswered = false;


    const detectiveHead =
        document.getElementById(
            "detectiveHead"
        );

    const detectiveBody =
        document.getElementById(
            "detectiveBody"
        );

    const detectiveQuestion =
        document.getElementById(
            "detectiveQuestion"
        );

    const detectiveMessage =
        document.getElementById(
            "detectiveMessage"
        );

    const detectiveScoreElement =
        document.getElementById(
            "detectiveScore"
        );

    const caseNumber =
        document.getElementById(
            "caseNumber"
        );

    const detectiveProgress =
        document.getElementById(
            "detectiveProgress"
        );

    const nextCase =
        document.getElementById(
            "nextCase"
        );

    const detectiveResult =
        document.getElementById(
            "detectiveResult"
        );

    const finalScore =
        document.getElementById(
            "finalScore"
        );

    const finalMessage =
        document.getElementById(
            "finalMessage"
        );

    const restartGame =
        document.getElementById(
            "restartGame"
        );


    /* -----------------------------------------
       LOAD CASE
    ----------------------------------------- */

    function loadDetectiveCase() {

        if (
            !detectiveHead ||
            !detectiveBody ||
            !detectiveCases.length
        ) {
            return;
        }


        const currentCase =
            detectiveCases[
                detectiveIndex
            ];


        detectiveAnswered =
            false;


        if (nextCase) {
            nextCase.disabled = true;
        }


        if (caseNumber) {

            caseNumber.textContent =
                `${String(
                    detectiveIndex + 1
                ).padStart(2, "0")} / ${
                    detectiveCases.length
                }`;

        }


        if (detectiveProgress) {

            detectiveProgress.textContent =
                `Case ${
                    detectiveIndex + 1
                } of ${
                    detectiveCases.length
                }`;

        }


        if (detectiveQuestion) {

            detectiveQuestion.textContent =
                "One value in this table is wrong. Find it.";

        }


        if (detectiveMessage) {

            detectiveMessage.textContent =
                "Select the value you think is wrong.";

            detectiveMessage.className =
                "detective-message";

        }


        /* -------------------------------------
           TABLE HEADER
        ------------------------------------- */

        detectiveHead.innerHTML =
            currentCase.headers
                .map(
                    header =>
                        `<th>${header}</th>`
                )
                .join("");


        /* -------------------------------------
           TABLE BODY
        ------------------------------------- */

        detectiveBody.innerHTML =
            currentCase.rows
                .map(
                    (row, rowIndex) => {

                        return `
                            <tr>
                                ${row
                                    .map(
                                        (
                                            value,
                                            colIndex
                                        ) => {

                                            return `
                                                <td
                                                    class="selectable"
                                                    data-row="${rowIndex}"
                                                    data-col="${colIndex}"
                                                >
                                                    ${
                                                        value ||
                                                        "—"
                                                    }
                                                </td>
                                            `;

                                        }
                                    )
                                    .join("")}
                            </tr>
                        `;

                    }
                )
                .join("");


        /* -------------------------------------
           CELL CLICK EVENTS
        ------------------------------------- */

        detectiveBody
            .querySelectorAll(
                "td.selectable"
            )
            .forEach(cell => {

                cell.addEventListener(
                    "click",
                    () => {

                        if (
                            detectiveAnswered
                        ) {
                            return;
                        }


                        const selectedRow =
                            Number(
                                cell.dataset.row
                            );

                        const selectedCol =
                            Number(
                                cell.dataset.col
                            );


                        const correct =
                            currentCase.correct;


                        detectiveAnswered =
                            true;


                        /* ---------------------
                           CORRECT
                        --------------------- */

                        if (
                            selectedRow ===
                                correct.row &&
                            selectedCol ===
                                correct.col
                        ) {

                            detectiveScore++;


                            if (
                                detectiveScoreElement
                            ) {

                                detectiveScoreElement
                                    .textContent =
                                    detectiveScore;

                            }


                            cell.classList.add(
                                "correct"
                            );


                            if (
                                detectiveMessage
                            ) {

                                detectiveMessage.textContent =
                                    `✓ Correct. ${currentCase.explanation}`;

                                detectiveMessage.classList.add(
                                    "success"
                                );

                            }

                        }


                        /* ---------------------
                           WRONG
                        --------------------- */

                        else {

                            cell.classList.add(
                                "wrong"
                            );


                            if (
                                detectiveMessage
                            ) {

                                detectiveMessage.textContent =
                                    `Not quite. ${currentCase.explanation}`;

                                detectiveMessage.classList.add(
                                    "error"
                                );

                            }


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


                        if (nextCase) {

                            nextCase.disabled =
                                false;

                        }

                    }
                );

            });

    }


    /* -----------------------------------------
       FINISH GAME
    ----------------------------------------- */

    function finishDetective() {

        if (finalScore) {

            finalScore.textContent =
                detectiveScore;

        }


        if (finalMessage) {

            if (
                detectiveScore ===
                detectiveCases.length
            ) {

                finalMessage.textContent =
                    "Outstanding. You're a Data Detective.";

            }

            else if (
                detectiveScore >= 3
            ) {

                finalMessage.textContent =
                    "Nice work. Your analyst instincts are solid.";

            }

            else {

                finalMessage.textContent =
                    "Good start. Every analyst gets better with practice.";

            }

        }


        if (detectiveResult) {

            detectiveResult.classList.add(
                "show"
            );


            setTimeout(() => {

                detectiveResult.scrollIntoView({
                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth",
                    block: "center"
                });

            }, 50);

        }

    }


    /* -----------------------------------------
       NEXT CASE
    ----------------------------------------- */

    if (nextCase) {

        nextCase.addEventListener(
            "click",
            () => {

                if (
                    !detectiveAnswered
                ) {
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


    /* -----------------------------------------
       RESTART GAME
    ----------------------------------------- */

    if (restartGame) {

        restartGame.addEventListener(
            "click",
            () => {

                detectiveIndex = 0;

                detectiveScore = 0;

                detectiveAnswered =
                    false;


                if (
                    detectiveScoreElement
                ) {

                    detectiveScoreElement
                        .textContent =
                        "0";

                }


                if (detectiveResult) {

                    detectiveResult.classList.remove(
                        "show"
                    );

                }


                loadDetectiveCase();

            }
        );

    }


    /* -----------------------------------------
       START GAME
    ----------------------------------------- */

    if (
        detectiveHead &&
        detectiveBody
    ) {

        loadDetectiveCase();

    }


    /* =========================================
       INITIAL SCROLL UPDATE
    ========================================= */

    updateScroll();

});document.addEventListener("DOMContentLoaded", () => {

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

    const menuToggle =
        document.getElementById("menuToggle") ||
        document.getElementById("menuBtn");

    const navMenu =
        document.getElementById("navMenu");

    const navLinks =
        document.querySelectorAll("nav a");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                if (navMenu.classList.contains("open")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }


    /* =========================================
       SCROLL PROGRESS
    ========================================= */

    const progress =
        document.createElement("div");

    progress.className = "scroll-progress";

    progress.innerHTML = `
        <div class="scroll-progress-bar"></div>
    `;

    document.body.appendChild(progress);

    const progressBar =
        progress.querySelector(".scroll-progress-bar");


    /* =========================================
       HERO ELEMENTS
    ========================================= */

    const hero =
        document.querySelector(".hero");

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


    /* =========================================
       SCROLL HANDLING
    ========================================= */

    let scrollTicking = false;

    function updateScroll() {

        const scrollTop =
            window.scrollY || window.pageYOffset;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        /* -------------------------------------
           SCROLL PROGRESS
        ------------------------------------- */

        const percentage =
            documentHeight > 0
                ? Math.min(
                    scrollTop / documentHeight,
                    1
                )
                : 0;

        if (progressBar) {

            progressBar.style.transform =
                `scaleX(${percentage})`;

        }


        /* -------------------------------------
           HERO PARALLAX
        ------------------------------------- */

        if (hero) {

            const heroBottom =
                hero.offsetTop +
                hero.offsetHeight;

            if (scrollTop < heroBottom) {

                const heroProgress =
                    Math.min(
                        Math.max(
                            scrollTop / hero.offsetHeight,
                            0
                        ),
                        1
                    );


                if (
                    heroCopy &&
                    !window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) {

                    heroCopy.style.transform =
                        `translate3d(
                            0,
                            ${heroProgress * -45}px,
                            0
                        )`;

                }


                if (
                    heroPhoto &&
                    !window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) {

                    heroPhoto.style.transform =
                        `translate3d(
                            0,
                            ${heroProgress * 35}px,
                            0
                        )`;

                }


                if (
                    heroGrid &&
                    !window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) {

                    heroGrid.style.transform =
                        `translate3d(
                            0,
                            ${heroProgress * 70}px,
                            0
                        )`;

                }


                if (
                    orbOne &&
                    !window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) {

                    orbOne.style.transform =
                        `translate3d(
                            ${heroProgress * 40}px,
                            ${heroProgress * 80}px,
                            0
                        )`;

                }


                if (
                    orbTwo &&
                    !window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) {

                    orbTwo.style.transform =
                        `translate3d(
                            ${heroProgress * -30}px,
                            ${heroProgress * -60}px,
                            0
                        )`;

                }

            }

        }


        scrollTicking = false;

    }


    function requestScrollUpdate() {

        if (!scrollTicking) {

            window.requestAnimationFrame(
                updateScroll
            );

            scrollTicking = true;

        }

    }


    window.addEventListener(
        "scroll",
        requestScrollUpdate,
        {
            passive: true
        }
    );


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const scrollElements =
        document.querySelectorAll("[data-scroll]");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            entry.target.classList.add(
                                "is-visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin:
                        "0px 0px -45px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });


        scrollElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        /* Fallback for older browsers */

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

        scrollElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =========================================
       PROJECT ACTIVE STATE
    ========================================= */

    const projectRows =
        document.querySelectorAll(
            ".project-row"
        );


    if (
        projectRows.length &&
        "IntersectionObserver" in window
    ) {

        const projectObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            projectRows.forEach(
                                row => {
                                    row.classList.remove(
                                        "is-active"
                                    );
                                }
                            );

                            entry.target.classList.add(
                                "is-active"
                            );

                        }

                    });

                },
                {
                    threshold: 0.45
                }
            );


        projectRows.forEach(row => {

            projectObserver.observe(row);

        });

    }


    /* =========================================
       APP CARD ACTIVE STATE
    ========================================= */

    const appCards =
        document.querySelectorAll(
            ".app-card"
        );


    if (
        appCards.length &&
        "IntersectionObserver" in window
    ) {

        const appObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-active"
                            );

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );


        appCards.forEach(card => {

            appObserver.observe(card);

        });

    }


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const currentId =
                            entry.target.getAttribute(
                                "id"
                            );


                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );


                            const href =
                                link.getAttribute(
                                    "href"
                                );


                            if (
                                href ===
                                `#${currentId}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",
                    threshold: 0
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(
                section
            );

        });

    }


    /* =========================================
       CURSOR GLOW
    ========================================= */

    const cursorGlow =
        document.querySelector(
            ".cursor-glow"
        );


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        cursorGlow &&
        window.innerWidth > 800 &&
        !reducedMotion
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            }
        );


        function animateCursor() {

            currentX +=
                (mouseX - currentX) *
                0.08;

            currentY +=
                (mouseY - currentY) *
                0.08;


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
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
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
                        behavior:
                            reducedMotion
                                ? "auto"
                                : "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =========================================
       DATA DETECTIVE GAME
    ========================================= */

    const detectiveCases = [

        {
            headers: [
                "Customer",
                "Age",
                "City",
                "Purchase"
            ],

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
            headers: [
                "Order ID",
                "Customer",
                "Amount",
                "Status"
            ],

            rows: [
                [
                    "ORD-101",
                    "Aarav",
                    "₹2,400",
                    "Completed"
                ],
                [
                    "ORD-102",
                    "Riya",
                    "₹1,800",
                    "Completed"
                ],
                [
                    "ORD-103",
                    "Kabir",
                    "₹3,200",
                    "Pending"
                ],
                [
                    "ORD-103",
                    "Neha",
                    "₹2,100",
                    "Completed"
                ]
            ],

            correct: {
                row: 3,
                col: 0
            },

            explanation:
                "ORD-103 appears twice. That's a duplicate order ID."

        },


        {
            headers: [
                "Customer",
                "Region",
                "Orders",
                "Revenue"
            ],

            rows: [
                [
                    "Aarav",
                    "North",
                    "12",
                    "₹18,400"
                ],
                [
                    "Riya",
                    "West",
                    "9",
                    "₹14,200"
                ],
                [
                    "Kabir",
                    "",
                    "15",
                    "₹22,100"
                ],
                [
                    "Neha",
                    "South",
                    "11",
                    "₹16,800"
                ]
            ],

            correct: {
                row: 2,
                col: 1
            },

            explanation:
                "Kabir's region is missing."

        },


        {
            headers: [
                "Product",
                "Units",
                "Price",
                "Revenue"
            ],

            rows: [
                [
                    "Laptop",
                    "4",
                    "₹55,000",
                    "₹220,000"
                ],
                [
                    "Mouse",
                    "12",
                    "₹900",
                    "₹10,800"
                ],
                [
                    "Keyboard",
                    "8",
                    "₹1,500",
                    "₹12,000"
                ],
                [
                    "Monitor",
                    "3",
                    "₹18,000",
                    "₹540,000"
                ]
            ],

            correct: {
                row: 3,
                col: 3
            },

            explanation:
                "3 × ₹18,000 = ₹54,000, not ₹540,000."

        },


        {
            headers: [
                "Product",
                "Units Sold",
                "Unit Price",
                "Revenue"
            ],

            rows: [
                [
                    "Laptop",
                    "5",
                    "₹50,000",
                    "₹250,000"
                ],
                [
                    "Phone",
                    "8",
                    "₹25,000",
                    "₹200,000"
                ],
                [
                    "Tablet",
                    "6",
                    "₹20,000",
                    "₹120,000"
                ],
                [
                    "Monitor",
                    "4",
                    "₹15,000",
                    "₹45,000"
                ]
            ],

            correct: {
                row: 3,
                col: 3
            },

            explanation:
                "4 × ₹15,000 = ₹60,000, not ₹45,000."

        }

    ];


    let detectiveIndex = 0;

    let detectiveScore = 0;

    let detectiveAnswered = false;


    const detectiveHead =
        document.getElementById(
            "detectiveHead"
        );

    const detectiveBody =
        document.getElementById(
            "detectiveBody"
        );

    const detectiveQuestion =
        document.getElementById(
            "detectiveQuestion"
        );

    const detectiveMessage =
        document.getElementById(
            "detectiveMessage"
        );

    const detectiveScoreElement =
        document.getElementById(
            "detectiveScore"
        );

    const caseNumber =
        document.getElementById(
            "caseNumber"
        );

    const detectiveProgress =
        document.getElementById(
            "detectiveProgress"
        );

    const nextCase =
        document.getElementById(
            "nextCase"
        );

    const detectiveResult =
        document.getElementById(
            "detectiveResult"
        );

    const finalScore =
        document.getElementById(
            "finalScore"
        );

    const finalMessage =
        document.getElementById(
            "finalMessage"
        );

    const restartGame =
        document.getElementById(
            "restartGame"
        );


    /* -----------------------------------------
       LOAD CASE
    ----------------------------------------- */

    function loadDetectiveCase() {

        if (
            !detectiveHead ||
            !detectiveBody ||
            !detectiveCases.length
        ) {
            return;
        }


        const currentCase =
            detectiveCases[
                detectiveIndex
            ];


        detectiveAnswered =
            false;


        if (nextCase) {
            nextCase.disabled = true;
        }


        if (caseNumber) {

            caseNumber.textContent =
                `${String(
                    detectiveIndex + 1
                ).padStart(2, "0")} / ${
                    detectiveCases.length
                }`;

        }


        if (detectiveProgress) {

            detectiveProgress.textContent =
                `Case ${
                    detectiveIndex + 1
                } of ${
                    detectiveCases.length
                }`;

        }


        if (detectiveQuestion) {

            detectiveQuestion.textContent =
                "One value in this table is wrong. Find it.";

        }


        if (detectiveMessage) {

            detectiveMessage.textContent =
                "Select the value you think is wrong.";

            detectiveMessage.className =
                "detective-message";

        }


        /* -------------------------------------
           TABLE HEADER
        ------------------------------------- */

        detectiveHead.innerHTML =
            currentCase.headers
                .map(
                    header =>
                        `<th>${header}</th>`
                )
                .join("");


        /* -------------------------------------
           TABLE BODY
        ------------------------------------- */

        detectiveBody.innerHTML =
            currentCase.rows
                .map(
                    (row, rowIndex) => {

                        return `
                            <tr>
                                ${row
                                    .map(
                                        (
                                            value,
                                            colIndex
                                        ) => {

                                            return `
                                                <td
                                                    class="selectable"
                                                    data-row="${rowIndex}"
                                                    data-col="${colIndex}"
                                                >
                                                    ${
                                                        value ||
                                                        "—"
                                                    }
                                                </td>
                                            `;

                                        }
                                    )
                                    .join("")}
                            </tr>
                        `;

                    }
                )
                .join("");


        /* -------------------------------------
           CELL CLICK EVENTS
        ------------------------------------- */

        detectiveBody
            .querySelectorAll(
                "td.selectable"
            )
            .forEach(cell => {

                cell.addEventListener(
                    "click",
                    () => {

                        if (
                            detectiveAnswered
                        ) {
                            return;
                        }


                        const selectedRow =
                            Number(
                                cell.dataset.row
                            );

                        const selectedCol =
                            Number(
                                cell.dataset.col
                            );


                        const correct =
                            currentCase.correct;


                        detectiveAnswered =
                            true;


                        /* ---------------------
                           CORRECT
                        --------------------- */

                        if (
                            selectedRow ===
                                correct.row &&
                            selectedCol ===
                                correct.col
                        ) {

                            detectiveScore++;


                            if (
                                detectiveScoreElement
                            ) {

                                detectiveScoreElement
                                    .textContent =
                                    detectiveScore;

                            }


                            cell.classList.add(
                                "correct"
                            );


                            if (
                                detectiveMessage
                            ) {

                                detectiveMessage.textContent =
                                    `✓ Correct. ${currentCase.explanation}`;

                                detectiveMessage.classList.add(
                                    "success"
                                );

                            }

                        }


                        /* ---------------------
                           WRONG
                        --------------------- */

                        else {

                            cell.classList.add(
                                "wrong"
                            );


                            if (
                                detectiveMessage
                            ) {

                                detectiveMessage.textContent =
                                    `Not quite. ${currentCase.explanation}`;

                                detectiveMessage.classList.add(
                                    "error"
                                );

                            }


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


                        if (nextCase) {

                            nextCase.disabled =
                                false;

                        }

                    }
                );

            });

    }


    /* -----------------------------------------
       FINISH GAME
    ----------------------------------------- */

    function finishDetective() {

        if (finalScore) {

            finalScore.textContent =
                detectiveScore;

        }


        if (finalMessage) {

            if (
                detectiveScore ===
                detectiveCases.length
            ) {

                finalMessage.textContent =
                    "Outstanding. You're a Data Detective.";

            }

            else if (
                detectiveScore >= 3
            ) {

                finalMessage.textContent =
                    "Nice work. Your analyst instincts are solid.";

            }

            else {

                finalMessage.textContent =
                    "Good start. Every analyst gets better with practice.";

            }

        }


        if (detectiveResult) {

            detectiveResult.classList.add(
                "show"
            );


            setTimeout(() => {

                detectiveResult.scrollIntoView({
                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth",
                    block: "center"
                });

            }, 50);

        }

    }


    /* -----------------------------------------
       NEXT CASE
    ----------------------------------------- */

    if (nextCase) {

        nextCase.addEventListener(
            "click",
            () => {

                if (
                    !detectiveAnswered
                ) {
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


    /* -----------------------------------------
       RESTART GAME
    ----------------------------------------- */

    if (restartGame) {

        restartGame.addEventListener(
            "click",
            () => {

                detectiveIndex = 0;

                detectiveScore = 0;

                detectiveAnswered =
                    false;


                if (
                    detectiveScoreElement
                ) {

                    detectiveScoreElement
                        .textContent =
                        "0";

                }


                if (detectiveResult) {

                    detectiveResult.classList.remove(
                        "show"
                    );

                }


                loadDetectiveCase();

            }
        );

    }


    /* -----------------------------------------
       START GAME
    ----------------------------------------- */

    if (
        detectiveHead &&
        detectiveBody
    ) {

        loadDetectiveCase();

    }


    /* =========================================
       INITIAL SCROLL UPDATE
    ========================================= */

    updateScroll();

});
