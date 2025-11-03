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

function changeTheme(theme) {
    if (theme === "light") {
        document.querySelector("body").style.backgroundColor = colors.lightBg1;
        document.querySelector("body").style.color = colors.lightFont1;
    } else {
        document.querySelector("body").style.backgroundColor = colors.darkBg1;
        document.querySelector("body").style.color = colors.darkFont1;
    }
}

function getElementAbsoluteYPosition(element) {
    return document.querySelector(element).getBoundingClientRect().top + window.scrollY;
}

function getElementHeight(element) {
    return document.querySelector(element).clientHeight;
}

function scrollEffects() {
    const lightGroup = [".home-container", ".tech-stack-container"];

    document.addEventListener("scroll", () => {
        const shouldLight = lightGroup.some((el) => {
            const posY = getElementAbsoluteYPosition(el) - window.innerHeight / 2;
            const posYEnd = posY + getElementHeight(el);

            if (posY <= window.scrollY && posYEnd >= window.scrollY) {
                return true;
            } else {
                console.log({ posY, posYEnd });
                return false;
            }
        });

        if (shouldLight) {
            changeTheme("light")
        } else {
            changeTheme("dark")
        }
    });
}

function main() {
    scrollEffects();
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});
