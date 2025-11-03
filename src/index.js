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

function snapToNextSection(section) {
    const sections = {
        home: "#home",
        about: "#about-me",
        tech: "#tech-stack",
        project: "#projects",
    };

    window.location.href = sections[section];
}

function changeTheme(theme) {
    if (theme === "light") {
        document.querySelector("body").style.backgroundColor = colors.lightBg1;
        document.querySelector("body").style.color = colors.lightFont1;
        document.querySelectorAll(".nav-link").forEach((el) => {
            el.style.color = colors.lightFont1;
        });
    } else {
        document.querySelector("body").style.backgroundColor = colors.darkBg1;
        document.querySelector("body").style.color = colors.darkFont1;
        document.querySelectorAll(".nav-link").forEach((el) => {
            el.style.color = colors.darkFont1;
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

function scrollEffects() {
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

    const lightGroup = ["home", "tech"];
    let currentPosition = getCurrentPosition(positionY);
    let lastSection = currentPosition.name;

    document.addEventListener("scroll", () => {
        currentPosition = getCurrentPosition(positionY);

        if (currentPosition.name !== lastSection) {
            lastSection = currentPosition.name;
            snapToNextSection(lastSection);
        }

        lightGroup.some((el) => (currentPosition.name === el ? true : false))
            ? changeTheme("light")
            : changeTheme("dark");
    });
}

function main() {
    scrollEffects();
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});
