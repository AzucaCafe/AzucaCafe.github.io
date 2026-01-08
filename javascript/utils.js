function loadComponentWithAnimation(id, file) {
    const content = document.getElementById(id);
    content.classList.add('slide-out');

    setTimeout(() => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                content.innerHTML = data;
                content.classList.remove('slide-out');
                content.classList.add('hidden');

                setTimeout(() => {
                    content.classList.remove('hidden');
                    content.classList.add('slide-in');

                    // ✅ Reactiva los listeners en el nuevo contenido
                    addNavLinkListeners();

                    // ✅ Ejecutar inicializadores específicos según el archivo cargado
                    console.log('📄 Componente cargado:', file);
                    
                    if (file.includes('home.html')) {
                        console.log('🏠 Home cargado, inicializando sistemas...');
                        setTimeout(() => {
                            if (typeof initHomePageSystems === 'function') {
                                initHomePageSystems();
                            } else {
                                console.warn('initHomePageSystems no está disponible');
                            }
                        }, 100);
                    } else if (file.includes('planes.html')) {
                        console.log('📋 Planes cargado, inicializando sistemas...');
                        setTimeout(() => {
                            if (typeof initPlagesPage === 'function') {
                                initPlagesPage();
                            } else {
                                console.warn('initPlagesPage no está disponible');
                            }
                        }, 100);
                    }

                }, 100);
            })
            .catch(error => console.error('Error loading component:', error));
    }, 500);
}

function updateURL(targetSection) {
    window.history.pushState({}, '', `#${targetSection}`);
}

function setActiveLink(activeLink) {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}
