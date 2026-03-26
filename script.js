const login = document.getElementById("loginSubmit");
const userName = document.getElementById("username");
const password = document.getElementById("password");
login.addEventListener("submit",validateLogin);

async function validateLogin(){
    let user = userName.value;
    let pass = password.value;
    if(user==="" || pass===""){
        alert("all field required");
    }else{
        const data = await fetch("http://localhost:3000/users");
        const result = await data.json();

        const foundUser = result.find((u)=> u.username===user && u.password=== pass);
        if(foundUser){
            alert("password authndicated")
        }else{
            alert("wrong user name and password");
        }
    }
}