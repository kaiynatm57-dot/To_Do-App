let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
function addTask() {
    let input = document.getElementById("taskInput");
    if(input.value.trim() === "") return;

    let task = {
        id: Date.now(),
        text: input.value,
        createdDate: new Date().toLocaleDateString(),
        status: "pending",
        completedDate: null
    };

    tasks.push(task);
    saveTasks();
    input.value = "";
    renderTasks();
}

// Render tasks
function renderTasks(){
    let container = document.getElementById("taskContainer");
    container.innerHTML = "";

    let grouped = {};
    tasks.forEach(task => {
        if(!grouped[task.createdDate]) grouped[task.createdDate] = [];
        grouped[task.createdDate].push(task);
    });

    for(let date in grouped){
        let dateTitle = document.createElement("h3");
        dateTitle.innerText = date;
        dateTitle.style.color = "#2193b0";
        dateTitle.style.fontSize = "18px";
        dateTitle.style.textAlign = "center";
        container.appendChild(dateTitle);

        grouped[date].forEach(task => {
            let div = document.createElement("div");
            div.className = "task";
            div.draggable = true;
            div.dataset.id = task.id;

            div.innerHTML = `
                <span class="drag">&#x2630;</span>
                <span>${task.text}</span>
                <button onclick="completeTask(${task.id})">&#x2714;</button>
                <button onclick="editTask(${task.id})">&#x270E;</button>
                <button onclick="deleteTask(${task.id})">&#x1F5D1;</button>
            `;
            container.appendChild(div);
        });
    }
}

// Delete task
function deleteTask(id){
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Edit task
function editTask(id){
    let task = tasks.find(t => t.id === id);
    let newText = prompt("Edit Task", task.text);
    if(newText){
        task.text = newText;
        saveTasks();
        renderTasks();
    }
}

// Complete task
function completeTask(id){
    let task = tasks.find(t => t.id === id);
    task.status = "completed";
    task.completedDate = new Date().toLocaleDateString();
    saveTasks();
    renderTasks();
}

// Drag and drop
let draggedTask = null;

// Drag start
document.addEventListener("dragstart", function(e){
    if(e.target.classList.contains("task")){
        draggedTask = e.target;
    }
});

// Allow drop
document.addEventListener("dragover", function(e){
    e.preventDefault();
});

// Drop event
document.addEventListener("drop", function(e){
    if(e.target.classList.contains("task")){
        let container = document.getElementById("taskContainer");

        container.insertBefore(draggedTask, e.target);

        updateTaskOrder();
    }
});
// Update task order after drag and drop
function updateTaskOrder(){

    let taskElements = document.querySelectorAll(".task");
    let newTasks = [];

    taskElements.forEach(element => {

        let id = Number(element.dataset.id);

        let task = tasks.find(t => t.id === id);

        newTasks.push(task);

    });

    tasks = newTasks;

    saveTasks();
}

// On load
window.onload = function(){
    renderTasks();
}