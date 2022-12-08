let settingsTab = document.getElementById("settingsTab");
let settingsPanel = document.getElementById("settingsPanel");
let darken = document.getElementById("darken");
let singleView = document.getElementById("singleView");
let multipleView = document.getElementById("multipleView");
let singleViewContainer = document.getElementById("singleViewContainer");
let multipleViewContainer = document.getElementById("multipleViewContainer");

function init() {
    settingsTab.addEventListener("click", settingsPanelAction);
    singleView.addEventListener("click", () => {
        multipleView.className = "";
        singleView.className = "selectedView";
        singleViewContainer.style.display = "block";
        multipleViewContainer.style.display = "none";
    });
    multipleView.addEventListener("click", () => {
        singleView.className = "";
        multipleView.className = "selectedView";
        multipleViewContainer.style.display = "block";
        singleViewContainer.style.display = "none";
    });
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