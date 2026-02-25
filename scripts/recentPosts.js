console.log('📝 RECENT POSTS LOADED');

async function updateRecentPosts() {
    console.log('🔄 UPDATING...');
    
    const baseUrl = '/WebSys-LAB2';
    
    const isHome = !window.location.pathname.includes('student2_cj') && !window.location.pathname.includes('student1_elaine');
    const isCJ = window.location.pathname.includes('student2_cj');
    const isElaine = window.location.pathname.includes('student1_elaine');
    
    const cjPosts = [];
    const elainePosts = [];
    
    // GET CJ'S POSTS - STOPS AT 404
    for (let day = 1; day <= 10; day++) {
        try {
            const url = `${baseUrl}/student2_cj/blog/day${day}.html`;
            const res = await fetch(url);
            if (!res.ok) {
                console.log(`⏹️ CJ stops at day${day} (404)`);
                break;
            }
            const html = await res.text();
            
            // GET TITLE
            const titleMatch = html.match(/<h1[^>]*>Day \d+: (.*?)<\/h1>/);
            const title = titleMatch ? titleMatch[1].trim() : `Day ${day}`;
            
            // GET INTRO PARAGRAPH
            const introMatch = html.match(/<p class="blog-intro"[^>]*>(.*?)<\/p>/s);
            let excerpt = '';
            if (introMatch && introMatch[1]) {
                excerpt = introMatch[1].replace(/<[^>]*>/g, '').trim();
                if (excerpt.length > 100) {
                    excerpt = excerpt.substring(0, 100) + '...';
                }
            } else {
                excerpt = 'No excerpt available.';
            }
            
            // GET DATE
            const dateMatch = html.match(/<span><i class="fas fa-calendar"><\/i> (.*?)<\/span>/);
            const date = dateMatch ? dateMatch[1].trim() : `February ${19 + day}, 2026`;
            
            cjPosts.push({ day, title, excerpt, date });
            console.log(`✅ Found CJ day${day}: "${title}"`);
        } catch (e) { 
            console.log(`⚠️ Error on CJ day${day}:`, e);
            break; 
        }
    }
    
    // GET ELAINE'S POSTS - STOPS AT 404
    for (let day = 1; day <= 10; day++) {
        try {
            const url = `${baseUrl}/student1_elaine/blog/day${day}.html`;
            const res = await fetch(url);
            if (!res.ok) {
                console.log(`⏹️ Elaine stops at day${day} (404)`);
                break;
            }
            const html = await res.text();
            
            // GET TITLE
            const titleMatch = html.match(/<h1[^>]*>Day \d+: (.*?)<\/h1>/);
            const title = titleMatch ? titleMatch[1].trim() : `Day ${day}`;
            
            // GET INTRO PARAGRAPH
            const introMatch = html.match(/<p class="blog-intro"[^>]*>(.*?)<\/p>/s);
            let excerpt = '';
            if (introMatch && introMatch[1]) {
                excerpt = introMatch[1].replace(/<[^>]*>/g, '').trim();
                if (excerpt.length > 100) {
                    excerpt = excerpt.substring(0, 100) + '...';
                }
            } else {
                excerpt = 'No excerpt available.';
            }
            
            // GET DATE
            const dateMatch = html.match(/<span><i class="fas fa-calendar"><\/i> (.*?)<\/span>/);
            const date = dateMatch ? dateMatch[1].trim() : `February ${19 + day}, 2026`;
            
            elainePosts.push({ day, title, excerpt, date });
            console.log(`✅ Found Elaine day${day}: "${title}"`);
        } catch (e) { 
            console.log(`⚠️ Error on Elaine day${day}:`, e);
            break; 
        }
    }
    
    cjPosts.sort((a,b) => b.day - a.day);
    elainePosts.sort((a,b) => b.day - a.day);
    
    console.log(`📊 Found ${cjPosts.length} CJ posts, ${elainePosts.length} Elaine posts`);
    
    // UPDATE HOMEPAGE
    if (isHome) {
        const elaineList = document.querySelector('.recent-group:first-child .recent-list');
        if (elaineList) {
            elaineList.innerHTML = '';
            if (elainePosts.length === 0) {
                elaineList.innerHTML = '<div class="recent-item"><div class="recent-info"><span class="recent-title">No posts yet</span></div></div>';
            } else {
                elainePosts.slice(0,3).forEach(p => {
                    elaineList.innerHTML += `<a href="${baseUrl}/student1_elaine/blog/day${p.day}.html" class="recent-item"><div class="recent-info"><span class="recent-title">${p.title}</span><span class="recent-date">${p.date}</span></div><i class="fas fa-arrow-right"></i></a>`;
                });
            }
        }
        
        const cjList = document.querySelector('.recent-group:last-child .recent-list');
        if (cjList) {
            cjList.innerHTML = '';
            if (cjPosts.length === 0) {
                cjList.innerHTML = '<div class="recent-item"><div class="recent-info"><span class="recent-title">No posts yet</span></div></div>';
            } else {
                cjPosts.slice(0,3).forEach(p => {
                    cjList.innerHTML += `<a href="${baseUrl}/student2_cj/blog/day${p.day}.html" class="recent-item"><div class="recent-info"><span class="recent-title">${p.title}</span><span class="recent-date">${p.date}</span></div><i class="fas fa-arrow-right"></i></a>`;
                });
            }
        }
    }
    
    // UPDATE CJ'S PAGE
    if (isCJ) {
        const grid = document.querySelector('.profile-blogs-grid');
        if (grid) {
            grid.innerHTML = '';
            if (cjPosts.length === 0) {
                grid.innerHTML = '<div class="blog-card"><div class="blog-card-date">No posts yet</div></div>';
            } else {
                cjPosts.slice(0,3).forEach(p => {
                    grid.innerHTML += `<div class="blog-card"><div class="blog-card-date"><i class="fas fa-calendar"></i> ${p.date}</div><h3 class="blog-card-title">Day ${p.day}: ${p.title}</h3><p class="blog-card-excerpt">${p.excerpt}</p><div class="blog-card-footer"><span class="blog-card-tag"><i class="fas fa-tag"></i> personal</span><a href="blog/day${p.day}.html" class="blog-card-link">Read More <i class="fas fa-arrow-right"></i></a></div></div>`;
                });
            }
            
            // UPDATE READ MORE BUTTON
            const readBtn = document.querySelector('.center-button .btn-secondary');
            if (readBtn && cjPosts.length > 0) {
                readBtn.href = `blog/day${cjPosts[0].day}.html`;
                readBtn.innerHTML = `Read My Blog (${cjPosts.length}) <i class="fas fa-arrow-right"></i>`;
            }
        }
    }
    
    // UPDATE ELAINE'S PAGE
    if (isElaine) {
        const grid = document.querySelector('.profile-blogs-grid');
        if (grid) {
            grid.innerHTML = '';
            if (elainePosts.length === 0) {
                grid.innerHTML = '<div class="blog-card"><div class="blog-card-date">No posts yet</div></div>';
            } else {
                elainePosts.slice(0,3).forEach(p => {
                    grid.innerHTML += `<div class="blog-card"><div class="blog-card-date"><i class="fas fa-calendar"></i> ${p.date}</div><h3 class="blog-card-title">Day ${p.day}: ${p.title}</h3><p class="blog-card-excerpt">${p.excerpt}</p><div class="blog-card-footer"><span class="blog-card-tag"><i class="fas fa-tag"></i> personal</span><a href="blog/day${p.day}.html" class="blog-card-link">Read More <i class="fas fa-arrow-right"></i></a></div></div>`;
                });
            }
            
            // UPDATE READ MORE BUTTON
            const readBtn = document.querySelector('.center-button .btn-secondary');
            if (readBtn && elainePosts.length > 0) {
                readBtn.href = `blog/day${elainePosts[0].day}.html`;
                readBtn.innerHTML = `Read My Blog (${elainePosts.length}) <i class="fas fa-arrow-right"></i>`;
            }
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