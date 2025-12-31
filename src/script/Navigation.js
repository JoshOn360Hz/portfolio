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
