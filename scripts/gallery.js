console.log('📸 GALLERY SCRIPT LOADED');

let currentImages = [];
let filteredImages = [];
let currentIndex = 0;

// AUTO-DETECT ALL IMAGES IN GALLERY FOLDER
async function loadGallery() {
    console.log('🔄 AUTO-SCANNING FOR IMAGES...');
    
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '<div class="gallery-loading"><i class="fas fa-spinner fa-spin"></i><p>LOADING MEMORIES...</p></div>';
    
    try {
        const baseUrl = '/WebSys-LAB2';
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'JPG', 'JPEG', 'PNG', 'GIF', 'WEBP', 'heic', 'HEIC'];
        
        currentImages = [];
        
        
        const commonNames = [
            'day1', 'day2', 'day3', 'day4', 'day5', 'day6',
            'ellie_cj', 'babyEllie', 'babyCj', 'cj', 'elaine',
            'lunch', 'photobooth', 'swimming', 'pancit', 'icecream',
            'group', 'market'
        ];
        
        const imageFiles = [];
        
        // CHECK ALL COMBINATIONS
        for (const name of commonNames) {
            for (const ext of imageExtensions) {
                const filename = `${name}.${ext}`;
                const imgUrl = `${baseUrl}/images/gallery/${filename}`;
                
                try {
                    const res = await fetch(imgUrl, { method: 'HEAD' });
                    if (res.ok) {
                        imageFiles.push(filename);
                        console.log(`✅ FOUND: ${filename}`);
                        break;
                    }
                } catch (e) {}
            }
        }
        
        // CONVERT TO IMAGE OBJECTS
        for (let i = 0; i < imageFiles.length; i++) {
            const filename = imageFiles[i];
            const imgUrl = `${baseUrl}/images/gallery/${filename}`;
            
            let fileDate = 'UNKNOWN';
            try {
                const res = await fetch(imgUrl, { method: 'HEAD' });
                const lastModified = res.headers.get('last-modified');
                if (lastModified) {
                    fileDate = new Date(lastModified).toLocaleDateString('en-US', { 
                        month: 'short', day: 'numeric', year: 'numeric' 
                    });
                }
            } catch (e) {}
            
            currentImages.push({
                url: imgUrl,
                filename: filename,
                displayName: filename.split('.')[0].replace(/[_-]/g, ' '),
                date: fileDate
            });
        }
        
        // SORT BY DATE (NEWEST FIRST)
        currentImages.sort((a, b) => b.date.localeCompare(a.date));
        filteredImages = [...currentImages];
        
        updateStats();
        renderGallery();
        
        if (currentImages.length === 0) {
            galleryGrid.innerHTML = `<div class="gallery-empty"><i class="fas fa-camera"></i><h3>NO IMAGES FOUND</h3><p>ADD IMAGES TO /images/gallery/ FOLDER</p></div>`;
        }
        
    } catch (error) {
        galleryGrid.innerHTML = `<div class="gallery-empty"><i class="fas fa-camera"></i><h3>ERROR</h3><p>${error.message}</p></div>`;
    }
}

// UPDATE STATS
function updateStats() {
    const totalStat = document.getElementById('totalStat');
    const latestStat = document.getElementById('latestStat');
    
    if (totalStat) {
        totalStat.innerHTML = `<i class="fas fa-images"></i><span>${currentImages.length} MEMORIES</span>`;
    }
    
    if (latestStat && currentImages.length > 0) {
        latestStat.innerHTML = `<i class="fas fa-calendar"></i><span>LATEST: ${currentImages[0].date}</span>`;
    }
}

// RENDER GALLERY GRID
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    if (filteredImages.length === 0) {
        galleryGrid.innerHTML = `<div class="gallery-empty"><i class="fas fa-camera"></i><h3>NO IMAGES FOUND</h3><p>ADD IMAGES TO /images/gallery/ FOLDER</p></div>`;
        return;
    }
    
    galleryGrid.innerHTML = '';
    
    filteredImages.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.onclick = () => openModal(index);
        
        item.innerHTML = `
            <img src="${img.url}" alt="${img.filename}" loading="lazy">
            <div class="gallery-overlay">
                <span class="gallery-title">${img.displayName.toUpperCase()}</span>
                <span class="gallery-date"><i class="fas fa-calendar"></i> ${img.date}</span>
                <span class="gallery-filename">${img.filename}</span>
            </div>
        `;
        
        galleryGrid.appendChild(item);
    });
}

// OPEN MODAL
function openModal(index) {
    currentIndex = index;
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    if (!modal || !modalImg) return;
    
    modalImg.src = filteredImages[index].url;
    modalCaption.innerHTML = `${filteredImages[index].displayName} · ${filteredImages[index].date}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// CLOSE MODAL
function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// NAVIGATE MODAL
function navigateModal(direction) {
    currentIndex = (currentIndex + direction + filteredImages.length) % filteredImages.length;
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImg.src = filteredImages[currentIndex].url;
    modalCaption.innerHTML = `${filteredImages[currentIndex].displayName} · ${filteredImages[currentIndex].date}`;
}

// START
document.addEventListener('DOMContentLoaded', loadGallery);

// FILTER BUTTONS
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const filter = e.target.dataset.filter;
        
        if (filter === 'all') {
            filteredImages = [...currentImages];
        } else if (filter === 'recent') {
            filteredImages = [...currentImages].sort((a, b) => b.date.localeCompare(a.date));
        } else if (filter === 'oldest') {
            filteredImages = [...currentImages].sort((a, b) => a.date.localeCompare(b.date));
        }
        
        renderGallery();
    });
});

// SEARCH
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        filteredImages = currentImages.filter(img => 
            img.filename.toLowerCase().includes(term) || 
            img.displayName.toLowerCase().includes(term)
        );
        renderGallery();
    });
}

// KEYBOARD NAVIGATION
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryModal');
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigateModal(-1);
    if (e.key === 'ArrowRight') navigateModal(1);
});

// EXPOSE
window.openModal = openModal;
window.closeModal = closeModal;
window.navigateModal = navigateModal;
window.refreshGallery = loadGallery;