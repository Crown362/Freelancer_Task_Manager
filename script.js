const login = document.getElementById("loginSubmit");
const userName = document.getElementById("username");
const password = document.getElementById("password");

let isLogin;
if(login){
    login.addEventListener("submit",validateLogin);
}
async function validateLogin(e){
    e.preventDefault();

    let user = userName.value;
    let pass = password.value;
    if(user==="" || pass===""){
        alert("all field required");
    }else{
        const now = new Date().getTime();
        const expiryTime=now+(60*5*1000);
        try{
             const data = await fetch("http://localhost:3000/users");
        const result = await data.json();
         const foundUser = result.find((u)=> u.username===user && u.password=== pass);
        if(foundUser){
            // alert("password authndicated");
            localStorage.setItem("loginData",JSON.stringify({
                isLogin :true,
                expiry:expiryTime,
                userName:user
            }));
            window.location.href="dashboard.html"
        }else{
            alert("wrong user name and password");
        }
        }catch(e){
            console.error(e)
        }
    }
}