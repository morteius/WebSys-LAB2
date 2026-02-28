// AUTO UPDATE COPYRIGHT YEAR
document.addEventListener('DOMContentLoaded', function() {
    const yearElements = document.querySelectorAll('.copyright-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    console.log('© COPYRIGHT YEAR UPDATED TO', currentYear);
});