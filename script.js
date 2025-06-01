// Application state
let checklistState = {};
let notes = '';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadState();
    initializeEventListeners();
    updateProgress();
});

// Load saved state
function loadState() {
    const savedState = localStorage.getItem('codeReviewChecklistState');
    const savedNotes = localStorage.getItem('codeReviewNotes');
    
    if (savedState) {
        checklistState = JSON.parse(savedState);
        restoreCheckboxStates();
    }
    
    if (savedNotes) {
        notes = savedNotes;
        document.getElementById('notesArea').value = notes;
    }
}

// Restore checkbox states
function restoreCheckboxStates() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    checkboxes.forEach((checkbox, index) => {
        if (checklistState[index]) {
            checkbox.checked = true;
            checkbox.parentElement.classList.add('checked');
        }
    });
}

// Initialize event listeners
function initializeEventListeners() {
    // Checkboxes
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function() {
            handleCheckboxChange(this, index);
        });
    });
    
    // Section titles (collapse/expand)
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('click', function() {
            toggleSection(this);
        });
    });
    
    // Control buttons
    document.getElementById('resetBtn').addEventListener('click', resetChecklist);
    document.getElementById('expandBtn').addEventListener('click', toggleAllSections);
    document.getElementById('saveNotesBtn').addEventListener('click', saveNotes);
    
    // Auto-save notes
    document.getElementById('notesArea').addEventListener('input', function() {
        notes = this.value;
    });
}

// Handle checkbox change
function handleCheckboxChange(checkbox, index) {
    const checkboxItem = checkbox.parentElement;
    
    if (checkbox.checked) {
        checkboxItem.classList.add('checked');
        checklistState[index] = true;
    } else {
        checkboxItem.classList.remove('checked');
        checklistState[index] = false;
    }
    
    saveState();
    updateProgress();
}

// Update progress bar
function updateProgress() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    const checkedCount = document.querySelectorAll('.checklist-checkbox:checked').length;
    const totalCount = checkboxes.length;
    const percentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
    
    document.getElementById('progressBar').style.width = percentage + '%';
    document.getElementById('progressText').textContent = `${percentage}% complete (${checkedCount} of ${totalCount})`;
}

// Toggle section collapse/expand
function toggleSection(titleElement) {
    const content = titleElement.nextElementSibling;
    titleElement.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
}

// Toggle all sections
function toggleAllSections() {
    const button = document.getElementById('expandBtn');
    const sections = document.querySelectorAll('.section-title');
    const allCollapsed = Array.from(sections).every(s => s.classList.contains('collapsed'));
    
    sections.forEach(section => {
        const content = section.nextElementSibling;
        if (allCollapsed) {
            section.classList.remove('collapsed');
            content.classList.remove('collapsed');
        } else {
            section.classList.add('collapsed');
            content.classList.add('collapsed');
        }
    });
    
    button.textContent = allCollapsed ? 'Collapse All' : 'Expand All';
}

// Reset checklist
function resetChecklist() {
    if (confirm('Are you sure you want to reset the entire checklist?')) {
        const checkboxes = document.querySelectorAll('.checklist-checkbox');
        checkboxes.forEach((checkbox, index) => {
            checkbox.checked = false;
            checkbox.parentElement.classList.remove('checked');
            checklistState[index] = false;
        });
        
        saveState();
        updateProgress();
    }
}

// Save notes
function saveNotes() {
    localStorage.setItem('codeReviewNotes', notes);
    showNotification('Notes saved!');
}

// Save state
function saveState() {
    localStorage.setItem('codeReviewChecklistState', JSON.stringify(checklistState));
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
