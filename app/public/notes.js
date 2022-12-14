let createNoteButton = document.getElementById("createNoteButton");
let addGroupInputs = document.getElementsByClassName("addGroupInput");
let addGroupButtons = document.getElementsByClassName("addGroupButton");
let editNoteButton = document.getElementById("editNoteButton");
let notesGroupsContainer = document.getElementById("notesGroupsContainer");
let notesDisplay = document.getElementById("notesDisplay");

let createNotesMenu = document.getElementById("createNotesMenu");
let noteNameInput = document.getElementById("noteNameInput");
let notesContent = document.getElementById("notesContent");
let groupSelect = document.getElementById("groupSelect");
let addNoteButton = document.getElementById("addNoteButton");

let editNoteMenu = document.getElementById("editNoteMenu");
let noteNameEditInput = document.getElementById("noteNameEditInput");
let notesEditContent = document.getElementById("notesEditContent");
let groupEditSelect = document.getElementById("groupEditSelect");
let saveNoteButton = document.getElementById("saveNoteButton");
let deleteNoteEditMenuButton = document.getElementById("deleteNoteEditMenuButton");

let tempNotesArray = localStorage.getItem('tempNotesArray') ? JSON.parse(localStorage.getItem('tempNotesArray')) : [];
let tempGroupsArray = localStorage.getItem('tempGroupsArray') ? JSON.parse(localStorage.getItem('tempGroupsArray')) : [];
let notesCounter = parseInt(localStorage.getItem('notesCounter')) || 0;
let currentNoteID = parseInt(localStorage.getItem('currentNoteID')) || 0;

function init() {
    loadNotesAndGroups();
    for (let closeButton of document.getElementsByClassName("closeButton")) {
        closeButton.addEventListener("click", () => {
            createNotesMenu.style.display = "none";
            editNoteMenu.style.display = "none";
        });
    }
    createNoteButton.addEventListener("click", () => {
            createNotesMenu.style.display = "block";
            darken.style.display = "block";
    });
    for (let addGroupInput of addGroupInputs) {
        addGroupInput.addEventListener("keyup", (key) => {
            if (key.key === "Enter" && addGroupInput.value !== "") {
                addGroup(addGroupInput.value);
                addGroupInput.value = "";
                loadNotesAndGroups();
            }
        });
    }
    for (let addGroupButton of addGroupButtons) {
        addGroupButton.addEventListener("click", () => {
            if (addGroupButton.previousElementSibling.value !== "") {
                addGroup(addGroupButton.previousElementSibling.value);
                addGroupButton.previousElementSibling.value = "";
                loadNotesAndGroups();
            }
        });
    }
    addNoteButton.addEventListener("click", addNote);
    editNoteButton.addEventListener("click", editMode);
    saveNoteButton.addEventListener("click", saveNote);
    deleteNoteEditMenuButton.addEventListener("click", deleteNote);
}

function loadNotesAndGroups() {
    notesDisplay.textContent = "Select a note to view it here.";
    if (tempNotesArray.length === 0 && tempGroupsArray.length === 0) {
        notesGroupsContainer.textContent = "You currently do not have any notes or groups.";
    }
    else {
        notesGroupsContainer.textContent = "";
        for (let group of tempGroupsArray) {
            let div = document.createElement("div");
            div.textContent = group;
            div.classList.add("groupContainer");
            div.classList.add("expandGroup");
            loadNotesInGroup(group, div);
            div.addEventListener("click", (e) => {
                e.stopPropagation();
                if (div.classList.contains("expandGroup")) {
                    div.classList.remove("expandGroup");
                    for (let child of div.children) {
                        child.style.display = "none";
                    }
                }
                else {
                    div.classList.add("expandGroup");
                    for (let child of div.children) {
                        child.style.display = "block";
                    }
                }
            });
            notesGroupsContainer.append(div);
        }
        let notesWithNoGroup = tempNotesArray.filter(notes => {return notes.group === ""});
        for (let note of notesWithNoGroup) {
            let div = document.createElement("div");
            div.textContent = note.noteName;
            div.addEventListener("click", (e) => {
                e.stopPropagation();
                if (div.classList.contains("selectedNote")) {
                    div.classList.remove("selectedNote");
                    notesDisplay.textContent = "Select a note to view it here.";
                    editNoteButton.style.display = "none";
                    currentNoteID = 0;
                    localStorage.setItem("currentNoteID", currentNoteID);
                }
                else {
                    if (document.getElementsByClassName("selectedNote")[0]) {
                        document.getElementsByClassName("selectedNote")[0].classList.remove("selectedNote");
                    }
                    div.classList.add("selectedNote");
                    let line = note.notesContent.split("\n");
                    notesDisplay.textContent = line[0] + "\r\n";
                    for (let i = 1; i < line.length; i++) {
                        notesDisplay.textContent += (line[i] + "\r\n");
                    }
                    editNoteButton.style.display = "block";
                    currentNoteID = note.noteID;
                    localStorage.setItem("currentNoteID", currentNoteID);
                }
            });
            notesGroupsContainer.append(div);
        }
    }
}

function loadNotesInGroup(groupName, groupContainer) {
    let notesInGroup = tempNotesArray.filter(notes => {return notes.group === groupName});
    for (let note of notesInGroup) {
        let div = document.createElement("div");
        div.textContent = note.noteName;
        div.classList.add("noteInGroup");
        div.addEventListener("click", (e) => {
            e.stopPropagation();
            if (div.classList.contains("selectedNote")) {
                div.classList.remove("selectedNote");
                notesDisplay.textContent = "Select a note to view it here.";
                editNoteButton.style.display = "none";
                currentNoteID = 0;
                localStorage.setItem("currentNoteID", currentNoteID);
            }
            else {
                if (document.getElementsByClassName("selectedNote")[0]) {
                    document.getElementsByClassName("selectedNote")[0].classList.remove("selectedNote");
                }
                div.classList.add("selectedNote");
                let line = note.notesContent.split("\n");
                notesDisplay.textContent = line[0] + "\r\n";
                for (let i = 1; i < line.length; i++) {
                    notesDisplay.textContent += (line[i] + "\r\n");
                }
                editNoteButton.style.display = "block";
                currentNoteID = note.noteID;
                localStorage.setItem("currentNoteID", currentNoteID);
            }
        });
        groupContainer.append(div);
    }
}

function addGroup(groupName) {
    if (!tempGroupsArray.includes(groupName)) {
        tempGroupsArray.push(groupName);
        localStorage.setItem("tempGroupsArray", JSON.stringify(tempGroupsArray));
        loadGroupSelect();
    }
    else {
        alert("You already have that group!");
    }
}

function loadGroupSelect() {
    if (tempGroupsArray.length === 0) {
        groupSelect.textContent = "There are currently no groups to add the note to. Add a new group below!";
        groupEditSelect.textContent = "There are currently no groups to add the note to. Add a new group below!";
    }
    else {
        groupSelect.textContent = "";
        groupEditSelect.textContent = "";
    }
    for (let group of tempGroupsArray) {
        let div = document.createElement("div");
        div.textContent = group;
        div.addEventListener("click", () => {
            if (document.getElementsByClassName("selectedGroup").length > 0 && !div.classList.contains("selectedGroup")) {
                alert("You can only select one group!");
            }
            else {
                if (div.classList.contains("selectedGroup")) {
                    div.classList.remove("selectedGroup");
                }
                else {
                    div.classList.add("selectedGroup");
                }
            }
        });
        let editDiv = document.createElement("div");
        editDiv.textContent = group;
        editDiv.setAttribute("id", `groupID${group}`);
        editDiv.addEventListener("click", () => {
            if (document.getElementsByClassName("selectedGroup").length > 0 && !editDiv.classList.contains("selectedGroup")) {
                alert("You can only select one group!");
            }
            else {
                if (editDiv.classList.contains("selectedGroup")) {
                    editDiv.classList.remove("selectedGroup");
                }
                else {
                    editDiv.classList.add("selectedGroup");
                }
            }
        });
        groupSelect.append(div);
        groupEditSelect.append(editDiv)
    }
}

function addNote() {
    if (noteNameInput.value === "") {
        alert("You cannot leave the note name blank!");
    }
    else {
        notesCounter++;
        localStorage.setItem("notesCounter", notesCounter);
        let selectedGroupElement = document.getElementsByClassName("selectedGroup")[0];
        let selectedGroup = "";
        if (selectedGroupElement !== undefined) {
            selectedGroup = selectedGroupElement.textContent;
        }
        let tempNote = {noteID: notesCounter, noteName: noteNameInput.value, notesContent: notesContent.value, group: selectedGroup, modified: new Date()};
        tempNotesArray.push(tempNote);
        localStorage.setItem("tempNotesArray", JSON.stringify(tempNotesArray));
        loadNotesAndGroups();
        createNotesMenu.style.display = "none";
        darken.style.display = "none";
        clearFields();
    }
}

function editMode() {
    let note = tempNotesArray[tempNotesArray.findIndex(note => note.noteID === currentNoteID)];
    noteNameEditInput.value = note.noteName;
    notesEditContent.value = note.notesContent;
    if (note.group !== "") {
        document.getElementById(`groupID${note.group}`).classList.add("selectedGroup");
    }
    editNoteMenu.style.display = "block";
    darken.style.display = "block";
}

function saveNote() {
    if (noteNameEditInput.value === "") {
        alert("You cannot leave the note name blank!");
    }
    else {
        let selectedGroupElement = document.getElementsByClassName("selectedGroup")[0];
        let selectedGroup = "";
        if (selectedGroupElement !== undefined) {
            selectedGroup = selectedGroupElement.textContent;
        }
        let tempNote = {noteID: currentNoteID, noteName: noteNameEditInput.value, notesContent: notesEditContent.value, group: selectedGroup, modified: new Date()};
        tempNotesArray = tempNotesArray.filter(note => {return note.noteID !== currentNoteID});
        tempNotesArray.push(tempNote);
        localStorage.setItem("tempNotesArray", JSON.stringify(tempNotesArray));
        loadNotesAndGroups();
        editNoteMenu.style.display = "none";
        darken.style.display = "none";
        clearFields();
    }
}

function deleteNote() {
    tempNotesArray = tempNotesArray.filter(note => {return note.noteID !== currentNoteID});
    localStorage.setItem("tempNotesArray", JSON.stringify(tempNotesArray));
    loadNotesAndGroups();
    editNoteMenu.style.display = "none";
    darken.style.display = "none";
    clearFields();
}

function clearFields() {
    noteNameInput.value = "";
    notesContent.value = "";
    noteNameEditInput.value = "";
    notesEditContent.value = "";


    for (let group of document.getElementsByClassName("selectedGroup")) {
        group.classList.remove("selectedGroup");
    }
}
init();