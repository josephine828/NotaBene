let settingsTab = document.getElementById("settingsTab");
let settingsPanel = document.getElementById("settingsPanel");
let darken = document.getElementById("darken");
let singleView = document.getElementById("singleView");
let multipleView = document.getElementById("multipleView");
let singleViewContainer = document.getElementById("singleViewContainer");
let multipleViewContainer = document.getElementById("multipleViewContainer");
let taskContainer = document.getElementById("taskContainer");
let quickAddTaskInput = document.getElementById("quickAddTaskInput");
let quickAddTaskButton = document.getElementById("quickAddTaskButton");
let noTaskMessage = document.getElementById("noTaskMessage");

let tempTaskArray = [];
let taskCounter = 0;

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
    document.getElementById("closeSettingsButton").addEventListener("click", () => {
        settingsPanel.style.display = "none";
        darken.style.display = "none";
    });
    quickAddTaskInput.addEventListener("keyup", (key) => {
        if (key.key === "Enter" && quickAddTaskInput.value !== "") {
            quickAddTask(quickAddTaskInput.value);
        }
    });
    quickAddTaskButton.addEventListener("click", () => {
        if (quickAddTaskInput.value !== "") {
            quickAddTask(quickAddTaskInput.value);
        }
    });
}

function quickAddTask(taskName) {
    quickAddTaskInput.value = "";
    noTaskMessage.style.display = "none";

    tempTaskArray.push({taskID: taskCounter, taskName: taskName, status: "incomplete"});
    console.log(tempTaskArray);

    let taskDiv = document.createElement("div");
    taskDiv.textContent = taskName;
    taskDiv.classList.add("task");
    taskDiv.setAttribute("id", taskCounter);

    let doneButton = document.createElement("button");
    doneButton.textContent = "\u2713";
    doneButton.classList.add("doneButton");
    doneButton.addEventListener("click", () => {
        doneButton.parentElement.classList.add("complete");
        tempTaskArray[parseInt(doneButton.parentElement.getAttribute("id"))].status = "complete";
    });

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", () => {
        deleteButton.parentElement.remove();
        tempTaskArray = tempTaskArray.filter((task) => {return task.taskID !== parseInt(deleteButton.parentElement.getAttribute("id"))});
    });

    taskCounter++;
    taskDiv.append(doneButton);
    taskDiv.append(deleteButton);
    taskContainer.append(taskDiv);
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