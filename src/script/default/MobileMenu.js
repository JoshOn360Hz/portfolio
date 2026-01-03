document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const closeDrawer = document.getElementById('closeDrawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle drawer
    function openDrawer() {
        mobileNavDrawer.classList.add('active');
        hamburgerMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawerFunc() {
        mobileNavDrawer.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            if (mobileNavDrawer.classList.contains('active')) {
                closeDrawerFunc();
            } else {
                openDrawer();
            }
        });
    }

    if (closeDrawer) {
        closeDrawer.addEventListener('click', closeDrawerFunc);
    }

    // Close drawer when clicking outside
    if (mobileNavDrawer) {
        mobileNavDrawer.addEventListener('click', function(e) {
            if (e.target === mobileNavDrawer) {
                closeDrawerFunc();
            }
        });
    }

    // Close drawer when clicking on a nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Only close for internal links
            if (this.getAttribute('href').startsWith('#')) {
                closeDrawerFunc();
            }
        });
    });

    // Handle active state for mobile nav links
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768) {
            const sections = document.querySelectorAll('.section');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    mobileNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
    });
});
