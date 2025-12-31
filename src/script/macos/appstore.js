// App Store functionality
function populateAppStore() {
    const appstoreGrid = document.getElementById('appstore-grid');
    if (!appstoreGrid) return;
    
    // Clear existing content
    appstoreGrid.innerHTML = '';
    
    // Create app cards for each app in appData
    Object.keys(appData).forEach(appId => {
        const app = appData[appId];
        const appCard = createAppStoreCard(appId, app);
        appstoreGrid.appendChild(appCard);
    });
}

function createAppStoreCard(appId, app) {
    const card = document.createElement('div');
    card.className = 'appstore-card';
    card.onclick = () => openAppDetails(appId);
    
    // Determine app type badge
    let appType = 'App';
    const techString = app.tech.join(' ').toLowerCase();
    if (techString.includes('swift') || techString.includes('swiftui')) {
        appType = 'iOS App';
    } else if (techString.includes('html') || techString.includes('javascript') || techString.includes('react') || techString.includes('flask')) {
        appType = 'Web App';
    } else if (techString.includes('arduino') || techString.includes('hardware') || techString.includes('iot')) {
        appType = 'Hardware';
    }
    
    card.innerHTML = `
        <div class="appstore-card-icon">
            <img src="${app.icon}" alt="${app.name}">
        </div>
        <div class="appstore-card-content">
            <div class="appstore-card-header">
                <h3>${app.name}</h3>
                <span class="appstore-card-type">${appType}</span>
            </div>
            <p class="appstore-card-description">${app.description}</p>
            <div class="appstore-card-tech">
                ${app.tech.slice(0, 3).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <button class="appstore-card-button">
                <i class="fa-solid fa-arrow-right"></i> Open
            </button>
        </div>
    `;
    
    return card;
}

// Filter apps by category
function filterAppStore(category) {
    const appstoreGrid = document.getElementById('appstore-grid');
    const appstoreHeader = document.querySelector('.appstore-header h1');
    const appstoreSubtitle = document.querySelector('.appstore-header p');
    
    if (!appstoreGrid) return;
    
    // Update active sidebar item
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Clear grid
    appstoreGrid.innerHTML = '';
    
    // Filter and display apps
    let filteredApps = [];
    
    switch(category) {
        case 'all':
            appstoreHeader.textContent = 'All Apps';
            appstoreSubtitle.textContent = 'Discover all my applications and projects';
            filteredApps = Object.keys(appData);
            break;
        case 'ios':
            appstoreHeader.textContent = 'iOS Apps';
            appstoreSubtitle.textContent = 'Native iOS applications built with Swift and SwiftUI';
            filteredApps = Object.keys(appData).filter(id => {
                const tech = appData[id].tech.join(' ').toLowerCase();
                return tech.includes('swift') || tech.includes('swiftui');
            });
            break;
        case 'web':
            appstoreHeader.textContent = 'Web Apps';
            appstoreSubtitle.textContent = 'Web applications and websites';
            filteredApps = Object.keys(appData).filter(id => {
                const tech = appData[id].tech.join(' ').toLowerCase();
                return tech.includes('html') || tech.includes('javascript') || 
                       tech.includes('react') || tech.includes('flask') || 
                       tech.includes('python');
            });
            break;
        case 'hardware':
            appstoreHeader.textContent = 'Hardware Projects';
            appstoreSubtitle.textContent = 'IoT and hardware projects with Arduino and more';
            filteredApps = Object.keys(appData).filter(id => {
                const tech = appData[id].tech.join(' ').toLowerCase();
                return tech.includes('arduino') || tech.includes('hardware') || 
                       tech.includes('iot') || tech.includes('electronics');
            });
            break;
    }
    
    // Populate filtered apps
    filteredApps.forEach(appId => {
        const app = appData[appId];
        const appCard = createAppStoreCard(appId, app);
        appstoreGrid.appendChild(appCard);
    });
    
    // Show message if no apps found
    if (filteredApps.length === 0) {
        appstoreGrid.innerHTML = '<div class="no-apps">No apps found in this category</div>';
    }
}

// Initialize App Store on page load
document.addEventListener('DOMContentLoaded', () => {
    populateAppStore();
    
    // Add click handlers to sidebar items
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const categories = ['all', 'ios', 'web', 'hardware'];
            filterAppStore(categories[index]);
        });
    });
});
