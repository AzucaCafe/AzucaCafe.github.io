(function() {
    console.log('✨ Blog.js cargado - Artículos + Sub-métodos');

    // Variables de estado
    let currentOpenHeader = null;
    let currentOpenSubMethod = null;

    function initBlogPage() {
        console.log('📰 Inicializando página de Blog...');

        const container = document.getElementById('content');
        if (!container) return;

        // Limpiar event listeners previos si es necesario
        // En un SPA, es mejor usar delegación de eventos en un ancestro común
        // o remover listeners anteriores. Aquí usamos delegación en el contenedor.

        container.addEventListener('click', handleBlogClick);
    }

    function handleBlogClick(e) {
        // ========================================================
        // 1. PRIMERO: Verificar si es un SUB-MÉTODO
        // ========================================================
        const subMethodHeader = e.target.closest('.sub-method-header');
        
        if (subMethodHeader) {
            e.preventDefault();
            e.stopPropagation(); // IMPORTANTE: Detener propagación aquí

            const subMethodId = subMethodHeader.getAttribute('data-submethod');
            const subMethodContent = document.getElementById(subMethodId);
            const isCurrentlyOpen = subMethodHeader.classList.contains('active');

            console.log(`🔧 Sub-método clickeado: ${subMethodId}, Abierto: ${isCurrentlyOpen}`);

            // Validación
            if (!subMethodId || !subMethodContent) {
                console.error('❌ Sub-método o contenido no encontrado:', subMethodId);
                return;
            }

            // Si está abierto, cerrar
            if (isCurrentlyOpen) {
                console.log(`📁 Cerrando sub-método: ${subMethodId}`);
                subMethodHeader.classList.remove('active');
                subMethodContent.classList.remove('active');
                currentOpenSubMethod = null;
                return;
            }

            // Cerrar sub-método previamente abierto
            if (currentOpenSubMethod && currentOpenSubMethod !== subMethodHeader) {
                const previousId = currentOpenSubMethod.getAttribute('data-submethod');
                currentOpenSubMethod.classList.remove('active');
                const previousContent = document.getElementById(previousId);
                if (previousContent) {
                    previousContent.classList.remove('active');
                }
            }

            // Abrir sub-método actual
            subMethodHeader.classList.add('active');
            subMethodContent.classList.add('active');
            currentOpenSubMethod = subMethodHeader;

            // Scroll suave
            scrollToElement(subMethodHeader, 100);
            return;
        }

        // ========================================================
        // 2. SEGUNDO: Verificar si es un ARTÍCULO PRINCIPAL
        // ========================================================
        const header = e.target.closest('.article-header');
        if (!header) return;

        e.preventDefault();
        e.stopPropagation();

        const articleId = header.getAttribute('data-article');
        const content = document.getElementById(articleId);
        const isCurrentlyOpen = header.classList.contains('active');

        if (!articleId || !content) return;

        if (isCurrentlyOpen) {
            header.classList.remove('active');
            content.classList.remove('active');
            currentOpenHeader = null;
            return;
        }

        if (currentOpenHeader && currentOpenHeader !== header) {
            const previousId = currentOpenHeader.getAttribute('data-article');
            currentOpenHeader.classList.remove('active');
            const previousContent = document.getElementById(previousId);
            if (previousContent) {
                previousContent.classList.remove('active');
            }
        }

        header.classList.add('active');
        content.classList.add('active');
        currentOpenHeader = header;

        scrollToElement(header, 120);
    }

    function scrollToElement(element, offset) {
        setTimeout(() => {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 50);
    }

    function closeAllArticles() {
        document.querySelectorAll('.article-header.active, .sub-method-header.active').forEach(h => h.classList.remove('active'));
        document.querySelectorAll('.article-content.active, .sub-method-content.active').forEach(c => c.classList.remove('active'));
        currentOpenHeader = null;
        currentOpenSubMethod = null;
    }

    // Exponer al scope global
    window.initBlogPage = initBlogPage;
    window.blogControls = {
        closeAllArticles
    };

})();
