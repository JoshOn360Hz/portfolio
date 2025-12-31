// Window z-index management
let topZIndex = 9000;

function bringToFront(windowEl) {
    topZIndex++;
    windowEl.style.zIndex = topZIndex;
}

// Safari window controls
function toggleSafari() {
    const safariWindow = document.getElementById('safari-window');
    const safariIcon = document.getElementById('safari-icon');
    
    // If window is already open, just bring to front
    if (safariWindow.style.display === 'block') {
        bringToFront(safariWindow);
        return;
    }
    
    // Open the window
    safariWindow.style.display = 'block';
    safariIcon.classList.add('open');
    bringToFront(safariWindow);
    
    // Bounce animation only when opening
    safariIcon.classList.add('bounce');
    setTimeout(() => {
        safariIcon.classList.remove('bounce');
    }, 600);
}

function closeSafari() {
    const safariWindow = document.getElementById('safari-window');
    const safariIcon = document.getElementById('safari-icon');
    safariWindow.style.display = 'none';
    safariIcon.classList.remove('open');
}

// Terminal window controls
function toggleTerminal() {
    const terminalWindow = document.getElementById('terminal-window');
    const terminalIcon = document.getElementById('terminal-icon');
    
    // If window is already open, just bring to front
    if (terminalWindow.style.display === 'block') {
        bringToFront(terminalWindow);
        return;
    }
    
    // Open the window
    terminalWindow.style.display = 'block';
    terminalIcon.classList.add('open');
    bringToFront(terminalWindow);
    
    // Bounce animation only when opening
    terminalIcon.classList.add('bounce');
    setTimeout(() => {
        terminalIcon.classList.remove('bounce');
    }, 600);
}

function closeTerminal() {
    const terminalWindow = document.getElementById('terminal-window');
    const terminalIcon = document.getElementById('terminal-icon');
    terminalWindow.style.display = 'none';
    terminalIcon.classList.remove('open');
}

// Experience window controls
function toggleExperience() {
    const experienceWindow = document.getElementById('experience-window');
    const experienceIcon = document.getElementById('experience-icon');
    
    // If window is already open, just bring to front
    if (experienceWindow.style.display === 'block') {
        bringToFront(experienceWindow);
        return;
    }
    
    // Open the window
    experienceWindow.style.display = 'block';
    experienceIcon.classList.add('open');
    bringToFront(experienceWindow);
    
    // Bounce animation only when opening
    experienceIcon.classList.add('bounce');
    setTimeout(() => {
        experienceIcon.classList.remove('bounce');
    }, 600);
}

function closeExperience() {
    const experienceWindow = document.getElementById('experience-window');
    const experienceIcon = document.getElementById('experience-icon');
    experienceWindow.style.display = 'none';
    experienceIcon.classList.remove('open');
}

// App Store window controls
function toggleAppStore() {
    const appstoreWindow = document.getElementById('appstore-window');
    const appstoreIcon = document.getElementById('appstore-icon');
    
    // If window is already open, just bring to front
    if (appstoreWindow.style.display === 'block') {
        bringToFront(appstoreWindow);
        return;
    }
    
    // Open the window
    appstoreWindow.style.display = 'block';
    appstoreIcon.classList.add('open');
    bringToFront(appstoreWindow);
    
    // Bounce animation only when opening
    appstoreIcon.classList.add('bounce');
    setTimeout(() => {
        appstoreIcon.classList.remove('bounce');
    }, 600);
}

function closeAppStore() {
    const appstoreWindow = document.getElementById('appstore-window');
    const appstoreIcon = document.getElementById('appstore-icon');
    appstoreWindow.style.display = 'none';
    appstoreIcon.classList.remove('open');
}

// About window controls
function toggleAboutWindow() {
    const aboutWindow = document.getElementById('about-window');
    
    // If window is already open, just bring to front
    if (aboutWindow.style.display === 'block') {
        bringToFront(aboutWindow);
        return;
    }
    
    // Open the window
    aboutWindow.style.display = 'block';
    bringToFront(aboutWindow);
}

function closeAboutWindow() {
    const aboutWindow = document.getElementById('about-window');
    aboutWindow.style.display = 'none';
}

// Apple dropdown controls
function toggleAboutDropdown() {
    const dropdown = document.getElementById('apple-dropdown');
    if (dropdown.style.display === 'none' || !dropdown.style.display) {
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

// Downloads stack controls
function toggleDownloads() {
    const stack = document.getElementById('downloads-stack');
    const downloadsIcon = document.querySelector('[data-app="downloads"]');
    
    if (stack.style.display === 'none' || !stack.style.display) {
        // Show stack temporarily to get dimensions
        stack.style.display = 'block';
        stack.style.visibility = 'hidden';
        
        // Get stack dimensions and icon position
        const stackWidth = stack.offsetWidth;
        const stackHeight = stack.offsetHeight;
        const iconRect = downloadsIcon.getBoundingClientRect();
        
        // Calculate position - center above the icon
        let left = iconRect.left + (iconRect.width / 2) - (stackWidth / 2);
        let top = iconRect.top - stackHeight - 24; // 24px gap above icon
        
        // Adjust if stack would go off right edge
        if (left + stackWidth > window.innerWidth - 10) {
            left = window.innerWidth - stackWidth - 10;
        }
        
        // Adjust if stack would go off left edge
        if (left < 10) {
            left = 10;
        }
        
        // Calculate arrow position relative to stack
        const arrowLeft = iconRect.left + (iconRect.width / 2) - left;
        stack.style.setProperty('--arrow-left', arrowLeft + 'px');
        
        // Position and show stack
        stack.style.left = left + 'px';
        stack.style.top = top + 'px';
        stack.style.visibility = 'visible';
    } else {
        stack.style.display = 'none';
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('apple-dropdown');
    const appleLogo = document.querySelector('.apple-logo');
    const downloadsStack = document.getElementById('downloads-stack');
    const downloadsIcon = document.querySelector('[data-app="downloads"]');
    
    if (dropdown && appleLogo && !appleLogo.contains(event.target)) {
        dropdown.style.display = 'none';
    }
    
    if (downloadsStack && downloadsIcon && !downloadsIcon.contains(event.target) && !downloadsStack.contains(event.target)) {
        downloadsStack.style.display = 'none';
    }
});

function loadInSafari(url) {
    const safariWindow = document.getElementById('safari-window');
    const safariIcon = document.getElementById('safari-icon');
    const iframe = safariWindow.querySelector('iframe');
    const addressBar = safariWindow.querySelector('.address-bar span');
    
    // Load URL in iframe
    iframe.src = url;
    
    // Update address bar
    try {
        const urlObj = new URL(url);
        addressBar.textContent = urlObj.hostname;
    } catch (e) {
        addressBar.textContent = url;
    }
    
    // Show Safari if hidden
    if (safariWindow.style.display !== 'block') {
        safariWindow.style.display = 'block';
        safariIcon.classList.add('open');
    }
    
    bringToFront(safariWindow);
}

// Make window draggable
function makeWindowDraggable(windowId, dragHandleId) {
    const windowEl = document.getElementById(windowId);
    const dragHandle = document.getElementById(dragHandleId);
    
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    const menuBarHeight = 24; // Height of the menu bar
    
    dragHandle.addEventListener('mousedown', function(e) {
        // Don't drag when clicking on buttons
        if (e.target.classList.contains('window-btn')) {
            return;
        }
        
        isDragging = true;
        
        // Get current position before removing transform
        const rect = windowEl.getBoundingClientRect();
        
        // Remove transform and set absolute position to maintain visual position
        windowEl.style.transform = 'none';
        windowEl.style.left = rect.left + 'px';
        windowEl.style.top = rect.top + 'px';
        
        // Calculate offset between mouse position and window position
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        
        // Calculate new position
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;
        
        // Prevent window from going behind menu bar
        if (newY < menuBarHeight) {
            newY = menuBarHeight;
        }
        
        // Set new position
        windowEl.style.left = newX + 'px';
        windowEl.style.top = newY + 'px';
    });
    
    document.addEventListener('mouseup', function(e) {
        if (isDragging) {
            isDragging = false;
        }
    });
}

// Make window resizable
function makeWindowResizable(windowId) {
    const windowEl = document.getElementById(windowId);
    const resizeLeft = windowEl.querySelector('.resize-left');
    const resizeRight = windowEl.querySelector('.resize-right');
    const resizeBottom = windowEl.querySelector('.resize-bottom');
    const resizeCorner = windowEl.querySelector('.resize-corner');
    
    let isResizing = false;
    let resizeType = '';
    let startX, startY, startWidth, startHeight, startLeft, startTop;
    
    const minWidth = 200;
    const minHeight = 200;
    
    function startResize(e, type) {
        isResizing = true;
        resizeType = type;
        startX = e.clientX;
        startY = e.clientY;
        
        const rect = windowEl.getBoundingClientRect();
        startWidth = rect.width;
        startHeight = rect.height;
        startLeft = rect.left;
        startTop = rect.top;
        
        // Ensure window has absolute positioning before resizing
        windowEl.style.transform = 'none';
        windowEl.style.left = startLeft + 'px';
        windowEl.style.top = startTop + 'px';
        
        e.preventDefault();
    }
    
    if (resizeLeft) resizeLeft.addEventListener('mousedown', (e) => startResize(e, 'left'));
    if (resizeRight) resizeRight.addEventListener('mousedown', (e) => startResize(e, 'right'));
    if (resizeBottom) resizeBottom.addEventListener('mousedown', (e) => startResize(e, 'bottom'));
    if (resizeCorner) resizeCorner.addEventListener('mousedown', (e) => startResize(e, 'corner'));
    
    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;
        
        e.preventDefault();
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        if (resizeType === 'left') {
            const newWidth = Math.max(minWidth, startWidth - deltaX);
            windowEl.style.width = newWidth + 'px';
            windowEl.style.left = (startLeft + (startWidth - newWidth)) + 'px';
        }
        
        if (resizeType === 'right' || resizeType === 'corner') {
            const newWidth = Math.max(minWidth, startWidth + deltaX);
            windowEl.style.width = newWidth + 'px';
        }
        
        if (resizeType === 'bottom' || resizeType === 'corner') {
            const newHeight = Math.max(minHeight, startHeight + deltaY);
            windowEl.style.height = newHeight + 'px';
        }
    });
    
    document.addEventListener('mouseup', function(e) {
        if (isResizing) {
            isResizing = false;
            resizeType = '';
        }
    });
}
