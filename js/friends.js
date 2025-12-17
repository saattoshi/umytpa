const API_URL = 'http://localhost:3000/students'

async function fecthFriends() {
    const res = await fetch(API_URL)

    const students = await res.json()

    const loggedStudent = students.find(s => s.isLogged == true)

    DisplayFriends(loggedStudent.friends);
}

const friendList = document.querySelector('.friends-list')

async function DisplayFriends(friends) {
    friends.forEach(friend => {
        const div = document.createElement('div')
        div.classList.add('friend-item')
        div.innerHTML = `
            <div class="friend-avatar"></div>
            <span class="friend-name">${friend.fullname}</span>
            <button class="friend-menu" onclick=showActive()>...</button>
        `
        friendList.appendChild(div)

    });
}

function showActive(){
    document.querySelector()
}
fecthFriends()