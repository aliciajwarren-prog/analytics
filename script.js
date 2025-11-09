// Interactive functionality for the design system
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdown interactions
    initializeDropdowns();
    
    // Initialize smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Initialize component card animations
    initializeCardAnimations();
});

function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        // Add hover effects
        dropdown.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.borderColor = 'var(--primary-400)';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (!this.disabled && !this.classList.contains('error')) {
                this.style.borderColor = 'var(--outline-variant)';
            }
        });
        
        // Add focus effects
        dropdown.addEventListener('focus', function() {
            if (!this.disabled) {
                this.style.borderColor = 'var(--primary-400)';
                this.style.boxShadow = '0 0 0 3px rgba(247, 143, 37, 0.1)';
            }
        });
        
        dropdown.addEventListener('blur', function() {
            if (!this.disabled && !this.classList.contains('error')) {
                this.style.borderColor = 'var(--outline-variant)';
                this.style.boxShadow = 'none';
            }
        });
        
        // Add click animation
        dropdown.addEventListener('mousedown', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.98)';
            }
        });
        
        dropdown.addEventListener('mouseup', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(1)';
            }
        });
    });
}

function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function initializeCardAnimations() {
    const componentCards = document.querySelectorAll('.component-card');
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    componentCards.forEach(card => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(card);
    });
}

// Utility function to create animated state transitions
function animateStateTransition(element, newState, duration = 300) {
    element.style.transition = `all ${duration}ms ease`;
    
    // Remove existing state classes
    element.classList.remove('default', 'hover', 'focus', 'disabled', 'error');
    
    // Add new state class
    element.classList.add(newState);
    
    // Apply state-specific styles
    switch(newState) {
        case 'default':
            element.style.borderColor = 'var(--outline-variant)';
            element.style.backgroundColor = 'var(--surface-bright)';
            break;
        case 'hover':
            element.style.borderColor = 'var(--primary-400)';
            element.style.backgroundColor = 'var(--surface-bright)';
            break;
        case 'focus':
            element.style.borderColor = 'var(--primary-400)';
            element.style.boxShadow = '0 0 0 3px rgba(247, 143, 37, 0.1)';
            break;
        case 'disabled':
            element.style.borderColor = 'var(--outline-variant)';
            element.style.backgroundColor = 'var(--surface-dim)';
            element.style.opacity = '0.6';
            break;
        case 'error':
            element.style.borderColor = 'var(--error)';
            element.style.backgroundColor = 'var(--surface-bright)';
            break;
    }
}

// Export functions for use in component pages
window.DesignSystem = {
    animateStateTransition,
    initializeDropdowns,
    initializeSmoothScrolling,
    initializeCardAnimations
};
