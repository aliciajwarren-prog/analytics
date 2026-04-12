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

    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const state = this.getAttribute('data-state');
            demoButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            applyDropdownState(interactiveDropdown, state);
        });
    });

    initializeDropdownFunctionality(interactiveDropdown, dropdownMenu);

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
    const stateDropdowns = document.querySelectorAll('.state-preview .dropdown, .state-preview .dropdown-combo');
    
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
    dropdown.classList.remove('state-default', 'state-hover', 'state-focus', 'state-disabled', 'state-error');
    dropdown.style.borderColor = '';
    dropdown.style.backgroundColor = '';
    dropdown.style.boxShadow = '';
    dropdown.style.opacity = '';
    dropdown.style.transform = '';

    dropdown.classList.add(`state-${state}`);

    // Update ARIA attributes based on state
    if (state === 'disabled') {
        dropdown.setAttribute('aria-disabled', 'true');
        dropdown.setAttribute('tabindex', '-1');
    } else {
        dropdown.removeAttribute('aria-disabled');
        dropdown.setAttribute('tabindex', '0');
    }
    if (state === 'error') {
        dropdown.setAttribute('aria-invalid', 'true');
    } else {
        dropdown.removeAttribute('aria-invalid');
    }

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

    dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!this.classList.contains('state-disabled') && this.getAttribute('aria-disabled') !== 'true') {
            toggleDropdown();
        }
    });
    
    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            selectOption(this);
        });
        
        // Keyboard navigation within options
        option.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectOption(this);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                navigateOptions('down');
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                navigateOptions('up');
            } else if (e.key === 'Home') {
                e.preventDefault();
                options[0].focus();
            } else if (e.key === 'End') {
                e.preventDefault();
                options[options.length - 1].focus();
            } else if (e.key === 'Escape' || e.key === 'Tab') {
                closeDropdown(true);
            }
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && !menu.contains(e.target)) {
            closeDropdown(false);
        }
    });

    dropdown.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown();
        } else if (e.key === 'Escape') {
            closeDropdown(true);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!isOpen) {
                openDropdown();
            } else {
                navigateOptions('down');
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (!isOpen) {
                openDropdown('last');
            } else {
                navigateOptions('up');
            }
        } else if (e.key === 'Home' && isOpen) {
            e.preventDefault();
            options[0].focus();
        } else if (e.key === 'End' && isOpen) {
            e.preventDefault();
            options[options.length - 1].focus();
        }
    });
    
    function toggleDropdown() {
        if (isOpen) {
            closeDropdown(true);
        } else {
            openDropdown();
        }
    }
    
    function openDropdown(focusTarget) {
        if (dropdown.classList.contains('state-disabled') || dropdown.getAttribute('aria-disabled') === 'true') return;
        isOpen = true;
        menu.classList.add('open');
        chevron.style.transform = 'rotate(180deg)';
        dropdown.style.borderColor = 'var(--primary-400)';
        dropdown.style.boxShadow = '0 0 0 3px rgba(247, 143, 37, 0.1)';
        dropdown.setAttribute('aria-expanded', 'true');
        const target = focusTarget === 'last' ? options[options.length - 1] : options[0];
        if (target) target.focus();
    }

    function closeDropdown(returnFocus) {
        isOpen = false;
        menu.classList.remove('open');
        chevron.style.transform = 'rotate(0deg)';
        dropdown.setAttribute('aria-expanded', 'false');
        const activeBtn = document.querySelector('.demo-section .demo-button.active');
        const state = activeBtn ? activeBtn.getAttribute('data-state') : 'default';
        applyDropdownState(dropdown, state);
        if (returnFocus) dropdown.focus();
    }

    function selectOption(option) {
        const value = option.getAttribute('data-value');
        const text = option.textContent.trim();
        options.forEach(opt => {
            opt.classList.remove('selected');
            opt.setAttribute('aria-selected', 'false');
        });
        option.classList.add('selected');
        option.setAttribute('aria-selected', 'true');
        if (dropdownText) {
            dropdownText.textContent = text;
            dropdownText.style.color = 'var(--on-surface)';
        }
        selectedValue = value;
        closeDropdown(true);
        dropdown.dispatchEvent(new CustomEvent('change', { detail: { value, text } }));
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
