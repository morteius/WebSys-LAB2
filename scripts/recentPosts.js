console.log('📝 RECENT POSTS LOADED');

async function updateRecentPosts() {
    console.log('🔄 UPDATING...');
    
    const baseUrl = '/WebSys-LAB2';
    
    const isHome = !window.location.pathname.includes('student2_cj') && !window.location.pathname.includes('student1_elaine');
    const isCJ = window.location.pathname.includes('student2_cj');
    const isElaine = window.location.pathname.includes('student1_elaine');
    
    const cjPosts = [];
    const elainePosts = [];
    
    // GET CJ'S POSTS
    for (let day = 1; day <= 10; day++) {
        try {
            const url = `${baseUrl}/pages/student2_cj/blog/day${day}.html`;
            const res = await fetch(url);
            if (!res.ok) break;
            const html = await res.text();
            
            // GET TITLE
            const titleMatch = html.match(/<h1[^>]*>Day \d+: (.*?)<\/h1>/);
            const title = titleMatch ? titleMatch[1].trim() : `Day ${day}`;
            
            // GET INTRO TEXT
            let excerpt = '';
            const introMatch = html.match(/<p class="blog-intro"[^>]*>(.*?)<\/p>/s);
            if (introMatch && introMatch[1]) {
                excerpt = introMatch[1].replace(/<[^>]*>/g, '').trim();
            }
            
            // FALLBACK TO FIRST PARAGRAPH
            if (!excerpt) {
                const firstPMatch = html.match(/<div class="blog-post-body">.*?<p>(.*?)<\/p>/s);
                if (firstPMatch && firstPMatch[1]) {
                    excerpt = firstPMatch[1].replace(/<[^>]*>/g, '').trim();
                }
            }
            
            // TRUNCATE
            excerpt = excerpt.substring(0, 100) + (excerpt.length > 100 ? '...' : '');
            
            // GET DATE
            const dateMatch = html.match(/<span><i class="fas fa-calendar"><\/i> (.*?)<\/span>/);
            const date = dateMatch ? dateMatch[1].trim() : `February ${19 + day}, 2026`;
            
            cjPosts.push({ day, title, excerpt, date });
            console.log(`✅ FOUND CJ DAY ${day}`);
        } catch (e) { 
            break; 
        }
    }
    
    // GET ELAINE'S POSTS
    for (let day = 1; day <= 10; day++) {
        try {
            const url = `${baseUrl}/pages/student1_elaine/blog/day${day}.html`;
            const res = await fetch(url);
            if (!res.ok) break;
            const html = await res.text();
            
            // GET TITLE
            const titleMatch = html.match(/<h1[^>]*>Day \d+: (.*?)<\/h1>/);
            const title = titleMatch ? titleMatch[1].trim() : `Day ${day}`;
            
            // GET INTRO TEXT
            let excerpt = '';
            const introMatch = html.match(/<p class="blog-intro"[^>]*>(.*?)<\/p>/s);
            if (introMatch && introMatch[1]) {
                excerpt = introMatch[1].replace(/<[^>]*>/g, '').trim();
            }
            
            // FALLBACK TO FIRST PARAGRAPH
            if (!excerpt) {
                const firstPMatch = html.match(/<div class="blog-post-body">.*?<p>(.*?)<\/p>/s);
                if (firstPMatch && firstPMatch[1]) {
                    excerpt = firstPMatch[1].replace(/<[^>]*>/g, '').trim();
                }
            }
            
            // TRUNCATE
            excerpt = excerpt.substring(0, 100) + (excerpt.length > 100 ? '...' : '');
            
            // GET DATE
            const dateMatch = html.match(/<span><i class="fas fa-calendar"><\/i> (.*?)<\/span>/);
            const date = dateMatch ? dateMatch[1].trim() : `February ${19 + day}, 2026`;
            
            elainePosts.push({ day, title, excerpt, date });
            console.log(`✅ FOUND ELAINE DAY ${day}`);
        } catch (e) { 
            break; 
        }
    }
    
    // SORT BY NEWEST FIRST
    cjPosts.sort((a,b) => b.day - a.day);
    elainePosts.sort((a,b) => b.day - a.day);
    
    console.log(`📊 FOUND ${cjPosts.length} CJ, ${elainePosts.length} ELAINE`);
    
    // UPDATE HOMEPAGE
    if (isHome) {
        const elaineList = document.querySelector('.recent-group:first-child .recent-list');
        if (elaineList) {
            elaineList.innerHTML = '';
            elainePosts.slice(0,3).forEach(p => {
                elaineList.innerHTML += `<a href="${baseUrl}/pages/student1_elaine/blog/day${p.day}.html" class="recent-item"><div class="recent-info"><span class="recent-title">${p.title}</span><span class="recent-date">${p.date}</span></div><i class="fas fa-arrow-right"></i></a>`;
            });
        }
        
        const cjList = document.querySelector('.recent-group:last-child .recent-list');
        if (cjList) {
            cjList.innerHTML = '';
            cjPosts.slice(0,3).forEach(p => {
                cjList.innerHTML += `<a href="${baseUrl}/pages/student2_cj/blog/day${p.day}.html" class="recent-item"><div class="recent-info"><span class="recent-title">${p.title}</span><span class="recent-date">${p.date}</span></div><i class="fas fa-arrow-right"></i></a>`;
            });
        }
    }
    
    // UPDATE CJ'S PAGE 
    if (isCJ) {
        const grid = document.querySelector('.profile-blogs-grid');
        if (grid) {
            grid.innerHTML = '';
            cjPosts.slice(0,3).forEach(p => {
                grid.innerHTML += `<div class="blog-card"><div class="blog-card-date"><i class="fas fa-calendar"></i> ${p.date}</div><h3 class="blog-card-title">Day ${p.day}: ${p.title}</h3><p class="blog-card-excerpt">${p.excerpt}</p><div class="blog-card-footer"><span class="blog-card-tag"><i class="fas fa-tag"></i> PERSONAL</span><a href="${baseUrl}/pages/student2_cj/blog/day${p.day}.html" class="blog-card-link">READ MORE <i class="fas fa-arrow-right"></i></a></div></div>`;
            });
        }
    }
    
    // UPDATE ELAINE'S PAGE
    if (isElaine) {
        const grid = document.querySelector('.profile-blogs-grid');
        if (grid) {
            grid.innerHTML = '';
            elainePosts.slice(0,3).forEach(p => {
                grid.innerHTML += `<div class="blog-card"><div class="blog-card-date"><i class="fas fa-calendar"></i> ${p.date}</div><h3 class="blog-card-title">Day ${p.day}: ${p.title}</h3><p class="blog-card-excerpt">${p.excerpt}</p><div class="blog-card-footer"><span class="blog-card-tag"><i class="fas fa-tag"></i> PERSONAL</span><a href="${baseUrl}/pages/student1_elaine/blog/day${p.day}.html" class="blog-card-link">READ MORE <i class="fas fa-arrow-right"></i></a></div></div>`;
            });
        }
    }
}

// RUN AFTER PAGE LOADS
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(updateRecentPosts, 300));
} else {
    setTimeout(updateRecentPosts, 300);
}

window.refreshPosts = updateRecentPosts;