const API_URL = 'http://localhost:3000/students'

async function fetchId() {
    const res = await fetch(API_URL)

    const data = await res.json()
    const ids = []

    data.forEach(user => {
        ids.push(user.studentId)
    });

    checkLogged(ids)
}

fetchId()

async function checkLogged(userIds) {
    const ids = userIds
    
    for (let id of ids){
        const res = await fetch(`${API_URL}/${id}`)
        const data = await res.json();
        const studentsId = id

        if (data.isLogged){
            document.getElementById('name').innerText = data.profile.fullName;
            document.getElementById('major').innerText = data.profile.department;
            document.getElementById('birth-date').innerText = data.profile.birthDate;
            document.getElementById('advisor').innerText = data.profile.advisor;
            document.getElementById('student-email').innerText = data.profile.email;
            document.getElementById('student-id').innerText = data.studentId;
            document.getElementById('student-password').innerText = data.passwordHash;

            document.getElementById('logout').addEventListener('click', async () => {
                const res = await fetch(`${API_URL}/${studentsId}`, {
                    method: "PUT",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        isLogged: false
                    })
                })
                window.location.href = 'index.html'
            })
        }
    }
}













