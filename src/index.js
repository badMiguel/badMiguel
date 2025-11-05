const colors = {
    darkBg1: "#191724",
    darkBg2: "#1f1d2e",
    darkBg3: "#26233a",
    darkFont1: "#e0def4",
    darkFont2: "#6e6a86",
    darkFont3: "#908caa",
    darkLove: "#eb6f92",
    darkGold: "#f6c177",
    darkRose: "#ebbcba",
    darkPine: "#31748f",
    darkFoam: "#9ccfd8",
    darkIris: "#c4a7e7",
    darkHighlight1: "#21202e",
    darkHighlight2: "#403d52",
    darkHighlight3: "#524f67",

    lightBg1: "#faf4ed",
    lightBg2: "#fffaf3",
    lightBg3: "#f2e9e1",
    lightFont1: "#575279",
    lightFont2: "#797593",
    lightFont3: "#9893a5",
    lightLove: "#b4637a",
    lightGold: "#ea9d34",
    lightRose: "#d7827e",
    lightPine: "#286983",
    lightFoam: "#56949f",
    lightIris: "#907aa9",
    lightHighlight1: "#f4ede9",
    lightHighlight2: "#dfdad9",
    lightHighlight3: "#cecacd",
};

function snapToNextSection(sections, lastSection, currentSection, currentPosition, positionY) {
    if (currentPosition.end - currentPosition.start <= window.innerHeight) {
        window.location.href = sections[currentSection];
        return;
    }

    const currHeight = positionY[currentSection].start;
    const prevHeight = positionY[lastSection].start;

    if (currHeight > prevHeight) {
        window.location.href = sections[currentSection];
    } else {
        window.scrollTo({ top: currentPosition.end - window.innerHeight * (4 / 11) });
    }
}

function changeLinkTheme(
    theme,
    prevClickedNavLinkEl,
    clickedNavLinkEl,
    hoveredElement,
    lastSection
) {
    if (prevClickedNavLinkEl) {
        prevClickedNavLinkEl.classList.remove("light-link-active");
        prevClickedNavLinkEl.classList.remove("dark-link-active");
        prevClickedNavLinkEl.classList.remove("light-font-1");
        prevClickedNavLinkEl.classList.remove("dark-font-1");
    }

    if (theme === "light") {
        prevClickedNavLinkEl.classList.add("light-font-1");
        if (clickedNavLinkEl) {
            clickedNavLinkEl.classList.remove("light-font-1");
            clickedNavLinkEl.classList.add("light-link-active");
        }
    } else {
        prevClickedNavLinkEl.classList.add("dark-font-1");
        if (clickedNavLinkEl) {
            clickedNavLinkEl.classList.remove("dark-font-1");
            clickedNavLinkEl.classList.add("dark-link-active");
        }
    }

    if (hoveredElement && hoveredElement.name === lastSection) {
        hoveredElement.element.classList.remove("dark-hover-link");
        hoveredElement.element.classList.remove("light-hover-link");
    }
}

function changeTheme(theme) {
    if (theme === "light") {
        document.querySelector("body").style.backgroundColor = colors.lightBg1;
        document.querySelector("body").style.color = colors.lightFont1;
        document.querySelectorAll(".nav-link").forEach((el) => {
            el.classList.remove("dark-font-1");
            el.classList.add("light-font-1");

            if (el.classList.contains("dark-hover-link")) {
                el.classList.remove("dark-hover-link");
                el.classList.add("light-hover-link");
            }
        });
        document.querySelectorAll(".tech-stack-content-item-container").forEach((el) => {
            el.classList.remove("dark-bg-2");
            el.classList.add("light-bg-2");
        });
        document.querySelectorAll(".project-content-item-container").forEach((el) => {
            el.classList.remove("dark-bg-3");
            el.classList.add("light-bg-3");
        });
    } else {
        document.querySelector("body").style.backgroundColor = colors.darkBg1;
        document.querySelector("body").style.color = colors.darkFont1;
        document.querySelectorAll(".nav-link").forEach((el) => {
            el.classList.remove("light-font-1");
            el.classList.add("dark-font-1");

            if (el.classList.contains("light-hover-link")) {
                el.classList.remove("light-hover-link");
                el.classList.add("dark-hover-link");
            }
        });
        document.querySelectorAll(".tech-stack-content-item-container").forEach((el) => {
            el.classList.remove("light-bg-2");
            el.classList.add("dark-bg-2");
        });
        document.querySelectorAll(".project-content-item-container").forEach((el) => {
            el.classList.remove("light-bg-3");
            el.classList.add("dark-bg-3");
        });
    }
}

function getElementAbsoluteYPosition(element) {
    return element.getBoundingClientRect().top + window.scrollY;
}

function getElementHeight(element) {
    return element.clientHeight;
}

function getStartPos(element) {
    return getElementAbsoluteYPosition(element) - window.innerHeight / 2;
}

function getEndPos(element) {
    return (
        getElementAbsoluteYPosition(element) - window.innerHeight / 2 + getElementHeight(element)
    );
}

function getCurrentPosition(positionY) {
    for (var pos in positionY) {
        if (positionY[pos].start <= window.scrollY && positionY[pos].end >= window.scrollY) {
            return { name: pos, pos: positionY[pos] };
        }
    }
    return { name: "home", pos: positionY["home"] };
}

function getPositionY(sectionContainer) {
    return {
        home: {
            start: getStartPos(sectionContainer.home),
            end: getEndPos(sectionContainer.home),
        },
        about: {
            start: getStartPos(sectionContainer.about),
            end: getEndPos(sectionContainer.about),
        },
        tech: {
            start: getStartPos(sectionContainer.tech),
            end: getEndPos(sectionContainer.tech),
        },
        project: {
            start: getStartPos(sectionContainer.project),
            end: getEndPos(sectionContainer.project),
        },
        contact: {
            start: getStartPos(sectionContainer.contact),
            end: getEndPos(sectionContainer.contact),
        },
    };
}

function main(logger) {
    document.getElementById("copyright-year").textContent = new Date().getFullYear();
    const isReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lightGroup = ["home", "tech", "contact"];
    const sections = {
        home: "#home",
        about: "#about-me",
        tech: "#tech-stack",
        project: "#projects",
        contact: "#contact",
    };

    const sectionContainer = {
        home: document.querySelector(".home-container"),
        about: document.querySelector(".about-me-container"),
        tech: document.querySelector(".tech-stack-container"),
        project: document.querySelector(".projects-container"),
        contact: document.querySelector(".contact-container"),
    };

    let positionY = getPositionY(sectionContainer);

    window.addEventListener("resize", () => {
        positionY = getPositionY(sectionContainer);
    });

    let currentPosition = getCurrentPosition(positionY);
    let skipSnap = false;
    let clickedNavLink = currentPosition.name;
    let clickedNavLinkEl = document.getElementById(`${clickedNavLink}-link`);
    let prevClickedNavLinkEl = clickedNavLinkEl;
    let hoveredElement = { name: "", element: null };
    const navLinks = document.querySelectorAll(".nav-link");

    if (logger) {
        logger.appendLine(`Start Position: ${currentPosition.name}`);
    }

    navLinks.forEach((element) => {
        element.addEventListener("mouseover", () => {
            if (currentPosition.name === element.id.split("-")[0]) {
                return;
            }

            hoveredElement = { name: element.id.split("-")[0], element: element };

            if (lightGroup.some((el) => (currentPosition.name === el ? true : false))) {
                element.classList.add("light-hover-link");
            } else {
                element.classList.add("dark-hover-link");
            }
        });

        element.addEventListener("mouseout", () => {
            hoveredElement = { name: "", element: null };

            element.classList.remove("light-hover-link");
            element.classList.remove("dark-hover-link");
        });

        element.addEventListener("click", () => {
            element.classList.remove("dark-hover-link");
            element.classList.remove("light-hover-link");

            skipSnap = true;
            clickedNavLink =
                Object.keys(sections).find((el) => sections[el] === element.getAttribute("href")) ||
                "home";
            prevClickedNavLinkEl = clickedNavLinkEl;
            clickedNavLinkEl = document.getElementById(`${clickedNavLink}-link`);

            if (isReduceMotion) {
                if (logger) {
                    logger.appendLine(`Before click position: ${currentPosition.name}`);
                }
                const clicked = element.id.split("-")[0];
                currentPosition = { name: clicked, pos: positionY[clicked] };
                if (logger) {
                    logger.appendLine(`After click position: ${currentPosition.name}`);
                }
            }

            if (lightGroup.some((el) => (currentPosition.name === el ? true : false))) {
                if (isReduceMotion) {
                    changeTheme("light");
                }
                changeLinkTheme("light", prevClickedNavLinkEl, clickedNavLinkEl);
            } else {
                if (isReduceMotion) {
                    changeTheme("dark");
                }
                changeLinkTheme("dark", prevClickedNavLinkEl, clickedNavLinkEl);
            }
        });
    });

    document.querySelectorAll(".tech-stack-content-item-container").forEach((element) => {
        element.addEventListener("mouseover", () => {
            lightGroup.some((el) => (currentPosition.name === el ? true : false))
                ? element.classList.add("tech-item-hover-light")
                : element.classList.add("tech-item-hover-dark");
        });

        element.addEventListener("mouseout", () => {
            element.classList.remove("tech-item-hover-light");
            element.classList.remove("tech-item-hover-dark");
        });
    });

    document.querySelectorAll(".project-content-item-container").forEach((element) => {
        element.addEventListener("mouseover", () => {
            lightGroup.some((el) => (currentPosition.name === el ? true : false))
                ? element.classList.add("project-item-hover-light")
                : element.classList.add("project-item-hover-dark");
        });

        element.addEventListener("mouseout", () => {
            element.classList.remove("project-item-hover-light");
            element.classList.remove("project-item-hover-dark");
        });
    });

    if (window.scrollY === 0) {
        changeTheme("light");
        changeLinkTheme("light", prevClickedNavLinkEl, clickedNavLinkEl);
    }
    let lastSection = currentPosition.name;

    document.addEventListener("scroll", () => {
        currentPosition = getCurrentPosition(positionY);

        if (skipSnap) {
            if (currentPosition.name === clickedNavLink) {
                skipSnap = false;
            }
            return;
        }

        if (currentPosition.name !== lastSection) {
            if (logger) {
                logger.appendLine(`section changed ${currentPosition.name}`);
            }

            snapToNextSection(
                sections,
                lastSection,
                currentPosition.name,
                currentPosition.pos,
                positionY
            );
            lastSection = currentPosition.name;
            clickedNavLink = currentPosition.name;
            prevClickedNavLinkEl = clickedNavLinkEl;
            clickedNavLinkEl = document.getElementById(`${clickedNavLink}-link`);
        }

        if (lightGroup.some((el) => (currentPosition.name === el ? true : false))) {
            changeTheme("light");
            changeLinkTheme(
                "light",
                prevClickedNavLinkEl,
                clickedNavLinkEl,
                hoveredElement,
                lastSection
            );
        } else {
            changeTheme("dark");
            changeLinkTheme(
                "dark",
                prevClickedNavLinkEl,
                clickedNavLinkEl,
                hoveredElement,
                lastSection
            );
        }
    });
}

class DebugLogger {
    constructor() {
        this.overlay = document.createElement("pre");
        this.overlay.id = "debug-overlay";
        Object.assign(this.overlay.style, {
            position: "fixed",
            right: "12px",
            bottom: "12px",
            zIndex: 99999,
            background: "rgba(0,0,0,0.85)",
            color: "#fff",
            padding: "10px",
            borderRadius: "8px",
            maxWidth: "420px",
            maxHeight: "50vh",
            overflow: "auto",
            fontSize: "12px",
            whiteSpace: "pre-wrap",
            lineHeight: "1.25",
        });
        this.overlay.textContent = "Debug mode — collecting info...\n";
        document.documentElement.appendChild(this.overlay);

        const env = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            reducedMotion: !!(
                window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ),
            raf: !!window.requestAnimationFrame,
            cssAnimation:
                typeof document.body !== "undefined"
                    ? "animation" in document.body.style || "webkitAnimation" in document.body.style
                    : false,
        };

        try {
            new Function("return 1")();
            env.evalAllowed = true;
        } catch (e) {
            env.evalAllowed = false;
            env.evalError = e && e.message;
        }

        this.appendLine("ENV: " + JSON.stringify(env));

        window.addEventListener("error", (e) => {
            this.appendLine(
                `Error: ${e.message} @ ${e.filename || ""}:${e.lineno || ""}:${e.colno || ""}`
            );
            if (e.error && e.error.stack) this.appendLine("Stack: " + e.error.stack);
        });

        window.addEventListener("unhandledrejection", (ev) => {
            const reason = ev.reason && (ev.reason.stack || ev.reason.message || String(ev.reason));
            this.appendLine("UnhandledRejection: " + reason);
        });

        this.hb = setInterval(
            () =>
                this.appendLine(
                    "heartbeat: " + new Date().toISOString() + " scrollY:" + window.scrollY
                ),
            20000
        );
    }

    appendLine(line) {
        this.overlay.textContent += line + "\n";
        this.overlay.scrollTop = this.overlay.scrollHeight;
    }

    destroy() {
        clearInterval(this.hb);
        this.overlay.remove();
    }
}

window.addEventListener("load", () => {
    const url = new URL(window.location.href);
    const debugOn = url.searchParams.has("debug");
    let logger = null;

    if (debugOn) {
        logger = new DebugLogger();
    }

    try {
        main(logger);
    } catch (err) {
        if (logger) {
            logger.appendLine("main() threw: " + (err && (err.stack || err.message)));
        } else {
            console.error(err);
        }
    }
});
