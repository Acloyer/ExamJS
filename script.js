class Task {
    constructor(id, name, description, date, color, completed) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.completed = completed;
        this.color = color;
    }
}

class TasksManager {
    constructor() {
        this.tasks = this.loadTasksFromLocalStorage(); // Загружаем задачи из localStorage
        this.idCounter = this.calculateIdCounter();
    }

    loadTasksFromLocalStorage() { // получаем таски из локаола
        const tasksData = localStorage.getItem("tasks"); // получаем весь список тасков
        if (tasksData) {
            try {
                const parsedTasks = JSON.parse(tasksData);
                if (Array.isArray(parsedTasks)) {
                    return parsedTasks;
                }
            } catch (error) {
                console.error("Ошибка при загрузке задач из localStorage:", error);
            }
        }
        return [];
    }

    calculateIdCounter() {
        const maxId = this.tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
        return maxId + 1;
    }

    saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    addTask(name, description, date, color) {
        if (!name || !date) {
            return false;
        }
        const task = new Task(this.idCounter++, name, description, date, color, false);
        this.tasks.push(task);
        this.saveTasksToLocalStorage(); // после добавления сохраттьбб
        return true;
    }

    editTask(id, name, description, date) {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            return false; //  задаич неит
        }
        task.name = name;
        task.description = description;
        task.date = date;
        this.saveTasksToLocalStorage(); // после редакта сохраттьбб
        return true;
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1) {
            return false; //  задаич неит
        }
        this.tasks.splice(index, 1);
        this.saveTasksToLocalStorage(); // после удаление сохраттьбб
        return true;
    }

    toggleTaskStatus(id) {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            return false; // задаич неит
        }
        task.completed = !task.completed;
        this.saveTasksToLocalStorage(); // сохранение
        return true;
    }

    filterTasks(status) {
        if (status === 'all') {
            return this.tasks;
        } else if (status === 'completed') {
            return this.tasks.filter(task => task.completed);
        } else if (status === 'incomplete') {
            return this.tasks.filter(task => !task.completed);
        }
    }

    sortTasks(sortBy) {
        if (sortBy === 'name') {
            return this.tasks.slice().sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'date') {
            return this.tasks.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    }
}

const tasksManager = new TasksManager();

// начало
// начало
// начало

document.getElementById("add-task").addEventListener("click", () => {
    const name = document.getElementById("task-name").value;
    const description = document.getElementById("task-description").value;
    const color = document.getElementById("task-color").value;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} ${currentDate.toLocaleTimeString("ru-RU")}`;

    if (tasksManager.addTask(name, description, formattedDate, color)) {
        if(name !== "" && description !== ""){
            document.getElementById("task-name").value = "";
            document.getElementById("task-description").value = "";
            updateTaskList();
        }
        else{
            alert("Введите пожалуйста название и описание.");
        }
    }
    else{
        alert("Введите пожалуйста название и описание.");
    }
});
updateTaskList();

// конец
// конец
// конец


document.getElementById("filter-select").addEventListener("change", updateTaskList);
document.getElementById("sort-select").addEventListener("change", updateTaskList);

updateTaskList();

// --------------------------------------------------------------------------------------

function goToEditPage(taskId) {
    window.location.href = `edit.html?id=${taskId}`;
}

function goToDetailsPage(taskId) {
    window.location.href = `details.html?id=${taskId}`;
}

function updateTaskList() {
    const filterSelect = document.getElementById("filter-select");
    const sortSelect = document.getElementById("sort-select");

    const filteredTasks = tasksManager.filterTasks(filterSelect.value);
    const sortedTasks = tasksManager.sortTasks(sortSelect.value);

    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";

    sortedTasks.forEach(task => {
        if (filteredTasks.includes(task)) {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task");
            if (task.completed) {
                taskElement.classList.add("completed");
            }
            taskElement.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} id="task-${task.id}">
                <label style="color: ${task.color || 'black'}" for="task-${task.id}">${task.name}</label>
                <button class="edit-button" data-id="${task.id}">Редактировать</button>
                <button class="delete-button" data-id="${task.id}">Удалить</button>
                <button class="details-button" data-id="${task.id}">Подробнее</button>
            `;

            taskElement.querySelector("input").addEventListener("change", (event) => {
                tasksManager.toggleTaskStatus(task.id);
                updateTaskList();
            });

            taskElement.querySelector(".edit-button").addEventListener("click", (event) => {
                const taskId = event.target.getAttribute("data-id");
                goToEditPage(taskId);
            });

            taskElement.querySelector(".details-button").addEventListener("click", (event) => {
                const taskId = event.target.getAttribute("data-id");
                goToDetailsPage(taskId);
            });

            taskElement.querySelector(".delete-button").addEventListener("click", (event) => {
                const taskId = event.target.getAttribute("data-id");
                if (confirm("Вы уверены, что хотите удалить эту задачу?")) {
                    if (tasksManager.deleteTask(Number(taskId))) {
                        alert("Задача успешно удалена.");
                    } else {
                        alert("Ошибка при удалении задачи.");
                    }
                    updateTaskList();
                }
            });

            taskList.appendChild(taskElement);
        }
    });
}

updateTaskList();