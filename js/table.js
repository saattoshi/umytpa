const table = document.querySelector('.timetable');
const eventAdder = document.getElementById('eventAdder');
const titleInput = document.getElementById('title');
const colorInput = document.getElementById('color');
const saveBtn = document.getElementById('save');
const discardBtn = document.getElementById('discard');

const STORAGE_KEY = 'umytpa_schedule_cells';

function addWeekGridToTable() {
    for (let i = 0; i < 24; i++) {
        const div = document.createElement('div');
        div.classList.add('week-grid');
        const timeSlot = document.createElement('div');
        timeSlot.classList.add('time-slot');
        timeSlot.innerHTML = `${
            i < 10
            ?  `0${i}:00`
            : `${i}:00`
        }`;
        table.appendChild(timeSlot);
        table.appendChild(div);
    }

    const weekGrid = document.querySelectorAll('.week-grid');

    weekGrid.forEach(week => {
        for (let i = 0; i < 7; i++) {
            const btn = document.createElement('button');
            btn.classList.add('cell', 'cell-btn');
            week.appendChild(btn);
        }
    });
}
addWeekGridToTable();

const cells = Array.from(document.querySelectorAll('.cell-btn'));
let selectedCellIndex = null;

function colorIsLight(bgColor) {
    const colorhex = bgColor.replace("#", "");
    const r = parseInt(colorhex.substring(0,2), 16);
    const g = parseInt(colorhex.substring(2,4), 16);
    const b = parseInt(colorhex.substring(4,6), 16);
    const lumina = (0.299 * r + 0.587 * g + 0.114 * b);
    return lumina > 150;
}

function loadSchedule() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    const data = JSON.parse(stored);
    cells.forEach((cell, idx) => {
        const item = data[idx];
        if (item && item.title) {
            applyCellData(cell, item.title, item.color);
        }
    });
}

function persistSchedule() {
    const data = cells.map(cell => ({
        title: cell.dataset.title || '',
        color: cell.dataset.color || ''
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function applyCellData(cell, title, color) {
    cell.dataset.title = title;
    cell.dataset.color = color;
    cell.style.backgroundColor = color || '#f9f9f9';
    cell.innerHTML = title ? `<h2>${title}</h2>` : `<h2></h2>`;
    if (color) {
        cell.style.color = colorIsLight(color) ? '#000' : '#fff';
    } else {
        cell.style.color = '#1e2151';
    }
}

cells.forEach((cell, idx) => {
    cell.dataset.index = idx;
    cell.addEventListener('click', () => {
        selectedCellIndex = idx;
        const rect = cell.getBoundingClientRect();
        eventAdder.style.top = `${rect.top + window.scrollY}px`;
        eventAdder.style.left = `${rect.left + window.scrollX}px`;
        titleInput.value = cell.dataset.title || '';
        colorInput.value = cell.dataset.color || '#6b8aa8';
        eventAdder.classList.remove('hidden');
        eventAdder.classList.add('active');
    });
});

saveBtn.addEventListener('click', () => {
    if (selectedCellIndex === null) return;
    const chosenTitle = titleInput.value.trim();
    const chosenColor = colorInput.value || '#6b8aa8';
    const cell = cells[selectedCellIndex];
    applyCellData(cell, chosenTitle, chosenColor);
    persistSchedule();
    eventAdder.classList.add('hidden');
    eventAdder.classList.remove('active');
    titleInput.value = '';
});

discardBtn.addEventListener('click', () => {
    if (selectedCellIndex === null) return;
    const cell = cells[selectedCellIndex];
    applyCellData(cell, '', '');
    persistSchedule();
    eventAdder.classList.add('hidden');
    eventAdder.classList.remove('active');
    titleInput.value = '';
});

loadSchedule();