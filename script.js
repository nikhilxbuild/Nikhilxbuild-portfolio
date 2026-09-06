```javascript
/* =========================================================
   NIKHIL SINHA — PORTFOLIO
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CUSTOM CURSOR
       ===================================================== */

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");

    const supportsFinePointer = window.matchMedia(
        "(pointer: fine)"
    ).matches;

    if (cursorDot && cursorRing && supportsFinePointer) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let ringX = mouseX;
        let ringY = mouseY;

        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.transform =
                `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

        });

        const animateCursor = () => {

            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            cursorRing.style.transform =
                `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

            requestAnimationFrame(animateCursor);
        };

        requestAnimationFrame(animateCursor);

        const updateCursorTargets = () => {

            const interactables = document.querySelectorAll(
                "a, button, input, textarea, .social-btn, .tech-item, .project-card, .experience-card, .testimonial-card"
            );

            interactables.forEach((element) => {

                element.addEventListener("mouseenter", () => {
                    cursorRing.classList.add("hover");
                });

                element.addEventListener("mouseleave", () => {
                    cursorRing.classList.remove("hover");
                });

            });
        };

        updateCursorTargets();
    }


    /* =====================================================
       LOADER
       ===================================================== */

    const loader = document.getElementById("loader");
    const progressEl = document.getElementById("loaderProgress");
    const chars = document.querySelectorAll(".loader-char");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (loader && progressEl) {

        if (prefersReducedMotion) {

            progressEl.style.width = "100%";

            chars.forEach((char) => {
                char.style.opacity = "1";
                char.style.transform = "translateY(0)";
            });

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            document.body.classList.remove("loading");

            setTimeout(() => {
                loader.style.display = "none";
                initScrollReveal();
            }, 300);

        } else {

            const duration = 1600;
            let startTime = null;

            const animateLoader = (timestamp) => {

                if (!startTime) {
                    startTime = timestamp;
                }

                const elapsed = timestamp - startTime;

                const progress = Math.min(
                    elapsed / duration,
                    1
                );

                progressEl.style.width =
                    `${progress * 100}%`;

                const charIndex = Math.floor(
                    progress * chars.length
                );

                chars.forEach((char, index) => {

                    if (index <= charIndex) {

                        char.style.opacity = "1";
                        char.style.transform = "translateY(0)";
                        char.style.transition =
                            "opacity 0.2s ease, transform 0.2s ease";

                    }

                });

                if (progress < 1) {

                    requestAnimationFrame(animateLoader);

                } else {

                    loader.style.opacity = "0";
                    loader.style.visibility = "hidden";

                    document.body.classList.remove("loading");

                    setTimeout(() => {

                        loader.style.display = "none";

                        document
                            .querySelectorAll(".hero-section .rev")
                            .forEach((element) => {
                                element.classList.add("in");
                            });

                        initScrollReveal();

                    }, 450);
                }
            };

            requestAnimationFrame(animateLoader);
        }
    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    function initScrollReveal() {

        const revealElements =
            document.querySelectorAll(".rev");

        if (!revealElements.length) {
            return;
        }

        if (
            prefersReducedMotion ||
            !("IntersectionObserver" in window)
        ) {

            revealElements.forEach((element) => {
                element.classList.add("in");
            });

            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("in");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach((element) => {

            observer.observe(element);

        });
    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const hamburgerBtn =
        document.getElementById("hamburgerBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const menuLinks =
        document.querySelectorAll(".menu-link");

    if (hamburgerBtn && mobileMenu) {

        hamburgerBtn.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("active");

            hamburgerBtn.classList.toggle(
                "active",
                isOpen
            );

            hamburgerBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        menuLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");
                hamburgerBtn.classList.remove("active");

                hamburgerBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });


        document.addEventListener("keydown", (event) => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("active")
            ) {

                mobileMenu.classList.remove("active");
                hamburgerBtn.classList.remove("active");

                hamburgerBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );
            }

        });
    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION SECTION
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-links a[href^='#']"
        );

    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const id =
                            entry.target.id;

                        navLinks.forEach((link) => {

                            const isActive =
                                link.getAttribute("href") ===
                                `#${id}`;

                            link.classList.toggle(
                                "active",
                                isActive
                            );

                        });

                    });

                },
                {
                    threshold: 0,
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );

        sections.forEach((section) => {

            sectionObserver.observe(section);

        });
    }


    /* =====================================================
       STICKY RESUME BUTTON
       Hide it near the top, reveal after scrolling
       ===================================================== */

    const stickyResume =
        document.querySelector(
            ".sticky-resume-btn"
        );

    if (stickyResume) {

        const updateResumeVisibility = () => {

            if (window.scrollY > 500) {

                stickyResume.classList.add(
                    "visible"
                );

            } else {

                stickyResume.classList.remove(
                    "visible"
                );

            }

        };

        window.addEventListener(
            "scroll",
            updateResumeVisibility,
            { passive: true }
        );

        updateResumeVisibility();
    }


    /* =====================================================
       PROJECT CARD HOVER
       Adds a lightweight tilt effect on desktop
       ===================================================== */

    if (
        supportsFinePointer &&
        !prefersReducedMotion
    ) {

        const projectCards =
            document.querySelectorAll(
                ".project-card"
            );

        projectCards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) / centerY) * -1.5;

                    const rotateY =
                        ((x - centerX) / centerX) * 1.5;

                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-4px)`;

                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        });
    }


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const formData =
                    new FormData(contactForm);

                const name =
                    String(
                        formData.get("name") || ""
                    ).trim();

                const email =
                    String(
                        formData.get("email") || ""
                    ).trim();

                const subject =
                    String(
                        formData.get("subject") || ""
                    ).trim();

                const message =
                    String(
                        formData.get("message") || ""
                    ).trim();


                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {
                    return;
                }


                const emailSubject =
                    encodeURIComponent(
                        subject
                    );

                const emailBody =
                    encodeURIComponent(
                        `Hi Nikhil,

Name: ${name}
Email: ${email}

Message:
${message}`
                    );


                window.location.href =
                    `mailto:nikhilxbuild@gmail.com?subject=${emailSubject}&body=${emailBody}`;

            }
        );
    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const currentYear =
        new Date().getFullYear();

    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach((element) => {

            element.textContent =
                currentYear;

        });


    /* =====================================================
       EXTERNAL LINKS
       ===================================================== */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach((link) => {

            if (!link.hasAttribute("rel")) {

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        });


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    document.body.classList.add(
        "js-enabled"
    );

});
```

