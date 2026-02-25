document.addEventListener('DOMContentLoaded', function() {
    console.log('TEST SCRIPT LOADED');
    
    const list = document.querySelector('.recent-group:first-child .recent-list');
    if (list) {
        list.innerHTML = '<div class="recent-item">TEST WORKING</div>';
        console.log('List updated!');
    } else {
        console.log('List not found!');
    }
});