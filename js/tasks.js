const API_URL = 'http://localhost:3000/students';

async function fetchLogged() {
    const res = await fetch(API_URL)

    const data = await res.json()
    for (user of data){
        if (user.isLogged){
            getTasks(user)
        }
    }
}

fetchLogged()

const container = document.querySelector('.to-dos')

async function getTasks(user) {
    const loggedUser = user
    const tasks = user.tasks

    for (let task of tasks){

        const div = document.createElement('div')
        div.classList.add('assignment')
        div.innerHTML = `
            <h3>${task.title}</h3>
            <div class="complete-bar ${
                task.isCompleted ? 
                `done`
                : 
                `not-done`
            }"></div>
        `
        container.appendChild(div)
    }
}


const addWindow = document.getElementById('add-window')
const windowDiscard = document.getElementById('window-discard')
const winodwSave = document.getElementById('window-save')

async function showTaskHolder() {
    addWindow.classList.remove('hidden')
    addWindow.classList.add('active')
}

async function addTask() {
    const title = document.getElementById('task-add')

    const newTask = document.createElement('div')
    newTask.classList.add('assignment')
    newTask.innerHTML = `
        <h3>${title.value}</h3>
        <div class="complete-bar in-progress"></div>
    `

    const res = await fetch(API_URL)

    const data = await res.json()
    for (user of data){
        if (user.isLogged){
            const await2 = fetch(`${API_URL}/${user.studentId}`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: `task_${(user.tasks.length)}`,
                    title: title.value,
                    isCompleted: null
                })
            })
        }
    }

    container.appendChild(newTask)
    title.value = ''
    addWindow.classList.add('hidden')
    addWindow.classList.remove('active')

}

function discardTask(){
    addWindow.classList.add('hidden')
    addWindow.classList.remove('active')
}
document.querySelector('#new-assignment').addEventListener('click', showTaskHolder)

winodwSave.addEventListener('click', addTask)

windowDiscard.addEventListener('click', discardTask)