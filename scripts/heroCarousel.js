console.log('🖼️ HERO CAROUSEL LOADED');

class HeroCarousel {
    constructor() {
        this.images = [
            '../images/blogPics/day2_photobooth1.jpeg',
            '../images/blogPics/day2_photobooth2.jpeg',
            '../images/blogPics/day2_photobooth3.jpeg',
            '../images/blogPics/day2_photobooth4.jpeg'
        ];
        
        this.currentIndex = 0;
        this.heroImage = document.querySelector('.hero-image img');
        this.imageWrapper = document.querySelector('.hero-image-wrapper');
        
        if (!this.heroImage) return;
        
        this.preloadImages();
        this.init();
    }
    
    preloadImages() {
        this.images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    init() {
        this.heroImage.src = this.images[0];
        
        // FADE OVERLAY
        const overlay = document.createElement('div');
        overlay.className = 'hero-fade-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--baby-500);
            opacity: 0;
            transition: opacity 1s ease;
            pointer-events: none;
            z-index: 5;
        `;
        this.imageWrapper.style.position = 'relative';
        this.imageWrapper.appendChild(overlay);
        this.overlay = overlay;
        
        // START
        this.startCarousel();
    }
    
    startCarousel() {
        setInterval(() => this.nextImage(), 3500);
    }
    
    nextImage() {
        // FADE TO BLACK
        this.overlay.style.opacity = '0.8';
        
        setTimeout(() => {
            // CHANGE IMAGE
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.heroImage.src = this.images[this.currentIndex];
            
            // FADE BACK IN
            this.overlay.style.opacity = '0';
        }, 500);
    }
}

// INITIALIZE WHEN PAGE LOADS
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new HeroCarousel());
} else {
    new HeroCarousel();
}