let settingsTab = document.getElementById("settingsTab");
let settingsPanel = document.getElementById("settingsPanel");
let settingsCloseButton = document.getElementById("settingsCloseButton");
let darken = document.getElementById("darken");
let helpButton = document.getElementById("helpButton");
let helpPanel = document.getElementById("helpPanel");

let theme = document.getElementById("theme");
const themesList = ["default", "burgundy", "rose red", "mango tango", "golden yellow", "forest green", "teal", "baby blue", "amethyst", "magenta", "watermelon pink", "cafe au lait", "onyx", "rainbow", "pastel rainbow", "sunset", "ocean", "neon", "cool", "warm"];
let currentTheme = 0;

const lightColorsList = [
    {
        firstColor: "#005475",
        secondColor: "#0076a5",
        thirdColor: "#005475",
        fourthColor: "#005e83",
        fifthColor: "#02678f",
        sixthColor: "rgb(255, 180, 110)",
        lightModeText: "#000000",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#830022",
        secondColor: "#8e1736",
        thirdColor: "#b26076",
        fourthColor: "#a13f59",
        fifthColor: "#982c48",
        sixthColor: "#aa5068",
        lightModeText: "#ffffff",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#e3242b",
        secondColor: "#d0202c",
        thirdColor: "#ac0621",
        fourthColor: "#be0621",
        fifthColor: "#b50621",
        sixthColor: "#ca1728",
        lightModeText: "#000000",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#fb8842",
        secondColor: "#ec7625",
        thirdColor: "#d97448",
        fourthColor: "#faba5f",
        fifthColor: "#f77f00",
        sixthColor: "#ff9f00",
        lightModeText: "#000000",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#fbefb1",
        secondColor: "#fbe488",
        thirdColor: "#fada5e",
        fourthColor: "#f6c913",
        fifthColor: "#ffb428",
        sixthColor: "#cc8500",
        lightModeText: "#000000",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#0b6623",
        secondColor: "#107529",
        thirdColor: "#168b31",
        fourthColor: "#1ca038",
        fifthColor: "#31a94a",
        sixthColor: "#55b869",
        lightModeText: "#ffffff",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#008080",
        secondColor: "#279a9a",
        thirdColor: "#74cfcf",
        fourthColor: "#61c2c2",
        fifthColor: "#4db5b5",
        sixthColor: "#93d9d9",
        lightModeText: "#000000",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#89cff0",
        secondColor: "#6bc4f2",
        thirdColor: "#4db9f3",
        fourthColor: "#3eb4f4",
        fifthColor: "#20a9f5",
        sixthColor: "#029ef7",
        lightModeText: "#000000",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#8c67cc",
        secondColor: "#855dbc",
        thirdColor: "#7e53ad",
        fourthColor: "#9966cc",
        fifthColor: "#966bd4",
        sixthColor: "#9370db",
        lightModeText: "#ffffff",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#9e0f74",
        secondColor: "#93279d",
        thirdColor: "#9a4eae",
        fourthColor: "#8b008b",
        fifthColor: "#a81668",
        sixthColor: "#c35ba3",
        lightModeText: "#ffffff",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#e33b6d",
        secondColor: "#e75480",
        thirdColor: "#fc94a6",
        fourthColor: "#fc6c85",
        fifthColor: "#f26083",
        sixthColor: "#fdafbc",
        lightModeText: "#ffffff",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#d1bea8",
        secondColor: "#d2b48c",
        thirdColor: "#a67b5b",
        fourthColor: "#965a3e",
        fifthColor: "#6d4436",
        sixthColor: "#573a2c",
        lightModeText: "#000000",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#1e1e1e",
        secondColor: "#353839",
        thirdColor: "#555555",
        fourthColor: "#989898",
        fifthColor: "#e3e3e3",
        sixthColor: "#454747",
        lightModeText: "#ffffff",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#f94144",
        secondColor: "#f47e3e",
        thirdColor: "#f9c74f",
        fourthColor: "#90be6d",
        fifthColor: "#43aa8b",
        sixthColor: "#577590",
        lightModeText: "#000000",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#ffadad",
        secondColor: "#ffd6a5",
        thirdColor: "#fdffb6",
        fourthColor: "#caffbf",
        fifthColor: "#9bf6ff",
        sixthColor: "#bdb2ff",
        lightModeText: "#000000",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#ff7b00",
        secondColor: "#ffaa00",
        thirdColor: "#ffb700",
        fourthColor: "#ff9500",
        fifthColor: "#ffc300",
        sixthColor: "#ffd000",
        lightModeText: "#000000",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#fad4c0",
        secondColor: "#d7c4bd",
        thirdColor: "#64b6ac",
        fourthColor: "#fee9e1",
        fifthColor: "#d7c4bd",
        sixthColor: "#92dad4",
        lightModeText: "#000000",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#f72585",
        secondColor: "#b5179e",
        thirdColor: "#7209b7",
        fourthColor: "#560bad",
        fifthColor: "#3f37c9",
        sixthColor: "#4361ee",
        lightModeText: "#ffffff",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#20bac5",
        secondColor: "#00b2ca",
        thirdColor: "#04a6c2",
        fourthColor: "#0899ba",
        fifthColor: "#0f80aa",
        sixthColor: "#16679a",
        lightModeText: "#ffffff",
        darkModeText: "#ffffff"
    },
    {
        firstColor: "#fec5bb",
        secondColor: "#fae1dd",
        thirdColor: "#f8edeb",
        fourthColor: "#e8e8e4",
        fifthColor: "#d8e2dc",
        sixthColor: "#ffe5d9",
        lightModeText: "#000000",
        darkModeText: "#ffffff"
    }
];

function init() {
    settingsTab.addEventListener("click", settingsPanelAction);
    for (let closeButton of document.getElementsByClassName("closeButton")) {
        closeButton.addEventListener("click", () => {
            settingsPanel.style.display = "none";
            helpPanel.style.display = "none";
            darken.style.display = "none";
        });
    }
    settingsCloseButton.addEventListener("click", loadTheme);
    document.getElementById("prevThemeButton").addEventListener("click", prevTheme);
    document.getElementById("nextThemeButton").addEventListener("click", nextTheme);
    loadTheme();
    helpButton.addEventListener("click", () => {
        helpPanel.style.display = "block";
        darken.style.display = "block";
    });
}

function settingsPanelAction() {
    if (darken.style.display === "none") {
        darken.style.display = "block";
        settingsPanel.style.display = "block";
        document.getElementById("themeName").textContent = themesList[currentTheme];
    }
    else {
        darken.style.display = "none";
        settingsPanel.style.display = "none";
    }
}

function prevTheme() {
    if (currentTheme == 0) {
        currentTheme = themesList.length - 1;
    }
    else {
        currentTheme -= 1;
    }
    document.getElementById("themeName").textContent = themesList[currentTheme];
    updateColor();
    document.getElementById("colorPreviews").style.display = "flex";
}

function nextTheme() {
    if (currentTheme == themesList.length - 1) {
        currentTheme = 0;
    }
    else {
        currentTheme += 1;
    }
    document.getElementById("themeName").textContent = themesList[currentTheme];
    updateColor();
    document.getElementById("colorPreviews").style.display = "flex";
}
function updateColor() {
    document.getElementById("cP1").style.backgroundColor = lightColorsList[currentTheme].firstColor;
    document.getElementById("cP2").style.backgroundColor = lightColorsList[currentTheme].secondColor;
    document.getElementById("cP3").style.backgroundColor = lightColorsList[currentTheme].thirdColor;
    document.getElementById("cP4").style.backgroundColor = lightColorsList[currentTheme].fourthColor;
    document.getElementById("cP5").style.backgroundColor = lightColorsList[currentTheme].fifthColor;
    document.getElementById("cP6").style.backgroundColor = lightColorsList[currentTheme].sixthColor;
}

function loadTheme() {
    document.getElementById("theme").href = "/themes.css";
    var r = document.documentElement;
    r.style.setProperty("--first-color", lightColorsList[currentTheme].firstColor);
    r.style.setProperty("--second-color", lightColorsList[currentTheme].secondColor);
    r.style.setProperty("--third-color", lightColorsList[currentTheme].thirdColor);
    r.style.setProperty("--fourth-color", lightColorsList[currentTheme].fourthColor);
    r.style.setProperty("--fifth-color", lightColorsList[currentTheme].fifthColor);
    r.style.setProperty("--sixth-color", lightColorsList[currentTheme].sixthColor);
    r.style.setProperty("--light-mode-text", lightColorsList[currentTheme].lightModeText);
    r.style.setProperty("--dark-mode-text", lightColorsList[currentTheme].darkModeText);
}

init();