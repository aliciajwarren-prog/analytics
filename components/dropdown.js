// Dropdown Component Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeDropdownDemo();
    initializeAnimationDemo();
    initializeStateButtons();
});

function initializeDropdownDemo() {
    const interactiveDropdown = document.getElementById('interactive-dropdown');
    const dropdownMenu = document.getElementById('interactive-dropdown-menu');
    const demoButtons = document.querySelectorAll('.demo-button');
    
    // Add click handlers for demo buttons
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const state = this.getAttribute('data-state');
            
            // Remove active class from all buttons
            demoButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply state to dropdown
            applyDropdownState(interactiveDropdown, state);
        });
    });
    
    // Add dropdown functionality
    initializeDropdownFunctionality(interactiveDropdown, dropdownMenu);
    
    // Add hover effects to interactive dropdown
    interactiveDropdown.addEventListener('mouseenter', function() {
        if (!this.classList.contains('state-disabled')) {
            this.style.borderColor = 'var(--primary-400)';
        }
    });
    
    interactiveDropdown.addEventListener('mouseleave', function() {
        if (!this.classList.contains('state-disabled') && !this.classList.contains('state-error')) {
            this.style.borderColor = 'var(--outline-variant)';
        }
    });
    
    // Add click animation
    interactiveDropdown.addEventListener('mousedown', function() {
        if (!this.classList.contains('state-disabled')) {
            this.style.transform = 'scale(0.98)';
        }
    });
    
    interactiveDropdown.addEventListener('mouseup', function() {
        if (!this.classList.contains('state-disabled')) {
            this.style.transform = 'scale(1)';
        }
    });
}

function initializeAnimationDemo() {
    const animationDropdown = document.getElementById('animation-dropdown');
    const animateHoverBtn = document.getElementById('animate-hover');
    const animateFocusBtn = document.getElementById('animate-focus');
    const animateErrorBtn = document.getElementById('animate-error');
    const animateResetBtn = document.getElementById('animate-reset');
    
    animateHoverBtn.addEventListener('click', function() {
        resetAnimationDropdown(animationDropdown);
        animationDropdown.classList.add('animate-hover');
        setTimeout(() => {
            animationDropdown.classList.remove('animate-hover');
        }, 600);
    });
    
    animateFocusBtn.addEventListener('click', function() {
        resetAnimationDropdown(animationDropdown);
        animationDropdown.classList.add('animate-focus');
        setTimeout(() => {
            animationDropdown.classList.remove('animate-focus');
        }, 600);
    });
    
    animateErrorBtn.addEventListener('click', function() {
        resetAnimationDropdown(animationDropdown);
        animationDropdown.classList.add('animate-error');
        setTimeout(() => {
            animationDropdown.classList.remove('animate-error');
        }, 600);
    });
    
    animateResetBtn.addEventListener('click', function() {
        resetAnimationDropdown(animationDropdown);
    });
}

function initializeStateButtons() {
    // Add hover effects to state example dropdowns
    const stateDropdowns = document.querySelectorAll('.state-preview .dropdown');
    
    stateDropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            if (!this.classList.contains('state-disabled')) {
                this.style.borderColor = 'var(--primary-400)';
                this.style.transform = 'translateY(-1px)';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (!this.classList.contains('state-disabled') && !this.classList.contains('state-error')) {
                this.style.borderColor = 'var(--outline-variant)';
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

function applyDropdownState(dropdown, state) {
    // Remove all state classes
    dropdown.classList.remove('state-default', 'state-hover', 'state-focus', 'state-disabled', 'state-error');
    
    // Reset styles
    dropdown.style.borderColor = '';
    dropdown.style.backgroundColor = '';
    dropdown.style.boxShadow = '';
    dropdown.style.opacity = '';
    dropdown.style.transform = '';
    
    // Apply new state
    dropdown.classList.add(`state-${state}`);
    
    // Apply state-specific styles
    switch(state) {
        case 'default':
            dropdown.style.borderColor = 'var(--outline-variant)';
            dropdown.style.backgroundColor = 'var(--surface-bright)';
            break;
        case 'hover':
            dropdown.style.borderColor = 'var(--primary-400)';
            dropdown.style.backgroundColor = 'var(--surface-bright)';
            break;
        case 'focus':
            dropdown.style.borderColor = 'var(--primary-400)';
            dropdown.style.backgroundColor = 'var(--surface-bright)';
            dropdown.style.boxShadow = '0 0 0 3px rgba(247, 143, 37, 0.1)';
            break;
        case 'disabled':
            dropdown.style.borderColor = 'var(--outline-variant)';
            dropdown.style.backgroundColor = 'var(--surface-dim)';
            dropdown.style.opacity = '0.6';
            break;
        case 'error':
            dropdown.style.borderColor = 'var(--error)';
            dropdown.style.backgroundColor = 'var(--surface-bright)';
            break;
    }
}

function resetAnimationDropdown(dropdown) {
    // Remove all animation classes
    dropdown.classList.remove('animate-hover', 'animate-focus', 'animate-error');
    
    // Reset styles
    dropdown.style.borderColor = 'var(--outline-variant)';
    dropdown.style.backgroundColor = 'var(--surface-bright)';
    dropdown.style.boxShadow = '';
    dropdown.style.transform = '';
    dropdown.style.opacity = '';
}

// Utility function to create smooth transitions between states
function transitionToState(dropdown, targetState, duration = 300) {
    dropdown.style.transition = `all ${duration}ms ease`;
    applyDropdownState(dropdown, targetState);
    
    // Remove transition after animation completes
    setTimeout(() => {
        dropdown.style.transition = '';
    }, duration);
}

function initializeDropdownFunctionality(dropdown, menu) {
    const dropdownText = dropdown.querySelector('.dropdown-text');
    const chevron = dropdown.querySelector('.dropdown-chevron');
    const options = menu.querySelectorAll('.dropdown-option');
    let isOpen = false;
    let selectedValue = null;
    
    // Toggle dropdown on click
    dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!this.classList.contains('state-disabled')) {
            toggleDropdown();
        }
    });
    
    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            selectOption(this);
        });
        
        // Add keyboard navigation
        option.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectOption(this);
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && !menu.contains(e.target)) {
            closeDropdown();
        }
    });
    
    // Keyboard navigation
    dropdown.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown();
        } else if (e.key === 'Escape') {
            closeDropdown();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!isOpen) {
                openDropdown();
            } else {
                navigateOptions('down');
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (isOpen) {
                navigateOptions('up');
            }
        }
    });
    
    function toggleDropdown() {
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }
    
    function openDropdown() {
        if (dropdown.classList.contains('state-disabled')) return;
        
        isOpen = true;
        menu.classList.add('open');
        chevron.style.transform = 'rotate(180deg)';
        dropdown.style.borderColor = 'var(--primary-400)';
        dropdown.style.boxShadow = '0 0 0 3px rgba(247, 143, 37, 0.1)';
        
        // Focus first option
        const firstOption = options[0];
        if (firstOption) {
            firstOption.focus();
        }
    }
    
    function closeDropdown() {
        isOpen = false;
        menu.classList.remove('open');
        chevron.style.transform = 'rotate(0deg)';
        
        // Reset border color based on current state
        if (dropdown.classList.contains('state-error')) {
            dropdown.style.borderColor = 'var(--error)';
        } else {
            dropdown.style.borderColor = 'var(--outline-variant)';
        }
        dropdown.style.boxShadow = 'none';
    }
    
    function selectOption(option) {
        const value = option.getAttribute('data-value');
        const text = option.textContent;
        
        // Update selected option
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        // Update dropdown text
        dropdownText.textContent = text;
        dropdownText.style.color = 'var(--on-surface)';
        
        selectedValue = value;
        closeDropdown();
        
        // Trigger change event
        dropdown.dispatchEvent(new CustomEvent('change', {
            detail: { value, text }
        }));
    }
    
    function navigateOptions(direction) {
        const currentIndex = Array.from(options).findIndex(opt => opt === document.activeElement);
        let nextIndex;
        
        if (direction === 'down') {
            nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        }
        
        options[nextIndex].focus();
    }
}

// Export functions for external use
window.DropdownComponent = {
    applyDropdownState,
    resetAnimationDropdown,
    transitionToState,
    initializeDropdownFunctionality
};
