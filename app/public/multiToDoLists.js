import {tempTaskArray, tempShownTasks, tempListArray, tempCategoryArray, taskCounter, currentID} from "./singleToDoList.js";
import {incrementCounter, setTempTaskArray, setTempShownTasks, setTempListArray, setTempCategoryArray, setCurrentID} from "./singleToDoList.js";

let darken = document.getElementById("darken");
let multipleView = document.getElementById("multipleView");
let listsContainer = document.getElementById("listsContainer");

function init() {
    loadLists();
    multipleView.addEventListener("click", () => {
        loadLists();
    });
    document.getElementById("saveTaskEditMenuButton").addEventListener("click", (event) => {
        loadLists();
    });
}

export function loadLists() {
    if (tempListArray.length === 0) {
        listsContainer.textContent = "You currently have no lists.";
    }
    else {
        listsContainer.textContent = "";
        for (let list of tempListArray) {
            let div = document.createElement("div");
            let h2 = document.createElement("h2");
            h2.textContent = list;
            div.classList.add("multiListContainer");
            let quickAdd = document.createElement("div");
            quickAdd.classList.add("quickAddTaskContainer");
            let taskContainer = document.createElement("div");
            taskContainer.classList.add("multiTaskContainer");
            updateList(taskContainer, list);

            let input = document.createElement("input");
            input.classList.add("quickAddTaskInput");
            input.placeholder = "Enter new task";
            input.addEventListener("keyup", (key) => {
                if (key.key === "Enter" && input.value !== "") {
                    quickAddTask(input.value, list, input.parentElement.previousElementSibling);
                    input.value = "";
                }
            });
            let button = document.createElement("button");
            button.classList.add("quickAddTaskButton");
            button.textContent = "+";
            button.addEventListener("click", () => {
                if (input.value !== "") {
                    quickAddTask(input.value, list, input.parentElement.previousElementSibling);
                    input.value = "";
                }
            });
            quickAdd.append(input);
            quickAdd.append(button);
            listsContainer.append(div);
            div.append(h2);
            div.append(taskContainer);
            div.append(quickAdd);
        }
    }
}

function quickAddTask(taskName, list, container) {
    if (tempTaskArray.includes(taskName)) {
        alert("You already have a task with that name!")
    }
    else {
        incrementCounter();
        quickAddTaskInput.value = "";
        let tempTask = {taskID: taskCounter, taskName: taskName, status: "incomplete", taskDescription: "", dueDate: null, list: list, categories: [], modified: new Date()};
        tempTaskArray.push(tempTask);
        tempShownTasks.push(tempTask);
        addTaskToList(tempTask, container);
    }
}

function addTaskToList(taskObject, taskContainer) {
    let taskDiv = document.createElement("div");
    taskDiv.textContent = taskObject.taskName;
    taskDiv.setAttribute("id", `taskID${taskObject.taskID}`); 
    taskDiv.classList.add("task");
    taskDiv.classList.add(`${taskObject.list}item`);
    if (taskObject.status === "complete") {
        taskDiv.classList.add("complete");
    }
    taskDiv.setAttribute("taskID", taskObject.taskID);
    taskDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        setCurrentID(taskObject.taskID);
        taskNameEditInput.value = taskObject.taskName;
        taskDescriptionEditInput.value = taskObject.taskDescription;
        dueDateEditInput.value = taskObject.dueDate;
        if (taskObject.list !== "") {
            document.getElementById(`listID${taskObject.list}`).classList.add("selectedList");
        }
        if (taskObject.categories.length > 0) {
            for (let category of taskObject.categories) {
                document.getElementById(`catID${category}`).classList.add("selectedCategory");
            }
        }
        editTaskMenu.style.display = "block";
        darken.style.display = "block";
    });

    let doneButton = document.createElement("button");
    doneButton.textContent = "\u2713";
    doneButton.classList.add("doneButton");
    doneButton.addEventListener("click", (e) => {
        e.stopPropagation();
        let tempID = tempTaskArray.findIndex(task => task.taskID === taskObject.taskID);
        if (doneButton.parentElement.classList.contains("complete")) {
            doneButton.parentElement.classList.remove("complete");
            tempTaskArray[tempID].status = "incomplete";
        }
        else {
            tempTaskArray[tempID].status = "complete";
        }
        updateList(taskContainer, taskObject.list);
    });

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteButton.parentElement.remove();
        deleteTask(taskObject.taskID);
    });
    
    taskDiv.append(doneButton);
    taskDiv.append(deleteButton);
    taskContainer.append(taskDiv);
}

function updateList(taskContainer, list) {
    const tasks = document.getElementsByClassName(`${list}item`);
    while (tasks.length > 0) {
        tasks[0].parentNode.removeChild(tasks[0]);
    }
    let completedTasks = tempShownTasks.filter(task => {return task.status === "complete" && task.list === list});
    let tasksInList = tempShownTasks.filter(task => {return task.status !== "complete" && task.list === list});
    tasksInList = tasksInList.concat(completedTasks);
    for (let task of tasksInList) {
        addTaskToList(task, taskContainer);
    }
}

function deleteTask(id) {
    setTempTaskArray(tempTaskArray.filter((task) => {return task.taskID !== id}));
    setTempShownTasks(tempShownTasks.filter((task) => {return task.taskID !== id}));
    loadLists();
    editTaskMenu.style.display = "none";
    darken.style.display = "none";
    setCurrentID(0);
}

init();