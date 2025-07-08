function initializeShopPage() {
    const productCards = document.querySelectorAll('.product-card'); // Selecciona todas las tarjetas de producto

    productCards.forEach(card => {
        const sizeSelect = card.querySelector('.size-select');
        const productImage = card.querySelector('.product-image');
        const productType = card.dataset.product;

        // Imagen dinámica (ya existente)
        if (sizeSelect && (productType === 'Bolsa de Granos de Café' || productType === 'Bolsa de Café Molido')) {
            sizeSelect.addEventListener('change', (event) => {
                const selectedSize = event.target.value;
                const imageName = selectedSize.replace('g', '');
                let imagePath = '';
                if (productType === 'Bolsa de Granos de Café') {
                    imagePath = `../img/shop/grano/${imageName}.png`;
                } else if (productType === 'Bolsa de Café Molido') {
                    imagePath = `../img/shop/molido/${imageName}.png`;
                }
                if (imagePath) {
                    productImage.src = imagePath;
                }
            });
        }

        // Nuevo: Listener para "Ver Producto"
        const viewBtn = card.querySelector('.view-button');
        if (viewBtn) {
            viewBtn.addEventListener('click', () => handleViewProduct(card));
        }
    });
}

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

// Función para actualizar el precio mostrado
function actualizarPrecio(card) {
    const productType = card.dataset.product?.trim();
    const sizeSelect = card.querySelector('.size-select');
    const quantitySelect = card.querySelector('.quantity-select');
    const quantityInput = card.querySelector('.quantity-input');
    const priceDiv = card.querySelector('.price');

    const size = sizeSelect ? sizeSelect.value.trim() : "100g";
    // Soporta tanto select como input
    let quantity = 1;
    if (quantitySelect) quantity = parseInt(quantitySelect.value);
    else if (quantityInput) quantity = parseInt(quantityInput.value);

    if (precios[productType] && precios[productType][size]) {
        const precioUnitario = precios[productType][size];
        const precioTotal = precioUnitario * quantity;
        priceDiv.textContent = `$${precioTotal.toLocaleString('es-CO')}`;
    } else {
        priceDiv.textContent = 'No disponible';
    }
}

function actualizarWhatsappLink(card) {
    const productType = card.dataset.product?.trim();
    const sizeSelect = card.querySelector('.size-select');
    const quantitySelect = card.querySelector('.quantity-select');
    const buyLink = card.querySelector('a.buy-button');

    if (!buyLink) return;

    const size = sizeSelect ? sizeSelect.value.trim() : "100g";
    const quantity = quantitySelect ? quantitySelect.value : "1";

    // Mensaje personalizado
    const cantidad = parseInt(quantity);
    const nombreProducto = productType.replace(/^Bolsa de /, '').replace(/^Té de /, '').toLowerCase();
    const unidad = cantidad === 1 ? (nombreProducto === 'cáscara de café fermentado' ? 'bolsa' : 'bolsa') : (nombreProducto === 'cáscara de café fermentado' ? 'bolsas' : 'bolsas');
            const mensaje = `Hola, estoy interesado en comprar ${cantidad} ${unidad} de ${nombreProducto} (${size})`;
    const url = `https://api.whatsapp.com/send?phone=573232056895&text=${encodeURIComponent(mensaje)}`;

    buyLink.href = url;
}

// Inicializa listeners para actualizar el precio
function initializeShopPriceListeners() {
    document.querySelectorAll('.product-card').forEach(card => {
        const sizeSelect = card.querySelector('.size-select');
        const quantitySelect = card.querySelector('.quantity-select');
        const quantityInput = card.querySelector('.quantity-input');

        actualizarPrecio(card);
        actualizarWhatsappLink(card);

        if (sizeSelect) {
            sizeSelect.addEventListener('change', () => {
                actualizarPrecio(card);
                actualizarWhatsappLink(card);
            });
        }
        if (quantitySelect) {
            quantitySelect.addEventListener('change', () => {
                actualizarPrecio(card);
                actualizarWhatsappLink(card);
            });
        }
        if (quantityInput) {
            quantityInput.addEventListener('input', () => {
                actualizarPrecio(card);
                actualizarWhatsappLink(card);
            });
        }
    });
}

function fillSelects() {
    document.querySelectorAll('.product-card').forEach(card => {
        const productType = card.dataset.product?.trim();
        const sizeSelect = card.querySelector('.size-select');
        const quantitySelect = card.querySelector('.quantity-select');

        // Llena tamaños
        if (sizeSelect && precios[productType]) {
            sizeSelect.innerHTML = '';
            Object.keys(precios[productType]).forEach(size => {
                sizeSelect.innerHTML += `<option value="${size}">${size}</option>`;
            });
        }

        // Llena cantidades
        if (quantitySelect) {
            quantitySelect.innerHTML = '';
            for (let i = 1; i <= 5; i++) {
                quantitySelect.innerHTML += `<option value="${i}">${i} unidad${i > 1 ? 'es' : ''}</option>`;
            }
        }
    });
}

// Llama a ambas funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    fillSelects();
    initializeShopPage();
    initializeShopPriceListeners();
});

const observer = new MutationObserver(() => {
    if (document.querySelector('.product-card')) {
        initializeShopPage();
        initializeShopPriceListeners();
        fillSelects();
        observer.disconnect();
    }
});
observer.observe(document.body, { childList: true, subtree: true });

window.initializeShop = function() {
    fillSelects();
    initializeShopPage();
    initializeShopPriceListeners();
};

function handleViewProduct(card) {
    const productType = card.dataset.product?.trim();
    const sizeSelect = card.querySelector('.size-select');
    const quantitySelect = card.querySelector('.quantity-select');
    const image = card.querySelector('.product-image');
    const size = sizeSelect ? sizeSelect.value.trim() : "100g";
    const quantity = quantitySelect ? parseInt(quantitySelect.value) : 1;
    const price = precios[productType] && precios[productType][size] ? precios[productType][size] : 0;

    // Guardar en localStorage
    localStorage.setItem('carritoProducto', JSON.stringify({
        productType,
        size,
        quantity,
        price,
        imageSrc: image ? image.src : '',
    }));

    // Redirigir a carrito
    window.location.href = '../html/carrito.html#carritos';
}      