const appDrawer = document.getElementById('appDrawer');
const openDrawerBtn = document.getElementById('openDrawer');
const openDrawerDockBtn = document.getElementById('openDrawerDock');
const closeDrawerBtn = document.getElementById('closeProjectDrawer');
const drawerProjectsGrid = document.getElementById('drawerProjects');
const drawerSearch = document.getElementById('drawerSearch');
const drawerFilterButtons = document.querySelectorAll('.drawer-filter-btn');
const noResults = document.getElementById('noResults');
const drawerPanel = appDrawer ? appDrawer.querySelector('.app-drawer') : null;
const drawerOpenTriggers = [openDrawerBtn, openDrawerDockBtn].filter(Boolean);
const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const drawerState = {
    activeFilter: 'all',
    searchTerm: ''
};

let previousFocusedElement = null;
let allProjects = Array.isArray(window.__projectsData) ? window.__projectsData : [];

function renderProjectButtons(links) {
    return links.map(link => {
        return `<a class="${link.buttonClass}" href="${link.url}" target="_blank" rel="noopener noreferrer"><i class="${link.iconClass}"></i> ${link.label}</a>`;
    }).join('');
}

function renderBadges(badges) {
    return badges.map(badge => `<span class="badge">${badge}</span>`).join('');
}

function renderDrawerCard(project) {
    return `
        <div class="project-card" data-category="${project.category}">
            <div class="project-icon">
                <img src="${project.image}" alt="${project.imageAlt}">
            </div>
            <h3>${project.name}</h3>
            <p class="project-description">${project.description}</p>
            <div class="tech-badges">
                ${renderBadges(project.badges)}
            </div>
            <div class="project-buttons">
                ${renderProjectButtons(project.links)}
            </div>
        </div>
    `;
}

function getFilteredProjects() {
    const term = drawerState.searchTerm.trim().toLowerCase();

    return allProjects.filter(project => {
        const category = (project.category || '').toLowerCase();
        const title = (project.name || '').toLowerCase();
        const description = (project.description || '').toLowerCase();
        const badges = (project.badges || []).join(' ').toLowerCase();

        const matchesFilter = drawerState.activeFilter === 'all' || category === drawerState.activeFilter;
        const matchesSearch = !term || title.includes(term) || description.includes(term) || badges.includes(term) || category.includes(term);

        return matchesFilter && matchesSearch;
    });
}

async function ensureProjectsLoaded() {
    if (allProjects.length) {
        return;
    }

    if (window.__projectsDataPromise) {
        allProjects = await window.__projectsDataPromise;
        return;
    }

    const response = await fetch('projects.json');
    const payload = await response.json();
    allProjects = Array.isArray(payload) ? payload : (payload.projects || []);
}

function setDrawerTriggerState(isOpen) {
    drawerOpenTriggers.forEach(trigger => trigger.setAttribute('aria-expanded', String(isOpen)));
}

function setActiveFilterButton(filter) {
    drawerFilterButtons.forEach(button => {
        const isActive = button.getAttribute('data-filter') === filter;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
}

function applyDrawerState() {
    const filteredProjects = getFilteredProjects();

    if (drawerProjectsGrid) {
        drawerProjectsGrid.innerHTML = filteredProjects.map(renderDrawerCard).join('');
        drawerProjectsGrid.style.display = filteredProjects.length === 0 ? 'none' : '';
    }

    if (noResults) {
        noResults.style.display = filteredProjects.length === 0 ? 'flex' : 'none';
    }
}

function updateDrawerState(nextState) {
    drawerState.activeFilter = nextState.activeFilter;
    drawerState.searchTerm = nextState.searchTerm;
    setActiveFilterButton(drawerState.activeFilter);

    if (drawerSearch && drawerSearch.value !== drawerState.searchTerm) {
        drawerSearch.value = drawerState.searchTerm;
    }

    applyDrawerState();
}

function trapDrawerFocus(event) {
    if (!appDrawer || !appDrawer.classList.contains('active') || event.key !== 'Tab') {
        return;
    }

    const focusableElements = (drawerPanel || appDrawer).querySelectorAll(focusableSelector);
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

async function openDrawer(event) {
    if (!appDrawer) {
        return;
    }

    if (event) {
        event.preventDefault();
    }

    previousFocusedElement = document.activeElement;
    try {
        await ensureProjectsLoaded();
    } catch (error) {
        console.error('Failed to load projects data for drawer:', error);
        allProjects = [];
    }
    appDrawer.classList.add('active');
    appDrawer.setAttribute('aria-hidden', 'false');
    setDrawerTriggerState(true);
    document.body.style.overflow = 'hidden';
    updateDrawerState({ activeFilter: 'all', searchTerm: '' });

    if (drawerSearch) {
        setTimeout(() => {
            drawerSearch.focus();
        }, 300);
    }
}

function closeDrawer() {
    if (!appDrawer) {
        return;
    }

    appDrawer.classList.remove('active');
    appDrawer.setAttribute('aria-hidden', 'true');
    setDrawerTriggerState(false);
    document.body.style.overflow = '';
    updateDrawerState({ activeFilter: 'all', searchTerm: '' });

    if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
        previousFocusedElement.focus();
    }
}

if (drawerFilterButtons.length) {
    drawerFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const nextFilter = this.getAttribute('data-filter') || 'all';
            updateDrawerState({
                activeFilter: nextFilter,
                searchTerm: ''
            });
        });
    });
}

if (drawerSearch) {
    drawerSearch.addEventListener('input', function () {
        updateDrawerState({
            activeFilter: 'all',
            searchTerm: this.value
        });
    });
}

drawerOpenTriggers.forEach(trigger => {
    trigger.addEventListener('click', openDrawer);
});

if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeDrawer);
}

if (appDrawer) {
    appDrawer.addEventListener('click', function (event) {
        if (event.target === appDrawer) {
            closeDrawer();
        }
    });
}

document.addEventListener('keydown', function (event) {
    if (!appDrawer || !appDrawer.classList.contains('active')) {
        return;
    }

    if (event.key === 'Escape') {
        closeDrawer();
        return;
    }

    trapDrawerFocus(event);
});

document.addEventListener('projectsDataLoaded', function (event) {
    const projects = event.detail?.projects;
    if (!Array.isArray(projects)) {
        return;
    }

    allProjects = projects;

    if (appDrawer && appDrawer.classList.contains('active')) {
        applyDrawerState();
    }
});