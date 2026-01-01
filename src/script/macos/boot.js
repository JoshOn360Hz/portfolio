// Boot sequence - Loading and Login screens
(function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    const loadingBarFill = document.getElementById('loading-bar-fill');
    const loginInput = document.getElementById('login-input');
    
    let progress = 0;
    const loadingDuration = 2500; // 2.5 seconds
    const updateInterval = 50; // Update every 50ms
    const totalSteps = loadingDuration / updateInterval;
    const progressPerStep = 100 / totalSteps;
    
    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        progress += progressPerStep;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Transition to login screen
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    loginScreen.classList.add('active');
                    loginInput.focus();
                    updateLoginTime();
                }, 500);
            }, 300);
        }
        
        loadingBarFill.style.width = progress + '%';
    }, updateInterval);
    
    // Update login screen time
    function updateLoginTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const timeStr = `${hours}:${minutes}`;
        const dateStr = `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()}`;
        
        const timeEl = document.querySelector('.login-time');
        const dateEl = document.querySelector('.login-date');
        
        if (timeEl) timeEl.textContent = timeStr;
        if (dateEl) dateEl.textContent = dateStr;
    }
    
    // Show password input when user avatar or name is clicked
    const loginAvatar = document.querySelector('.login-avatar');
    const loginName = document.querySelector('.login-name');
    const loginInputContainer = document.querySelector('.login-input-container');
    
    function showPasswordInput() {
        if (loginInputContainer) {
            loginInputContainer.classList.add('visible');
            loginInput.focus();
        }
    }
    
    if (loginAvatar) {
        loginAvatar.addEventListener('click', showPasswordInput);
    }
    if (loginName) {
        loginName.addEventListener('click', showPasswordInput);
    }
    
    // Show password input on any keyboard input
    document.addEventListener('keydown', (e) => {
        if (loginScreen.classList.contains('active') && !loginInputContainer.classList.contains('visible')) {
            // Don't trigger on special keys
            if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace') {
                showPasswordInput();
            }
        }
    });
    
    // Handle login (Enter key)
    loginInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            login();
        }
    });
    
    function login() {
        loginScreen.classList.remove('active');
        loginScreen.classList.add('fade-out');
        setTimeout(() => {
            loginScreen.style.display = 'none';
            mainContent.style.display = 'block';
            mainContent.classList.add('loaded');
            document.body.style.overflow = '';
            
            // Trigger any initialization scripts
            if (typeof init === 'function') {
                init();
            }
        }, 500);
    }
    
    // Expose lockScreen function globally for menu bar
    window.lockScreen = function() {
        // Hide password input
        if (loginInputContainer) {
            loginInputContainer.classList.remove('visible');
            loginInput.value = '';
        }
        
        // Hide main content
        mainContent.style.display = 'none';
        mainContent.classList.remove('loaded');
        
        // Show login screen
        loginScreen.style.display = '';
        loginScreen.classList.remove('fade-out');
        setTimeout(() => {
            loginScreen.classList.add('active');
            updateLoginTime();
        }, 50);
    };
})();
