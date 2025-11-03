table = document.querySelectorAll('.cell-btn')
let title = ""
let color = ""
let selectedCell

table.forEach(cell => {
    cell.addEventListener('click', () => {
        selectedCell = cell
        const eventAdder = document.getElementById('eventAdder')
        eventAdder.classList.remove('hidden')

    })
});

document.getElementById('save').addEventListener('click', () => {
    title = document.getElementById('title').value;
    color = document.getElementById('color').value


    selectedCell.style.backgroundColor = color;
    selectedCell.innerHTML = `<h2>${title}</h2>`

    eventAdder.classList.add('hidden')
})