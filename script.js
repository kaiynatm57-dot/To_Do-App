let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
//save task
function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}
//Add task
function addTask(){
    let input=document.getElementById("taskInput");
    if(input.value.trim()==="") return;
    let task={
        id:Date.now(),
        text:input.value,
        createdDate:new Date().toLocaleDateString(),
        status:"pending",
        completedDate:null,
    };
    tasks.push(task);
    saveTasks();
    input.value="";
    renderTasks();
}
//Render/ Display task
function renderTasks(){
    let container=document.getElementById("taskcontainer");
    container.innerHTML="";
    let grouped={};
    tasks.forEach(task => {
        if(!grouped[tasks.createdDate]) grouped[task.createdDate]=[];
        grouped[task.createdDate].push(task)
        
    });
}
