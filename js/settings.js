// Settings navigation functionality
const navItems = document.querySelectorAll('.settings-nav-item');
const settingsSections = document.querySelectorAll('.settings-section');

navItems.forEach(item => {
  item.addEventListener('click', function() {
    // Update active nav item
    navItems.forEach(navItem => navItem.classList.remove('active'));
    this.classList.add('active');
    
    // Show corresponding section
    const targetId = this.getAttribute('data-target');
    settingsSections.forEach(section => {
      section.classList.remove('active');
      if (section.id === targetId) {
        section.classList.add('active');
      }
    });
  });
});

// Toggle switches functionality
const toggleSwitches = document.querySelectorAll('.toggle input[type="checkbox"]');

toggleSwitches.forEach(toggle => {
  const statusElement = toggle.closest('.toggle-wrapper').querySelector('.toggle-status');
  
  // Set initial status
  updateToggleStatus(toggle, statusElement);
  
  // Update status on change
  toggle.addEventListener('change', function() {
    updateToggleStatus(this, statusElement);
  });
});

function updateToggleStatus(toggle, statusElement) {
  if (toggle.checked) {
    statusElement.textContent = 'On';
    statusElement.style.color = 'var(--primary-color)';
  } else {
    statusElement.textContent = 'Off';
    statusElement.style.color = 'var(--neutral-600)';
  }
}

// Theme options selection
const themeOptions = document.querySelectorAll('.theme-option');

themeOptions.forEach(option => {
  option.addEventListener('click', function() {
    themeOptions.forEach(opt => opt.classList.remove('active'));
    this.classList.add('active');
  });
});

// Color accent selection
const colorOptions = document.querySelectorAll('.color-option');

colorOptions.forEach(option => {
  option.addEventListener('click', function() {
    colorOptions.forEach(opt => opt.classList.remove('active'));
    this.classList.add('active');
    
    // Update primary color (in a real app, this would apply the selected color)
    const selectedColor = this.style.backgroundColor;
    document.documentElement.style.setProperty('--primary-color', selectedColor);
    
    // Update matching dark color
    const darkerColor = darkenColor(selectedColor, 0.2);
    document.documentElement.style.setProperty('--primary-dark', darkerColor);
    
    // Update matching light color
    const lighterColor = lightenColor(selectedColor, 0.2);
    document.documentElement.style.setProperty('--primary-light', lighterColor);
  });
});

// Helper functions for color manipulation
function darkenColor(color, amount) {
  // Simple RGB darkening - in a real app, use a proper color manipulation library
  return color; // Placeholder - would actually darken the color
}

function lightenColor(color, amount) {
  // Simple RGB lightening - in a real app, use a proper color manipulation library
  return color; // Placeholder - would actually lighten the color
}

// Date range custom option
const dateRangeSelect = document.getElementById('dateRange');
const customDateRange = document.querySelector('.date-range-custom');

dateRangeSelect.addEventListener('change', function() {
  if (this.value === 'custom') {
    customDateRange.style.display = 'block';
  } else {
    customDateRange.style.display = 'none';
  }
});

// Export button functionality
const exportBtn = document.querySelector('.export-btn');

exportBtn.addEventListener('click', function() {
  // Get selected data types
  const dataTypes = [];
  document.querySelectorAll('.export-options input[type="checkbox"]:checked').forEach(checkbox => {
    dataTypes.push(checkbox.nextElementSibling.textContent.trim());
  });
  
  // Get date range
  const dateRange = dateRangeSelect.value;
  
  // Get export format
  const format = document.getElementById('exportFormat').value;
  
  // Show export confirmation (in a real app, this would trigger actual export)
  alert(`Exporting ${dataTypes.join(', ')} for ${dateRange} in ${format.toUpperCase()} format`);
});

// Save buttons for each settings form
const saveButtons = document.querySelectorAll('.btn.primary:not(.export-btn)');

saveButtons.forEach(button => {
  button.addEventListener('click', function() {
    const form = this.closest('.settings-form');
    const sectionTitle = this.closest('.settings-section').querySelector('.settings-title').textContent;
    
    // Show save confirmation (in a real app, this would save settings)
    alert(`${sectionTitle} settings saved successfully!`);
  });
});

// Download buttons for previous exports
const downloadButtons = document.querySelectorAll('.download-btn');

downloadButtons.forEach(button => {
  button.addEventListener('click', function() {
    const fileName = this.closest('.export-item').querySelector('.export-name').textContent;
    
    // Show download confirmation (in a real app, this would trigger actual download)
    alert(`Downloading ${fileName}`);
  });
});

// Form validation (basic example)
const accountForm = document.querySelector('#account-settings .settings-form');

accountForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  if (!validateEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  const password = document.getElementById('password').value;
  if (password && password.length < 8) {
    alert('Password must be at least 8 characters long');
    return;
  }
  
  // If validation passes, submit form
  alert('Account settings saved successfully!');
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
