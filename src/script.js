// Smooth scroll with active tab highlighting
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.dock a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    let isNavigating = false;
    
    // Set home as active by default
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Initialize - show only iOS projects by default
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (category !== 'ios') {
            card.classList.add('hidden');
        }
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
    
    // App Drawer functionality
    const appDrawer = document.getElementById('appDrawer');
    const openDrawerBtn = document.getElementById('openDrawer');
    const openDrawerDockBtn = document.getElementById('openDrawerDock');
    const closeDrawerBtn = document.getElementById('closeDrawer');
    const drawerProjectsGrid = document.getElementById('drawerProjects');
    const drawerSearch = document.getElementById('drawerSearch');
    const drawerFilterButtons = document.querySelectorAll('.drawer-filter-btn');
    
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
            
            // Update active button
            drawerFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Clear search
            if (drawerSearch) {
                drawerSearch.value = '';
            }
            
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
    
    // Search functionality
    if (drawerSearch) {
        drawerSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const drawerCards = drawerProjectsGrid.querySelectorAll('.project-card');
            
            // Reset filter to "All" when searching
            if (searchTerm) {
                drawerFilterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-filter') === 'all') {
                        btn.classList.add('active');
                    }
                });
            }
            
            drawerCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
                const badges = Array.from(card.querySelectorAll('.badge')).map(b => b.textContent.toLowerCase()).join(' ');
                const category = card.getAttribute('data-category')?.toLowerCase() || '';
                
                const matches = title.includes(searchTerm) || 
                               description.includes(searchTerm) || 
                               badges.includes(searchTerm) ||
                               category.includes(searchTerm);
                
                if (matches) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Open drawer
    function openDrawer(e) {
        if (e) e.preventDefault();
        populateDrawer();
        appDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Clear search when opening drawer
        if (drawerSearch) {
            drawerSearch.value = '';
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
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Skip active class for all projects link
            if (this.id === 'openDrawerDock') {
                return;
            }
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                isNavigating = true;
                
                // Reset section transform and opacity before scrolling
                targetSection.style.transform = 'translateY(0)';
                targetSection.style.opacity = '1';
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Re-enable effects after scroll completes
                setTimeout(() => {
                    isNavigating = false;
                }, 1000);
            }
        });
    });
    
    // Update active tab on scroll
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                updateActiveTab();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    function updateActiveTab() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            // Skip the all projects link
            if (link.id === 'openDrawerDock') {
                return;
            }
            
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
});
