let settingsTab = document.getElementById("settingsTab");
let settingsPanel = document.getElementById("settingsPanel");
let darken = document.getElementById("darken");

$(document).ready(function() {
    $('.js-example-basic-single').select2();
});

function init() {
    settingsTab.addEventListener("click", settingsPanelAction);
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