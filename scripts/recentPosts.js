console.log('📝 Recent posts script loaded');

async function updateRecentPosts() {
    console.log('🔄 Updating recent posts...');
    
    const path = window.location.pathname;
    const isHome = !path.includes('student2_cj') && !path.includes('student1_elaine');
    const isCJ = path.includes('student2_cj');
    const isElaine = path.includes('student1_elaine');
    
    console.log('Page type:', { isHome, isCJ, isElaine });
    
    // store posts
    const cjPosts = [];
    const elainePosts = [];
    
    for (let day = 1; day <= 10; day++) {
        const url = `/student2_cj/blog/day${day}.html`;
        try {
            const response = await fetch(url);
            if (!response.ok) break;
            
            const html = await response.text();
            
            // extract title
            const titleMatch = html.match(/<h1[^>]*>Day \d+: (.*?)<\/h1>/);
            const title = titleMatch ? titleMatch[1] : `Day ${day}`;
            
            // extract intro
            const introMatch = html.match(/<p class="blog-intro"[^>]*>(.*?)<\/p>/s);
            let excerpt = introMatch ? introMatch[1].replace(/<[^>]*>/g, '') : '';
            excerpt = excerpt.substring(0, 100) + (excerpt.length > 100 ? '...' : '');
            
            // extract date
            const dateMatch = html.match(/<span><i class="fas fa-calendar"><\/i> (.*?)<\/span>/);
            const date = dateMatch ? dateMatch[1] : `February ${19 + day}, 2026`;
            
            cjPosts.push({ day, title, excerpt, date, url: `/student2_cj/blog/day${day}.html` });
            console.log(`✅ Found CJ day${day}`);
        } catch (e) {
            break;
        }
    }
    
    for (let day = 1; day <= 10; day++) {
        const url = `/student1_elaine/blog/day${day}.html`;
        try {
            const response = await fetch(url);
            if (!response.ok) break;
            
            const html = await response.text();
            
            const titleMatch = html.match(/<h1[^>]*>Day \d+: (.*?)<\/h1>/);
            const title = titleMatch ? titleMatch[1] : `Day ${day}`;
            
            const introMatch = html.match(/<p class="blog-intro"[^>]*>(.*?)<\/p>/s);
            let excerpt = introMatch ? introMatch[1].replace(/<[^>]*>/g, '') : '';
            excerpt = excerpt.substring(0, 100) + (excerpt.length > 100 ? '...' : '');
            
            const dateMatch = html.match(/<span><i class="fas fa-calendar"><\/i> (.*?)<\/span>/);
            const date = dateMatch ? dateMatch[1] : `February ${19 + day}, 2026`;
            
            elainePosts.push({ day, title, excerpt, date, url: `/student1_elaine/blog/day${day}.html` });
            console.log(`✅ Found Elaine day${day}`);
        } catch (e) {
            break;
        }
    }
    
    cjPosts.sort((a, b) => b.day - a.day);
    elainePosts.sort((a, b) => b.day - a.day);
    
    console.log(`📊 Found ${cjPosts.length} CJ posts, ${elainePosts.length} Elaine posts`);
    
    if (isHome) {
        console.log('🏠 Updating homepage');
        
        const elaineContainer = document.querySelector('.recent-group:first-child .recent-list');
        if (elaineContainer) {
            elaineContainer.innerHTML = '';
            elainePosts.slice(0, 3).forEach(post => {
                elaineContainer.innerHTML += `
                    <a href="/student1_elaine/blog/day${post.day}.html" class="recent-item">
                        <div class="recent-info">
                            <span class="recent-title">${post.title}</span>
                            <span class="recent-date">${post.date}</span>
                        </div>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                `;
            });
        }
        
        const cjContainer = document.querySelector('.recent-group:last-child .recent-list');
        if (cjContainer) {
            cjContainer.innerHTML = '';
            cjPosts.slice(0, 3).forEach(post => {
                cjContainer.innerHTML += `
                    <a href="/student2_cj/blog/day${post.day}.html" class="recent-item">
                        <div class="recent-info">
                            <span class="recent-title">${post.title}</span>
                            <span class="recent-date">${post.date}</span>
                        </div>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                `;
            });
        }
    }
    
    // update CJ's PROFILE PAGE
    if (isCJ) {
        console.log('👤 Updating CJ profile page');
        const grid = document.querySelector('.profile-blogs-grid');
        if (grid) {
            grid.innerHTML = '';
            cjPosts.slice(0, 3).forEach(post => {
                grid.innerHTML += `
                    <div class="blog-card">
                        <div class="blog-card-date"><i class="fas fa-calendar"></i> ${post.date}</div>
                        <h3 class="blog-card-title">Day ${post.day}: ${post.title}</h3>
                        <p class="blog-card-excerpt">${post.excerpt}</p>
                        <div class="blog-card-footer">
                            <span class="blog-card-tag"><i class="fas fa-tag"></i> personal</span>
                            <a href="/student2_cj/blog/day${post.day}.html" class="blog-card-link">Read More <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                `;
            });
            
            // update "Read My Blog" button
            const readBtn = document.querySelector('.center-button .btn-secondary');
            if (readBtn && cjPosts.length > 0) {
                readBtn.href = `/student2_cj/blog/day${cjPosts[0].day}.html`;
                readBtn.innerHTML = `Read My Blog (${cjPosts.length}) <i class="fas fa-arrow-right"></i>`;
            }
        }
    }
    
    // update Elaine's PROFILE PAGE
    if (isElaine) {
        console.log('👤 Updating Elaine profile page');
        const grid = document.querySelector('.profile-blogs-grid');
        if (grid) {
            grid.innerHTML = '';
            elainePosts.slice(0, 3).forEach(post => {
                grid.innerHTML += `
                    <div class="blog-card">
                        <div class="blog-card-date"><i class="fas fa-calendar"></i> ${post.date}</div>
                        <h3 class="blog-card-title">Day ${post.day}: ${post.title}</h3>
                        <p class="blog-card-excerpt">${post.excerpt}</p>
                        <div class="blog-card-footer">
                            <span class="blog-card-tag"><i class="fas fa-tag"></i> personal</span>
                            <a href="/student1_elaine/blog/day${post.day}.html" class="blog-card-link">Read More <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                `;
            });
            
            const readBtn = document.querySelector('.center-button .btn-secondary');
            if (readBtn && elainePosts.length > 0) {
                readBtn.href = `/student1_elaine/blog/day${elainePosts[0].day}.html`;
                readBtn.innerHTML = `Read My Blog (${elainePosts.length}) <i class="fas fa-arrow-right"></i>`;
            }
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(updateRecentPosts, 300));
} else {
    setTimeout(updateRecentPosts, 300);
}

window.refreshPosts = updateRecentPosts;