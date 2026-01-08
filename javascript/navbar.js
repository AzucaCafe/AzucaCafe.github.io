function highlightActiveLink() {
    const navLinks = document.querySelectorAll('a[data-target]');
    const currentLocation = window.location.href;
    let homeLinkSet = false;

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    navLinks.forEach(link => {
        const target = link.getAttribute('data-target');
        if (!window.location.hash && target === 'home' && !homeLinkSet) {
            link.classList.add('active');
            homeLinkSet = true;
        }
        if (window.location.hash === `#${target}`) {
            link.classList.add('active');
        }
    });
}

function addNavLinkListeners() {
    const navLinks = document.querySelectorAll('a[data-target]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const targetSection = this.getAttribute('data-target');
            
            // Caso especial para tienda
            if (targetSection === 'shop') {
                event.preventDefault();
                
                // Cargar la tienda
                loadComponentWithAnimation('content', `../html/${targetSection}.html`);
                
                // Actualizar URL
                updateURL(targetSection);
                
                // Marcar como activo
                setActiveLink(this);
                
                // Inicializar la tienda después de cargar
                setTimeout(() => {
                    if (window.initializeShop) {
                        window.initializeShop();
                    }
                }, 800); // Delay para animaciones
                
                return;
            }
            
            event.preventDefault();
            if (targetSection) {
                loadComponentWithAnimation('content', `../html/${targetSection}.html`);
                updateURL(targetSection);
                setActiveLink(this);
            }
        });
    });
}

function setActiveLink(activeLink) {
    const navLinks = document.querySelectorAll('a[data-target]');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
    highlightActiveLink();
    addNavLinkListeners();
});
