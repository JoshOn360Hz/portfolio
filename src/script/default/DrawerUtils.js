    const appDrawer = document.getElementById('appDrawer');
    const openDrawerBtn = document.getElementById('openDrawer');
    const openDrawerDockBtn = document.getElementById('openDrawerDock');
    const closeDrawerBtn = document.getElementById('closeDrawer');
    const drawerProjectsGrid = document.getElementById('drawerProjects');
    const drawerSearch = document.getElementById('drawerSearch');
    const drawerFilterButtons = document.querySelectorAll('.drawer-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Populate drawer with all projects
    function populateDrawer() {
        drawerProjectsGrid.innerHTML = '';
        projectCards.forEach(card => {
            const clonedCard = card.cloneNode(true);
            clonedCard.classList.remove('hidden');
            drawerProjectsGrid.appendChild(clonedCard);
        });
    }
    
    // Drawer filter functionality
    drawerFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const noResults = document.getElementById('noResults');
            
            // Update active button
            drawerFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Clear search
            if (drawerSearch) {
                drawerSearch.value = '';
            }
            
            // Hide no results when using filters
            if (noResults) {
                noResults.style.display = 'none';
            }
            drawerProjectsGrid.style.display = '';
            
            // Filter projects
            const drawerCards = drawerProjectsGrid.querySelectorAll('.project-card');
            drawerCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


// Open drawer
    function openDrawer(e) {
        if (e) e.preventDefault();
        populateDrawer();
        appDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Clear search when opening drawer
        if (drawerSearch) {
            drawerSearch.value = '';
            // Auto-focus search after drawer animation
            setTimeout(() => {
                drawerSearch.focus();
            }, 300);
        }
        // Reset no results state
        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.style.display = 'none';
        }
        if (drawerProjectsGrid) {
            drawerProjectsGrid.style.display = '';
        }
    }
    
    if (openDrawerBtn) {
        openDrawerBtn.addEventListener('click', openDrawer);
    }
    
    if (openDrawerDockBtn) {
        openDrawerDockBtn.addEventListener('click', openDrawer);
    }
    
    // Close drawer
    function closeDrawer() {
        appDrawer.classList.remove('active');
        document.body.style.overflow = '';
        // Clear search when closing drawer
        if (drawerSearch) {
            drawerSearch.value = '';
        }
        // Reset filter to "All"
        drawerFilterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === 'all') {
                btn.classList.add('active');
            }
        });
    }
    
    if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener('click', closeDrawer);
    }
    
    // Close drawer when clicking overlay
    if (appDrawer) {
        appDrawer.addEventListener('click', function(e) {
            if (e.target === appDrawer) {
                closeDrawer();
            }
        });
    }
    
    // Close drawer with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && appDrawer.classList.contains('active')) {
            closeDrawer();
        }
    });