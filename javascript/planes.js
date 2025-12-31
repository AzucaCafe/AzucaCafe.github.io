// planes.js - Funcionalidad de la página de planes
(function() {
    console.log('📋 Inicializando sistema de Planes...');

    // ============================================
    // SISTEMA DE SELECCIÓN DE PLANES
    // ============================================
    function initPlansSystem() {
        console.log('Configurando sistema de planes...');
        
        const planButtons = document.querySelectorAll('.plan-btn');
        
        if (planButtons.length === 0) {
            console.warn('No se encontraron botones de planes');
            return;
        }

        planButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const plan = this.getAttribute('data-plan');
                console.log('📦 Plan seleccionado:', plan);
                
                // Guardar en localStorage
                localStorage.setItem('selected_plan', plan);
                
                // Mostrar notificación
                showPlanNotification(plan);
                
                // Agregar efecto visual
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        });

        console.log('✅ Sistema de planes configurado');
    }

    // ============================================
    // SISTEMA DE FAQ ACCORDION
    // ============================================
    function initFaqSystem() {
        console.log('Configurando FAQ...');
        
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        if (faqQuestions.length === 0) {
            console.warn('No se encontraron preguntas FAQ');
            return;
        }

        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.closest('.faq-item');
                const isActive = faqItem.classList.contains('active');
                
                // Cerrar todos los FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Abrir el seleccionado (si no estaba abierto)
                if (!isActive) {
                    faqItem.classList.add('active');
                    console.log('❓ FAQ abierto');
                }
            });
        });

        console.log('✅ Sistema FAQ configurado');
    }

    // ============================================
    // NOTIFICACIONES DE SELECCIÓN
    // ============================================
    function showPlanNotification(planName) {
        const notification = document.createElement('div');
        notification.className = 'plan-notification';
        
        const planNames = {
            'basico': 'Plan Básico',
            'profesional': 'Plan Profesional',
            'premium': 'Plan Premium'
        };

        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✓</span>
                <div class="notification-text">
                    <h4>¡Plan Seleccionado!</h4>
                    <p>${planNames[planName] || planName}</p>
                </div>
            </div>
        `;

        // Estilos dinámicos
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #3a4a2c 0%, #556345 100%);
            color: white;
            padding: 20px 25px;
            border-radius: 15px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInUp 0.5s ease;
            font-family: 'Montserrat', sans-serif;
            max-width: 350px;
            display: flex;
            gap: 15px;
        `;

        // Añadir estilos de animación si no existen
        if (!document.querySelector('#plan-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'plan-notification-styles';
            style.textContent = `
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes slideOutDown {
                    from {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(100px);
                    }
                }
                .plan-notification {
                    font-size: 1em !important;
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .notification-icon {
                    font-size: 1.5em;
                    font-weight: 700;
                }
                .notification-text h4 {
                    margin: 0;
                    font-size: 1em;
                    font-weight: 600;
                }
                .notification-text p {
                    margin: 5px 0 0 0;
                    font-size: 0.9em;
                    opacity: 0.9;
                }
                @media (max-width: 768px) {
                    .plan-notification {
                        bottom: 20px !important;
                        right: 20px !important;
                        left: 20px !important;
                        max-width: none !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remover después de 4 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.5s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 4000);

        console.log('✅ Notificación mostrada');
    }

    // ============================================
    // ANIMACIONES AL SCROLL
    // ============================================
    function initScrollAnimations() {
        console.log('Configurando animaciones al scroll...');
        
        const planCards = document.querySelectorAll('.plan-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        planCards.forEach(card => {
            observer.observe(card);
        });

        console.log('✅ Animaciones al scroll configuradas');
    }

    // ============================================
    // INICIALIZACIÓN PRINCIPAL
    // ============================================
    function initPlagesPage() {
        console.log('📄 Página de Planes lista para inicializar...');
        
        initPlansSystem();
        initFaqSystem();
        initScrollAnimations();
        
        console.log('✅ Página de Planes completamente inicializada');
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPlagesPage);
    } else {
        // Si el DOM ya está listo, ejecutar inmediatamente
        initPlagesPage();
    }

})();
