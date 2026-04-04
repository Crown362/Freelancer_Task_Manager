const logoutButton = document.getElementById("logout");
const openTaskButton = document.getElementById("task");
const taskModal = document.getElementById("addTask");
const closeTaskButton = document.getElementById("close-btn");
const taskSubmitButton = document.getElementById("formSubmit");
const taskListContainer = document.getElementById("todos");
const taskInputField = document.getElementById("formTask");
const addInprogress = document.getElementById("addIn");


logoutButton.addEventListener("click", handleLogout);
openTaskButton.addEventListener("click", openTaskModal);
closeTaskButton.addEventListener("click", closeTaskModal);
taskSubmitButton.addEventListener("click", handleTaskSubmit);
// addInprogress.addEventListener("click", inProgressFunc);

// function inProgressFunc{

// }

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
    try {
        e.preventDefault();
        closeTaskModal();

        const taskValue = taskInputField.value;
        if(taskValue.trim()===""){
            return;
        }
        let id = Date.now();
        console.log(id)
        const taskObj={
            id:id,
            value:taskValue
        }
        let localTask = JSON.parse(localStorage.getItem("task"))||[];
        localTask.push(taskObj);
        localStorage.setItem("task",JSON.stringify(localTask));
       const taskElement = document.createElement("p");
       taskElement.dataset.id=id;
       const addButton = document.createElement("span");
       addButton.textContent = "+";
       addButton.classList.add("addIn");
        taskElement.textContent =taskValue; 
        taskElement.appendChild(addButton);
        taskListContainer.appendChild(taskElement);
        taskInputField.value = "";
    } catch (error) {
        console.error(error);
    }
}   
//onScreen load show the localstorage value
 window.addEventListener("DOMContentLoaded",loadDatafromLocalStorage)
function loadDatafromLocalStorage(){
        // taskListContainer.textContent="";
        let localTask = JSON.parse(localStorage.getItem("task"))||[];
        localTask.forEach(element => {
            const taskElement = document.createElement("p");
            taskElement.dataset.id=element.id;
            taskElement.textContent = element.value;
            //first set the text and then only append the button
            const addButton = document.createElement("span");
            addButton.textContent = "+";
            addButton.classList.add("addIn"); 
            taskElement.appendChild(addButton);
            taskListContainer.appendChild(taskElement);
        });
    } 