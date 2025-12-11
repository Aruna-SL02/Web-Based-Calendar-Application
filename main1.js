const monthYearElemant = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const previousElement = document.getElementById('previous');
const nextElement = document.getElementById('next');

let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 0);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    monthYearElemant.textContent = monthYearString;

    let datesHTML = '';

    for (let i = firstDayIndex; i > 0; i--) {
        const previousDate = new Date(currentYear, currentMonth, 0 - i + 1);
        datesHTML += `<div class="dates inactive">${previousDate.getDate()}</div>`;
    }

    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
        const poyaClass = isPoyaDay(date) ? 'poya' : '';
        const dayOfWeek = date.getDay();
        const dayClass = (dayOfWeek === 6) ? 'saturday' : (dayOfWeek === 0) ? 'sunday' : '';
        datesHTML += `<div class="dates ${activeClass} ${poyaClass} ${dayClass}">${i}</div>`;
    }
    

    datesElement.innerHTML = datesHTML;
}

function isPoyaDay(date) {
    const month = date.getMonth();
    const dayOfMonth = date.getDate();
     const poyaDays = [
        [25], // January (0)
        [23], // February (1)
        [24], // March (2)
        [23], // Aprail (3)
        [23,24], // May (4)
        [21], // June (5)
        [20], // July (6)
        [19], // August (7)
        [17], // September (8)
        [17], // October (9)
        [15], // November (10)
        [14], // December (11)
    ];

    return poyaDays[month].includes(dayOfMonth);
     
}

previousElement.addEventListener(
    'click', () => {
        previousElement.classList.add('pressed');
        setTimeout(() => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar();
            previousElement.classList.remove('pressed');
        }, 100);
    }
)

nextElement.addEventListener(
    'click', () => {
        nextElement.classList.add('pressed');
        setTimeout(() => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar();
            nextElement.classList.remove('pressed');
        }, 100);
    }
)

updateCalendar();
