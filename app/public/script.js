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
let addTaskMenu = document.getElementById("addTaskMenu");
let editTaskMenu = document.getElementById("editTaskMenu");
let listSelect = document.getElementById("listSelect");
let categorySelect = document.getElementById("categorySelect");
let addListButton = document.getElementById("addListButton");
let addCategoryButton = document.getElementById("addCategoryButton");
let sortSelect = document.getElementById("sortSelect");

let tempTaskArray = [];
let tempShownTasks = [];
let tempListArray = [];
let tempCategoryArray = [];
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
    for (let closeButton of document.getElementsByClassName("closeButton")) {
        closeButton.addEventListener("click", () => {
            settingsPanel.style.display = "none";
            addTaskMenu.style.display = "none";
            editTaskMenu.style.display = "none";
            darken.style.display = "none";
        });
    }
    document.getElementById("addTaskButton").addEventListener("click", () => {
        addTaskMenu.style.display = "block";
        darken.style.display = "block";
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
    listInput.addEventListener("keyup", (key) => {
        if (key.key === "Enter" && addList.value !== "") {
            addList(listInput.value);
            loadListOptions();
        }
    });
    addListButton.addEventListener("click", () => {
        if (addList.value !== "") {
            addList(listInput.value);
            loadListOptions();
        }
    });
    categoryInput.addEventListener("keyup", (key) => {
        if (key.key === "Enter" && categoryInput.value !== "") {
            addCategory(categoryInput.value);
            loadCategoryOptions();
        }
    });
    addCategoryButton.addEventListener("click", () => {
        if (categoryInput.value !== "") {
            addCategory(categoryInput.value);
            loadCategoryOptions();
        }
    });
    document.getElementById("addTaskMenuButton").addEventListener("click", () => {
        addTask();
    });

    sortSelect.addEventListener("change", sortTasks);
}

function quickAddTask(taskName) {
    if (tempTaskArray.includes(taskName)) {
        alert("You already have a task with that name!")
    }
    else {
        taskCounter++;
        quickAddTaskInput.value = "";
        noTaskMessage.style.display = "none";
        let tempTask = {taskID: taskCounter, taskName: taskName, status: "incomplete", taskDescription: "", dueDate: null, list: "", categories: [], modified: new Date()};
        tempTaskArray.push(tempTask);
        tempShownTasks.push(tempTask);
        addTaskToList(tempTask);
    }
}

function addTaskToList(taskObject) {
    let taskName = taskObject.taskName;
    let taskDiv = document.createElement("div");
    taskDiv.textContent = taskName;
    taskDiv.classList.add("task");
    taskDiv.setAttribute("taskID", taskCounter);
    taskDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        editTaskMenu.style.display = "block";
        darken.style.display = "block";
    });

    let doneButton = document.createElement("button");
    doneButton.textContent = "\u2713";
    doneButton.classList.add("doneButton");
    doneButton.addEventListener("click", (e) => {
        e.stopPropagation();
        if (doneButton.parentElement.classList.contains("complete")) {
            doneButton.parentElement.classList.remove("complete");
            tempTaskArray[parseInt(doneButton.parentElement.getAttribute("taskID")) - 1].status = "incomplete";
        }
        else {
            doneButton.parentElement.classList.add("complete");
            tempTaskArray[parseInt(doneButton.parentElement.getAttribute("taskID")) - 1].status = "complete";
        }
    });

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteButton.parentElement.remove();
        tempTaskArray = tempTaskArray.filter((task) => {return task.taskID !== parseInt(deleteButton.parentElement.getAttribute("taskID"))});
    });
    
    taskDiv.append(doneButton);
    taskDiv.append(deleteButton);
    taskContainer.append(taskDiv);
}

function loadListOptions() {
    if (tempListArray.length === 0) {
        listSelect.textContent = "There are currently no lists to add the task to. Add a new list below!";
    }
    else {
        listSelect.textContent = "";
        for (let listOption of tempListArray) {
            let div = document.createElement("div");
            div.textContent = listOption;
            div.addEventListener("click", () => {
                if (document.getElementsByClassName("selectedList").length > 0 && !div.classList.contains("selectedList")) {
                    alert("You can only select one list!");
                }
                else {
                    if (div.classList.contains("selectedList")) {
                        div.classList.remove("selectedList");
                    }
                    else {
                        div.classList.add("selectedList");
                    }
                }
            });
            listSelect.append(div);
        }
    }
}

function loadCategoryOptions() {
    if (tempCategoryArray.length === 0) {
        categorySelect.textContent = "There are currently no categories to add the task to.";
    }
    else {
        categorySelect.textContent = "";
        for (let categoryOption of tempCategoryArray) {
            let div = document.createElement("div");
            div.textContent = categoryOption;
            div.addEventListener("click", () => {
                if (div.classList.contains("selectedCategory")) {
                    div.classList.remove("selectedCategory");
                }
                else {
                    div.classList.add("selectedCategory");
                }
            });
            categorySelect.append(div);
        }
    }
}

function addList(listName) {
    listInput.value = "";
    if (!tempListArray.includes(listName)) {
        tempListArray.push(listName);
        updateListLegends();
    }
    else {
        alert("You already have that list!");
    }
}

function addCategory(categoryName) {
    categoryInput.value = "";
    if (!tempCategoryArray.includes(categoryName)) {
        tempCategoryArray.push(categoryName);
        updateCategoryLegend();
    }
    else {
        alert("You already have that category!");
    }
}

let taskNameInput = document.getElementById("taskNameInput");
let taskDescriptionInput = document.getElementById("taskDescriptionInput");
let dueDateInput = document.getElementById("dueDateInput");
let listInput = document.getElementById("listInput");
let categoryInput = document.getElementById("categoryInput");

function addTask() {
    if (taskNameInput.value === "") {
        alert("You cannot leave the task name blank!");
    }
    else {
        taskCounter++;
        noTaskMessage.style.display = "none";
        let selectedListElement = document.getElementsByClassName("selectedList")[0];
        let selectedList = "";
        if (selectedListElement !== undefined) {
            selectedList = selectedListElement.textContent;
        }
        let selectedCategoryElements = document.getElementsByClassName("selectedCategory");
        let selectedCategories = [];
        for (let selectedCategoryElement of selectedCategoryElements) {
            selectedCategories.push(selectedCategoryElement.textContent);
        }
        let tempTask = {taskID: taskCounter, taskName: taskNameInput.value, status: "incomplete", taskDescription: taskDescriptionInput.value, dueDate: dueDateInput.value, list: selectedList, categories: selectedCategories, modified: new Date()};
        tempTaskArray.push(tempTask);
        tempShownTasks.push(tempTask);
        addTaskToList(tempTask);

        for (let listElement of document.getElementsByClassName("selectedList")) {
            listElement.classList.remove("selectedList");
        }
        for (let categoryElement of document.getElementsByClassName("selectedCategory")) {
            categoryElement.classList.remove("selectedCategory");
        }
        taskNameInput.value = "";
        taskDescriptionInput.value = "";
        dueDateInput.value = "";
        listInput.value = "";
        categoryInput.value = "";
        addTaskMenu.style.display = "none";
        darken.style.display = "none";
    }
}

let listsLegend = document.getElementById("listsLegend");
let categoriesLegend = document.getElementById("categoriesLegend");

function updateListLegends() {
    if (tempListArray.length > 0) {
        listsLegend.textContent = "";
        for (let tempList of tempListArray) {
            let div = document.createElement("div");
            div.textContent = tempList;
            div.addEventListener("click", () => {
                if (div.classList.contains("selectedListLegend")) {
                    div.classList.remove("selectedListLegend");
                }
                else {
                    div.classList.add("selectedListLegend");
                }
                loadFilteredTasks();
            });
            listsLegend.append(div);
        }
    }
    else {
        listsLegend.textContent = "No Lists";
    }
}

function updateCategoryLegend() {
    categoriesLegend.textContent = "";
    if (tempCategoryArray.length > 0) {
        for (let tempCategory of tempCategoryArray) {
            let div = document.createElement("div");
            div.textContent = tempCategory;
            div.addEventListener("click", () => {
                if (div.classList.contains("selectedCategoryLegend")) {
                    div.classList.remove("selectedCategoryLegend");
                }
                else {
                    div.classList.add("selectedCategoryLegend");
                    console.log("added");
                }
                loadFilteredTasks();
            });
            categoriesLegend.append(div);
        }
    }
    else {
        categoriesLegend.textContent = "No Categories";
    }
}

function loadFilteredTasks() {
    taskContainer.textContent = "";
    tempShownTasks = [];
    let selectedListElements = document.getElementsByClassName("selectedListLegend");
    let selectedLists = [];
    for (let selectedListElement of selectedListElements) {
        selectedLists.push(selectedListElement.textContent);
    }
    let selectedCategoryElements = document.getElementsByClassName("selectedCategoryLegend");
    let selectedCategories = [];
    for (let selectedCategoryElement of selectedCategoryElements) {
        selectedCategories.push(selectedCategoryElement.textContent);
    }
    if (selectedLists.length === 0 && selectedCategories.length === 0) {
        tempShownTasks = tempTaskArray;
    }
    else {
        for (let task of tempTaskArray) {
            console.log(task);
            if (selectedLists.length > 0 && selectedLists.includes(task.list) && !tempShownTasks.includes(task)) {
                tempShownTasks.push(task);
            }
            if (selectedCategories.length > 0) {
                for (let category of task.categories) {
                    if (selectedCategories.includes(category) && !tempShownTasks.includes(task)) {
                        tempShownTasks.push(task);
                    }
                }
            }
        }
    }
    for (let task of tempShownTasks) {
        addTaskToList(task);
    }
}

function sortTasks() {
    switch (sortSelect.value) {
        case ("dueSooner"):
            let tempNoDueDate = tempShownTasks.filter((task) => {return task.dueDate === null});
            tempShownTasks = tempShownTasks.filter((task) => {return task.dueDate !== null});
            tempShownTasks.sort(function(a, b) {
                const x = new Date(a.dueDate).getTime();
                const y = new Date(b.dueDate).getTime();
                if (x > y) {
                    return 1;
                }
                if (x < y) {
                    return -1;
                }
                return 0;
            });
            tempShownTasks = tempShownTasks.concat(tempNoDueDate);
            break;
        case ("dueLater"):
            tempShownTasks.sort(function(a, b) {
                const x = new Date(a.dueDate).getTime();
                const y = new Date(b.dueDate).getTime();
                if (x > y) {
                    return -1;
                }
                if (x < y) {
                    return 1;
                }
                return 0;
            });
            break;
        case ("mostRecent"):
            tempShownTasks.sort(function(a, b) {
                const x = new Date(a.modified).getTime();
                const y = new Date(b.modified).getTime();
                if (x > y) {
                    return -1;
                }
                if (x < y) {
                    return 1;
                }
                return 0;
            });
            break;
        case ("leastRecent"):
            tempShownTasks.sort(function(a, b) {
                const x = new Date(a.modified).getTime();
                const y = new Date(b.modified).getTime();
                if (x > y) {
                    return 1;
                }
                if (x < y) {
                    return -1;
                }
                return 0;
            });
            break;
        case ("aToZ"):
            tempShownTasks.sort(function(a, b) {
                const x = a.taskName.toLowerCase();
                const y = b.taskName.toLowerCase();
                if (x > y) {
                    return 1;
                }
                if (x < y) {
                    return -1;
                }
                return 0;
            });
            break;
        case ("zToA"):
            tempShownTasks.sort(function(a, b) {
                const x = a.taskName.toLowerCase();
                const y = b.taskName.toLowerCase();
                if (x > y) {
                    return -1;
                }
                if (x < y) {
                    return 1;
                }
                return 0;
            });
            break;
        case ("list"):
            let tempNoList = tempShownTasks.filter((task) => {return task.list === ""});
            tempShownTasks = tempShownTasks.filter((task) => {return task.list !== ""});
            tempShownTasks.sort(function(a, b) {
                const x = a.list.toLowerCase();
                const y = b.list.toLowerCase();
                if (x > y) {
                    return 1;
                }
                if (x < y) {
                    return -1;
                }
                return 0;
            });
            tempShownTasks = tempShownTasks.concat(tempNoList);
            break;
    }
    taskContainer.textContent = "";
    for (let task of tempShownTasks) {
        addTaskToList(task);
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