console.log('HERO CAROUSEL LOADED');

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
        this.heroImage.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        this.heroImage.style.opacity = '1';
        
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
            transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            z-index: 5;
        `;
        this.imageWrapper.style.position = 'relative';
        this.imageWrapper.style.overflow = 'hidden';
        this.imageWrapper.appendChild(overlay);
        this.overlay = overlay;
        
        // NEXT IMAGE PRELOADER
        this.nextImagePreloader = new Image();
        
        // START
        setTimeout(() => this.startCarousel(), 500);
    }
    
    startCarousel() {
        setInterval(() => this.nextImage(), 3500);
    }
    
    nextImage() {
        // PRELOAD NEXT IMAGE
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.nextImagePreloader.src = this.images[nextIndex];
        
        // FADE OUT CURRENT
        this.overlay.style.opacity = '0.7';
        this.heroImage.style.opacity = '0.3';
        
        setTimeout(() => {
            // CHANGE IMAGE
            this.currentIndex = nextIndex;
            this.heroImage.src = this.images[this.currentIndex];
            
            // FADE IN NEW
            setTimeout(() => {
                this.overlay.style.opacity = '0';
                this.heroImage.style.opacity = '1';
            }, 50);
        }, 600);
    }
}

// INITIALIZE WHEN PAGE LOADS
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new HeroCarousel());
} else {
    new HeroCarousel();
}