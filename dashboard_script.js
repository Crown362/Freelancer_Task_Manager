const logoutButton = document.getElementById("logout");
const openTaskButton = document.getElementById("task");
const taskModal = document.getElementById("addTask");
const closeTaskButton = document.getElementById("close-btn");
const taskSubmitButton = document.getElementById("formSubmit");
const taskListContainer = document.getElementById("todos");
const taskInputField = document.getElementById("formTask");
const inprogressContainer = document.getElementById("inProgress");
const doneContainer = document.getElementById("done");
// const addInprogress = document.querySelectorAll(".addIn");


logoutButton.addEventListener("click", handleLogout);
openTaskButton.addEventListener("click", openTaskModal);
closeTaskButton.addEventListener("click", closeTaskModal);
taskSubmitButton.addEventListener("click", handleTaskSubmit);

document.addEventListener("click", function (e) {
        let localTask = JSON.parse(localStorage.getItem("task")) || [];
        let inprogressTask = JSON.parse(localStorage.getItem("inTask")) || [];
        let doneTask = JSON.parse(localStorage.getItem("completedTask"))||[];
    if (e.target.classList.contains("addIn")) {
        const taskId = e.target.dataset.id;
        // find the task
        const selectedTask = localTask.find(task => task.id == taskId);
        if (selectedTask) {
            inprogressTask.push(selectedTask);
            // remove from localTask
            localTask = localTask.filter(task => task.id != taskId);
              e.target.parentElement.remove();
              reloadDisplay();
        }
    }else if(e.target.classList.contains("moveIn")){
        const taskId = e.target.dataset.id;
        const completedTask = inprogressTask.find(t => t.id == taskId);
        if(completedTask){
            doneTask.push(completedTask);
            inprogressTask = inprogressTask.filter(t =>t.id != taskId);
            e.target.parentElement.remove();
            reloadDisplay();
        }
    }
      // update storage
            localStorage.setItem("task", JSON.stringify(localTask));
            localStorage.setItem("inTask", JSON.stringify(inprogressTask));
            localStorage.setItem("completedTask",JSON.stringify(doneTask));
});

function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("loginData");
    window.location.href = "index.html";
}

function openTaskModal() {
    taskModal.classList.add("showForm");
}

function closeTaskModal() {
    taskModal.classList.remove("showForm");
}

function handleTaskSubmit(e) {
    // try {
        e.preventDefault();
        closeTaskModal();
        const taskValue = taskInputField.value;
        if(taskValue.trim()===""){return;}
        let id = Date.now();
        console.log(id)
        const taskObj={
            id:id,
            value:taskValue
        }
        let localTask = JSON.parse(localStorage.getItem("task"))||[];
        localTask.push(taskObj);
        localStorage.setItem("task",JSON.stringify(localTask));
        reloadDisplay();
        taskInputField.value = "";
    // } catch (error) {
    //     console.error(error);
    // }
}   
//onScreen load show the localstorage value
 window.addEventListener("DOMContentLoaded",loadDatafromLocalStorage)
function loadDatafromLocalStorage(){
        // taskListContainer.textContent="";
        let localTask = JSON.parse(localStorage.getItem("task"))||[];
        let inprogressTask = JSON.parse(localStorage.getItem("inTask")) || [];
        let doneTask = JSON.parse(localStorage.getItem("completedTask"))||[];

        localTask.forEach(element => {
            const el = createTaskElement(element.value, element.id, "+","addIn");
            taskListContainer.appendChild(el);
        });
        inprogressTask.forEach(element=>{
           const elProgress = createTaskElement(element.value, element.id, "*","moveIn");
            inprogressContainer.appendChild(elProgress);
        });
        doneTask.forEach(element=>{
            const elCompleted = createTaskElement(element.value,element.id,"-","comIn");
            doneContainer.appendChild(elCompleted);
        })

    } 
function createTaskElement(value,id,symbol,className){
     const p = document.createElement("p");
    p.textContent = value;

    const btn = document.createElement("span");
    btn.textContent = symbol; // ← difference handled here
    btn.classList.add(className);
    btn.dataset.id = id;

    p.appendChild(btn);
    return p;
}
function reloadDisplay(){
    location.reload();
}