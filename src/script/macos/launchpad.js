// Launchpad functionality
function toggleLaunchpad() {
    const launchpad = document.getElementById('launchpad');
    
    if (launchpad.style.display === 'none' || !launchpad.style.display) {
        launchpad.style.display = 'flex';
        populateLaunchpad();
    } else {
        launchpad.style.display = 'none';
    }
}

function populateLaunchpad() {
    const content = document.querySelector('.launchpad-content');
    
    // Define categories
    const categories = {
        'Recommended': ['cumulus', 'flipcards', 'tailtag', 'pinboard', 'uweai'],
        'All Apps': ['cumulus', 'flipcards', 'tailtag', 'pinboard', 'uweai', 'mirror', 'ht', 'tbj', 'cts', 'r1', 'led', 'gungame', 'val']
    };
    
    let html = '';
    
    for (const [categoryName, apps] of Object.entries(categories)) {
        html += `
            <div class="launchpad-category">
                <div class="launchpad-category-header">
                    <div class="launchpad-category-title">${categoryName}</div>
                    <div class="launchpad-category-action">Show More</div>
                </div>
                <div class="launchpad-grid">
        `;
        
        apps.forEach(appId => {
            const app = appData[appId];
            if (app) {
                html += `
                    <div class="launchpad-app" onclick="openAppDetails('${appId}'); toggleLaunchpad();">
                        <div class="launchpad-app-icon">
                            <img src="${app.icon}" alt="${app.name}">
                        </div>
                        <div class="launchpad-app-name">${app.name}</div>
                    </div>
                `;
            }
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    content.innerHTML = html;
}

// Close launchpad when clicking outside
document.addEventListener('click', function(event) {
    const launchpad = document.getElementById('launchpad');
    const launchpadIcon = document.querySelector('[data-tooltip="Apps"]');
    
    if (launchpad && launchpad.style.display === 'flex') {
        if (!launchpad.contains(event.target) && !launchpadIcon.contains(event.target)) {
            launchpad.style.display = 'none';
        }
    }
});

// Close launchpad with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const launchpad = document.getElementById('launchpad');
        if (launchpad && launchpad.style.display === 'flex') {
            launchpad.style.display = 'none';
        }
    }
});
