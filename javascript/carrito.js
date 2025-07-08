document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('carritoProducto') || '{}');
    const container = document.getElementById('carrito-container');

    // Precios base por tamaño para cada producto
    const precios = {
        "Bolsa de Granos de Café": {
            "100g": 8000,
            "125g": 10000,
            "250g": 20000,
            "340g": 27200,
            "500g": 40000,
            "2500g": 200000
        },
        "Bolsa de Café Molido": {
            "100g": 8000,
            "125g": 10000,
            "250g": 20000,
            "340g": 27200,
            "500g": 40000,
            "2500g": 200000
        },
        "Bolsa de Té de Cáscara de Café Fermentado": {
            "100g": 20000
        }
    };

    // Detalles y descripciones por producto y tamaño
    const detalles = {
        "Bolsa de Granos de Café": {
            descripcion: "Café en grano de origen colombiano, tostado artesanalmente para preservar su frescura y aroma. Ideal para moler al instante y disfrutar de una taza perfecta.",
            detalles: [
                "Origen: Colombia, región cafetera",
                "Tostado medio",
                "Notas: chocolate, nuez y caramelo",
                "Empaque hermético para máxima frescura"
            ],
            imagenes: {
                "100g": [
                    "../img/shop/grano/100.png",
                    "../img/shop/grano/125.png",
                    "../img/shop/grano/250.png"
                ],
                "125g": [
                    "../img/shop/grano/100.png",
                    "../img/shop/grano/125.png",
                    "../img/shop/grano/250.png"
                ],
                "250g": [
                    "../img/shop/grano/100.png",
                    "../img/shop/grano/125.png",
                    "../img/shop/grano/250.png"
                ],
                "340g": [
                    "../img/shop/grano/100.png",
                    "../img/shop/grano/125.png",
                    "../img/shop/grano/250.png"
                ],
                "500g": [
                    "../img/shop/grano/100.png",
                    "../img/shop/grano/125.png",
                    "../img/shop/grano/250.png"
                ],
                "2500g": [
                    "../img/shop/grano/100.png",
                    "../img/shop/grano/125.png",
                    "../img/shop/grano/250.png"
                ]
            }
        },
        "Bolsa de Café Molido": {
            descripcion: "Café molido listo para preparar en cafetera, prensa francesa o método de tu preferencia. Sabor intenso y aroma envolvente.",
            detalles: [
                "Origen: Colombia, selección especial",
                "Molido medio",
                "Notas: cacao, frutos secos y panela",
                "Empaque resellable"
            ],
            imagenes: {
                "100g": [
                    "../img/shop/molido/100.png",
                    "../img/shop/molido/125.png",
                    "../img/shop/molido/250.png"
                ],
                "125g": [
                    "../img/shop/molido/100.png",
                    "../img/shop/molido/125.png",
                    "../img/shop/molido/250.png"
                ],
                "250g": [
                    "../img/shop/molido/100.png",
                    "../img/shop/molido/125.png",
                    "../img/shop/molido/250.png"
                ],
                "340g": [
                    "../img/shop/molido/100.png",
                    "../img/shop/molido/125.png",
                    "../img/shop/molido/250.png"
                ],
                "500g": [
                    "../img/shop/molido/100.png",
                    "../img/shop/molido/125.png",
                    "../img/shop/molido/250.png"
                ],
                "2500g": [
                    "../img/shop/molido/100.png",
                    "../img/shop/molido/125.png",
                    "../img/shop/molido/250.png"
                ]
            }
        },
        "Bolsa de Té de Cáscara de Café Fermentado": {
            descripcion: "Infusión natural hecha con la cáscara del café, rica en antioxidantes y con un sabor único, ligeramente dulce y afrutado.",
            detalles: [
                "100% cáscara de café fermentada",
                "Rico en antioxidantes",
                "Sabor afrutado y refrescante",
                "Ideal para tomar frío o caliente"
            ],
            imagenes: {
                "100g": [
                    "../img/shop/grano/100.png",
                    "../img/shop/grano/125.png",
                    "../img/shop/grano/250.png"
                ]
            }
        }
    };

    if (!data.productType) {
        container.innerHTML = '<p>No hay producto seleccionado.</p>';
        return;
    }

    // Utilidades para selects
    function getSizeOptions(productType) {
        return Object.keys(precios[productType] || {});
    }
    function getQuantityOptions(max = 10) {
        return Array.from({length: max}, (_, i) => i + 1);
    }

    // Estado actual
    let currentSize = data.size;
    let currentQuantity = data.quantity;

    function render() {
        const info = detalles[data.productType] || {
            descripcion: "Producto seleccionado.",
            detalles: [],
            imagenes: { [currentSize]: [data.imageSrc] }
        };
        const imagenes = (info.imagenes[currentSize] && info.imagenes[currentSize].length)
            ? info.imagenes[currentSize]
            : [data.imageSrc];
        let currentImg = 0;

        // Carrusel HTML
        function renderCarrusel() {
            return `
                <div class="carrito-carrusel">
                    <div class="carrusel-thumbs">
                        ${imagenes.map((img, idx) => `
                            <img src="${img}" class="carrusel-thumb${idx===currentImg?' selected':''}" data-idx="${idx}">
                        `).join('')}
                    </div>
                    <img class="carrito-img" id="carrusel-img" src="${imagenes[currentImg]}" alt="${data.productType}">
                </div>
            `;
        }

        // Selects HTML
        const sizeOptions = getSizeOptions(data.productType);
        const quantityOptions = getQuantityOptions(10);

        // Precio
        const precioUnitario = precios[data.productType][currentSize] || 0;
        const precioTotal = precioUnitario * currentQuantity;

        // Mensaje WhatsApp
        const cantidad = currentQuantity;
        const nombreProducto = data.productType.replace(/^Bolsa de /, '').replace(/^Té de /, '').toLowerCase();
        const unidad = cantidad === 1 ? 'bolsa' : 'bolsas';
        const mensaje = `Hola, estoy interesado en comprar ${cantidad} ${unidad} de ${nombreProducto} de (${currentSize})`;
        const url = `https://api.whatsapp.com/send?phone=573232056895&text=${encodeURIComponent(mensaje)}`;

        // Render principal
        container.innerHTML = `
            ${renderCarrusel()}
            <div class="carrito-info">
                <div class="carrito-title">${data.productType}</div>
                <div class="carrito-detail">
                    <b>Presentación:</b>
                    <select id="size-select" class="carrito-select">
                        ${sizeOptions.map(size => `<option value="${size}"${size===currentSize?' selected':''}>${size}</option>`).join('')}
                    </select>
                </div>
                <div class="carrito-detail">
                    <b>Cantidad:</b>
                    <select id="quantity-select" class="carrito-select">
                        ${quantityOptions.map(q => `<option value="${q}"${q===currentQuantity?' selected':''}>${q} ${q===1?'unidad':'unidades'}</option>`).join('')}
                    </select>
                </div>
                <div class="carrito-desc">${info.descripcion}</div>
                <ul class="carrito-detail">
                    ${info.detalles.map(det => `<li>${det}</li>`).join('')}
                </ul>
                <div class="carrito-price" id="carrito-price">$${precioTotal.toLocaleString('es-CO')}</div>
                <a href="${url}" target="_blank" id="wa-link">
                    <button class="carrito-buy-btn">Comprar Ahora por WhatsApp</button>
                </a>
            </div>
        `;

        // Carrusel funcionalidad
        document.querySelectorAll('.carrusel-thumb').forEach(thumb => {
            thumb.addEventListener('click', function() {
                currentImg = parseInt(this.dataset.idx);
                document.getElementById('carrusel-img').src = imagenes[currentImg];
                document.querySelectorAll('.carrusel-thumb').forEach((t, idx) => {
                    t.classList.toggle('selected', idx === currentImg);
                });
            });
        });

        // Selects funcionalidad
        document.getElementById('size-select').addEventListener('change', e => {
            currentSize = e.target.value;
            render(); // Vuelve a renderizar todo con el nuevo tamaño
        });
        document.getElementById('quantity-select').addEventListener('change', e => {
            currentQuantity = parseInt(e.target.value);
            render(); // Vuelve a renderizar todo con la nueva cantidad
        });
    }

    render();
});