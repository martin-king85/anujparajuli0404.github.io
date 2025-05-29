// Global variables
let isScrolling = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTypewriter();
    initializeAnimations();
    initializeScrollEffects();
    initializeParticles();
    initializeContactForm();
    initializeMobileMenu();
});

// Navigation functionality
function initializeNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navDots = document.querySelectorAll('.nav-dot');
    const progressBar = document.querySelector('.progress-bar');
    
    // Scroll event handler
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 100;
        nav.classList.toggle('scrolled', scrolled);
        
        // Update progress bar
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / maxScroll) * 100;
        progressBar.style.width = Math.min(100, progress) + '%';
        
        // Update active section
        updateActiveSection();
    });
    
    // Add click handlers for nav links and dots
    [...navLinks, ...navDots].forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.dataset.section || this.getAttribute('href').substring(1);
            scrollToSection(sectionId);
        });
    });
}

// Update active navigation items based on scroll position
function updateActiveSection() {
    const sections = ['hero', 'about', 'skills', 'projects', 'services', 'contact'];
    let activeSection = 'hero';
    
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                activeSection = sectionId;
            }
        }
    });
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.section === activeSection);
    });
    
    // Update nav dots
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.section === activeSection);
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        isScrolling = true;
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Reset scrolling flag after animation
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
}

// Typewriter effect
function initializeTypewriter() {
    const typewriter = document.getElementById('typewriter');
    const text = "Crafting seamless digital experiences with cyber-precision.";
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            typewriter.textContent = text.slice(0, i + 1);
            i++;
            setTimeout(typeChar, 100);
        }
    }
    
    // Start typewriter after a short delay
    setTimeout(typeChar, 1000);
}

// Initialize animations
function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay * 1000);
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    document.querySelectorAll('[data-delay]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animate progress bars when they come into view
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill) {
                    progressFill.style.width = progressFill.parentElement.dataset.width || '85%';
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.progress-bar-skill').forEach(el => {
        progressObserver.observe(el);
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Parallax effects for background elements
    window.addEventListener('scroll', function() {
        if (isScrolling) return;
        
        const scrolled = window.scrollY;
        const parallaxElements = document.querySelectorAll('.circuit-bg, .animated-grid');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Create floating particles
function initializeParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Create 50 particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (3 + Math.random() * 2) + 's';
        
        particlesContainer.appendChild(particle);
    }
    
    // Add floating particles to contact section
    const contactBg = document.querySelector('.contact-bg');
    if (contactBg) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'absolute';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (3 + Math.random() * 2) + 's';
            particle.style.opacity = '0.4';
            
            contactBg.appendChild(particle);
        }
    }
}

// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Show success message (you can customize this)
        showNotification('Message transmitted successfully!', 'success');
        
        // Reset form
        form.reset();
    });
    
    // Add focus effects to form inputs
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenu) return;
    
    mobileMenu.addEventListener('click', function() {
        // Toggle mobile menu (you can expand this for a proper mobile menu)
        console.log('Mobile menu clicked');
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--glass-bg);
        border: 1px solid var(--neon-${type === 'success' ? 'green' : 'blue'});
        backdrop-filter: blur(10px);
        color: var(--neon-${type === 'success' ? 'green' : 'blue'});
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-family: 'Exo 2', sans-serif;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility functions
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

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    // Add subtle mouse tracking effects
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Add keyboard shortcuts for navigation
    if (e.altKey) {
        switch(e.key) {
            case '1':
                scrollToSection('hero');
                break;
            case '2':
                scrollToSection('about');
                break;
            case '3':
                scrollToSection('skills');
                break;
            case '4':
                scrollToSection('projects');
                break;
            case '5':
                scrollToSection('services');
                break;
            case '6':
                scrollToSection('contact');
                break;
        }
    }
});

// Add window resize handler
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments
    updateActiveSection();
}, 250));