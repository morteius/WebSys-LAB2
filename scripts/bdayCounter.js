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

function calculateAge(birthMonth, birthDay, birthYear) {
    const today = new Date();
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

function updateBirthdayCounters() {
    try {
        const cjBirthMonth = 12;
        const cjBirthDay = 18;
        
        const elaineBirthMonth = 9;
        const elaineBirthDay = 14;
        
        const cjDays = calculateDaysUntilBirthday(cjBirthMonth, cjBirthDay);
        const elaineDays = calculateDaysUntilBirthday(elaineBirthMonth, elaineBirthDay);
        
        const cjCounterElements = document.querySelectorAll('.cj-bday-counter');
        const elaineCounterElements = document.querySelectorAll('.elaine-bday-counter');
        
        cjCounterElements.forEach(el => {
            el.textContent = cjDays;
        });
        
        elaineCounterElements.forEach(el => {
            el.textContent = elaineDays;
        });
        
        // Update ages
        const elaineAge = calculateAge(9, 14, 2005);
        const cjAge = calculateAge(12, 18, 2005);
        
        const elaineAgeElements = document.querySelectorAll('.elaine-age');
        const cjAgeElements = document.querySelectorAll('.cj-age');
        
        elaineAgeElements.forEach(el => {
            el.textContent = elaineAge;
        });
        
        cjAgeElements.forEach(el => {
            el.textContent = cjAge;
        });
        
    } catch (error) {
        console.error('Birthday counter error:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateBirthdayCounters();
});

window.forceBdayUpdate = updateBirthdayCounters;