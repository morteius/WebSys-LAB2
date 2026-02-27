console.log('📚 BLOG ARCHIVE LOADED');

let currentPosts = [];
let filteredPosts = [];

async function fetchBlogPost(student, day) {
    try {
        const baseUrl = '/WebSys-LAB2';
        const studentPath = student === 'cj' ? 'student2_cj' : 'student1_elaine';
        const url = `${baseUrl}/${studentPath}/blog/day${day}.html`;
        
        const response = await fetch(url);
        if (!response.ok) return null;
        
        const html = await response.text();
        
        // EXTRACT TITLE
        const titleMatch = html.match(/<h1[^>]*>Day \d+: (.*?)<\/h1>/);
        const title = titleMatch ? titleMatch[1].trim() : `Day ${day}`;
        
        // EXTRACT DATE
        const dateMatch = html.match(/<span><i class="fas fa-calendar"><\/i> (.*?)<\/span>/);
        let date = 'UNKNOWN';
        if (dateMatch) {
            date = dateMatch[1].trim();
        } else {
            const startDate = new Date(2026, 1, 20);
            startDate.setDate(startDate.getDate() + (day - 1));
            date = startDate.toLocaleDateString('en-US', { 
                month: 'short', day: 'numeric', year: 'numeric' 
            });
        }
        
        return {
            day,
            title,
            date,
            url: `${baseUrl}/${studentPath}/blog/day${day}.html`
        };
    } catch (error) {
        return null;
    }
}

async function loadBlogArchive(person) {
    console.log(`🔄 SCANNING ${person.toUpperCase()} BLOG ARCHIVE...`);
    
    const archiveList = document.getElementById('archiveList');
    const postCountSpan = document.getElementById('postCount');
    const latestDateSpan = document.getElementById('latestDate');
    
    if (!archiveList) return;
    
    archiveList.innerHTML = '<div class="archive-loading"><i class="fas fa-spinner fa-spin"></i><p>SCANNING MEMORIES...</p></div>';
    
    try {
        currentPosts = [];
        let day = 1;
        let consecutiveMisses = 0;
        const MAX_MISSES = 3; // STOP AFTER 3 MISSES IN A ROW
        
        // SCAN FOREVER UNTIL WE FIND 3 MISSES IN A ROW
        while (consecutiveMisses < MAX_MISSES) {
            const post = await fetchBlogPost(person, day);
            if (post) {
                currentPosts.push(post);
                console.log(`✅ FOUND DAY ${day}`);
                consecutiveMisses = 0; // RESET MISS COUNTER
            } else {
                consecutiveMisses++;
                console.log(`❌ MISSING DAY ${day} (${consecutiveMisses}/${MAX_MISSES})`);
            }
            day++;
            
            // SAFETY BREAK AFTER 9999 DAYS (ABOUT 27 YEARS)
            if (day > 9999999) break;
        }
        
        // SORT BY DAY (NEWEST FIRST)
        currentPosts.sort((a, b) => b.day - a.day);
        filteredPosts = [...currentPosts];
        
        // UPDATE STATS
        if (postCountSpan) {
            postCountSpan.textContent = currentPosts.length;
        }
        if (latestDateSpan && currentPosts.length > 0) {
            latestDateSpan.textContent = currentPosts[0].date;
        }
        
        renderArchiveList();
        
    } catch (error) {
        archiveList.innerHTML = `<div class="archive-loading"><i class="fas fa-exclamation-circle"></i><p>ERROR LOADING POSTS</p></div>`;
    }
}

function renderArchiveList() {
    const archiveList = document.getElementById('archiveList');
    if (!archiveList) return;
    
    if (filteredPosts.length === 0) {
        archiveList.innerHTML = `<div class="archive-loading"><i class="fas fa-book-open"></i><p>NO POSTS YET</p></div>`;
        return;
    }
    
    archiveList.innerHTML = '';
    
    filteredPosts.forEach(post => {
        const item = document.createElement('a');
        item.href = post.url;
        item.className = 'archive-list-item';
        
        item.innerHTML = `
            <div class="archive-day-badge">${post.day}</div>
            <div class="archive-item-content">
                <div class="archive-item-title">Day ${post.day}: ${post.title}</div>
                <div class="archive-item-meta">
                    <span><i class="fas fa-calendar"></i> ${post.date}</span>
                </div>
            </div>
            <div class="archive-item-arrow"><i class="fas fa-chevron-right"></i></div>
        `;
        
        archiveList.appendChild(item);
    });
}

// SEARCH FUNCTIONALITY
function setupSearch() {
    const searchInput = document.getElementById('searchPosts');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        
        if (term === '') {
            filteredPosts = [...currentPosts];
        } else {
            filteredPosts = currentPosts.filter(post => 
                post.title.toLowerCase().includes(term) ||
                `day ${post.day}`.includes(term) ||
                post.date.toLowerCase().includes(term)
            );
        }
        
        renderArchiveList();
    });
}

// MAKE AVAILABLE GLOBALLY
window.loadBlogArchive = loadBlogArchive;
window.setupSearch = setupSearch;