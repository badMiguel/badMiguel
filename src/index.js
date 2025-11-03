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

function snapToNextSection(sections, section) {
    window.location.href = sections[section];
}

function changeLinkTheme(theme, prevClickedNavLinkEl, clickedNavLinkEl) {
    if (theme === "light") {
        if (prevClickedNavLinkEl) {
            prevClickedNavLinkEl.style.backgroundColor = null;

            prevClickedNavLinkEl.classList.remove("light-link-active");
            prevClickedNavLinkEl.classList.remove("dark-link-active");
            prevClickedNavLinkEl.classList.remove("dark-font-1");
            prevClickedNavLinkEl.classList.add("light-font-1");
        }
        if (clickedNavLinkEl) {
            clickedNavLinkEl.classList.remove("light-font-1");
            clickedNavLinkEl.classList.add("light-link-active");
        }
    } else {
        if (prevClickedNavLinkEl) {
            prevClickedNavLinkEl.classList.remove("light-link-active");
            prevClickedNavLinkEl.classList.remove("dark-link-active");
            prevClickedNavLinkEl.classList.remove("light-font-1");
            prevClickedNavLinkEl.classList.add("dark-font-1");
        }
        if (clickedNavLinkEl) {
            clickedNavLinkEl.classList.remove("dark-font-1");
            clickedNavLinkEl.classList.add("dark-link-active");
        }
    }
}

function changeTheme(theme) {
    if (theme === "light") {
        document.querySelector("body").style.backgroundColor = colors.lightBg1;
        document.querySelector("body").style.color = colors.lightFont1;
        document.querySelectorAll(".nav-link").forEach((el) => {
            el.classList.remove("dark-font-1");
            el.classList.add("light-font-1");
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
}

function main() {
    document.getElementById("copyright-year").textContent = new Date().getFullYear();

    const sections = {
        home: "#home",
        about: "#about-me",
        tech: "#tech-stack",
        project: "#projects",
    };

    const sectionContainer = {
        home: document.querySelector(".home-container"),
        about: document.querySelector(".about-me-container"),
        tech: document.querySelector(".tech-stack-container"),
        project: document.querySelector(".projects-container"),
    };

    const positionY = {
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
    };

    let currentPosition = getCurrentPosition(positionY);

    let skipSnap = false;
    let clickedNavLink = currentPosition.name;
    let clickedNavLinkEl = document.getElementById(`${clickedNavLink}-link`);
    let prevClickedNavLinkEl = null;
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((element) => {
        element.addEventListener("click", () => {
            skipSnap = true;
            clickedNavLink =
                Object.keys(sections).find((el) => sections[el] === element.getAttribute("href")) ||
                "home";
        });
    });

    if (window.scrollY === 0) {
        changeTheme("light");
        changeLinkTheme("light", prevClickedNavLinkEl, clickedNavLinkEl);
    }

    const lightGroup = ["home", "tech"];
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
            lastSection = currentPosition.name;
            snapToNextSection(sections, lastSection);

            clickedNavLink = currentPosition.name;
            prevClickedNavLinkEl = clickedNavLinkEl;
            clickedNavLinkEl = document.getElementById(`${clickedNavLink}-link`);
        }

        if (lightGroup.some((el) => (currentPosition.name === el ? true : false))) {
            changeTheme("light");
            changeLinkTheme("light", prevClickedNavLinkEl, clickedNavLinkEl);
        } else {
            changeTheme("dark");
            changeLinkTheme("dark", prevClickedNavLinkEl, clickedNavLinkEl);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});
