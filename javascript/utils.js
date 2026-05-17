function loadComponentWithAnimation(id, file) {
    const content = document.getElementById(id);
    if (!content) return;

    content.classList.add('slide-out');

    setTimeout(() => {
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(data => {
                content.innerHTML = data;
                content.classList.remove('slide-out');
                content.classList.add('hidden');

                // Wait for the browser to process the innerHTML
                requestAnimationFrame(() => {
                    content.classList.remove('hidden');
                    content.classList.add('slide-in');

                    // Reactivate listeners in the new content
                    if (typeof addNavLinkListeners === 'function') {
                        addNavLinkListeners();
                    }
                    if (typeof highlightActiveLink === 'function') {
                        highlightActiveLink();
                    }

                    // Specific initializers according to the loaded file
                    console.log('📄 Component loaded:', file);

                    const fileName = file.split('/').pop();

                    switch(fileName) {
                        case 'home.html':
                            console.log('🏠 Home loaded, initializing systems...');
                            if (typeof initHomePageSystems === 'function') {
                                initHomePageSystems();
                            } else {
                                console.warn('initHomePageSystems is not available');
                            }
                            break;
                        case 'planes.html':
                            console.log('📋 Planes loaded, initializing systems...');
                            if (typeof initPlagesPage === 'function') {
                                initPlagesPage();
                            } else {
                                console.warn('initPlagesPage is not available');
                            }
                            break;
                        case 'shop.html':
                            console.log('🛒 Shop loaded, initializing systems...');
                            if (typeof initializeShop === 'function') {
                                initializeShop();
                            } else {
                                console.warn('initializeShop is not available');
                            }
                            break;
                        case 'history.html':
                            console.log('📜 History loaded, initializing systems...');
                            if (typeof initHistoryPage === 'function') {
                                initHistoryPage();
                            } else {
                                console.warn('initHistoryPage is not available');
                            }
                            break;
                        case 'blog.html':
                            console.log('📰 Blog loaded, initializing systems...');
                            if (typeof initBlogPage === 'function') {
                                initBlogPage();
                            } else {
                                console.warn('initBlogPage is not available');
                            }
                            break;
                    }
                });
            })
            .catch(error => console.error('Error loading component:', error));
    }, 500);
}

function updateURL(targetSection) {
    if (window.location.hash !== `#${targetSection}`) {
        window.history.pushState({}, '', `#${targetSection}`);
    }
}

function setActiveLink(activeLink) {
    const navLinks = document.querySelectorAll('nav ul li a, footer a[data-target]');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Initialize on page load based on hash
window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    // Small delay to ensure all scripts are loaded
    setTimeout(() => {
        const activeLink = document.querySelector(`nav a[data-target="${hash}"], footer a[data-target="${hash}"]`);
        if (activeLink) setActiveLink(activeLink);
    }, 100);
});
