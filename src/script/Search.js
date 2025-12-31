 // Search functionality
    if (drawerSearch) {
        drawerSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const drawerCards = drawerProjectsGrid.querySelectorAll('.project-card');
            const noResults = document.getElementById('noResults');
            
            // Reset filter to "All" when searching
            if (searchTerm) {
                drawerFilterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-filter') === 'all') {
                        btn.classList.add('active');
                    }
                });
            }
            
            let visibleCount = 0;
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
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show or hide no results message
            if (visibleCount === 0 && searchTerm) {
                noResults.style.display = 'flex';
                drawerProjectsGrid.style.display = 'none';
            } else {
                noResults.style.display = 'none';
                drawerProjectsGrid.style.display = '';
            }
        });
    }