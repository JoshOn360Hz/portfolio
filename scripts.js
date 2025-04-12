  document.addEventListener('DOMContentLoaded', function () {
    const customCursor = document.getElementById('custom-cursor');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
    if (!isTouchDevice && customCursor) {
      document.body.classList.add('js-enabled');
      customCursor.style.display = 'block';
  
      let hideCursorTimeout;
  
      document.addEventListener('mousemove', function (e) {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
        customCursor.style.opacity = '1';
        clearTimeout(hideCursorTimeout);
        hideCursorTimeout = setTimeout(() => {
          customCursor.style.opacity = '0';
        }, 5000);
      });
  
      document.addEventListener('mousedown', function () {
        customCursor.style.opacity = '0';
      });
  
      document.addEventListener('mouseup', function () {
        customCursor.style.opacity = '1';
      });
  
      window.addEventListener('mouseleave', function () {
        customCursor.style.opacity = '0';
      });
  
      window.addEventListener('mouseenter', function () {
        customCursor.style.opacity = '1';
      });
  
      const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          customCursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
          customCursor.classList.remove('hover');
        });
      });
    } else {
      if (customCursor) {
        customCursor.style.display = 'none';
      }
    }
  
    // Navbar toggler icon swap
    const toggler = document.querySelector('.navbar-toggler');
    const menuIcon = document.getElementById('menu-icon');
  
    if (toggler && menuIcon) {
      toggler.addEventListener('click', function () {
        setTimeout(() => {
          if (toggler.classList.contains('collapsed')) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
          } else {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
          }
        }, 300);
      });
    }
  });
  
