document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.querySelector(".task-list");
    const tasksHistory = loadTasksHistoryFromLocalStorage();

    if (tasksHistory.length > 0) {
        tasksHistory.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    } else {
        taskList.textContent = "История задач пуста.";
    }
});

function loadTasksHistoryFromLocalStorage() {
    const tasksHistoryData = localStorage.getItem("historyTasks");
    return tasksHistoryData ? JSON.parse(tasksHistoryData) : [];
}

function createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
        <div class="task-name">${task.name}</div>
        <div class="task-description">${task.description}</div>
        <div class="task-date">${task.date}</div>
    `;
    return taskElement;
}
