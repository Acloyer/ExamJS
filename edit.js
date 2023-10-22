const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("id");

const editTaskNameElement = document.getElementById("edit-task-name");
const editTaskColorElement = document.getElementById("edit-task-color");
const editTaskDescriptionElement = document.getElementById("edit-task-description");
// const editTaskDateElement = document.getElementById("edit-task-date");
const editTaskButton = document.getElementById("edit-task-button");

const returnButton = document.getElementById("return-button");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const task = tasks.find(task => task.id === Number(taskId));

//
// const editTaskDateInput = document.getElementById("edit-task-date");
// const editTaskDateSpan = document.getElementById("edit-task-date-span");

// editTaskDateSpan.textContent = task.time;

// editTaskDateInput.style.display = "none";

//

if (task) {
    editTaskNameElement.value = task.name;
    editTaskDescriptionElement.value = task.description;
    editTaskColorElement.value = task.color;
    // editTaskDateElement.value = task.date;
}

// editTaskButton.addEventListener("click", () => {
//     task.name = editTaskNameElement.value;
//     task.description = editTaskDescriptionElement.value;
//     task.date = editTaskDateElement.value;
    
//     const taskIndex = tasks.findIndex(t => t.id === Number(taskId));
//     tasks[taskIndex] = task;

//     localStorage.setItem("tasks", JSON.stringify(tasks));

//     window.location.href = "main.html";
// });

returnButton.addEventListener("click", () => {
    window.location.href = "main.html";
});


editTaskButton.addEventListener("click", () => {
    const newName = editTaskNameElement.value;
    const newDescription = editTaskDescriptionElement.value;
    const newColor = editTaskColorElement.value;
    // const newTime = editTaskDateElement.value; 

    // if (!newName || !newTime) {
    //     alert("Пожалуйста, заполните название и время.");
    //     return;
    // }

    // const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    // if (!timeRegex.test(newTime)) {
    //     return;
    // }
    if (newName !== "" && newDescription !== "" && newName !== " " && newDescription !== " ") {
        task.name = newName;
        task.description = newDescription;
        task.color = newColor;
        // task.time = newTime; 
    
        const taskIndex = tasks.findIndex(t => t.id === Number(taskId));
        tasks[taskIndex] = task;
    
        localStorage.setItem("tasks", JSON.stringify(tasks));
    
        window.location.href = "main.html";
    }
    else {
        alert("Введите название и описание.")
    }
});
