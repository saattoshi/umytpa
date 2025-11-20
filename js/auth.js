let btn = document.querySelector('#log-in');
const id = document.querySelector('#id')
const password = document.querySelector('#password')
console.log(btn);

async function getUser() {
    const res = await fetch('db.json')
    const data = await res.json()
    return data
}

const users = getUser();

function userList(users){
    for (const user of users){
        if (id.value === user.username && password.value === user.password){
            // window.location.href = "home.html";
            alert("Log in info correct")
        }else{
            alert("ID or Password is incorrect")
        }
    }
}


// btn.addEventListener('click', userList(users))