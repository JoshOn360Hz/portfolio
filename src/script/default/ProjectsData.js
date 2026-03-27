(function () {
    const featuredProjectsGrid = document.querySelector('.featured-projects-grid');
    const projectsGrid = document.querySelector('#projects .projects-grid');
    const filterButtons = document.querySelectorAll('#projects .filter-btn');
    const defaultFilter = 'ios';

    function renderProjectButtons(links) {
        return links.map(link => {
            return `<a class="${link.buttonClass}" href="${link.url}" target="_blank" rel="noopener noreferrer"><i class="${link.iconClass}"></i> ${link.label}</a>`;
        }).join('');
    }

    function renderBadges(badges) {
        return badges.map(badge => `<span class="badge">${badge}</span>`).join('');
    }

    function getFeaturedLinks(links) {
        const safeLinks = Array.isArray(links) ? links : [];
        const githubLink = safeLinks.find(link => (link.label || '').toLowerCase() === 'github');
        const appleLink = safeLinks.find(link => (link.iconClass || '').toLowerCase().includes('fa-apple'));

        return [appleLink, githubLink].filter(Boolean);
    }

    function renderFeaturedCard(project) {
        const statusClass = project.status ? `status-${project.status}` : '';
        const statusLabel = project.statusLabel || '';

        return `
            <div class="project-card featured-project-card" data-category="${project.category}">
                <div class="featured-card-head">
                    <div class="project-icon">
                        <img src="${project.image}" alt="${project.imageAlt}">
                    </div>
                    <div class="featured-project-title-row">
                        <h3>${project.name}</h3>
                        ${statusLabel ? `<span class="status-badge ${statusClass}">${statusLabel}</span>` : ''}
                    </div>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="tech-badges">
                    ${renderBadges(project.badges)}
                </div>
                <div class="project-buttons">
                    ${renderProjectButtons(getFeaturedLinks(project.links))}
                </div>
            </div>
        `;
    }

    function renderProjectCard(project) {
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

    function applyFilterButtonState(activeFilter) {
        filterButtons.forEach(button => {
            const isActive = button.getAttribute('data-filter') === activeFilter;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function renderFeaturedProjects(projects) {
        if (!featuredProjectsGrid) {
            return;
        }

        const featured = projects
            .filter(project => project.featured)
            .sort((a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0));

        featuredProjectsGrid.innerHTML = featured.map(renderFeaturedCard).join('');
    }

    function renderProjectsGrid(projects, activeFilter) {
        if (!projectsGrid) {
            return;
        }

        const filtered = projects.filter(project => project.category === activeFilter);
        projectsGrid.innerHTML = filtered.map(renderProjectCard).join('');
    }

    function setupFilters(projects) {
        applyFilterButtonState(defaultFilter);
        renderProjectsGrid(projects, defaultFilter);

        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                const filter = this.getAttribute('data-filter') || defaultFilter;
                applyFilterButtonState(filter);
                renderProjectsGrid(projects, filter);
            });
        });
    }

    function parseProjectsPayload(payload) {
        if (Array.isArray(payload)) {
            return payload;
        }

        if (payload && Array.isArray(payload.projects)) {
            return payload.projects;
        }

        return [];
    }

    function renderFallbackMarkup(message, showRetry) {
        const retryButton = showRetry
            ? '<button class="projects-retry-btn" type="button">Refresh page</button>'
            : '';

        return `
            <div class="projects-fallback" role="status" aria-live="polite">
                <i class="fa-solid fa-rotate-right" aria-hidden="true"></i>
                <p class="projects-fallback-message">${message}</p>
                ${retryButton}
            </div>
        `;
    }

    function attachRetryHandlers() {
        const retryButtons = document.querySelectorAll('.projects-retry-btn');
        retryButtons.forEach(button => {
            button.addEventListener('click', function () {
                window.location.reload();
            });
        });
    }

    function showLoadErrorState() {
        const isFileProtocol = window.location.protocol === 'file:';
        const message = isFileProtocol
            ? 'Projects are unavailable right now. Please refresh.'
            : 'Projects are unavailable right now. Please refresh.';

        if (featuredProjectsGrid) {
            featuredProjectsGrid.innerHTML = renderFallbackMarkup(message, true);
        }

        if (projectsGrid) {
            projectsGrid.innerHTML = renderFallbackMarkup(message, true);
        }

        attachRetryHandlers();
    }

    async function loadProjectsData() {
        const pathsToTry = [
            'projects.json',
            './projects.json',
            '/projects.json'
        ];

        let lastError = null;

        for (const path of pathsToTry) {
            try {
                const response = await fetch(path, { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error(`Failed to load ${path} (${response.status})`);
                }

                const payload = await response.json();
                return parseProjectsPayload(payload);
            } catch (error) {
                lastError = error;
            }
        }

        throw lastError || new Error('Unable to load projects data from any known path.');
    }

    function initialize() {
        if (!window.__projectsDataPromise) {
            window.__projectsDataPromise = loadProjectsData()
                .then(projects => {
                    window.__projectsData = projects;
                    return projects;
                });
        }

        window.__projectsDataPromise
            .then(projects => {
                renderFeaturedProjects(projects);
                setupFilters(projects);

                document.dispatchEvent(new CustomEvent('projectsDataLoaded', {
                    detail: { projects: projects }
                }));
            })
            .catch(error => {
                console.error('Projects data failed to load:', error);
                showLoadErrorState();
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
