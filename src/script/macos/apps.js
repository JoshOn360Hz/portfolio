// App window controls
let currentApp = null;

// List of apps that are hidden by default (from UWEAI to VAL)
const hiddenByDefaultApps = ['uweai', 'mirror', 'ht', 'tbj', 'cts', 'r1', 'led', 'gungame', 'val'];

function openAppDetails(appId) {
    const appWindow = document.getElementById('app-window');
    const appIcon = document.querySelector(`[data-app="${appId}"]`);
    const app = appData[appId];
    
    if (!app) return;
    
    // If same app is already open, just bring to front
    if (currentApp === appId && appWindow.style.display === 'block') {
        bringToFront(appWindow);
        return;
    }
    
    currentApp = appId;
    
    // Show dock icon if it was hidden
    if (appIcon && appIcon.style.display === 'none') {
        appIcon.style.display = 'flex';
    }
    
    // Populate app details
    document.querySelector('.app-title').textContent = app.name;
    document.querySelector('.app-icon-large').src = app.icon;
    document.querySelector('.app-icon-large').alt = app.name;
    document.querySelector('.app-name').textContent = app.name;
    document.querySelector('.app-description').textContent = app.description;
    
    // Populate tech badges
    const techBadges = document.querySelector('.app-tech-badges');
    techBadges.innerHTML = app.tech.map(tech => `<span class="badge">${tech}</span>`).join('');
    
    // Populate buttons
    const buttonsContainer = document.querySelector('.app-buttons');
    buttonsContainer.innerHTML = app.links.map(link => {
        const iconClass = link.type === 'appstore' ? 'fa-brands fa-apple' :
                         link.type === 'github' ? 'fa-brands fa-github' :
                         'fa fa-globe';
        const buttonClass = link.type === 'github' ? 'download-button-github' : 
                           link.type === 'appstore' ? 'download-button' : 
                           'download-button';
        
        // GitHub and App Store open in new tab, others open in Safari iframe
        const action = (link.type === 'github' || link.type === 'appstore') 
            ? `onclick="window.open('${link.url}', '_blank')"` 
            : `onclick="loadInSafari('${link.url}')"`;
        
        return `<button class="${buttonClass}" ${action}>
                    <i class="${iconClass}"></i> ${link.label}
                </button>`;
    }).join('');
    
    // Show window and add open indicator
    appWindow.style.display = 'block';
    if (appIcon) appIcon.classList.add('open');
    bringToFront(appWindow);
    
    // Bounce animation only when opening
    if (appIcon) {
        appIcon.classList.add('bounce');
        setTimeout(() => {
            appIcon.classList.remove('bounce');
        }, 600);
    }
}

function closeApp() {
    const appWindow = document.getElementById('app-window');
    if (currentApp) {
        const appIcon = document.querySelector(`[data-app="${currentApp}"]`);
        if (appIcon) {
            appIcon.classList.remove('open');
            // Hide icon again if it was originally hidden
            if (hiddenByDefaultApps.includes(currentApp)) {
                appIcon.style.display = 'none';
            }
        }
    }
    appWindow.style.display = 'none';
    currentApp = null;
}
