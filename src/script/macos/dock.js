// Dock icon interactions
document.addEventListener('DOMContentLoaded', () => {
    const dockIcons = document.querySelectorAll('.dock-icon');
    
    // Icons that should not bounce on click
    const noBounceApps = ['safari-icon', 'terminal-icon', 'experience-icon', 'appstore-icon', 'settings-icon', 'launchpad-icon'];
    
    dockIcons.forEach(icon => {
        // Skip icons that handle their own bounce or shouldn't bounce
        const appId = icon.dataset.app;
        if (!noBounceApps.includes(icon.id) && appId !== 'downloads' && appId !== 'bin') {
            icon.addEventListener('click', function() {
                // Only bounce if not already open
                if (!this.classList.contains('open')) {
                    this.classList.add('bounce');
                    setTimeout(() => {
                        this.classList.remove('bounce');
                    }, 600);
                }
            });
        }
    });
});
