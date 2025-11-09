// Input Component Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeInputDemo();
    initializeInputStates();
});

function initializeInputDemo() {
    const interactiveInput = document.getElementById('interactive-input');
    const demoButtons = document.querySelectorAll('.demo-button');
    
    // Add click handlers for demo buttons
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const state = this.getAttribute('data-state');
            
            // Remove active class from all buttons
            demoButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply state to input
            applyInputState(interactiveInput, state);
        });
    });
    
    // Add focus effects to interactive input
    const inputField = interactiveInput.querySelector('.input-field');
    
    inputField.addEventListener('focus', function() {
        if (!this.disabled) {
            interactiveInput.classList.remove('state-default', 'state-error');
            interactiveInput.classList.add('state-focus');
        }
    });
    
    inputField.addEventListener('blur', function() {
        if (!this.disabled && !interactiveInput.classList.contains('state-error')) {
            interactiveInput.classList.remove('state-focus');
            interactiveInput.classList.add('state-default');
        }
    });
    
    // Add input change handler
    inputField.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            interactiveInput.classList.remove('state-default', 'state-focus');
            interactiveInput.classList.add('state-filled');
        } else {
            interactiveInput.classList.remove('state-filled');
            interactiveInput.classList.add('state-default');
        }
    });
}

function initializeInputStates() {
    // Add hover effects to state example inputs
    const stateInputs = document.querySelectorAll('.state-preview .input');
    
    stateInputs.forEach(input => {
        const inputField = input.querySelector('.input-field');
        
        input.addEventListener('mouseenter', function() {
            if (!this.classList.contains('state-disabled') && !this.classList.contains('state-error')) {
                this.style.borderColor = 'var(--primary-400)';
            }
        });
        
        input.addEventListener('mouseleave', function() {
            if (!this.classList.contains('state-disabled') && !this.classList.contains('state-error')) {
                this.style.borderColor = '';
            }
        });
        
        // Add focus effects
        if (inputField) {
            inputField.addEventListener('focus', function() {
                if (!this.disabled) {
                    input.classList.remove('state-default', 'state-error');
                    input.classList.add('state-focus');
                }
            });
            
            inputField.addEventListener('blur', function() {
                if (!this.disabled && !input.classList.contains('state-error')) {
                    input.classList.remove('state-focus');
                    input.classList.add('state-default');
                }
            });
        }
    });
}


function applyInputState(input, state) {
    // Remove all state classes
    input.classList.remove('state-default', 'state-focus', 'state-disabled', 'state-filled', 'state-error');
    
    // Reset styles
    input.style.borderColor = '';
    input.style.backgroundColor = '';
    input.style.boxShadow = '';
    input.style.opacity = '';
    
    const inputField = input.querySelector('.input-field');
    
    // Apply new state
    input.classList.add(`state-${state}`);
    
    // Apply state-specific styles and content
    switch(state) {
        case 'default':
            input.style.borderColor = 'var(--outline-variant)';
            input.style.backgroundColor = 'var(--surface-bright)';
            inputField.placeholder = 'Default';
            inputField.value = '';
            inputField.disabled = false;
            break;
        case 'focus':
            input.style.borderColor = 'var(--primary-400)';
            input.style.backgroundColor = 'var(--surface-bright)';
            input.style.boxShadow = '0 0 0 3px rgba(247, 143, 37, 0.1)';
            inputField.placeholder = 'Focus';
            inputField.value = '';
            inputField.disabled = false;
            break;
        case 'disabled':
            input.style.borderColor = 'var(--outline-variant)';
            input.style.backgroundColor = 'var(--surface-dim)';
            input.style.opacity = '0.6';
            inputField.placeholder = 'Disabled';
            inputField.value = '';
            inputField.disabled = true;
            break;
        case 'filled':
            input.style.borderColor = 'var(--outline-variant)';
            input.style.backgroundColor = 'var(--surface-bright)';
            inputField.placeholder = '';
            inputField.value = 'Filled';
            inputField.disabled = false;
            break;
        case 'error':
            input.style.borderColor = 'var(--error)';
            input.style.backgroundColor = 'var(--surface-bright)';
            inputField.placeholder = 'Error';
            inputField.value = '';
            inputField.disabled = false;
            break;
    }
}

// Utility function to create smooth transitions between states
function transitionToState(input, targetState, duration = 300) {
    input.style.transition = `all ${duration}ms ease`;
    applyInputState(input, targetState);
    
    // Remove transition after animation completes
    setTimeout(() => {
        input.style.transition = '';
    }, duration);
}

// Export functions for external use
window.InputComponent = {
    applyInputState,
    transitionToState,
    initializeInputDemo,
    initializeInputStates,
    initializeDropdownStates
};
