// Settings window functionality
function toggleSettings() {
    const settingsWindow = document.getElementById('settings-window');
    const settingsIcon = document.getElementById('settings-icon');
    
    if (settingsWindow.style.display === 'block') {
        bringToFront(settingsWindow);
        return;
    }
    
    settingsWindow.style.display = 'block';
    if (settingsIcon) settingsIcon.classList.add('open');
    bringToFront(settingsWindow);
    loadWallpapers();
}

function closeSettings() {
    const settingsWindow = document.getElementById('settings-window');
    const settingsIcon = document.getElementById('settings-icon');
    settingsWindow.style.display = 'none';
    if (settingsIcon) settingsIcon.classList.remove('open');
}

function showSettingsPanel(panelName) {
    // Update active state in sidebar
    document.querySelectorAll('.settings-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.settings-item').classList.add('active');
    
    // Show the panel (currently only wallpaper panel exists)
    if (panelName === 'wallpaper') {
        loadWallpapers();
    }
}

function loadWallpapers() {
    const wallpaperGrid = document.getElementById('wallpaper-grid');
    
    // Define wallpapers with their thumbnail paths
    const wallpapers = [
        { name: 'Sequoia Dark', thumb: 'assets/macos/bg/Sequoia-Dark-thumbnail.jpg', full: 'assets/macos/bg/Sequoia-Dark-thumbnail.jpg' },
        { name: 'Sonoma Horizon', thumb: 'assets/macos/bg/Sonoma-Horizon-thumb.jpeg', full: 'assets/macos/bg/Sonoma-Horizon-thumb.jpeg' },
        { name: 'Sonoma Light', thumb: 'assets/macos/bg/Sonoma-Light-thumb.jpg', full: 'assets/macos/bg/Sonoma-Light-thumb.jpg' },
        { name: 'Tahoe Beach Dawn', thumb: 'assets/macos/bg/Tahoe-Beach-Dawn-thumb.jpeg', full: 'assets/macos/bg/Tahoe-Beach-Dawn-thumb.jpeg' },
        { name: 'Tahoe Beach Day', thumb: 'assets/macos/bg/Tahoe-Beach-Day-thumb.jpeg', full: 'assets/macos/bg/Tahoe-Beach-Day-thumb.jpeg' },
        { name: 'Tahoe Beach Dusk', thumb: 'assets/macos/bg/Tahoe-Beach-Dusk-thumb.jpeg', full: 'assets/macos/bg/Tahoe-Beach-Dusk-thumb.jpeg' },
        { name: 'Tahoe Beach Night', thumb: 'assets/macos/bg/Tahoe-Beach-Night-thumb.jpeg', full: 'assets/macos/bg/Tahoe-Beach-Night-thumb.jpeg' },
        { name: 'Tahoe', thumb: 'assets/macos/bg/Tahoe.jpg', full: 'assets/macos/bg/Tahoe.jpg' },
        { name: 'Ventura Light', thumb: 'assets/macos/bg/Ventura-Light-thumb.jpg', full: 'assets/macos/bg/Ventura-Light-thumb.jpg' }
    ];
    
    // Get current wallpaper
    const currentWallpaper = localStorage.getItem('wallpaper') || 'assets/macos/bg/Tahoe.jpg';
    
    let html = '';
    wallpapers.forEach(wallpaper => {
        const isSelected = currentWallpaper === wallpaper.full ? 'selected' : '';
        html += `
            <div class="wallpaper-option ${isSelected}" onclick="setWallpaper('${wallpaper.full}')">
                <img src="${wallpaper.thumb}" alt="${wallpaper.name}">
                <div class="wallpaper-name">${wallpaper.name}</div>
            </div>
        `;
    });
    
    wallpaperGrid.innerHTML = html;
}

function setWallpaper(wallpaperPath) {
    // Save to localStorage
    localStorage.setItem('wallpaper', wallpaperPath);
    
    // Update background
    document.body.style.backgroundImage = `url('${wallpaperPath}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    
    // Update selected state in UI
    document.querySelectorAll('.wallpaper-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.target.closest('.wallpaper-option').classList.add('selected');
}

// Load wallpaper on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedWallpaper = localStorage.getItem('wallpaper') || 'assets/macos/bg/Tahoe.jpg';
    document.body.style.backgroundImage = `url('${savedWallpaper}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundRepeat = 'no-repeat';
});
