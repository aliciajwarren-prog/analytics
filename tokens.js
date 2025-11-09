// Tokens Page Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCopyToClipboard();
    initializeColorPreview();
    initializeTypographyPreview();
});

function initializeCopyToClipboard() {
    const colorItems = document.querySelectorAll('.color-item');
    const typographyItems = document.querySelectorAll('.typography-item');
    const siteTokenItems = document.querySelectorAll('.site-token-item');
    
    // Add copy functionality to color items
    colorItems.forEach(item => {
        item.addEventListener('click', function() {
            const colorValue = this.querySelector('.color-value').textContent;
            copyToClipboard(colorValue, this);
        });
    });
    
    // Add copy functionality to typography items
    typographyItems.forEach(item => {
        item.addEventListener('click', function() {
            const typographyValue = this.querySelector('.typography-value').textContent;
            copyToClipboard(typographyValue, this);
        });
    });
    
    // Add copy functionality to site token items
    siteTokenItems.forEach(item => {
        item.addEventListener('click', function() {
            const siteTokenValue = this.querySelector('.site-token-value').textContent;
            copyToClipboard(siteTokenValue, this);
        });
    });
}

function copyToClipboard(text, element) {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        showCopyFeedback(element);
    } catch (err) {
        console.error('Failed to copy text: ', err);
        // Fallback for modern browsers
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showCopyFeedback(element);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    }
    
    // Clean up
    document.body.removeChild(textarea);
}

function showCopyFeedback(element) {
    // Remove any existing feedback
    element.classList.remove('copied');
    
    // Add copied class
    element.classList.add('copied');
    
    // Remove feedback after 2 seconds
    setTimeout(() => {
        element.classList.remove('copied');
    }, 2000);
}

function initializeColorPreview() {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('mouseenter', function() {
            showColorTooltip(this);
        });
        
        swatch.addEventListener('mouseleave', function() {
            hideColorTooltip();
        });
    });
}

function showColorTooltip(swatch) {
    const colorValue = swatch.style.backgroundColor;
    const rect = swatch.getBoundingClientRect();
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'color-tooltip';
    tooltip.textContent = colorValue;
    tooltip.style.cssText = `
        position: fixed;
        top: ${rect.top - 40}px;
        left: ${rect.left + rect.width / 2}px;
        transform: translateX(-50%);
        background: var(--on-surface);
        color: var(--surface-bright);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-family: monospace;
        z-index: 1000;
        pointer-events: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(tooltip);
}

function hideColorTooltip() {
    const tooltip = document.querySelector('.color-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

function initializeTypographyPreview() {
    const typographySamples = document.querySelectorAll('.typography-sample');
    
    typographySamples.forEach(sample => {
        sample.addEventListener('mouseenter', function() {
            showTypographyTooltip(this);
        });
        
        sample.addEventListener('mouseleave', function() {
            hideTypographyTooltip();
        });
    });
}

function showTypographyTooltip(sample) {
    const rect = sample.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(sample);
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'typography-tooltip';
    tooltip.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 4px;">Typography Details</div>
        <div>Font: ${computedStyle.fontFamily}</div>
        <div>Size: ${computedStyle.fontSize}</div>
        <div>Weight: ${computedStyle.fontWeight}</div>
        <div>Line Height: ${computedStyle.lineHeight}</div>
    `;
    tooltip.style.cssText = `
        position: fixed;
        top: ${rect.top - 120}px;
        left: ${rect.left + rect.width / 2}px;
        transform: translateX(-50%);
        background: var(--on-surface);
        color: var(--surface-bright);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 11px;
        font-family: monospace;
        z-index: 1000;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        max-width: 200px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(tooltip);
}

function hideTypographyTooltip() {
    const tooltip = document.querySelector('.typography-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Utility function to generate CSS custom properties
function generateCSSVariables() {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    const variables = {};
    
    // Extract all CSS custom properties
    for (let i = 0; i < computedStyle.length; i++) {
        const property = computedStyle[i];
        if (property.startsWith('--')) {
            variables[property] = computedStyle.getPropertyValue(property).trim();
        }
    }
    
    return variables;
}

// Export functions for external use
window.TokensPage = {
    copyToClipboard,
    generateCSSVariables,
    showColorTooltip,
    hideColorTooltip,
    showTypographyTooltip,
    hideTypographyTooltip
};
