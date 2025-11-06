table = document.querySelectorAll('.cell-btn')
let title = ""
let colour = ""
let selectedCell

table.forEach(cell => {
    cell.addEventListener('click', () => {
        selectedCell = cell
        const eventAdder = document.getElementById('eventAdder')
        eventAdder.classList.add('.active')
        eventAdder.classList.remove('hidden')

    })
});

function color(bgColor){
    const colorhex = bgColor.replace("#", "")

    const r = parseInt(colorhex.substring(0,2), 16);
    const g = parseInt(colorhex.substring(2,4), 16);
    const b = parseInt(colorhex.substring(4,6), 16);

    const lumina = (0.299 * r + 0.587 * g + 0.114 * b);

    if (lumina > 150){
        return true
    }else{
        return false
    }
}

document.getElementById('save').addEventListener('click', () => {
    title = document.getElementById('title').value;
    colour = document.getElementById('color').value

    selectedCell.style.backgroundColor = colour;
    selectedCell.innerHTML = `<h2>${title}</h2>`

    if (color(colour)){
        selectedCell.style.color = '#000';
    }else{
        selectedCell.style.color = '#fff';
    }

    eventAdder.classList.add('hidden')
})

document.getElementById('discard').addEventListener('click', () => {
    const eventAdder = document.getElementById('eventAdder')
    selectedCell.style.backgroundColor = '#f9f9f9'
    selectedCell.innerHTML = `<h2></h2>`
    eventAdder.classList.add('hidden')
})