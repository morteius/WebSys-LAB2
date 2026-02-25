function calculateDaysUntilBirthday(birthMonth, birthDay) {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    let birthdayThisYear = new Date(currentYear, birthMonth - 1, birthDay);
    
    if (today > birthdayThisYear) {
        birthdayThisYear = new Date(currentYear + 1, birthMonth - 1, birthDay);
    }
    
    const diffTime = birthdayThisYear - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
}

function updateBirthdayCounters() {
    const cjBirthMonth = 12;
    const cjBirthDay = 18;
    
    const elaineBirthMonth = 9;
    const elaineBirthDay = 14;
    
    const cjDays = calculateDaysUntilBirthday(cjBirthMonth, cjBirthDay);
    const elaineDays = calculateDaysUntilBirthday(elaineBirthMonth, elaineBirthDay);
    
    const cjCounterElements = document.querySelectorAll('.cj-bday-counter');
    cjCounterElements.forEach(el => {
        el.textContent = cjDays;
    });
    
    const elaineCounterElements = document.querySelectorAll('.elaine-bday-counter');
    elaineCounterElements.forEach(el => {
        el.textContent = elaineDays;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateBirthdayCounters();
});

window.forceBdayUpdate = updateBirthdayCounters;