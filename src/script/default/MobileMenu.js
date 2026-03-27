document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const closeDrawer = document.getElementById('closeMobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    let previousFocusedElement = null;

    function trapMobileFocus(event) {
        if (!mobileNavDrawer || !mobileNavDrawer.classList.contains('active') || event.key !== 'Tab') {
            return;
        }

        const focusableElements = mobileNavDrawer.querySelectorAll(focusableSelector);
        if (!focusableElements.length) {
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }

    // Toggle drawer
    function openDrawer() {
        previousFocusedElement = document.activeElement;
        mobileNavDrawer.classList.add('active');
        mobileNavDrawer.setAttribute('aria-hidden', 'false');
        hamburgerMenu.classList.add('active');
        hamburgerMenu.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        const firstLink = mobileNavDrawer.querySelector('.mobile-nav-link');
        if (firstLink) {
            firstLink.focus();
        }
    }

    function closeDrawerFunc() {
        mobileNavDrawer.classList.remove('active');
        mobileNavDrawer.setAttribute('aria-hidden', 'true');
        hamburgerMenu.classList.remove('active');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
            previousFocusedElement.focus();
        }
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

    document.addEventListener('activeSectionChange', function(event) {
        const sectionId = event.detail?.sectionId;
        if (!sectionId) {
            return;
        }

        mobileNavLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
    });

    document.addEventListener('keydown', function(event) {
        if (!mobileNavDrawer || !mobileNavDrawer.classList.contains('active')) {
            return;
        }

        if (event.key === 'Escape') {
            closeDrawerFunc();
            return;
        }

        trapMobileFocus(event);
    });
});
