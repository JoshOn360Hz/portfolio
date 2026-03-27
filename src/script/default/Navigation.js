document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.dock a[href^="#"]');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    // Set home as active by default
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
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
                // Reset section transform and opacity before scrolling
                targetSection.style.transform = 'translateY(0)';
                targetSection.style.opacity = '1';
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if we're at the bottom of the page
        if (window.scrollY + windowHeight >= documentHeight - 50) {
            // If at bottom, set to the last section (skills)
            const lastSection = sections[sections.length - 1];
            currentSection = lastSection.getAttribute('id');
        } else {
            // Normal scroll detection
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
        }
        
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

        mobileNavLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });

        document.dispatchEvent(new CustomEvent('activeSectionChange', {
            detail: { sectionId: currentSection }
        }));
    }
});
