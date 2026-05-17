// shop.js - SISTEMA COMPLETO DE TIENDA AZUCA CAFE (CORREGIDO)
(function() {
    console.log('=== SISTEMA TIENDA AZUCA CAFE ===');
    
    // ============================================
    // CONFIGURACIÓN Y DATOS ACTUALIZADOS
    // ============================================
    
    // PRECIOS BASE POR VARIEDAD
    const preciosBase = {
        "Bolsa de Granos de Café": {
            "azuca": { // Castilla
                "100g": 10000,
                "125g": 12500,
                "250g": 25000,
                "340g": 34000,
                "500g": 50000,
                "2500g": 250000
            },
            "gyrola": { // Blend (10% descuento)
                "100g": 9000,
                "125g": 11250,
                "250g": 22500,
                "340g": 30600,
                "500g": 45000,
                "2500g": 225000
            }
        },
        "Bolsa de Café Molido": {
            "azuca": { // Castilla
                "100g": 10000,
                "125g": 12500,
                "250g": 25000,
                "340g": 34000,
                "500g": 50000,
                "2500g": 250000
            },
            "gyrola": { // Blend (10% descuento)
                "100g": 9000,
                "125g": 11250,
                "250g": 22500,
                "340g": 30600,
                "500g": 45000,
                "2500g": 225000
            }
        },
        "Bolsa de Té de Cáscara de Café Fermentado": {
            "default": {
                "100g": 20000
            }
        }
    };

    const productDetails = {
        "Bolsa de Granos de Café": {
            descripcion: "Café en grano de origen colombiano, tostado artesanalmente para preservar su frescura y aroma. Ideal para moler al instante y disfrutar de una taza perfecta.",
            funcion: "Granos de café 100% arábica, seleccionados a mano, tostados en pequeñas cantidades para garantizar la máxima calidad y frescura.",
            preparacion: "Puedes moler los granos al momento de preparar. Utiliza una máquina de espresso, prensa francesa, pour over o cualquier método de tu preferencia. Recomendamos usar agua a 92-96°C.",
            variedades: [
                {
                    id: "azuca",
                    nombre: "Azuca",
                    icono: "🌱",
                    descripcion: "Variedad Castillo con notas a chocolate, nuez y caramelo. Cultivado a 1500 msnm en la región cafetera colombiana.",
                    caracteristicas: [
                        "Castaño tostado medio",
                        "Notas: Chocolate oscuro, caramelo y nuez",
                        "Cuerpo: Completo y persistente",
                        "Acidez: Media, bien balanceada",
                        "Origen: Castillo - 1500 msnm",
                        "Tostado: Medio para resaltar dulzor"
                    ],
                    preparacion: "Ideal para espresso y métodos de prensa",
                    tazasPor100g: 12,
                    color: "#3a4a2c"
                },
                {
                    id: "gyrola",
                    nombre: "Gyrola",
                    icono: "🌸",
                    descripcion: "Blend de Borbón Rosado y Papayo con notas frutales y acidez brillante. Cultivado a 1800 msnm.",
                    caracteristicas: [
                        "Rojo rubí tostado ligero-medio",
                        "Notas: Frutos rojos, cítricos y miel",
                        "Cuerpo: Sedoso y elegante",
                        "Acidez: Brillante y vibrante",
                        "Origen: Borbón Rosado + Papayo",
                        "Tostado: Ligero para preservar acidez"
                    ],
                    preparacion: "Perfecto para pour over y métodos de filtro",
                    tazasPor100g: 12,
                    color: "#8b4513"
                }
            ],
            detalles: [
                "Origen: Colombia, región cafetera",
                "Tostado: Artesanal en pequeñas cantidades",
                "Proceso: Lavado y secado al sol",
                "Empaque: Con válvula unidireccional para máxima frescura",
                "Conservación: Guardar en lugar fresco y seco",
                "Caducidad: 12 meses desde fecha de tostado"
            ],
            zona: "Café cultivado en las montañas de la región cafetera colombiana, específicamente en los departamentos de Caldas, Risaralda y Quindío, entre 1500 y 1800 metros sobre el nivel del mar. Zona reconocida mundialmente por su calidad excepcional."
        },
        "Bolsa de Café Molido": {
            descripcion: "Café molido listo para preparar en cafetera, prensa francesa o método de tu preferencia. Sabor intenso y aroma envolvente.",
            funcion: "Café molido al punto ideal para cada método de preparación. Conserva todo el sabor y aroma del café recién molido.",
            preparacion: "Listo para usar. Coloca la cantidad deseada en tu cafetera y agrega agua caliente. Ajusta la fineza de la molienda según tu método (filtro, espresso, etc.).",
            variedades: [
                {
                    id: "azuca",
                    nombre: "Azuca",
                    icono: "🌱",
                    descripcion: "Variedad Castillo molida para métodos de filtro y prensa francesa. Molido medio ideal para extracción balanceada.",
                    caracteristicas: [
                        "Molienda: Media (apta para filtro y prensa)",
                        "Notas: Chocolate, caramelo y nuez tostada",
                        "Cuerpo: Completo y cremoso",
                        "Acidez: Balanceada y suave",
                        "Origen: Castillo - 1500 msnm",
                        "Tostado: Medio para cuerpo completo"
                    ],
                    preparacion: "Ideal para cafeteras de filtro, prensa francesa y moka",
                    tazasPor100g: 12,
                    color: "#3a4a2c"
                },
                {
                    id: "gyrola",
                    nombre: "Gyrola",
                    icono: "🌸",
                    descripcion: "Blend molido fino para espresso y métodos de extracción rápida. Molido fino para máxima extracción.",
                    caracteristicas: [
                        "Molienda: Fina (apta para espresso)",
                        "Notas: Frutos rojos, miel y cítricos",
                        "Cuerpo: Sedoso y persistente",
                        "Acidez: Brillante y afrutada",
                        "Origen: Borbón Rosado + Papayo",
                        "Tostado: Ligero para notas frutales"
                    ],
                    preparacion: "Perfecto para máquinas de espresso y aeropress",
                    tazasPor100g: 12,
                    color: "#8b4513"
                }
            ],
            detalles: [
                "Origen: Colombia, selección especial",
                "Molienda: Ajustada por método de preparación",
                "Proceso: Molido al momento del empaque",
                "Empaque: Resellable para conservar frescura",
                "Conservación: Consumir dentro de 2 semanas después de abierto",
                "Caducidad: 6 meses desde fecha de molido"
            ],
            zona: "Café de altura colombiano, procesado en nuestras instalaciones en Manizales para garantizar la máxima frescura y calidad en cada molienda. Molido artesanalmente para preservar aromas."
        },
        "Bolsa de Té de Cáscara de Café Fermentado": {
            descripcion: "Infusión natural hecha con la cáscara del café, rica en antioxidantes y con un sabor único, ligeramente dulce y afrutado.",
            funcion: "El té de cáscara de café (cascara) es una infusión hecha de la cáscara seca del grano de café. Es rica en antioxidantes y tiene un sabor similar al té de frutas.",
            preparacion: "Coloca 1 cucharada de cáscara de café en una taza y vierte agua a 90°C. Deja infusionar por 5-7 minutos. Puedes tomarlo caliente o frío.",
            variedades: [],
            detalles: [
                "100% cáscara de café fermentada",
                "Rico en antioxidantes naturales",
                "Sabor afrutado y refrescante",
                "Bajo en cafeína (menos de 25mg por taza)",
                "Ideal para tomar frío o caliente",
                "Proceso: Fermentación natural y secado al sol"
            ],
            tazasPor100g: 25,
            zona: "Cáscara de café recolectada de nuestras fincas en la región cafetera, fermentada de manera natural y secada al sol para conservar todas sus propiedades. Proceso 100% artesanal y sostenible."
        }
    };

    let shopInitialized = false;
    let currentModalData = {};

    // ============================================
    // FUNCIONES DE MANEJO DE PRECIOS (SIMPLIFICADAS)
    // ============================================
    function calcularPrecio(productType, variety, size, quantity) {
        console.log(`Calculando: ${productType}, ${variety}, ${size}, ${quantity}`);
        
        let precioUnitario = 0;
        
        if (productType === "Bolsa de Té de Cáscara de Café Fermentado") {
            precioUnitario = preciosBase[productType]?.default?.[size] || 0;
        } else {
            precioUnitario = preciosBase[productType]?.[variety]?.[size] || 0;
        }
        
        const total = precioUnitario * quantity;
        console.log(`Precio unitario: ${precioUnitario}, Total: ${total}`);
        return total;
    }

    function actualizarPrecio(card) {
        const productType = card.dataset.product?.trim();
        const varietySelect = card.querySelector('.variety-select');
        const sizeSelect = card.querySelector('.size-select');
        const quantitySelect = card.querySelector('.quantity-select');
        const priceDiv = card.querySelector('.price');
        const varietyNote = card.querySelector('.variety-note');

        // Obtener valores seleccionados
        const variety = varietySelect ? varietySelect.value : 'azuca';
        const size = sizeSelect ? sizeSelect.value : "100g";
        const quantity = quantitySelect ? parseInt(quantitySelect.value) : 1;

        // Calcular precio total
        const precioTotal = calcularPrecio(productType, variety, size, quantity);

        // Actualizar precio en la UI
        if (priceDiv) {
            priceDiv.textContent = `$${precioTotal.toLocaleString('es-CO')}`;
            priceDiv.classList.add('price-updated');
            setTimeout(() => {
                priceDiv.classList.remove('price-updated');
            }, 500);
            
            console.log(`Precio actualizado: $${precioTotal.toLocaleString('es-CO')}`);
        }

        // Mostrar/ocultar nota de descuento
        if (varietyNote) {
            if (variety === 'gyrola') {
                varietyNote.style.display = 'block';
            } else {
                varietyNote.style.display = 'none';
            }
        }
    }

    function actualizarOpcionesTamaño(card) {
        const productType = card.dataset.product?.trim();
        const varietySelect = card.querySelector('.variety-select');
        const sizeSelect = card.querySelector('.size-select');
        
        if (!sizeSelect || !varietySelect || productType.includes('Té')) return;
        
        const variety = varietySelect.value;
        const preciosVariedad = preciosBase[productType]?.[variety];
        const tamañoActual = sizeSelect.value;
        
        if (!preciosVariedad) return;
        
        // Guardar el tamaño seleccionado
        const tamañoSeleccionado = tamañoActual;
        
        // Limpiar y rellenar opciones
        sizeSelect.innerHTML = '';
        
        Object.keys(preciosVariedad).forEach(size => {
            const precio = preciosVariedad[size];
            const option = document.createElement('option');
            option.value = size;
            option.textContent = `${size} - $${precio.toLocaleString('es-CO')}`;
            sizeSelect.appendChild(option);
        });
        
        // Restaurar la selección anterior si existe
        const optionToSelect = Array.from(sizeSelect.options).find(opt => opt.value === tamañoSeleccionado);
        if (optionToSelect) {
            sizeSelect.value = tamañoSeleccionado;
        } else if (sizeSelect.options.length > 0) {
            sizeSelect.value = sizeSelect.options[0].value;
        }
    }

    // ============================================
    // FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
    // ============================================
    function initializeShop() {
        if (shopInitialized) return;
        
        console.log("Inicializando tienda...");
        
        scrollToTop();
        inicializarSelectores();
        inicializarEventListeners();
        inicializarPreciosIniciales();
        initializeShippingAnimations();
        initializeCTAButtons();
        setupShopEventListeners();
        initializeProductModal();
        
        shopInitialized = true;
        console.log("✅ Tienda inicializada correctamente");
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    // ============================================
    // FUNCIONES DE INICIALIZACIÓN
    // ============================================
    function inicializarSelectores() {
        console.log("Inicializando selectores...");
        
        document.querySelectorAll('.product-card').forEach(card => {
            const productType = card.dataset.product?.trim();
            const varietySelect = card.querySelector('.variety-select');
            const sizeSelect = card.querySelector('.size-select');
            const quantitySelect = card.querySelector('.quantity-select');
            
            // Configurar opciones de tamaño según variedad
            if (varietySelect && sizeSelect && !productType.includes('Té')) {
                actualizarOpcionesTamaño(card);
            }
            
            // Configurar opciones de cantidad
            if (quantitySelect) {
                const maxQuantity = productType.includes('Té') ? 5 : 10;
                quantitySelect.innerHTML = '';
                for (let i = 1; i <= maxQuantity; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = `${i} unidad${i > 1 ? 'es' : ''}`;
                    quantitySelect.appendChild(option);
                }
            }
        });
    }

    function inicializarEventListeners() {
        console.log("Inicializando event listeners...");
        
        document.querySelectorAll('.product-card').forEach(card => {
            const varietySelect = card.querySelector('.variety-select');
            const sizeSelect = card.querySelector('.size-select');
            const quantitySelect = card.querySelector('.quantity-select');
            const viewBtn = card.querySelector('.view-button');
            const buyBtn = card.querySelector('.buy-button');
            const productImage = card.querySelector('.product-image');
            const productType = card.dataset.product;
            
            // Listener para variedad
            if (varietySelect) {
                varietySelect.addEventListener('change', function() {
                    console.log(`Variedad cambiada a: ${this.value}`);
                    if (!productType.includes('Té')) {
                        actualizarOpcionesTamaño(card);
                    }
                    actualizarPrecio(card);
                });
            }
            
            // Listener para tamaño
            if (sizeSelect) {
                sizeSelect.addEventListener('change', function() {
                    console.log("Tamaño cambiado");
                    
                    // Cambiar imagen si es café
                    if ((productType === 'Bolsa de Granos de Café' || productType === 'Bolsa de Café Molido') && productImage) {
                        const selectedSize = this.value.split(' - ')[0].trim();
                        const imageName = selectedSize.replace('g', '');
                        let imagePath = '';
                        if (productType === 'Bolsa de Granos de Café') {
                            imagePath = `img/shop/grano/${imageName}.png`;
                        } else if (productType === 'Bolsa de Café Molido') {
                            imagePath = `img/shop/molido/${imageName}.png`;
                        }
                        if (imagePath) {
                            productImage.src = imagePath;
                            productImage.style.opacity = '0.7';
                            setTimeout(() => {
                                productImage.style.opacity = '1';
                            }, 300);
                        }
                    }
                    
                    actualizarPrecio(card);
                });
            }
            
            // Listener para cantidad
            if (quantitySelect) {
                quantitySelect.addEventListener('change', function() {
                    console.log("Cantidad cambiada");
                    actualizarPrecio(card);
                });
            }
            
            // Botón ver detalles
            if (viewBtn) {
                viewBtn.addEventListener('click', () => handleViewProduct(card));
            }
            
            // Botón comprar
            if (buyBtn) {
                buyBtn.addEventListener('click', () => handleBuyProduct(card));
            }
        });
    }

    function inicializarPreciosIniciales() {
        console.log("Inicializando precios iniciales...");
        
        document.querySelectorAll('.product-card').forEach(card => {
            actualizarPrecio(card);
        });
    }

    // ============================================
    // FUNCIONES DE COMPRA Y WHATSAPP
    // ============================================
    function handleViewProduct(card) {
        const productType = card.dataset.product?.trim();
        const varietySelect = card.querySelector('.variety-select');
        const sizeSelect = card.querySelector('.size-select');
        const quantitySelect = card.querySelector('.quantity-select');
        const image = card.querySelector('.product-image');
        
        const variety = varietySelect ? varietySelect.value : 'azuca';
        const size = sizeSelect ? sizeSelect.value.split(' - ')[0].trim() : "100g";
        const quantity = quantitySelect ? parseInt(quantitySelect.value) : 1;
        const imageSrc = image ? image.src : '';

        // Efecto visual
        card.style.boxShadow = '0 0 0 3px #3a4a2c';
        setTimeout(() => {
            card.style.boxShadow = '';
        }, 500);

        // Abrir modal
        openProductModal({
            productType,
            variedad: variety,
            tamano: size,
            cantidad: quantity,
            imagenSrc: imageSrc
        });
    }

    function handleBuyProduct(card) {
        const whatsappUrl = generateWhatsAppLinkFromCard(card);
        
        const buyBtn = card.querySelector('.buy-button');
        const originalContent = buyBtn.innerHTML;
        buyBtn.innerHTML = '<span>Redirigiendo...</span><span class="btn-icon">⏳</span>';
        buyBtn.style.opacity = '0.7';
        
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            buyBtn.innerHTML = originalContent;
            buyBtn.style.opacity = '1';
        }, 1000);
    }

    function generateWhatsAppLinkFromCard(card) {
        const productType = card.dataset.product?.trim();
        const varietySelect = card.querySelector('.variety-select');
        const sizeSelect = card.querySelector('.size-select');
        const quantitySelect = card.querySelector('.quantity-select');
        const priceDiv = card.querySelector('.price');

        // Obtener valores
        const variety = varietySelect ? varietySelect.value : 'azuca';
        const size = sizeSelect ? sizeSelect.value.split(' - ')[0].trim() : "100g";
        const quantity = quantitySelect ? parseInt(quantitySelect.value) : 1;
        const precioTotal = priceDiv ? priceDiv.textContent.replace('$', '').replace(/\./g, '') : '0';

        // Construir nombres
        let nombreProducto = '';
        let nombreVariedad = '';
        
        if (productType.includes('Granos de Café')) {
            nombreProducto = 'granos de café';
            nombreVariedad = variety === 'azuca' ? 'Azuca (Castilla)' : 'Gyrola (Blend)';
        } else if (productType.includes('Café Molido')) {
            nombreProducto = 'café molido';
            nombreVariedad = variety === 'azuca' ? 'Azuca (Castilla)' : 'Gyrola (Blend)';
        } else if (productType.includes('Té')) {
            nombreProducto = 'té de cáscara de café fermentado';
            nombreVariedad = 'Té de cáscara';
        }

        const unidad = quantity === 1 ? 'bolsa' : 'bolsas';
        const mensaje = `¡Hola! 👋\n\nEstoy interesado en comprar:\n• ${quantity} ${unidad} de ${nombreProducto}\n• Variedad: ${nombreVariedad}\n• Presentación: ${size}\n• Producto: ${productType}\n• Total: $${parseInt(precioTotal).toLocaleString('es-CO')}\n\n¿Podrían ayudarme con el proceso de compra?`;
        
        console.log("Generando WhatsApp link con mensaje:", mensaje);
        return `https://api.whatsapp.com/send?phone=+573232056895&text=${encodeURIComponent(mensaje)}`;
    }

    // ============================================
    // SISTEMA DE MODAL DE DETALLES (SIMPLIFICADO)
    // ============================================
    function initializeProductModal() {
        const modal = document.getElementById('productDetailModal');
        
        if (!modal) {
            console.warn("Modal no encontrado");
            return;
        }
        
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                closeProductModal();
            });
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProductModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeProductModal();
            }
        });
    }
    
    function openProductModal(productData) {
        const modal = document.getElementById('productDetailModal');
        const modalContent = document.getElementById('modalProductContent');
        
        if (!modal || !modalContent) return;
        
        currentModalData = {
            ...productData,
            variedad: productData.variedad || 'azuca',
            cantidad: productData.cantidad || 1
        };
        
        modalContent.innerHTML = renderModalContent(currentModalData);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        setupModalEvents();
    }
    
    function closeProductModal() {
        const modal = document.getElementById('productDetailModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function renderModalContent(data) {
        const details = productDetails[data.productType] || {};
        const precioUnitario = calcularPrecio(data.productType, data.variedad, data.tamano, 1);
        const tazasPor100g = data.productType.includes('Té') ? 25 : 12;
        const tazasAprox = Math.round((parseInt(data.tamano) * tazasPor100g) / 100) * data.cantidad;
        const selectedVariety = details.variedades?.find(v => v.id === data.variedad);
        
        return `
            <!-- Encabezado -->
            <div class="modal-product-header">
                <img src="${data.imagenSrc}" alt="${data.productType}" class="modal-product-image">
                <div class="modal-product-title-section">
                    <h2 class="modal-product-title">${data.productType}</h2>
                    <p class="modal-product-subtitle">Presentación: ${data.tamano}</p>
                    <p class="modal-product-price">$${precioUnitario.toLocaleString('es-CO')}</p>
                </div>
            </div>
            
            <!-- Descripción -->
            <div class="modal-info-section">
                <h3 class="section-title">Descripción</h3>
                <p class="info-card-content">${details.descripcion}</p>
            </div>
            
            <!-- Tazas aproximadas -->
            <div class="modal-info-section">
                <h3 class="section-title">Rendimiento</h3>
                <div class="tazas-info">
                    <div class="tazas-number">${tazasAprox}</div>
                    <p class="tazas-desc">
                        Con ${data.cantidad} ${data.cantidad === 1 ? 'bolsa' : 'bolsas'} de ${data.tamano}<br>
                        obtienes aproximadamente <strong>${tazasAprox} tazas</strong>
                        ${data.productType.includes('Té') ? 'de infusión' : 'de café'}.
                    </p>
                </div>
            </div>
            
            <!-- Características técnicas -->
            <div class="modal-info-section">
                <h3 class="section-title">Características Técnicas</h3>
                <div class="info-grid">
                    ${details.detalles?.map((d, i) => `
                        <div class="info-card">
                            <h4 class="info-card-title">Característica ${i + 1}</h4>
                            <p class="info-card-content">${d}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    function setupModalEvents() {
        // Aquí puedes agregar eventos para el modal si es necesario
    }

    // ============================================
    // FUNCIONES ADICIONALES
    // ============================================
    function initializeShippingAnimations() {
        const shippingCards = document.querySelectorAll('.shipping-card');
        
        if (shippingCards.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        shippingCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    function initializeCTAButtons() {
        const ctaButtons = document.querySelectorAll('.plans-cta-btn');
        
        if (ctaButtons.length === 0) return;
        
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        const plansMoreInfoBtn = document.getElementById('plansMoreInfoBtn');
        if (plansMoreInfoBtn) {
            plansMoreInfoBtn.addEventListener('click', function() {
                const mensaje = `¡Hola! 👋\n\nEstoy interesado en más detalles sobre los planes y cómo funcionan.\n\nMe gustaría saber:\n• Qué planes mensuales tienen disponibles\n• Precios y descuentos\n• Proceso de suscripción\n• Envíos incluidos\n\n¿Podrían proporcionarme más información?`;
                const whatsappUrl = `https://api.whatsapp.com/send?phone=+573232056895&text=${encodeURIComponent(mensaje)}`;
                window.open(whatsappUrl, '_blank');
            });
        }
    }

    function setupShopEventListeners() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '') return;
                
                if (window.location.pathname.endsWith('index.html') || 
                    window.location.pathname.endsWith('/')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ============================================
    // INICIALIZACIÓN AUTOMÁTICA
    // ============================================
    // EXPORTAR FUNCIONES GLOBALES
    window.initializeShop = initializeShop;
    window.reinitializeShop = function() {
        console.log("Reinicializando tienda...");
        shopInitialized = false;
        scrollToTop();
        initializeShop();
    };

    console.log("✅ Script shop.js cargado correctamente");

})();
