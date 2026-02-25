async function countBlogPosts() {
    const cjPosts = [];
    const elainePosts = [];
    
    const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -2).join('/');
    
    let day = 1;
    while (true) {
        try {
            let response = null;
            
            response = await fetch(`student2_cj/blog/day${day}.html`, { 
                method: 'HEAD',
                cache: 'no-cache'
            });
            
            if (!response.ok) {
                response = await fetch(`${baseUrl}/student2_cj/blog/day${day}.html`, { 
                    method: 'HEAD',
                    cache: 'no-cache'
                });
            }
            
            if (response && response.ok) {
                cjPosts.push(`day${day}.html`);
                day++;
            } else {
                break;
            }
        } catch (error) {
            break;
        }
    }
    
    day = 1;
    while (true) {
        try {
            let response = null;
            
            response = await fetch(`student1_elaine/blog/day${day}.html`, { 
                method: 'HEAD',
                cache: 'no-cache'
            });
            
            if (!response.ok) {
                response = await fetch(`${baseUrl}/student1_elaine/blog/day${day}.html`, { 
                    method: 'HEAD',
                    cache: 'no-cache'
                });
            }
            
            if (response && response.ok) {
                elainePosts.push(`day${day}.html`);
                day++;
            } else {
                break;
            }
        } catch (error) {
            break;
        }
    }
    
    return {
        cj: cjPosts.length,
        elaine: elainePosts.length,
        total: cjPosts.length + elainePosts.length
    };
}

async function updateAllCounters() {
    try {
        const counts = await countBlogPosts();
        console.log('Blog counts:', counts);
        
        const statCards = document.querySelectorAll('.stats-section .stat-card');
        statCards.forEach(card => {
            const label = card.querySelector('.stat-label');
            const value = card.querySelector('.stat-number');
            
            if (label && label.textContent.includes('Blog Posts') && value) {
                value.textContent = counts.total;
            }
        });
        
        const profileStatItems = document.querySelectorAll('.profile-stats .stat-item');
        profileStatItems.forEach(item => {
            const label = item.querySelector('.stat-label');
            const value = item.querySelector('.stat-value');
            
            if (label && label.textContent.includes('Blog Posts') && value) {
                if (window.location.pathname.includes('student2_cj')) {
                    value.textContent = counts.cj;
                } else if (window.location.pathname.includes('student1_elaine')) {
                    value.textContent = counts.elaine;
                }
            }
        });
        
        const readBlogBtn = document.querySelector('.btn-secondary.btn-large');
        if (readBlogBtn && readBlogBtn.textContent.includes('Read My Blog')) {
            if (window.location.pathname.includes('student2_cj')) {
                readBlogBtn.innerHTML = `Read My Blog (${counts.cj}) <i class="fas fa-arrow-right"></i>`;
            } else if (window.location.pathname.includes('student1_elaine')) {
                readBlogBtn.innerHTML = `Read My Blog (${counts.elaine}) <i class="fas fa-arrow-right"></i>`;
            }
        }
        
        const ctaButtons = document.querySelectorAll('.cta-buttons .btn-primary');
        if (ctaButtons.length >= 2) {
            ctaButtons[0].innerHTML = `<i class="fas fa-book-open"></i> Elaine's Blog (${counts.elaine})`;
            ctaButtons[1].innerHTML = `<i class="fas fa-book-open"></i> CJ's Blog (${counts.cj})`;
        }
        
        const recentTitles = document.querySelectorAll('.recent-group h3');
        recentTitles.forEach(title => {
            if (title.textContent.includes("Elaine's Latest")) {
                title.innerHTML = `<i class="fas fa-pen"></i> Elaine's Latest (${counts.elaine})`;
            }
            if (title.textContent.includes("CJ's Latest")) {
                title.innerHTML = `<i class="fas fa-laptop-code"></i> CJ's Latest (${counts.cj})`;
            }
        });
        
    } catch (error) {
        console.error('Counter error:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(updateAllCounters, 500);
    });
} else {
    setTimeout(updateAllCounters, 500);
}

window.forceRecount = updateAllCounters;