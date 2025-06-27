const appData = {
  cumulus: {
    icon: 'img/project-logos/cumulus.png',
    title: 'Cumulus',
    description: 'Cumulus is a simple, Vision OS inspired weather app available on iOS, iPadOS and macOS. Experience beautiful weather visualization with a clean, modern interface.',
    screenshots: ['img/screenshots/cumulus/sc1.png', 'img/screenshots/cumulus/sc2.png', 'img/screenshots/cumulus/sc3.png'],
    appStoreUrl: 'https://apps.apple.com/us/app/cumulus/id6742735497',
    githubUrl: 'https://github.com/JoshOn360Hz/CumulusApp'
  },
  pinboard: {
    icon: 'img/project-logos/pinboard.png',
    title: 'PinBoard',
    description: 'PinBoard is a notes and reminders app that uses live activities, available on iOS and iPadOS. Stay organized with beautiful notes that come alive on your device.',
    screenshots: ['img/screenshots/pinboard/sc1.png', 'img/screenshots/pinboard/sc2.png', 'img/screenshots/pinboard/sc3.png'],
    appStoreUrl: 'https://apps.apple.com/us/app/pinboard-better-notes/id6747376814',
    githubUrl: 'https://github.com/JoshOn360Hz/PinBoard-App'
  },
  tailtag: {
    icon: 'img/project-logos/TailTag.png',
    title: 'TailTag ',
    description: 'TailTag is a app that helps you track aircraft you have seen. Perfect for aviation enthusiasts who want to log their spotted aircraft with detailed information.',
    screenshots: ['img/screenshots/tailtag/sc1.png', 'img/screenshots/tailtag/sc2.png', 'img/screenshots/tailtag/sc3.png'],
    appStoreUrl: 'https://apps.apple.com/us/app/tailtag/id6747738157',
    githubUrl: 'https://github.com/JoshOn360Hz/TailTagApp'
  },
  appsbyjosh: {
    icon: 'img/project-logos/abj.png',
    title: 'Apps By Josh',
    description: 'A portfolio website showcasing my released apps for iOS, iPadOS, and macOS, designed to deliver amazing user experiences. Explore my complete collection of applications.',
    websiteUrl: 'https://appsbyjosh.com/',
    githubUrl: null
  },
  horizontravel: {
    icon: 'img/project-logos/HT.png',
    title: 'Horizon Travels',
    description: 'Horizon Travels is a comprehensive web-based flight booking system built with Python (Flask), CSS, JavaScript, HTML and SQL. A full-stack solution for travel booking.',
    websiteUrl: null,
    githubUrl: 'https://github.com/JoshOn360Hz/HorizonTravels-webyear1'
  },
  techbyjosh: {
    icon: 'img/project-logos/tbj-logo.png',
    title: 'TechByJosh',
    description: 'The website for my tech support business built with modern web technologies. Professional technical support services with a clean, accessible interface.',
    websiteUrl: 'https://techbyjosh.dev/',
    githubUrl: 'https://github.com/JoshOn360Hz/TechByJosh'
  },
  eligibilitybypass: {
    icon: 'img/project-logos/eligibility.png',
    title: 'EligibilityBypass',
    description: 'EligibilityBypass allows you to replace eligibility files used to control region restricted features such as alternate app stores on jailbroken iOS devices.',
    websiteUrl: null,
    githubUrl: 'https://github.com/JoshOn360Hz/EligibilityBypass'
  },
  comsloop: {
    icon: 'img/project-logos/led.png',
    title: 'Arduino Coms Loop',
    description: 'Using an Arduino, photoresistor and an LED to transmit bytes and decode them into outputs. A creative hardware communication solution.',
    websiteUrl: 'https://app.arduino.cc/sketches/1edd2233-3956-43df-a079-eebec21027b4?view-mode=preview',
    githubUrl: 'https://github.com/JoshOn360Hz/ComsLoopArduino'
  },
  r1mod: {
    icon: 'img/project-logos/r1.png',
    title: 'R1 Modification',
    description: 'Modifications I have made to a Rabbit R1 to customise the custom Android experience. Emulating stock features in addition to stock Android.',
    websiteUrl: null,
    githubUrl: 'https://github.com/JoshOn360Hz/Making-the-R1-useful'
  },
  smartmirror: {
    icon: 'img/project-logos/mirror.png',
    title: 'Smart Mirror Web',
    description: 'Smart Mirror Web is a web-based mirror OS that displays date, time, weather and calendar information. Designed for integration into smart mirrors.',
    websiteUrl: null,
    githubUrl: 'https://github.com/JoshOn360Hz/smartmirrorweb'
  },
  valrandomiser: {
    icon: 'img/project-logos/val.png',
    title: 'ValRandomiser',
    description: 'ValRandomiser is a C app that provides a nice UI to randomly select a Valorant agent. Also available as a WebAssembly application.',
    websiteUrl: 'https://joshon360hz.github.io/ValRandomiser-web/',
    githubUrl: 'https://github.com/JoshOn360Hz/ValRandomiser'
  },
  agents: {
    icon: 'img/project-logos/valios.png',
    title: 'Agents',
    description: 'A SwiftUI remake of the Raylib ValRandomiser app, includes an agent search and a clean UI to match agents for Valorant gameplay.',
    websiteUrl: null,
    githubUrl: 'https://github.com/JoshOn360Hz/Agents'
  },
  keypad: {
    icon: 'img/project-logos/CTS.png',
    title: 'Keypad Project',
    description: 'Escape room puzzle project featuring an Arduino-based keycard and wiring system for interactive gaming experiences.',
    websiteUrl: 'https://app.arduino.cc/sketches/13683222-1e2f-4236-b747-e238dbb75ecc?view-mode=preview',
    githubUrl: 'https://github.com/JoshOn360Hz/CTS-Project'
  },
  gungame: {
    icon: 'img/project-logos/gungame.png',
    title: 'Gun Game',
    description: 'A Verse and UEFN Gun Game map with custom POIs that I created for a streamer friend. Features custom game mechanics and level design.',
    fortniteUrl: 'com.epicgames.launcher://apps/fn%3A4fe75bbc5a674f4f9b356b5c90567da5%3AFortnite?action=launch&silent=true&arg=-IslandOverride%3D6788-1220-9273',
    githubUrl: null
  },
  portfolio: {
    icon: 'img/project-logos/web-logo.png',
    title: 'Portfolio Website',
    description: 'The website you are currently looking at! Built with modern HTML, CSS and JavaScript featuring a beautiful Apple-inspired design.',
    websiteUrl: null,
    githubUrl: 'https://github.com/JoshOn360Hz/portfolio'
  }
};

const imageCache = new Map();

function preloadImage(src) {
  if (imageCache.has(src)) {
    return imageCache.get(src);
  }
  
  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
  
  imageCache.set(src, promise);
  return promise;
}

function setupMobileNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const body = document.body;

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      body.style.overflow = '';
    }
  });
}

function setupModal() {
  const modal = document.getElementById('appModal');
  const modalIcon = document.getElementById('modalIconImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalScreenshots = document.getElementById('modalScreenshots');
  const modalActions = document.getElementById('modalActions');
  const closeModal = document.getElementById('closeModal');

  if (!modal) return;

  function openModal(appKey) {
    const app = appData[appKey];
    if (!app) return;

    modalIcon.src = app.icon;
    modalIcon.alt = app.title;
    modalTitle.textContent = app.title;
    modalDescription.textContent = app.description;

    modalScreenshots.innerHTML = '';
    
    if (app.screenshots && app.screenshots.length > 0) {
      const isMobile = window.innerWidth <= 768;
      const screenshotsToShow = isMobile ? [app.screenshots[1] || app.screenshots[0]] : app.screenshots;

      screenshotsToShow.forEach((screenshot, index) => {
        if (screenshot) {
          const screenshotDiv = document.createElement('div');
          screenshotDiv.className = 'screenshot-item';
          
          const img = document.createElement('img');
          img.src = screenshot;
          img.alt = `${app.title} Screenshot ${index + 1}`;
          img.className = 'screenshot-img';
          
          screenshotDiv.appendChild(img);
          modalScreenshots.appendChild(screenshotDiv);
        }
      });
    } else {
      modalScreenshots.style.display = 'none';
    }

    modalActions.innerHTML = '';
    
    if (app.appStoreUrl) {
      const appStoreBtn = document.createElement('a');
      appStoreBtn.href = app.appStoreUrl;
      appStoreBtn.target = '_blank';
      appStoreBtn.className = 'download-button';
      appStoreBtn.innerHTML = '<i class="fab fa-apple"></i> View on App Store';
      modalActions.appendChild(appStoreBtn);
    }
    
    if (app.websiteUrl) {
      const websiteBtn = document.createElement('a');
      websiteBtn.href = app.websiteUrl;
      websiteBtn.target = '_blank';
      websiteBtn.className = 'download-button';
      
      if (app.websiteUrl.includes('arduino.cc')) {
        websiteBtn.innerHTML = '<i class="fas fa-microchip"></i> Arduino Web Editor';
      } else if (app.websiteUrl.includes('ValRandomiser-web')) {
        websiteBtn.innerHTML = '<i class="fas fa-code"></i> View WASM App';
      } else {
        websiteBtn.innerHTML = '<i class="fas fa-globe"></i> Visit Website';
      }
      
      modalActions.appendChild(websiteBtn);
    }
    
    if (app.fortniteUrl) {
      const fortniteBtn = document.createElement('a');
      fortniteBtn.href = app.fortniteUrl;
      fortniteBtn.target = '_blank';
      fortniteBtn.className = 'download-button';
      fortniteBtn.innerHTML = '<i class="fas fa-gamepad"></i> Play on Fortnite';
      modalActions.appendChild(fortniteBtn);
      
      const codeBtn = document.createElement('div');
      codeBtn.className = 'beta-button';
      codeBtn.style.cursor = 'default';
      codeBtn.innerHTML = '<i class="fas fa-gamepad"></i> 6788-1220-9273';
      modalActions.appendChild(codeBtn);
    }
    
    if (app.githubUrl) {
      const githubBtn = document.createElement('a');
      githubBtn.href = app.githubUrl;
      githubBtn.target = '_blank';
      githubBtn.className = 'beta-button';
      githubBtn.innerHTML = '<i class="fab fa-github"></i> View on GitHub';
      modalActions.appendChild(githubBtn);
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModalHandler() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeModal.addEventListener('click', closeModalHandler);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalHandler();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModalHandler();
    }
  });

  document.querySelectorAll('.app-card[data-app]').forEach(card => {
    const button = card.querySelector('.app-button');
    if (button) {
      button.addEventListener('click', () => {
        const appKey = card.getAttribute('data-app');
        openModal(appKey);
      });
    }
  });
}

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.app-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

function setupNavbarBehavior() {
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });
}

function preloadAppImages() {
  Object.values(appData).forEach(app => {
    preloadImage(app.icon).catch(console.warn);
    
    if (app.screenshots && app.screenshots.length > 0) {
      app.screenshots.forEach(screenshot => {
        if (screenshot) preloadImage(screenshot).catch(console.warn);
      });
    }
  });
}

function setupViewMoreProjects() {
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  const moreProjectsSection = document.getElementById('more-projects');
  const viewMoreText = document.querySelector('.view-more-text');
  const viewMoreIcon = document.querySelector('.view-more-icon');
  
  if (!viewMoreBtn || !moreProjectsSection || !viewMoreText) {
    return;
  }
  
  let isExpanded = false;
  
  viewMoreBtn.addEventListener('click', function() {
    
    if (isExpanded) {
      moreProjectsSection.classList.remove('show');
      viewMoreBtn.classList.remove('expanded');
      viewMoreText.textContent = 'View More Projects';
      isExpanded = false;
      
      setTimeout(() => {
        moreProjectsSection.style.display = 'none';
      }, 500);
      
      setTimeout(() => {
        const featuredSection = document.getElementById('apps');
        if (featuredSection) {
          featuredSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 200);
    } else {
      moreProjectsSection.style.display = 'block';
      isExpanded = true;
      
      requestAnimationFrame(() => {
        moreProjectsSection.classList.add('show');
        viewMoreBtn.classList.add('expanded');
        viewMoreText.textContent = 'Show Less Projects';
        
        setTimeout(() => {
          moreProjectsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 300);
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  setupMobileNavigation();
  setupModal();
  setupScrollAnimations();
  setupNavbarBehavior();
  preloadAppImages();
  setupViewMoreProjects();
  
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      const appsSection = document.getElementById('apps');
      if (appsSection) {
        appsSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    });
  }
  
});

window.addEventListener('resize', () => {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  
  if (window.innerWidth > 768 && navMenu && hamburger) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }
});

