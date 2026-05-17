function highlightActiveLink() {
    const navLinks = document.querySelectorAll('a[data-target]');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    navLinks.forEach(link => {
        const target = link.getAttribute('data-target');
        if (!window.location.hash && target === 'home') {
            link.classList.add('active');
        } else if (window.location.hash === `#${target}`) {
            link.classList.add('active');
        }
    });
}

function addNavLinkListeners() {
    const navLinks = document.querySelectorAll('a[data-target]');

    navLinks.forEach(link => {
        // Remove existing listener to avoid duplicates if re-initialized
        link.removeEventListener('click', handleNavLinkClick);
        link.addEventListener('click', handleNavLinkClick);
    });

    // Mobile menu toggle
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    if (toggleBtn && nav) {
        // Use a named function to be able to remove it if needed,
        // but better yet, just check if we already initialized it.
        if (!toggleBtn.dataset.initialized) {
            toggleBtn.addEventListener('click', () => {
                nav.classList.toggle('active');
                toggleBtn.classList.toggle('active');
            });
            toggleBtn.dataset.initialized = "true";
        }
    }
}

function handleNavLinkClick(event) {
    const targetSection = this.getAttribute('data-target');
    if (!targetSection) return;

    event.preventDefault();

    // Update URL first so loadComponentWithAnimation can see the new hash if needed
    updateURL(targetSection);

    // Load component
    loadComponentWithAnimation('content', `html/${targetSection}.html`);

    // Mark as active
    setActiveLink(this);
    const nav = document.querySelector("nav");
    const toggleBtn = document.querySelector(".mobile-menu-toggle");
    if (nav && window.innerWidth <= 768) {
        nav.classList.remove("active");
        if (toggleBtn) toggleBtn.classList.remove("active");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    highlightActiveLink();
    addNavLinkListeners();
});

/* =====================================
   SMART NAVBAR SCROLL BEHAVIOR
===================================== */

let lastScrollTop = 0;
let navbar;
const scrollThreshold = 10;

function handleNavbarScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!navbar) return;

    if (scrollTop > lastScrollTop + scrollThreshold && scrollTop > 100) {
        navbar.classList.add('navbar-hidden');
    }
    else if (scrollTop < lastScrollTop - scrollThreshold) {
        navbar.classList.remove('navbar-hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

document.addEventListener('DOMContentLoaded', () => {
    const waitForNavbar = setInterval(() => {
        navbar = document.querySelector('.navbar-container');

        if (navbar) {
            clearInterval(waitForNavbar);
            window.addEventListener('scroll', handleNavbarScroll, { passive: true });
        }
    }, 50);
});
