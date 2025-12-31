// Dock icon interactions
document.addEventListener('DOMContentLoaded', () => {
    const dockIcons = document.querySelectorAll('.dock-icon');
    
    dockIcons.forEach(icon => {
        // Only add bounce to non-safari icons (safari has its own click handler)
        if (!icon.id || icon.id !== 'safari-icon') {
            icon.addEventListener('click', function() {
                this.classList.add('bounce');
                setTimeout(() => {
                    this.classList.remove('bounce');
                }, 600);
            });
        }
    });
});
