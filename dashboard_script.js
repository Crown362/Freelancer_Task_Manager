// import "./auth.js";

// const { createElement } = require("react");

const logout = document.getElementById("logout");
const openForm = document.getElementById("task");
const taskForm = document.getElementById("addTask");
const closeForm = document.getElementById("close-btn");
const submitForm = document.getElementById("formSubmit");
const displayTask = document.getElementById("todos");
const addTaskForm = document.getElementById("formTask");

logout.addEventListener("click", logoutFunc);
openForm.addEventListener("click",showTask);
closeForm.addEventListener("click",closeTask);
submitForm.addEventListener("click", submitTask)
// let taskValue="";

function logoutFunc(e){
 e.preventDefault();
//  localStorage.clear();
localStorage.removeItem("loginData");
window.location.href ="index.html";
}

function showTask(){
    // console.log("task clicked");
    taskForm.classList.add("showForm");
}

function closeTask(){
    taskForm.classList.remove("showForm");
    
}

function submitTask(e){
    try{
    e.preventDefault();
    closeTask();
    let taskValue = addTaskForm.value;
    // console.log(taskValue);
    
    let p = document.createElement("p");
    p.textContent = taskValue;
    // displayTask.innerHTML = p;
    displayTask.appendChild(p);
    // displayTask.innerHTML=`<p>${taskValue}</p>`;
    addTaskForm.value = ""

    }catch(error){
        console.log(error);
    }
}