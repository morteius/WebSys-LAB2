// SIDEBAR FUNCTIONALITY
function showSidebar() {
    document.getElementById('sidebar').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// CLOSE SIDEBAR WHEN CLICKING OUTSIDE
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        const sidebar = document.getElementById('sidebar');
        const menuButton = document.querySelector('.menu-button');
        
        if (sidebar?.classList.contains('active') && 
            !sidebar.contains(event.target) && 
            !menuButton?.contains(event.target)) {
            hideSidebar();
        }
    });
});

// SCROLL INDICATOR (if used)
window.addEventListener('scroll', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
});