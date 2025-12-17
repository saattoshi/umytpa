document.addEventListener('DOMContentLoaded', () => {
    const dayDateEls = Array.from(document.querySelectorAll('.week-header .day-date'));
    if (!dayDateEls.length) return;

    const toLocalISO = (dateObj) => {
        const y = dateObj.getFullYear();
        const m = String(dateObj.getMonth() + 1).padStart(2, '0');
        const d = String(dateObj.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayIso = toLocalISO(today);

    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday
    const mondayOffset = (dayOfWeek + 6) % 7; // convert so Monday is 0

    const monday = new Date(today);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(today.getDate() - mondayOffset);

    let todayIndex = null;

    dayDateEls.forEach((el, idx) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + idx);
        const iso = toLocalISO(d);
        el.textContent = d.getDate().toString().padStart(2, '0');
        el.setAttribute('data-date', iso);
        if (iso === todayIso) {
            todayIndex = idx;
        }
    });

    if (todayIndex !== null) {
        const todayEl = dayDateEls[todayIndex];
        todayEl.style.background = 'linear-gradient(135deg, #1E2151, #2A2F7A)';        todayEl.style.color = '#fff';
        todayEl.style.borderColor = '#1E2151';
        todayEl.style.boxShadow = '0 4px 10px rgba(30, 33, 81, 0.4)';
    }
});

