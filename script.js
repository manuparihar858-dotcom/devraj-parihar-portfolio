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
        document.getElementById("menuToggle");

    const navMenu =
        document.querySelector(".nav-menu");

    const navLinks =
        document.querySelectorAll(".nav-link");


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            const icon =
                menuToggle.querySelector("i");

            if (navMenu.classList.contains("open")) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            } else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        });

    }


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu?.classList.remove("open");

            const icon =
                menuToggle?.querySelector("i");

            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        });

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

                        link.classList.remove(
                            "active"
                        );

                        const href =
                            link.getAttribute("href");


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
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


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
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

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


        document.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

            }
        );


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
       DATA DETECTIVE
    ========================================= */

    const detectiveCases = [

        /* CASE 1 */

        {
            headers: [
                "Customer",
                "Age",
                "City",
                "Purchase"
            ],

            rows: [
                ["Aarav", "24", "Delhi", "₹2,400"],
                ["Riya", "31", "Mumbai", "₹3,100"],
                ["Kabir", "-7", "Pune", "₹1,900"],
                ["Neha", "28", "Indore", "₹2,700"]
            ],

            correct: {
                row: 2,
                col: 1
            },

            explanation:
                "Kabir's age is -7. A customer age cannot be negative."
        },


        /* CASE 2 */

        {
            headers: [
                "Order ID",
                "Customer",
                "Product",
                "Revenue"
            ],

            rows: [
                ["ORD-101", "Aarav", "Laptop", "₹54,000"],
                ["ORD-102", "Riya", "Phone", "₹28,000"],
                ["ORD-103", "Kabir", "Tablet", "₹19,000"],
                ["ORD-103", "Neha", "Monitor", "₹24,000"]
            ],

            correct: {
                row: 3,
                col: 0
            },

            explanation:
                "ORD-103 appears twice. Duplicate order IDs can cause double-counting."
        },


        /* CASE 3 */

        {
            headers: [
                "Customer",
                "Region",
                "Orders",
                "Revenue"
            ],

            rows: [
                ["Aarav", "North", "8", "₹19,200"],
                ["Riya", "West", "11", "₹34,100"],
                ["Kabir", "", "7", "₹18,900"],
                ["Neha", "Central", "9", "₹26,100"]
            ],

            correct: {
                row: 2,
                col: 1
            },

            explanation:
                "Kabir's region is missing. Missing categorical values should be investigated."
        },


        /* CASE 4 */

        {
            headers: [
                "Customer",
                "Orders",
                "Average Order",
                "Total Revenue"
            ],

            rows: [
                ["Aarav", "8", "₹2,400", "₹19,200"],
                ["Riya", "11", "₹3,100", "₹34,100"],
                ["Kabir", "7", "₹2,700", "₹18,900"],
                ["Neha", "9", "₹2,900", "₹25,000"]
            ],

            correct: {
                row: 3,
                col: 3
            },

            explanation:
                "9 × ₹2,900 = ₹26,100, not ₹25,000."
        },


        /* CASE 5 */

        {
            headers: [
                "Product",
                "Units Sold",
                "Unit Price",
                "Revenue"
            ],

            rows: [
                ["Laptop", "5", "₹50,000", "₹250,000"],
                ["Phone", "8", "₹25,000", "₹200,000"],
                ["Tablet", "6", "₹20,000", "₹120,000"],
                ["Monitor", "4", "₹15,000", "₹45,000"]
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

    const detectiveMessage =
        document.getElementById(
            "detectiveMessage"
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


    function loadDetectiveCase() {

        const current =
            detectiveCases[
                detectiveIndex
            ];


        detectiveAnswered = false;


        caseNumber.textContent =
            `${String(
                detectiveIndex + 1
            ).padStart(2, "0")} / ${String(
                detectiveCases.length
            ).padStart(2, "0")}`;


        detectiveProgress.textContent =
            `Case ${
                detectiveIndex + 1
            } of ${
                detectiveCases.length
            }`;


        detectiveMessage.textContent =
            "Select the value you think is wrong.";


        detectiveMessage.className =
            "detective-message";


        nextCase.disabled = true;


        detectiveHead.innerHTML =
            current.headers
                .map(header =>
                    `<th>${header}</th>`
                )
                .join("");


        detectiveBody.innerHTML =
            current.rows
                .map(
                    (row, rowIndex) => {

                        return `
                            <tr>

                                ${row
                                    .map(
                                        (
                                            value,
                                            colIndex
                                        ) => `
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
                                        `
                                    )
                                    .join("")}

                            </tr>
                        `;

                    }
                )
                .join("");


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


                        const row =
                            Number(
                                cell.dataset.row
                            );

                        const col =
                            Number(
                                cell.dataset.col
                            );


                        const correct =
                            current.correct;


                        detectiveAnswered =
                            true;


                        if (
                            row === correct.row &&
                            col === correct.col
                        ) {

                            detectiveScore++;


                            detectiveScoreElement
                                .textContent =
                                detectiveScore;


                            cell.classList.add(
                                "correct"
                            );


                            detectiveMessage
                                .textContent =
                                `Correct. ${current.explanation}`;


                            detectiveMessage
                                .classList.add(
                                    "success"
                                );

                        } else {

                            cell.classList.add(
                                "wrong"
                            );


                            detectiveMessage
                                .textContent =
                                `Not quite. ${current.explanation}`;


                            detectiveMessage
                                .classList.add(
                                    "error"
                                );


                            const correctCell =
                                detectiveBody
                                    .querySelector(
                                        `[data-row="${correct.row}"][data-col="${correct.col}"]`
                                    );


                            if (
                                correctCell
                            ) {

                                correctCell
                                    .classList.add(
                                        "correct"
                                    );

                            }

                        }


                        nextCase.disabled =
                            false;

                    }
                );

            }

    }


    function finishDetective() {

        finalScore.textContent =
            detectiveScore;


        if (
            detectiveScore === 5
        ) {

            finalMessage.textContent =
                "Outstanding. You're a Data Detective.";

        } else if (
            detectiveScore >= 3
        ) {

            finalMessage.textContent =
                "Nice work. Your analyst instincts are solid.";

        } else {

            finalMessage.textContent =
                "Good start. Every analyst gets better with practice.";

        }


        detectiveResult.classList.add(
            "show"
        );


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

                detectiveScoreElement
                    .textContent = "0";


                detectiveResult
                    .classList
                    .remove("show");


                loadDetectiveCase();

            }
        );

    }


    if (
        detectiveHead &&
        detectiveBody
    ) {

        loadDetectiveCase();

    }


});
