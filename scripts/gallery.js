console.log('GALLERY SCRIPT LOADED');

let currentImages = [];
let filteredImages = [];
let currentIndex = 0;

function waitForImageList() {
    return new Promise((resolve) => {
        if (typeof galleryImages !== 'undefined') {
            resolve();
        } else {
            setTimeout(() => waitForImageList().then(resolve), 100);
        }
    });
}

async function loadGallery() {
    console.log('LOADING GALLERY...');
    
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '<div class="gallery-loading"><i class="fas fa-spinner fa-spin"></i><p>LOADING IMAGES...</p></div>';
    
    try {
        await waitForImageList();
        
        const baseUrl = '/WebSys-LAB2';
        
        if (!galleryImages || galleryImages.length === 0) {
            galleryGrid.innerHTML = `<div class="gallery-empty"><i class="fas fa-camera"></i><h3>NO IMAGES FOUND</h3><p>ADD IMAGES TO /images/gallery/ FOLDER</p></div>`;
            return;
        }
        
        currentImages = [];
        
        for (let i = 0; i < galleryImages.length; i++) {
            const filename = galleryImages[i];
            const imgUrl = `${baseUrl}/images/gallery/${filename}`;
            
            let fileDate = new Date();
            try {
                const res = await fetch(imgUrl, { method: 'HEAD' });
                const lastModified = res.headers.get('last-modified');
                if (lastModified) {
                    fileDate = new Date(lastModified);
                }
            } catch (e) {}
            
            let displayName = filename.split('.')[0];
            displayName = displayName.replace(/[_-]/g, ' ');
            
            currentImages.push({
                url: imgUrl,
                filename: filename,
                displayName: displayName,
                date: fileDate,
                dateString: fileDate.toLocaleDateString('en-US', { 
                    month: 'short', day: 'numeric', year: 'numeric' 
                })
            });
            
            console.log(`LOADED: ${filename}`);
        }
        
        currentImages.sort((a, b) => b.date - a.date);
        filteredImages = [...currentImages];
        
        updateStats();
        renderGallery();
        
    } catch (error) {
        galleryGrid.innerHTML = `<div class="gallery-empty"><i class="fas fa-camera"></i><h3>ERROR</h3><p>${error.message}</p></div>`;
    }
}

function updateStats() {
    const totalStat = document.getElementById('totalStat');
    const latestStat = document.getElementById('latestStat');
    
    if (totalStat) {
        totalStat.innerHTML = `<i class="fas fa-images"></i><span>${currentImages.length} MEMORIES</span>`;
    }
    
    if (latestStat && currentImages.length > 0) {
        latestStat.innerHTML = `<i class="fas fa-calendar"></i><span>LATEST: ${currentImages[0].dateString}</span>`;
    }
}

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
                <span class="gallery-date"><i class="fas fa-calendar"></i> ${img.dateString}</span>
            </div>
        `;
        
        galleryGrid.appendChild(item);
    });
}

function openModal(index) {
    currentIndex = index;
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    if (!modal || !modalImg) return;
    
    modalImg.src = filteredImages[index].url;
    modalCaption.innerHTML = `${filteredImages[index].displayName} · ${filteredImages[index].dateString}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateModal(direction) {
    currentIndex = (currentIndex + direction + filteredImages.length) % filteredImages.length;
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImg.src = filteredImages[currentIndex].url;
    modalCaption.innerHTML = `${filteredImages[currentIndex].displayName} · ${filteredImages[currentIndex].dateString}`;
}

document.addEventListener('DOMContentLoaded', loadGallery);

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const filter = e.target.dataset.filter;
        
        if (filter === 'all') {
            filteredImages = [...currentImages];
        } else if (filter === 'recent') {
            filteredImages = [...currentImages].sort((a, b) => b.date - a.date);
        } else if (filter === 'oldest') {
            filteredImages = [...currentImages].sort((a, b) => a.date - b.date);
        }
        
        renderGallery();
    });
});

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

document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryModal');
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigateModal(-1);
    if (e.key === 'ArrowRight') navigateModal(1);
});

window.openModal = openModal;
window.closeModal = closeModal;
window.navigateModal = navigateModal;
window.refreshGallery = loadGallery;