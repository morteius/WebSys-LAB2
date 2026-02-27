console.log('📚 BLOG ARCHIVE LOADED');

let currentPosts = [];

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
            // FALLBACK DATE
            const startDate = new Date(2026, 1, 20);
            startDate.setDate(startDate.getDate() + (day - 1));
            date = startDate.toLocaleDateString('en-US', { 
                month: 'short', day: 'numeric', year: 'numeric' 
            });
        }
        
        // EXTRACT EXCERPT
        const introMatch = html.match(/<p class="blog-intro"[^>]*>(.*?)<\/p>/s);
        let excerpt = introMatch ? introMatch[1].replace(/<[^>]*>/g, '').trim() : '';
        if (excerpt.length > 120) {
            excerpt = excerpt.substring(0, 120) + '...';
        }
        
        // EXTRACT TAGS
        const tagsMatch = html.match(/<span><i class="fas fa-tag"><\/i> (.*?)<\/span>/);
        const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim()) : ['personal'];
        
        return {
            day,
            title,
            date,
            excerpt,
            tags,
            url: `${baseUrl}/${studentPath}/blog/day${day}.html`
        };
    } catch (error) {
        return null;
    }
}

async function loadBlogArchive(person) {
    console.log(`🔄 LOADING ${person.toUpperCase()} BLOG ARCHIVE...`);
    
    const archiveGrid = document.getElementById('archiveGrid');
    const statsDiv = document.getElementById('archiveStats');
    
    if (!archiveGrid) return;
    
    archiveGrid.innerHTML = '<div class="archive-loading"><i class="fas fa-spinner fa-spin"></i><p>LOADING POSTS...</p></div>';
    
    try {
        currentPosts = [];
        
        // SCAN UP TO 50 DAYS
        for (let day = 1; day <= 50; day++) {
            const post = await fetchBlogPost(person, day);
            if (post) {
                currentPosts.push(post);
                console.log(`✅ FOUND DAY ${day}`);
            } else {
                if (day > 1) break;
            }
        }
        
        // SORT BY DAY (NEWEST FIRST - HIGHEST DAY NUMBER)
        currentPosts.sort((a, b) => b.day - a.day);
        
        // UPDATE STATS
        if (statsDiv) {
            const totalPosts = currentPosts.length;
            const latestDate = currentPosts.length > 0 ? currentPosts[0].date : 'N/A';
            statsDiv.innerHTML = `
                <div class="stat-badge">
                    <i class="fas fa-book-open"></i>
                    <span>${totalPosts} POSTS</span>
                </div>
                <div class="stat-badge">
                    <i class="fas fa-calendar"></i>
                    <span>LATEST: ${latestDate}</span>
                </div>
            `;
        }
        
        renderArchive();
        
    } catch (error) {
        archiveGrid.innerHTML = `<div class="archive-loading"><i class="fas fa-exclamation-circle"></i><p>ERROR LOADING POSTS</p></div>`;
    }
}

function renderArchive() {
    const archiveGrid = document.getElementById('archiveGrid');
    if (!archiveGrid) return;
    
    if (currentPosts.length === 0) {
        archiveGrid.innerHTML = `<div class="archive-loading"><i class="fas fa-book-open"></i><p>NO POSTS YET</p></div>`;
        return;
    }
    
    archiveGrid.innerHTML = '';
    
    currentPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'archive-card';
        
        // FORMAT TAGS
        const tagsHtml = post.tags.map(tag => 
            `<span class="archive-tag">${tag}</span>`
        ).join('');
        
        card.innerHTML = `
            <div class="archive-card-header">
                <div class="archive-day">${post.day}</div>
                <div>
                    <div class="archive-date"><i class="fas fa-calendar"></i> ${post.date}</div>
                </div>
            </div>
            <div class="archive-card-body">
                <h3 class="archive-title">${post.title}</h3>
                <p class="archive-excerpt">${post.excerpt}</p>
                <div class="archive-tags">
                    ${tagsHtml}
                </div>
            </div>
            <div class="archive-card-footer">
                <a href="${post.url}" class="archive-read-btn">
                    READ DAY ${post.day} <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        archiveGrid.appendChild(card);
    });
}

// MAKE AVAILABLE GLOBALLY
window.loadBlogArchive = loadBlogArchive;