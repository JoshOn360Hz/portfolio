// Context menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const dockIcons = document.querySelectorAll('.dock-icon');
    const contextMenu = document.getElementById('context-menu');
    const binContextMenu = document.getElementById('bin-context-menu');
    let contextTarget = null;
    
    dockIcons.forEach(icon => {
        // Add context menu on right-click
        icon.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            
            const appId = this.dataset.app;
            
            // Don't show context menu for downloads
            if (appId === 'downloads') {
                return;
            }
            
            // Store the target icon
            contextTarget = this;
            
            // Determine which menu to show
            const menuToShow = appId === 'bin' ? binContextMenu : contextMenu;
            const menuToHide = appId === 'bin' ? contextMenu : binContextMenu;
            
            // Hide the other menu
            menuToHide.style.display = 'none';
            
            // Show menu temporarily to get dimensions
            menuToShow.style.display = 'block';
            menuToShow.style.visibility = 'hidden';
            
            // Get menu dimensions and icon position
            const menuWidth = menuToShow.offsetWidth;
            const menuHeight = menuToShow.offsetHeight;
            const iconRect = this.getBoundingClientRect();
            
            // Calculate position - center above the icon
            let left = iconRect.left + (iconRect.width / 2) - (menuWidth / 2);
            let top = iconRect.top - menuHeight - 8; // 8px gap above icon
            
            // Adjust if menu would go off right edge
            if (left + menuWidth > window.innerWidth) {
                left = window.innerWidth - menuWidth - 10;
            }
            
            // Adjust if menu would go off left edge
            if (left < 10) {
                left = 10;
            }
            
            // Adjust if menu would go off top edge
            if (top < 30) { // 30px to account for menu bar
                top = iconRect.bottom + 8; // Place below icon instead
            }
            
            // Position and show context menu
            menuToShow.style.left = left + 'px';
            menuToShow.style.top = top + 'px';
            menuToShow.style.visibility = 'visible';
        });
    });
    
    // Handle open action
    document.getElementById('context-open').addEventListener('click', function() {
        if (contextTarget) {
            const appId = contextTarget.dataset.app;
            
            // Open based on app type
            if (appId === 'safari') {
                toggleSafari();
            } else if (appId === 'terminal') {
                toggleTerminal();
            } else if (appId === 'experience') {
                toggleExperience();
            } else if (appId) {
                openAppDetails(appId);
            }
            
            // Hide context menu
            contextMenu.style.display = 'none';
            contextTarget = null;
        }
    });
    
    // Handle quit action
    document.getElementById('context-quit').addEventListener('click', function() {
        if (contextTarget) {
            const appId = contextTarget.dataset.app;
            
            // Close based on app type
            if (appId === 'safari') {
                closeSafari();
            } else if (appId === 'terminal') {
                closeTerminal();
            } else if (appId === 'experience') {
                closeExperience();
            } else {
                closeApp();
            }
            
            // Hide context menu
            contextMenu.style.display = 'none';
            contextTarget = null;
        }
    });
    
    // Hide context menu when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!contextMenu.contains(e.target) && !binContextMenu.contains(e.target)) {
            contextMenu.style.display = 'none';
            binContextMenu.style.display = 'none';
            contextTarget = null;
        }
    });
});
