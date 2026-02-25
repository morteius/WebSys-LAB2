console.log('📝 RECENT POSTS LOADED');

async function updateRecentPosts() {
    console.log('🔄 UPDATING...');
    
    const pathParts = window.location.pathname.split('/');
    const repoName = pathParts[1] === 'student2_cj' || pathParts[1] === 'student1_elaine' ? '' : pathParts[1];
    const baseUrl = repoName ? `/${repoName}` : '';
    
    const isHome = !window.location.pathname.includes('student2_cj') && !window.location.pathname.includes('student1_elaine');
    const isCJ = window.location.pathname.includes('student2_cj');
    const isElaine = window.location.pathname.includes('student1_elaine');
    
    const cjPosts = [];
    const elainePosts = [];
    
    for (let day = 1; day <= 10; day++) {
        try {
            const res = await fetch(`${baseUrl}/student2_cj/blog/day${day}.html`);
            if (!res.ok) break;
            const html = await res.text();
            const title = (html.match(/<h1[^>]*>Day \d+: (.*?)<\/h1>/) || [,`Day ${day}`])[1].trim();
            const excerpt = (html.match(/<p class="blog-intro"[^>]*>(.*?)<\/p>/) || [, ''])[1].replace(/<[^>]*>/g, '').substring(0, 100) + '...';
            const date = (html.match(/<span><i class="fas fa-calendar"><\/i> (.*?)<\/span>/) || [, `February ${19+day}, 2026`])[1].trim();
            cjPosts.push({ day, title, excerpt, date });
        } catch (e) { break; }
    }
    
    for (let day = 1; day <= 10; day++) {
        try {
            const res = await fetch(`${baseUrl}/student1_elaine/blog/day${day}.html`);
            if (!res.ok) break;
            const html = await res.text();
            const title = (html.match(/<h1[^>]*>Day \d+: (.*?)<\/h1>/) || [,`Day ${day}`])[1].trim();
            const excerpt = (html.match(/<p class="blog-intro"[^>]*>(.*?)<\/p>/) || [, ''])[1].replace(/<[^>]*>/g, '').substring(0, 100) + '...';
            const date = (html.match(/<span><i class="fas fa-calendar"><\/i> (.*?)<\/span>/) || [, `February ${19+day}, 2026`])[1].trim();
            elainePosts.push({ day, title, excerpt, date });
        } catch (e) { break; }
    }
    
    cjPosts.sort((a,b) => b.day - a.day);
    elainePosts.sort((a,b) => b.day - a.day);
    
    if (isHome) {
        const elaineList = document.querySelector('.recent-group:first-child .recent-list');
        if (elaineList) {
            elaineList.innerHTML = '';
            elainePosts.slice(0,3).forEach(p => {
                elaineList.innerHTML += `<a href="${baseUrl}/student1_elaine/blog/day${p.day}.html" class="recent-item"><div class="recent-info"><span class="recent-title">${p.title}</span><span class="recent-date">${p.date}</span></div><i class="fas fa-arrow-right"></i></a>`;
            });
        }
        
        const cjList = document.querySelector('.recent-group:last-child .recent-list');
        if (cjList) {
            cjList.innerHTML = '';
            cjPosts.slice(0,3).forEach(p => {
                cjList.innerHTML += `<a href="${baseUrl}/student2_cj/blog/day${p.day}.html" class="recent-item"><div class="recent-info"><span class="recent-title">${p.title}</span><span class="recent-date">${p.date}</span></div><i class="fas fa-arrow-right"></i></a>`;
            });
        }
    }
    
    if (isCJ) {
        const grid = document.querySelector('.profile-blogs-grid');
        if (grid) {
            grid.innerHTML = '';
            cjPosts.slice(0,3).forEach(p => {
                grid.innerHTML += `<div class="blog-card"><div class="blog-card-date"><i class="fas fa-calendar"></i> ${p.date}</div><h3 class="blog-card-title">Day ${p.day}: ${p.title}</h3><p class="blog-card-excerpt">${p.excerpt}</p><div class="blog-card-footer"><span class="blog-card-tag"><i class="fas fa-tag"></i> personal</span><a href="blog/day${p.day}.html" class="blog-card-link">Read More <i class="fas fa-arrow-right"></i></a></div></div>`;
            });
        }
    }
    
    if (isElaine) {
        const grid = document.querySelector('.profile-blogs-grid');
        if (grid) {
            grid.innerHTML = '';
            elainePosts.slice(0,3).forEach(p => {
                grid.innerHTML += `<div class="blog-card"><div class="blog-card-date"><i class="fas fa-calendar"></i> ${p.date}</div><h3 class="blog-card-title">Day ${p.day}: ${p.title}</h3><p class="blog-card-excerpt">${p.excerpt}</p><div class="blog-card-footer"><span class="blog-card-tag"><i class="fas fa-tag"></i> personal</span><a href="blog/day${p.day}.html" class="blog-card-link">Read More <i class="fas fa-arrow-right"></i></a></div></div>`;
            });
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(updateRecentPosts, 300));
} else {
    setTimeout(updateRecentPosts, 300);
}

window.refreshPosts = updateRecentPosts;