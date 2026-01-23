console.log('✨ Blog.js cargado - Artículos + Sub-métodos');

// Variables de estado
let currentOpenHeader = null;
let currentOpenSubMethod = null;

document.addEventListener('click', function (e) {
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

        // Cerrar sub-método previamente abierto (opcional - comenta si quieres múltiples abiertos)
        if (currentOpenSubMethod && currentOpenSubMethod !== subMethodHeader) {
            const previousId = currentOpenSubMethod.getAttribute('data-submethod');
            console.log(`📁 Cerrando sub-método anterior: ${previousId}`);
            
            currentOpenSubMethod.classList.remove('active');
            const previousContent = document.getElementById(previousId);
            if (previousContent) {
                previousContent.classList.remove('active');
            }
        }

        // Abrir sub-método actual
        console.log(`📂 Abriendo sub-método: ${subMethodId}`);
        subMethodHeader.classList.add('active');
        subMethodContent.classList.add('active');
        currentOpenSubMethod = subMethodHeader;

        // Scroll suave al sub-método (solo si es necesario)
        setTimeout(() => {
            const headerOffset = 100; // Ajuste para sub-métodos
            const elementPosition = subMethodHeader.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 50);

        // TERMINAR aquí - no continuar con el artículo principal
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

    console.log(`📄 Artículo clickeado: ${articleId}, Abierto: ${isCurrentlyOpen}`);

    // Validación fuerte
    if (!articleId || !content) {
        console.error('❌ Artículo o contenido no encontrado:', articleId);
        return;
    }

    // 👉 Si está abierto, cerrar
    if (isCurrentlyOpen) {
        console.log(`📁 Cerrando artículo: ${articleId}`);
        header.classList.remove('active');
        content.classList.remove('active');
        currentOpenHeader = null;
        
        // También cerramos todos los sub-métodos si existen dentro de este artículo
        if (articleId === 'brewing-methods') {
            const allSubMethods = content.querySelectorAll('.sub-method-header.active');
            allSubMethods.forEach(sub => {
                const subId = sub.getAttribute('data-submethod');
                const subContent = document.getElementById(subId);
                if (subContent) {
                    sub.classList.remove('active');
                    subContent.classList.remove('active');
                }
            });
            currentOpenSubMethod = null;
        }
        return;
    }

    // 👉 Cerrar artículo previamente abierto
    if (currentOpenHeader && currentOpenHeader !== header) {
        const previousId = currentOpenHeader.getAttribute('data-article');
        console.log(`📁 Cerrando artículo anterior: ${previousId}`);

        currentOpenHeader.classList.remove('active');
        const previousContent = document.getElementById(previousId);
        if (previousContent) {
            previousContent.classList.remove('active');
            
            // También cerramos los sub-métodos del artículo anterior
            const previousSubMethods = previousContent.querySelectorAll('.sub-method-header.active');
            previousSubMethods.forEach(sub => {
                const subId = sub.getAttribute('data-submethod');
                const subContent = document.getElementById(subId);
                if (subContent) {
                    sub.classList.remove('active');
                    subContent.classList.remove('active');
                }
            });
        }
    }

    // 👉 Abrir artículo actual
    console.log(`📂 Abriendo artículo: ${articleId}`);
    header.classList.add('active');
    content.classList.add('active');
    currentOpenHeader = header;

    // 👉 Scroll suave al encabezado del artículo
    setTimeout(() => {
        const headerOffset = 120; // navbar fijo
        const elementPosition = header.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }, 120);
});

document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;

    // PRIMERO: Verificar si es un SUB-MÉTODO
    const subMethodHeader = document.activeElement?.closest('.sub-method-header');
    if (subMethodHeader) {
        e.preventDefault();
        subMethodHeader.click();
        return;
    }

    // SEGUNDO: Verificar si es un ARTÍCULO PRINCIPAL
    const header = document.activeElement?.closest('.article-header');
    if (!header) return;

    e.preventDefault();
    header.click();
});

window.addEventListener('load', function() {
    // Verificación de elementos principales
    const headers = document.querySelectorAll('.article-header');
    const contents = document.querySelectorAll('.article-content');
    console.log('🔍 Verificación de artículos:');
    console.log('✅ Artículos principales:', headers.length);
    console.log('✅ Contenidos principales:', contents.length);
    
    // Verificación de sub-métodos (solo si el artículo 13 existe)
    const article13 = document.getElementById('brewing-methods');
    if (article13) {
        const subMethodHeaders = article13.querySelectorAll('.sub-method-header');
        const subMethodContents = article13.querySelectorAll('.sub-method-content');
        console.log('🔍 Verificación de sub-métodos:');
        console.log('✅ Sub-métodos encontrados:', subMethodHeaders.length);
        console.log('✅ Contenidos de sub-métodos:', subMethodContents.length);
        
        // Verificar que cada header tenga su contenido
        subMethodHeaders.forEach((h) => {
            const id = h.getAttribute('data-submethod');
            const content = document.getElementById(id);
            if (!content) {
                console.error('❌ SUB-MÉTODO MISMATCH:', id, '- content no encontrado');
            } else {
                console.log('✅ Sub-método OK:', id);
            }
        });
    }
    
    // Verificar match de artículos principales
    headers.forEach((h) => {
        const id = h.getAttribute('data-article');
        const content = document.getElementById(id);
        if (!content) {
            console.error('❌ ARTÍCULO MISMATCH:', id, '- content no encontrado');
        } else {
            console.log('✅ Artículo OK:', id);
        }
    });
    
    console.log('🎯 Blog.js completamente inicializado');
    console.log('📊 Estado: Listo para manejar 13 artículos principales y sub-métodos del artículo 13');
});

/**
 * Función para cerrar todos los artículos abiertos
 */
function closeAllArticles() {
    const openHeaders = document.querySelectorAll('.article-header.active');
    const openContents = document.querySelectorAll('.article-content.active');
    
    openHeaders.forEach(header => header.classList.remove('active'));
    openContents.forEach(content => content.classList.remove('active'));
    
    // También cerrar todos los sub-métodos
    const openSubHeaders = document.querySelectorAll('.sub-method-header.active');
    const openSubContents = document.querySelectorAll('.sub-method-content.active');
    
    openSubHeaders.forEach(header => header.classList.remove('active'));
    openSubContents.forEach(content => content.classList.remove('active'));
    
    currentOpenHeader = null;
    currentOpenSubMethod = null;
    
    console.log('📭 Todos los artículos y sub-métodos cerrados');
}

/**
 * Función para abrir un artículo específico por su ID
 * @param {string} articleId - ID del artículo a abrir
 */
function openArticle(articleId) {
    const header = document.querySelector(`.article-header[data-article="${articleId}"]`);
    if (header) {
        header.click();
    } else {
        console.error(`❌ No se encontró el artículo con ID: ${articleId}`);
    }
}

/**
 * Función para abrir un sub-método específico
 * @param {string} subMethodId - ID del sub-método a abrir
 */
function openSubMethod(subMethodId) {
    const header = document.querySelector(`.sub-method-header[data-submethod="${subMethodId}"]`);
    if (header) {
        // Primero asegurarnos de que el artículo 13 esté abierto
        const article13 = document.getElementById('brewing-methods');
        const article13Header = document.querySelector('.article-header[data-article="brewing-methods"]');
        
        if (article13 && !article13.classList.contains('active')) {
            // Abrir el artículo 13 primero
            if (article13Header) {
                article13Header.click();
                
                // Esperar a que el artículo se abra antes de abrir el sub-método
                setTimeout(() => {
                    header.click();
                }, 150);
            }
        } else {
            // El artículo ya está abierto, solo abrir el sub-método
            header.click();
        }
    } else {
        console.error(`❌ No se encontró el sub-método con ID: ${subMethodId}`);
    }
}

if (typeof window !== 'undefined') {
    window.blogControls = {
        closeAllArticles,
        openArticle,
        openSubMethod
    };
}

console.log('🚀 Blog.js completamente implementado y listo');