const API_URL = 'http://localhost:3000/students'
async function fetchUsers() {
    const res = await fetch(API_URL)
    const students = await res.json()
    return students
}


export async function Authentification() {
    const id = document.getElementById('id').value
    const password = document.getElementById('password').value
    const Users = await fetchUsers();
    
    const found = Users.find(user => user.studentId === id && user.passwordHash === password);
    if (!found){
        alert('Id or Password is incorrect')
        return null
    }
    await makeLogged(id)
    window.location.href = 'home.html'
    return found
}

async function makeLogged(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isLogged: true
        })
    })

    console.log(res);
}

document.querySelector('button').addEventListener('click', Authentification)