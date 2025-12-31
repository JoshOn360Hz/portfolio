// Initialize all window functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize window dragging
    makeWindowDraggable('safari-window', 'window-drag-handle');
    makeWindowDraggable('terminal-window', 'terminal-drag-handle');
    makeWindowDraggable('app-window', 'app-drag-handle');
    makeWindowDraggable('experience-window', 'experience-drag-handle');
    
    // Initialize window resizing
    makeWindowResizable('safari-window');
    makeWindowResizable('terminal-window');
    makeWindowResizable('app-window');
    makeWindowResizable('experience-window');
    
    // Add click handlers to bring windows to front
    document.getElementById('safari-window').addEventListener('mousedown', function() {
        bringToFront(this);
    });
    
    document.getElementById('terminal-window').addEventListener('mousedown', function() {
        bringToFront(this);
    });
    
    document.getElementById('app-window').addEventListener('mousedown', function() {
        bringToFront(this);
    });
    
    document.getElementById('experience-window').addEventListener('mousedown', function() {
        bringToFront(this);
    });
});
