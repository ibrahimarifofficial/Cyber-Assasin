/**
 * CyberAssassin - Main JavaScript
 * Enterprise Cybersecurity & AI Solutions
 */

'use strict';

// ============================================
// Configuration
// ============================================

const CONFIG = {
    HEADER_SCROLL_THRESHOLD: 50,
    STATS_ANIMATION_DURATION: 2000,
    TESTIMONIAL_AUTO_PLAY: true,
    TESTIMONIAL_INTERVAL: 5000,
    PARTICLE_COUNT: 50,
    PARTICLE_SPEED: 0.5
};

// ============================================
// Utility Functions
// ============================================

/**
 * Debounce function to limit execution rate
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Linear interpolation for smooth animations
 */
function lerp(start, end, progress) {
    return start + (end - start) * progress;
}

// ============================================
// Header Navigation
// ============================================

class HeaderNavigation {
    constructor() {
        this.header = document.getElementById('header');
        this.hamburger = document.getElementById('hamburger');
        this.nav = document.getElementById('mainNav');
        this.overlay = document.getElementById('mobileOverlay');
        this.dropdowns = document.querySelectorAll('.header__dropdown');
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        // Scroll event for header background
        window.addEventListener('scroll', debounce(() => this.handleScroll(), 10));
        
        // Hamburger menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu when clicking overlay (but not when clicking on menu itself)
        if (this.overlay) {
            this.overlay.addEventListener('click', (e) => {
                // Only close if clicking directly on overlay, not on menu
                if (e.target === this.overlay) {
                    this.closeMenu();
                }
            });
        }
        
        // Prevent menu clicks from closing menu
        if (this.nav) {
            this.nav.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        // Close menu when clicking nav links (not dropdowns) and handle smooth scroll
        const navLinks = this.nav.querySelectorAll('.header__link:not(.header__dropdown-toggle)');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event from bubbling to overlay
                const href = link.getAttribute('href');
                
                // Check if it's an anchor link
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href;
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        // Close mobile menu if open
                        this.closeMenu();
                        
                        // Smooth scroll with offset for fixed header
                        const headerHeight = this.header.offsetHeight;
                        const targetPosition = targetSection.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update active state
                        navLinks.forEach(l => l.classList.remove('header__link--active'));
                        link.classList.add('header__link--active');
                    }
                } else {
                    this.closeMenu();
                }
            });
        });
        
        // Handle contact button click in mobile menu
        const mobileCta = this.nav.querySelector('.header__mobile-cta .header__cta');
        if (mobileCta) {
            mobileCta.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event from bubbling
                // Close menu when contact button is clicked
                this.closeMenu();
            });
        }
        
        // Close dropdown links
        const dropdownLinks = this.nav.querySelectorAll('.header__dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Handle dropdown toggles
        this.initDropdowns();
        
        // Handle ESC key to close menu and dropdowns
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.isMenuOpen) {
                    this.closeMenu();
                }
                this.closeAllDropdowns();
            }
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header__dropdown')) {
                this.closeAllDropdowns();
            }
        });
        
        // Initial check
        this.handleScroll();
    }
    
    initDropdowns() {
        this.dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.header__dropdown-toggle');
            
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                    
                    // Close all other dropdowns
                    this.closeAllDropdowns();
                    
                    // Toggle current dropdown
                    toggle.setAttribute('aria-expanded', !isExpanded);
                });
            }
        });
    }
    
    closeAllDropdowns() {
        this.dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.header__dropdown-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    handleScroll() {
        if (window.scrollY > CONFIG.HEADER_SCROLL_THRESHOLD) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
    
    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.isMenuOpen = true;
        this.hamburger.classList.add('active');
        this.nav.classList.add('active');
        this.overlay.classList.add('active');
        this.hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    
    closeMenu() {
        this.isMenuOpen = false;
        this.hamburger.classList.remove('active');
        this.nav.classList.remove('active');
        this.overlay.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.closeAllDropdowns();
        document.body.style.overflow = '';
    }
}

// ============================================
// Particle Animation (Canvas)
// ============================================

class ParticleAnimation {
    constructor() {
        this.canvas = document.getElementById('particlesCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', debounce(() => this.resize(), 250));
    }
    
    resize() {
        const hero = document.getElementById('hero');
        if (!hero) return;
        
        this.canvas.width = hero.offsetWidth;
        this.canvas.height = hero.offsetHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * CONFIG.PARTICLE_SPEED,
                speedY: (Math.random() - 0.5) * CONFIG.PARTICLE_SPEED,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.fillStyle = `rgba(249, 0, 77, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.2;
                    this.ctx.strokeStyle = `rgba(249, 0, 77, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// ============================================
// Stats Counter Animation
// ============================================

class StatsCounter {
    constructor() {
        this.statsSection = document.getElementById('stats');
        this.statValues = document.querySelectorAll('.stat-card__value');
        this.hasAnimated = false;
        
        if (this.statsSection) {
            this.init();
        }
    }
    
    init() {
        window.addEventListener('scroll', debounce(() => this.checkVisibility(), 100));
        this.checkVisibility();
    }
    
    checkVisibility() {
        if (this.hasAnimated) return;
        
        if (isInViewport(this.statsSection)) {
            this.animateStats();
            this.hasAnimated = true;
        }
    }
    
    animateStats() {
        this.statValues.forEach(statValue => {
            const target = parseFloat(statValue.dataset.count);
            const duration = CONFIG.STATS_ANIMATION_DURATION;
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out cubic)
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                
                const currentValue = lerp(0, target, easeProgress);
                
                // Format the value
                if (target < 10) {
                    statValue.textContent = currentValue.toFixed(1);
                } else {
                    statValue.textContent = Math.floor(currentValue);
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Ensure final value is exact
                    if (target < 10) {
                        statValue.textContent = target.toFixed(1);
                    } else {
                        statValue.textContent = Math.floor(target);
                    }
                }
            };
            
            requestAnimationFrame(animate);
        });
    }
}

// ============================================
// Why Choose Us Counter Animation
// ============================================

class WhyChooseUsCounter {
    constructor() {
        this.counterSection = document.querySelector('.why-choose-us__stats');
        this.counterNumbers = document.querySelectorAll('.why-choose-us__stat-number');
        this.hasAnimated = false;
        
        if (this.counterSection) {
            this.init();
        }
    }
    
    init() {
        window.addEventListener('scroll', debounce(() => this.checkVisibility(), 100));
        this.checkVisibility();
    }
    
    checkVisibility() {
        if (this.hasAnimated) return;
        
        const rect = this.counterSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            this.animateCounters();
            this.hasAnimated = true;
        }
    }
    
    animateCounters() {
        this.counterNumbers.forEach(counterElement => {
            const target = parseInt(counterElement.dataset.count);
            const duration = 2000;
            const startTime = performance.now();
            
            // Get the suffix (+ or % or /7)
            const originalText = counterElement.textContent;
            let suffix = '';
            if (originalText.includes('%')) {
                suffix = '%';
            } else if (originalText.includes('/7')) {
                suffix = '/7';
            } else {
                suffix = '+';
            }
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out cubic)
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                
                const currentValue = Math.floor(target * easeProgress);
                counterElement.textContent = currentValue + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    counterElement.textContent = target + suffix;
                }
            };
            
            requestAnimationFrame(animate);
        });
    }
}

// ============================================
// Testimonial Carousel with Infinite Loop
// ============================================

class TestimonialCarousel {
    constructor() {
        this.carousel = document.getElementById('testimonialsCarousel');
        this.allCards = document.querySelectorAll('.testimonial-card');
        this.realCards = document.querySelectorAll('.testimonial-card:not(.testimonial-card--clone)');
        this.dotsContainer = document.getElementById('testimonialsDots');
        this.currentIndex = 0;
        this.totalSlides = this.realCards.length; // 5 real cards
        this.interval = null;
        this.isTransitioning = false;
        
        if (this.carousel && this.allCards.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.createDots();
        this.updateView(false);
        this.startAutoPlay();
        
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Handle transition end for seamless loop
        this.carousel.addEventListener('transitionend', () => {
            this.isTransitioning = false;
            
            // If we're at the clone cards, jump back to real cards without animation
            if (this.currentIndex >= this.totalSlides) {
                this.currentIndex = this.currentIndex % this.totalSlides;
                this.updateView(false); // No animation
            }
        });
        
        // Handle resize
        window.addEventListener('resize', () => this.updateView(false));
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        this.dotsContainer.innerHTML = '';
        
        // Create 5 dots (only for real cards)
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'testimonials__dot';
            dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            if (i === 0) dot.classList.add('testimonials__dot--active');
            dot.addEventListener('click', () => {
                this.stopAutoPlay();
                this.goToSlide(i, true);
                this.startAutoPlay();
            });
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateDots() {
        const dots = this.dotsContainer?.querySelectorAll('.testimonials__dot');
        if (!dots) return;
        
        // Always show the correct dot based on real index (0-4)
        const realIndex = this.currentIndex % this.totalSlides;
        dots.forEach((dot, i) => {
            dot.classList.toggle('testimonials__dot--active', i === realIndex);
        });
    }
    
    goToSlide(index, animate = true) {
        if (this.isTransitioning) return;
        
        this.currentIndex = index;
        this.updateView(animate);
        this.updateDots();
    }
    
    updateView(animate = true) {
        const card = this.allCards[0];
        if (!card) return;
        
        const cardWidth = card.offsetWidth;
        const gap = 32;
        const offset = -(this.currentIndex * (cardWidth + gap));
        
        // Disable/enable transition
        if (!animate) {
            this.carousel.style.transition = 'none';
        } else {
            this.carousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            this.isTransitioning = true;
        }
        
        this.carousel.style.transform = `translateX(${offset}px)`;
        
        // Re-enable transition after a frame
        if (!animate) {
            requestAnimationFrame(() => {
                this.carousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        }
    }
    
    next() {
        this.currentIndex++;
        this.updateView(true);
        this.updateDots();
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.interval = setInterval(() => this.next(), 3000);
    }
    
    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// ============================================
// Testimonial Slider
// ============================================

class TestimonialSlider {
    constructor() {
        this.track = document.getElementById('testimonialsTrack');
        this.dotsContainer = document.getElementById('testimonialsDots');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        if (!this.track) return;
        
        this.cards = Array.from(this.track.querySelectorAll('.testimonial-card'));
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        // Create dots
        this.createDots();
        
        // Button events
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Auto-play
        if (CONFIG.TESTIMONIAL_AUTO_PLAY) {
            this.startAutoPlay();
            
            // Pause on hover
            this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.track.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        // Initial state
        this.updateSlider();
    }
    
    createDots() {
        this.cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'testimonials__dot';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            dot.addEventListener('click', () => this.goTo(index));
            this.dotsContainer.appendChild(dot);
        });
        
        this.dots = Array.from(this.dotsContainer.querySelectorAll('.testimonials__dot'));
    }
    
    updateSlider() {
        // Update cards
        this.cards.forEach((card, index) => {
            if (index === this.currentIndex) {
                card.classList.add('testimonial-card--active');
                card.setAttribute('aria-hidden', 'false');
            } else {
                card.classList.remove('testimonial-card--active');
                card.setAttribute('aria-hidden', 'true');
            }
        });
        
        // Update dots
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
            } else {
                dot.classList.remove('active');
                dot.setAttribute('aria-selected', 'false');
            }
        });
        
        // Update buttons
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex === this.cards.length - 1;
        }
    }
    
    goTo(index) {
        if (index >= 0 && index < this.cards.length) {
            this.currentIndex = index;
            this.updateSlider();
        }
    }
    
    next() {
        if (this.currentIndex < this.cards.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Loop back
        }
        this.updateSlider();
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.cards.length - 1; // Loop back
        }
        this.updateSlider();
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, CONFIG.TESTIMONIAL_INTERVAL);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// ============================================
// Newsletter Form Handler
// ============================================

class NewsletterForm {
    constructor() {
        this.form = document.querySelector('.footer__newsletter');
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const input = this.form.querySelector('input[type="email"]');
        const email = input.value.trim();
        
        if (this.validateEmail(email)) {
            // Here you would typically send to your backend
            console.log('Newsletter subscription:', email);
            
            // Show success message
            this.showMessage('Thank you for subscribing!', 'success');
            input.value = '';
        } else {
            this.showMessage('Please enter a valid email address.', 'error');
        }
    }
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    showMessage(message, type) {
        // Create temporary message element
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#00d9ff' : '#f9004d'};
            color: white;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 600;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
            z-index: 9999;
            animation: fadeIn 0.3s ease-in-out;
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.animation = 'fadeOut 0.3s ease-in-out';
            setTimeout(() => messageEl.remove(), 300);
        }, 3000);
    }
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Lazy Loading Images
// ============================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ============================================
// Testimonials Carousel
// ============================================

class TestimonialsCarousel {
    constructor() {
        this.track = document.getElementById('testimonialsTrack');
        this.prevBtn = document.getElementById('prevTestimonial');
        this.nextBtn = document.getElementById('nextTestimonial');
        this.dotsContainer = document.getElementById('testimonialDots');
        this.slides = document.querySelectorAll('.testimonial');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        
        if (this.track && this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.createDots();
        this.updateSlide();
        this.startAutoPlay();
        
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.prev();
                this.startAutoPlay();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.next();
                this.startAutoPlay();
            });
        }
        
        // Pause on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'testimonials__dot';
            if (index === 0) dot.classList.add('testimonials__dot--active');
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            
            dot.addEventListener('click', () => {
                this.stopAutoPlay();
                this.goTo(index);
                this.startAutoPlay();
            });
            
            this.dotsContainer.appendChild(dot);
        });
    }
    
    updateSlide() {
        // Remove active class from all
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active to current
        this.slides[this.currentIndex].classList.add('active');
        
        // Move track
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        this.updateDots();
    }
    
    updateDots() {
        if (!this.dotsContainer) return;
        
        const dots = this.dotsContainer.querySelectorAll('.testimonials__dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('testimonials__dot--active', index === this.currentIndex);
        });
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlide();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlide();
    }
    
    goTo(index) {
        this.currentIndex = index;
        this.updateSlide();
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), 4000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// ============================================
// FAQ Accordion
// ============================================

class FAQAccordion {
    constructor() {
        this.items = document.querySelectorAll('.faq__item');
        
        if (this.items.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.items.forEach(item => {
            const question = item.querySelector('.faq__question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('faq__item--active');
                
                // Close all items
                this.items.forEach(otherItem => {
                    otherItem.classList.remove('faq__item--active');
                    const btn = otherItem.querySelector('.faq__question');
                    btn.setAttribute('aria-expanded', 'false');
                });
                
                // If clicked item wasn't active, open it
                if (!isActive) {
                    item.classList.add('faq__item--active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
}

// ============================================
// Initialize All Components
// ============================================

function init() {
    // Initialize header navigation
    new HeaderNavigation();
    
    // Initialize particle animation
    new ParticleAnimation();
    
    // Initialize stats counter
    new StatsCounter();
    
    // Initialize why choose us counter
    new WhyChooseUsCounter();
    
    // Initialize FAQ accordion
    new FAQAccordion();
    
    // Initialize testimonials carousel
    new TestimonialsCarousel();
    
    // Initialize newsletter form
    new NewsletterForm();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize lazy loading
    initLazyLoading();
    
    console.log('CyberAssassin initialized successfully');
}

// ============================================
// Run when DOM is ready
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// Cleanup on page unload
// ============================================
// Contact Modal
// ============================================

class ContactModal {
    constructor() {
        this.modal = document.getElementById('contactModal');
        this.overlay = document.getElementById('contactModalOverlay');
        this.closeBtn = document.getElementById('contactModalClose');
        this.form = document.getElementById('contactForm');
        this.triggers = document.querySelectorAll('[id^="contactTrigger"]:not([id="contactTriggerMobile"]), [id="contactTriggerMobile"]');
        
        this.init();
    }

    init() {
        // Add event listeners to all trigger buttons
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });

        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Overlay click to close
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });

        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // Prevent body scroll when modal is open
        this.observeModalState();
    }

    open() {
        if (!this.modal) return;
        
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        const firstInput = this.modal.querySelector('input, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    close() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Reset form
        if (this.form) {
            this.form.reset();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! We will get back to you soon.');
        
        // Close modal after submission
        this.close();
    }

    observeModalState() {
        // Ensure body scroll is managed correctly
        const observer = new MutationObserver(() => {
            if (this.modal.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        if (this.modal) {
            observer.observe(this.modal, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    }
}

// Initialize Contact Modal when DOM is ready
let contactModal;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        contactModal = new ContactModal();
    });
} else {
    contactModal = new ContactModal();
}

// ============================================
// Legal Modals (Privacy Policy & Terms of Service)
// ============================================

class LegalModal {
    constructor(modalId, overlayId, closeBtnId, triggerId) {
        this.modal = document.getElementById(modalId);
        this.overlay = document.getElementById(overlayId);
        this.closeBtn = document.getElementById(closeBtnId);
        this.trigger = document.getElementById(triggerId);
        
        this.init();
    }

    init() {
        // Trigger button
        if (this.trigger) {
            this.trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        }

        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Overlay click to close
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
                this.close();
            }
        });

        // Prevent body scroll when modal is open
        this.observeModalState();
    }

    open() {
        if (!this.modal) return;
        
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    observeModalState() {
        if (!this.modal) return;
        
        const observer = new MutationObserver(() => {
            if (this.modal.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        observer.observe(this.modal, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
}

// Initialize Legal Modals when DOM is ready
let privacyModal, termsModal;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        privacyModal = new LegalModal('privacyModal', 'privacyModalOverlay', 'privacyModalClose', 'privacyTrigger');
        termsModal = new LegalModal('termsModal', 'termsModalOverlay', 'termsModalClose', 'termsTrigger');
        updateLegalDates();
    });
} else {
    privacyModal = new LegalModal('privacyModal', 'privacyModalOverlay', 'privacyModalClose', 'privacyTrigger');
    termsModal = new LegalModal('termsModal', 'termsModalOverlay', 'termsModalClose', 'termsTrigger');
    updateLegalDates();
}

// Update legal document dates
function updateLegalDates() {
    const privacyDate = document.getElementById('privacyDate');
    const termsDate = document.getElementById('termsDate');
    const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    if (privacyDate) {
        privacyDate.textContent = currentDate;
    }
    if (termsDate) {
        termsDate.textContent = currentDate;
    }
}

// ============================================
// Back to Top Button
// ============================================

class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.scrollThreshold = 300;
        
        this.init();
    }

    init() {
        if (!this.button) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', debounce(() => this.handleScroll(), 10));
        
        // Smooth scroll to top on click
        this.button.addEventListener('click', () => this.scrollToTop());
        
        // Initially hide the button
        this.button.classList.remove('back-to-top--visible');
    }

    handleScroll() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollY > this.scrollThreshold) {
            this.button.classList.add('back-to-top--visible');
        } else {
            this.button.classList.remove('back-to-top--visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Initialize Back to Top when DOM is ready
let backToTop;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        backToTop = new BackToTop();
    });
} else {
    backToTop = new BackToTop();
}

// ============================================
// Update Copyright Year
// ============================================

function updateCopyrightYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Update copyright year on page load
updateCopyrightYear();

// ============================================

window.addEventListener('beforeunload', () => {
    // Cleanup if needed
    console.log('Cleaning up...');
});

