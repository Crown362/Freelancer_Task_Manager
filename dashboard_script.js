// import "./auth.js";

const logout = document.getElementById("logout");
logout.addEventListener("click", logoutFunc);

function logoutFunc(e){
 e.preventDefault();
//  localStorage.clear();
localStorage.removeItem("loginData");
}