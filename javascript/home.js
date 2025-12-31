// home.js - SISTEMA AZUCA CAFE COMPLETO
(function() {
    console.log('=== SISTEMA AZUCA CAFE ===');
    
    // ============================================
    // SISTEMA DE CERTIFICACIONES (YA FUNCIONA)
    // ============================================
    function initCertificationsSystem() {
        console.log('Inicializando sistema de certificaciones...');
        
        const CHECK_INTERVAL = 200;
        const MAX_CHECKS = 30;
        let checkCount = 0;
        let checkTimer = null;
        
        function checkForCertSection() {
            const section = document.querySelector('.certifications-section');
            const items = document.querySelectorAll('.cert-item');
            return section && items.length > 0;
        }
        
        function checkCertSectionInterval() {
            checkCount++;
            
            if (checkForCertSection()) {
                clearInterval(checkTimer);
                initializeCertifications();
                return;
            }
            
            if (checkCount >= MAX_CHECKS) {
                clearInterval(checkTimer);
                console.warn('No se encontró la sección de certificaciones');
            }
        }
        
        function initializeCertifications() {
            console.log('✅ Certificaciones encontradas, inicializando...');
            const certItems = document.querySelectorAll('.cert-item');
            
            certItems.forEach(item => {
                item.style.cursor = 'pointer';
                
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Certificación clickeada');
                    openCertification(item);
                });
                
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateY(-10px)';
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'translateY(0)';
                });
            });
            
            setupCertModal();
            
            const discoverText = document.querySelector('.discover-text');
            if (discoverText) {
                discoverText.style.animationPlayState = 'running';
            }
        }
        
        function openCertification(item) {
            const img = item.querySelector('img');
            const title = item.querySelector('.cert-name');
            const details = item.querySelector('.cert-details');
            
            if (!img || !title || !details) {
                console.error('Elementos de certificación no encontrados');
                return;
            }
            
            let modal = document.getElementById('certModal');
            if (!modal) {
                modal = createCertModal();
            }
            
            const modalLogo = modal.querySelector('#modalLogo');
            const modalTitle = modal.querySelector('#modalTitle');
            const modalDetails = modal.querySelector('#modalDetails');
            
            if (modalLogo) modalLogo.src = img.src;
            if (modalTitle) modalTitle.textContent = title.textContent;
            if (modalDetails) modalDetails.innerHTML = details.innerHTML;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            console.log('Modal de certificación abierto');
        }
        
        function setupCertModal() {
            let modal = document.getElementById('certModal');
            
            if (!modal) {
                modal = createCertModal();
            }
            
            const closeBtn = modal.querySelector('.close-modal');
            
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                    console.log('Modal cerrado');
                });
            }
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                    console.log('Modal cerrado por overlay');
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                    console.log('Modal cerrado con ESC');
                }
            });
        }
        
        function createCertModal() {
            // Eliminar modal existente si hay
            const existingModal = document.getElementById('certModal');
            if (existingModal) {
                existingModal.remove();
            }
            
            const modal = document.createElement('div');
            modal.id = 'certModal';
            modal.className = 'certification-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="close-modal">×</button>
                    <div class="modal-body">
                        <div class="modal-left">
                            <img id="modalLogo" src="" alt="Logo">
                            <h3 id="modalTitle"></h3>
                        </div>
                        <div class="modal-right">
                            <div id="modalDetails"></div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            return modal;
        }
        
        // Iniciar verificación
        if (checkForCertSection()) {
            initializeCertifications();
        } else {
            checkTimer = setInterval(checkCertSectionInterval, CHECK_INTERVAL);
        }
    }
    
    // ============================================
    // SISTEMA DE SUSCRIPCIÓN - ORIGINAL CORREGIDO
    // ============================================
    function initSubscriptionSystem() {
        console.log('Inicializando sistema de suscripción...');
        
        const CHECK_INTERVAL = 200;
        const MAX_CHECKS = 30;
        let checkCount = 0;
        let checkTimer = null;
        
        // Función para verificar si la sección existe
        function checkForSubscriptionSection() {
            const openBtn = document.getElementById('openSubscriptionModal');
            const modal = document.getElementById('subscriptionModal');
            const section = document.querySelector('.subscription-section');
            
            return openBtn && modal && section;
        }
        
        // Verificar periódicamente
        function checkSubscriptionSectionInterval() {
            checkCount++;
            
            if (checkForSubscriptionSection()) {
                clearInterval(checkTimer);
                initializeSubscription();
                return;
            }
            
            if (checkCount >= MAX_CHECKS) {
                clearInterval(checkTimer);
                console.warn('❌ Elementos de suscripción no encontrados después de ' + MAX_CHECKS + ' intentos');
            }
        }
        
        // Inicializar suscripción cuando los elementos estén disponibles
        function initializeSubscription() {
            console.log('✅ Elementos de suscripción encontrados, inicializando...');
            
            const openBtn = document.getElementById('openSubscriptionModal');
            const modal = document.getElementById('subscriptionModal');
            const closeBtn = modal.querySelector('.modal-close');
            const startBtn = document.getElementById('startSubscription');
            const overlay = modal.querySelector('.modal-overlay');
            
            // Verificar nuevamente que los elementos existen
            if (!openBtn || !modal) {
                console.error('❌ Elementos críticos no encontrados');
                return;
            }
            
            console.log('✅ Todos los elementos encontrados correctamente');
            
            // ===== CONFIGURAR BOTÓN DE APERTURA =====
            openBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('📱 Botón clickeado - Abriendo modal...');
                openSubscriptionModal();
            });
            
            // ===== CONFIGURAR CIERRE DEL MODAL =====
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    console.log('❌ Botón cerrar clickeado');
                    closeSubscriptionModal();
                });
            }
            
            if (overlay) {
                overlay.addEventListener('click', function() {
                    console.log('❌ Overlay clickeado');
                    closeSubscriptionModal();
                });
            }
            
            // Cerrar con ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    console.log('❌ Tecla ESC presionada');
                    closeSubscriptionModal();
                }
            });
            
            // ===== CONFIGURAR SUSCRIPCIÓN =====
            if (startBtn) {
                startBtn.addEventListener('click', function() {
                    console.log('🚀 Iniciando suscripción...');
                    startSubscription();
                });
            }
            
            // ===== CONFIGURAR COMPONENTES INTERNOS DEL MODAL =====
            setupModalComponents();
            
            // ===== ANIMAR ESTADÍSTICAS =====
            animateSubscriptionStats();
            
            console.log('✅ Sistema de suscripción completamente inicializado');
        }
        
        function openSubscriptionModal() {
            const modal = document.getElementById('subscriptionModal');
            if (!modal) {
                console.error('❌ Modal no encontrado');
                return;
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            console.log('✅ Modal de suscripción abierto');
        }
        
        function closeSubscriptionModal() {
            const modal = document.getElementById('subscriptionModal');
            if (modal) {
                modal.classList.remove('active');
            }
            document.body.style.overflow = '';
            console.log('✅ Modal de suscripción cerrado');
        }
        
        function startSubscription() {
            console.log('🚀 Proceso de suscripción iniciado');
            
            // Verificar si hay un plan seleccionado
            const selectedPlan = localStorage.getItem('selected_plan');
            if (!selectedPlan) {
                showNotification('Por favor, selecciona un plan antes de continuar.', 'warning');
                return;
            }
            
            showNotification('¡Excelente elección! Te contactaremos pronto para completar tu suscripción.', 'success');
            
            // Cerrar modal después de 2 segundos
            setTimeout(() => {
                closeSubscriptionModal();
            }, 2000);
        }
        
        function setupModalComponents() {
            console.log('🔧 Configurando componentes del modal...');
            
            // Pestañas de variedades
            const varietyTabs = document.querySelectorAll('.variety-tab');
            const varietyContents = document.querySelectorAll('.variety-content');
            
            if (varietyTabs.length > 0) {
                console.log('✅ ' + varietyTabs.length + ' pestañas de variedades encontradas');
                varietyTabs.forEach(tab => {
                    tab.addEventListener('click', function() {
                        const variety = this.getAttribute('data-variety');
                        
                        // Remover clase active
                        varietyTabs.forEach(t => t.classList.remove('active'));
                        varietyContents.forEach(c => c.classList.remove('active'));
                        
                        // Agregar clase active
                        this.classList.add('active');
                        const content = document.getElementById(variety);
                        if (content) {
                            content.classList.add('active');
                        }
                        
                        console.log('🌱 Variedad seleccionada: ' + variety);
                    });
                });
            }
            
            // Botones de planes
            const planButtons = document.querySelectorAll('.plan-btn');
            if (planButtons.length > 0) {
                console.log('✅ ' + planButtons.length + ' botones de planes encontrados');
                planButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const plan = this.getAttribute('data-plan');
                        
                        // Resetear todos los botones
                        planButtons.forEach(btn => {
                            btn.textContent = 'Elegir Plan';
                            btn.classList.remove('selected');
                        });
                        
                        // Marcar como seleccionado
                        this.textContent = '✓ Seleccionado';
                        this.classList.add('selected');
                        localStorage.setItem('selected_plan', plan);
                        
                        console.log('📦 Plan seleccionado: ' + plan);
                        
                        // Scroll suave al botón de suscripción
                        const startBtn = document.getElementById('startSubscription');
                        if (startBtn) {
                            startBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    });
                    
                    // Restaurar selección previa al cargar
                    const plan = button.getAttribute('data-plan');
                    const selectedPlan = localStorage.getItem('selected_plan');
                    if (selectedPlan === plan) {
                        button.textContent = '✓ Seleccionado';
                        button.classList.add('selected');
                    }
                });
            }
        }
        
        function animateSubscriptionStats() {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const target = parseInt(element.getAttribute('data-count'));
                        animateCounter(element, target, 2000);
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.5 });
            
            statNumbers.forEach(stat => observer.observe(stat));
        }
        
        function animateCounter(element, target, duration) {
            let start = 0;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start);
                }
            }, 16);
        }
        
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `subscription-notification ${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-icon">${type === 'success' ? '🎉' : '⚠️'}</span>
                    <span class="notification-text">${message}</span>
                </div>
            `;
            
            // Estilos dinámicos
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: ${type === 'success' ? 'linear-gradient(135deg, #3a4a2c 0%, #556345 100%)' : 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'};
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 10001;
                animation: slideInRight 0.5s ease;
            `;
            
            document.body.appendChild(notification);
            
            // Remover después de 5 segundos
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.5s ease forwards';
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 5000);
        }
        
        // Iniciar verificación del sistema de suscripción
        if (checkForSubscriptionSection()) {
            initializeSubscription();
        } else {
            console.log('🔍 Buscando elementos de suscripción...');
            checkTimer = setInterval(checkSubscriptionSectionInterval, CHECK_INTERVAL);
        }
    }
    
    // ============================================
// SISTEMA DE UBICACIONES - VERSIÓN DEFINITIVA
// ============================================
function initLocationsSystem() {
    console.log('🚀 Inicializando sistema de ubicaciones...');

    // 1. ELEMENTOS BASE
    const locationTabs = document.querySelectorAll('.location-tab');
    const locationItems = document.querySelectorAll('.location-item');

    if (!locationTabs.length || !locationItems.length) {
        console.warn('❌ Tabs o contenidos de ubicación no encontrados');
        return;
    }

    console.log(`✅ ${locationTabs.length} tabs encontrados`);

    // 2. CONFIGURACIÓN DE TABS
    locationTabs.forEach(tab => {
        tab.style.cursor = 'pointer';
        tab.style.pointerEvents = 'auto';
        tab.setAttribute('tabindex', '0');

        // CLICK
        tab.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();

            const location = tab.getAttribute('data-location');
            console.log(`📍 Tab clickeado: ${location}`);

            if (!location) {
                console.warn('⚠️ Tab sin data-location');
                return;
            }

            // Cambiar estado visual de tabs
            locationTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });

            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Cambiar contenido (SOLO CLASES, NUNCA display inline)
            locationItems.forEach(item => {
                item.classList.remove('active');
            });

            const activeContent = document.querySelector(
                `.location-item[data-location="${location}"]`
            );

            if (!activeContent) {
                console.warn(`❌ No existe contenido para: ${location}`);
                return;
            }

            activeContent.classList.add('active');

            // Feedback visual ligero
            tab.style.transform = 'scale(0.97)';
            setTimeout(() => {
                tab.style.transform = '';
            }, 120);
        });

        // HOVER
        tab.addEventListener('mouseenter', () => {
            if (!tab.classList.contains('active')) {
                tab.style.transform = 'translateY(-3px)';
            }
        });

        tab.addEventListener('mouseleave', () => {
            if (!tab.classList.contains('active')) {
                tab.style.transform = '';
            }
        });

        // TECLADO
        tab.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tab.click();
            }
        });
    });

    // 3. TOOLTIP PARA BARRAS DE COSECHA
    const bars = document.querySelectorAll('.bar');

    bars.forEach(bar => {
        bar.style.cursor = 'pointer';

        bar.addEventListener('mouseenter', () => {
            const month = bar.getAttribute('data-month');
            const percent = parseInt(bar.style.height);

            if (month && !isNaN(percent)) {
                showBarTooltip(bar, month, percent);
            }
        });

        bar.addEventListener('mouseleave', hideBarTooltip);
    });

    console.log('✅ Sistema de ubicaciones completamente inicializado');
}

// ============================================
// TOOLTIP DE BARRAS
// ============================================
function showBarTooltip(bar, month, percent) {
    const monthNames = {
        Ene: 'Enero',
        Feb: 'Febrero',
        Mar: 'Marzo',
        Abr: 'Abril',
        May: 'Mayo',
        Jun: 'Junio',
        Jul: 'Julio',
        Ago: 'Agosto',
        Sep: 'Septiembre',
        Oct: 'Octubre',
        Nov: 'Noviembre',
        Dic: 'Diciembre'
    };

    hideBarTooltip();

    const tooltip = document.createElement('div');
    tooltip.className = 'bar-tooltip';
    tooltip.textContent = `${monthNames[month] || month}: ${percent}%`;

    const rect = bar.getBoundingClientRect();

    tooltip.style.cssText = `
        position: fixed;
        top: ${rect.top - 42}px;
        left: ${rect.left + rect.width / 2}px;
        transform: translateX(-50%);
        background: #2e7d32;
        color: #fff;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        font-family: 'Montserrat', sans-serif;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    document.body.appendChild(tooltip);
}

// ============================================
// OCULTAR TOOLTIP
// ============================================
function hideBarTooltip() {
    const tooltip = document.querySelector('.bar-tooltip');
    if (tooltip) tooltip.remove();
}
    
    // AGREGAR ESTILOS DINÁMICOS PARA UBICACIONES
    function addLocationsStyles() {
        if (!document.querySelector('#locations-dynamic-styles')) {
            const style = document.createElement('style');
            style.id = 'locations-dynamic-styles';
            style.textContent = `
                /* ANIMACIONES PARA UBICACIONES */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                /* MEJORAS PARA INTERACCIÓN */
                .location-tab {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }
                
                .location-item {
                    animation: fadeIn 0.5s ease-out !important;
                }
                
                .bar {
                    cursor: pointer !important;
                    transition: all 0.3s ease !important;
                }
                
                .bar:hover {
                    opacity: 0.8 !important;
                }
                
                /* ACCESIBILIDAD */
                .location-tab:focus {
                    outline: 2px solid #ffd166;
                    outline-offset: 3px;
                }
                
                /* RESPONSIVE ADICIONAL */
                @media (max-width: 768px) {
                    .bar-tooltip {
                        font-size: 11px;
                        padding: 5px 10px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ============================================
    // SISTEMA DE CARDS DINÁMICAS
    // ============================================
    function initCardsSystem() {
        console.log('Inicializando sistema de cards dinámicas...');
        
        const cardButtons = document.querySelectorAll('.card-button');
        
        if (cardButtons.length === 0) {
            console.warn('No se encontraron card-buttons');
            return;
        }
        
        cardButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const targetSection = this.getAttribute('data-target');
                console.log('📱 Card clickeada:', targetSection);
                
                if (targetSection) {
                    // Cambiar el hash para navegar
                    window.location.hash = targetSection;
                }
            });
            
            // Agregar efecto visual en click
            button.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
        });
        
        console.log('✅ Sistema de cards inicializado');
    }
    
    // ============================================
    // ESTILOS DINÁMICOS - SOLO PARA INTERACCIÓN
    // ============================================
    function addDynamicStyles() {
        if (!document.querySelector('#dynamic-styles')) {
            const style = document.createElement('style');
            style.id = 'dynamic-styles';
            style.textContent = `
                /* ESTILOS PARA HABILITAR INTERACCIÓN */
                
                /* Asegurar que el overlay no bloquee clics */
                .modal-overlay {
                    pointer-events: auto !important;
                    z-index: 1 !important;
                }
                
                /* Asegurar que el contenido del modal esté sobre el overlay */
                .modal-container,
                .modal-content {
                    pointer-events: auto !important;
                    z-index: 2 !important;
                    position: relative !important;
                }
                
                /* Asegurar que los botones sean clickeables */
                button,
                .plan-btn,
                .variety-tab,
                .modal-close,
                .close-modal,
                .modal-cta {
                    cursor: pointer !important;
                    pointer-events: auto !important;
                }
                
                /* Cuando el modal está activo, permitir interacción */
                .subscription-modal.active,
                .certification-modal.active {
                    pointer-events: auto !important;
                }
                
                /* Cuando el modal NO está activo, bloquear interacción */
                .subscription-modal:not(.active),
                .certification-modal:not(.active) {
                    pointer-events: none !important;
                }
                
                /* Estilos para notificaciones */
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                
                /* Estilos para botones de plan seleccionado */
                .plan-btn.selected {
                    background: #3f4a33 !important;
                    color: white !important;
                }
                
                /* Mejoras de accesibilidad */
                button:focus {
                    outline: 2px solid #ffd166;
                    outline-offset: 2px;
                }
                
                /* Asegurar que el modal esté por encima de todo */
                .subscription-modal,
                .certification-modal {
                    z-index: 10000 !important;
                }
                
                /* Responsive adicional */
                @media (max-width: 768px) {
                    .subscription-notification {
                        left: 20px;
                        right: 20px;
                        bottom: 10px;
                        text-align: center;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ============================================
    // INICIALIZACIÓN PRINCIPAL
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        console.log('📄 DOM cargado, inicializando sistemas...');
        
        // Agregar estilos dinámicos primero
        addDynamicStyles();
        
        // Inicializar certificaciones (ya funciona)
        initCertificationsSystem();
        
        // Inicializar suscripción con retraso
        setTimeout(function() {
            initSubscriptionSystem();
        }, 300);
        
        // Inicializar cards
        setTimeout(function() {
            initCardsSystem();
        }, 200);
        
        // Inicializar ubicaciones
        setTimeout(function() {
            initLocationsSystem();
        }, 400);
        
        console.log('✅ Todos los sistemas en proceso de inicialización');
    });
    
    // Si el DOM ya está listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Agregar estilos dinámicos primero
            addDynamicStyles();
            
            // Inicializar certificaciones (ya funciona)
            initCertificationsSystem();
            
            // Inicializar suscripción con retraso
            setTimeout(function() {
                initSubscriptionSystem();
            }, 300);
            
            // Inicializar cards
            setTimeout(function() {
                initCardsSystem();
            }, 200);
            
            // Inicializar ubicaciones
            setTimeout(function() {
                initLocationsSystem();
            }, 400);
            
            console.log('✅ Todos los sistemas inicializados');
        });
    } else {
        // Ejecutar directamente si el DOM ya está listo
        setTimeout(function() {
            addDynamicStyles();
            initCertificationsSystem();
            initSubscriptionSystem();
            initCardsSystem();
            initLocationsSystem();
        }, 100);
    }
    
})();