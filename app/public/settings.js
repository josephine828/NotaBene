let settingsTab = document.getElementById("settingsTab");
let settingsPanel = document.getElementById("settingsPanel");
let darken = document.getElementById("darken");

function init() {
    settingsTab.addEventListener("click", settingsPanelAction);
    for (let closeButton of document.getElementsByClassName("closeButton")) {
        closeButton.addEventListener("click", () => {
            settingsPanel.style.display = "none";
            darken.style.display = "none";
        });
    }
}

function settingsPanelAction() {
    if (darken.style.display === "none") {
        darken.style.display = "block";
        settingsPanel.style.display = "block";
    }
    else {
        darken.style.display = "none";
        settingsPanel.style.display = "none";
    }
}

init();