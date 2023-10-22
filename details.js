const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("id");

const taskNameElement = document.getElementById("details-task-name");
const taskDescriptionElement = document.getElementById("details-task-description");
const taskDateElement = document.getElementById("details-task-date");
const taskColorElement = document.getElementById("details-task-color");

const returnButton = document.getElementById("return-button");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const task = tasks.find(task => task.id === Number(taskId));

if (task) { // ну тип если нашел задачу то ок
    taskNameElement.textContent = task.name;
    taskDescriptionElement.textContent = task.description;
    taskDateElement.textContent = task.date;
    taskColorElement.textContent = task.color;
} else {
    window.location.href = "error.html"; // просто перекинет на ошибку если нет id 
    // taskNameElement.textContent = "Задача не найдена.";
    // taskDescriptionElement.textContent = "";
    // taskDateElement.textContent = "xx.xx.xxxx xx:xx:xx";
}

returnButton.addEventListener("click", () => {
    window.location.href = "main.html"; 
});
