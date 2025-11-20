/**
 * Multi-Step Form Navigation
 * Handles step transitions and slider value updates
 */

// Current step tracker
let currentStep = 1;
const totalSteps = 3;

// Get elements
const formSteps = document.querySelectorAll('.form-step');
const stepIndicators = document.querySelectorAll('.step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

/**
 * Show the specified step and hide others
 */
function showStep(stepNumber) {
    // Hide all steps
    formSteps.forEach(step => {
        step.classList.remove('active');
    });

    // Show current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }

    // Update step indicators
    stepIndicators.forEach((indicator, index) => {
        indicator.classList.remove('active', 'completed');
        if (index + 1 < stepNumber) {
            indicator.classList.add('completed');
        } else if (index + 1 === stepNumber) {
            indicator.classList.add('active');
        }
    });

    // Update button visibility
    updateButtons(stepNumber);
}

/**
 * Update button visibility based on current step
 */
function updateButtons(stepNumber) {
    // Back button
    if (stepNumber === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-block';
    }

    // Next/Submit buttons
    if (stepNumber === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
}

/**
 * Navigate to next step
 */
function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

/**
 * Navigate to previous step
 */
function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

/**
 * Update slider value display
 */
function updateSliderValue(sliderId, displayId, prefix = '', suffix = '') {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(displayId);

    if (slider && display) {
        slider.addEventListener('input', function() {
            let value = this.value;

            // Format value with commas for thousands
            if (sliderId === 'equipmentLossValue') {
                value = parseInt(value).toLocaleString();
            }

            display.textContent = prefix + value + suffix;
        });
    }
}

/**
 * Initialize the form
 */
function initForm() {
    // Show first step
    showStep(1);

    // Set up slider value updates
    updateSliderValue('csrCount', 'csrCountValue');
    updateSliderValue('billerCount', 'billerCountValue');
    updateSliderValue('dispatcherCount', 'dispatcherCountValue');
    updateSliderValue('warehouseCount', 'warehouseCountValue');
    updateSliderValue('equipmentLossValue', 'equipmentLossValueDisplay', '$');

    // Button event listeners
    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);

    // Click on step indicator to navigate
    stepIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            // Allow clicking on any step
            currentStep = index + 1;
            showStep(currentStep);
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
} else {
    initForm();
}
