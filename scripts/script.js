document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".form-control[type='search']");
    const searchButton = document.querySelector(".btn-outline-success[type='submit']");
    const cartPopup = document.querySelector(".cart-popup");
    const buyButton = document.querySelector("#buyButton");
    const loginButton = document.querySelector("#loginButton");
    const logoutButton = document.querySelector("#logoutButton");
    const emailInput = document.querySelector("#emailInput");
    const passwordInput = document.querySelector("#passwordInput");
    const loginMenu = document.getElementById("loginMenu");
    var cartButton = document.getElementById("cart-button");
    const dropdownToggle = document.querySelector('[data-bs-toggle="dropdown"]');
    let cartItems = [];

    checkLoginStatus(); // Función para verificar el estado de inicio de sesión


    function filtrarProductos(busqueda) {
        if (busqueda.trim() === "") {
            mostrarTodos();
            return;
        }

        var tarjetas = document.querySelectorAll('.tarjeta');

        tarjetas.forEach(function (tarjeta) {
            var texto = tarjeta.querySelector('h3').innerText.toLowerCase();
            if (texto.includes(busqueda.toLowerCase())) {
                tarjeta.style.display = 'block';
                var categoria = tarjeta.classList[1];
                document.querySelector('.categoria.' + categoria).style.display = 'block';
            } else {
                tarjeta.style.display = 'none';
            }
        });

        var categorias = document.querySelectorAll('.categoria');
        categorias.forEach(function (categoria) {
            var categoriaNombre = categoria.classList[1];
            var productosCategoria = document.querySelectorAll('.tarjeta.' + categoriaNombre + ':not([style*="display: none"])');
            if (productosCategoria.length === 0) {
                categoria.style.display = 'none';
            } else {
                categoria.style.display = 'block';
            }
        });

        var filas = document.querySelectorAll('.fila');
        filas.forEach(function (fila) {
            var tarjetasEnFila = fila.querySelectorAll('.tarjeta:not([style*="display: none"])');
            if (tarjetasEnFila.length === 0) {
                fila.style.display = 'none';
            } else {
                fila.style.display = 'grid';
            }
        });

        var enlacesCategorias = document.querySelectorAll('.categoria a');
        enlacesCategorias.forEach(function (enlaceCategoria) {
            var categoriaNombre = enlaceCategoria.classList[1];
            var productosCategoria = document.querySelectorAll('.tarjeta.' + categoriaNombre + ':not([style*="display: none"])');
            if (productosCategoria.length === 0) {
                enlaceCategoria.style.display = 'none';
            } else {
                enlaceCategoria.style.display = 'block';
            }
        });
    }

    function mostrarTodos() {
        var tarjetas = document.querySelectorAll('.tarjeta');
        tarjetas.forEach(function (tarjeta) {
            tarjeta.style.display = 'block';
        });

        var categorias = document.querySelectorAll('.categoria');
        categorias.forEach(function (categoria) {
            categoria.style.display = 'block';
        });

        var filas = document.querySelectorAll('.fila');
        filas.forEach(function (fila) {
            var tarjetasEnFila = fila.querySelectorAll('.tarjeta:not([style*="display: none"])');
            if (tarjetasEnFila.length === 0) {
                fila.style.display = 'none';
            } else {
                fila.style.display = 'block';
            }
        });

        var enlacesCategorias = document.querySelectorAll('.categoria a');
        enlacesCategorias.forEach(function (enlaceCategoria) {
            var categoriaNombre = enlaceCategoria.classList[1];
            var productosCategoria = document.querySelectorAll('.tarjeta.' + categoriaNombre + ':not([style*="display: none"])');
            if (productosCategoria.length === 0) {
                enlaceCategoria.style.display = 'none';
            } else {
                enlaceCategoria.style.display = 'block';
            }
        });
    }

    document.getElementById('search-form').addEventListener('submit', function (event) {
        event.preventDefault();
        var busqueda = document.getElementById('search-input').value;
        if (busqueda.trim() === "") {
            location.reload();
        } else {
            filtrarProductos(busqueda);
        }
    });

    document.getElementById('search-input').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            var busqueda = event.target.value;
            if (busqueda.trim() === "") {
                location.reload();
            } else {
                filtrarProductos(busqueda);
            }
        }
    });
    function aplicarFiltroDeBusqueda() {
        var params = new URLSearchParams(window.location.search);
        var busqueda = params.get('query');
        if (busqueda) {
            filtrarProductos(busqueda);
        }
    }

    aplicarFiltroDeBusqueda();
    // Función para redirigir a la página de categorías con los parámetros de búsqueda
    function redirigirACategoriasConBusqueda(query) {
        var currentPath = window.location.pathname;
        var categoriasPage;
        if (currentPath.includes("categorias.html")) {
            categoriasPage = "categorias.html";
        } else if (currentPath.includes("productos")) {
            categoriasPage = "../categorias.html";
        } else {
            categoriasPage = "categorias.html";
        }
        window.location.href = categoriasPage + "?query=" + encodeURIComponent(query);
    }
    // Evento de envío del formulario de búsqueda
    document.getElementById('search-form').addEventListener('submit', function (event) {
        event.preventDefault();
        var busqueda = document.getElementById('search-input').value.trim();
        if (busqueda) {
            redirigirACategoriasConBusqueda(busqueda);
        } else {
            redirigirACategorias();
        }
    });

    // Evento de tecla presionada en el input de búsqueda
    document.getElementById('search-input').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            var busqueda = event.target.value.trim();
            if (busqueda) {
                redirigirACategoriasConBusqueda(busqueda);
            } else {
                redirigirACategorias();
            }
        }
    });

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    // Función para agregar un producto al carrito
    function addToCart(tarjetaTitle, precioDigitos) {
        let cartItems = getCookie('cartItems');
        cartItems = cartItems ? JSON.parse(cartItems) : [];
        cartItems.push({ title: tarjetaTitle, price: precioDigitos });
        setCookie('cartItems', JSON.stringify(cartItems), 7); // Guarda el carrito por 7 días
        updateCartBadge();
    }

    // Función para actualizar la insignia del carrito
    function updateCartBadge() {
        const cartBadge = document.getElementById("cart-button").querySelector(".badge");
        let cartItems = getCookie('cartItems');
        cartItems = cartItems ? JSON.parse(cartItems) : [];
        cartBadge.textContent = cartItems.length;
    }

    // Función para manejar el evento de clic en el botón de compra
    function handleBuyButtonClick() {
        const buyButtons = document.querySelectorAll(".buyButton");
        buyButtons.forEach(button => {
            button.addEventListener("click", event => {
                const tarjetaTitle = document.querySelector(".productTitle").textContent;
                const tarjetaPrice = document.querySelector(".productPrice").textContent;
                const precioDigitos = tarjetaPrice.match(/\$\d+(?:\.\d+)?/);
                addToCart(tarjetaTitle, precioDigitos);
            });
        });
    }

    // Función para renderizar los elementos del carrito
    function renderCartItems() {
        const cartItemsContainer = document.querySelector("#cartModal .cart-items");
        cartItemsContainer.innerHTML = ""; // Vacía el contenedor antes de renderizar los elementos del carrito
        let cartItems = getCookie('cartItems');
        cartItems = cartItems ? JSON.parse(cartItems) : [];
        if (cartItems.length === 0) {
            const emptyCartMessage = document.createElement("p");
            emptyCartMessage.textContent = "Tu carrito está vacío.";
            cartItemsContainer.appendChild(emptyCartMessage);
        } else {
            cartItems.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.className = "cart-item";
                itemElement.textContent = `${item.title} - ${item.price}`;
                cartItemsContainer.appendChild(itemElement);
            });
        }
    }

    // Función para mostrar el pop-up del carrito
    function showCartPopup() {
        const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
        cartModal.show();
        renderCartItems(); // Renderiza los elementos del carrito cada vez que se muestra el pop-up
    }

    // Asignar el evento click al botón del carrito
    cartButton.addEventListener("click", function () {
        showCartPopup();
    });
    document.getElementById("checkout-button").addEventListener("click", function() {
        let cartItems = getCookie('cartItems');
        cartItems = cartItems ? JSON.parse(cartItems) : [];
    
        if (cartItems.length > 0) {
            showSuccessAlert("¡Compra exitosa!");
            clearCart();
            setTimeout(redirigirACategorias, 2000); // Redirige a categorías después de 2 segundos
        } else {
            showErrorAlert("No hay artículos en el carrito.");
        }
    });
    

    // Función para inicializar el carrito al cargar la página
    function initializeCart() {
        updateCartBadge();
        handleBuyButtonClick();
        renderCartItems();
    }
    // Función para borrar todos los items del carrito
    function clearCart() {
        setCookie('cartItems', '', -1);
        updateCartBadge();
        renderCartItems();
    }

// Manejador de evento de clic en el botón "Borrar Carrito"
document.getElementById("clear-cart-button").addEventListener("click", function () {
    let cartItems = getCookie('cartItems');
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    if (cartItems.length > 0) {
        clearCart(); // Llama a la función para borrar todos los items del carrito
    } else {
        showErrorAlert("No hay artículos en el carrito.");
    }
});
var closeButton = document.querySelector('.modal-header .btn-close');
// Encuentra el modal
var modal = document.getElementById('cartModal');

// Añade un evento de clic al botón de cierre
closeButton.addEventListener('click', function () {
    // Cierra el modal
    var modalBS = bootstrap.Modal.getInstance(modal);
    modalBS.hide();
});

    // Función para redirigir a la página de categorías
    function redirigirACategorias() {
        var currentPath = window.location.pathname;
        var categoriasPage;
        if (currentPath.includes("categorias.html")) {
            categoriasPage = "categorias.html";
        } else if (currentPath.includes("productos")) {
            categoriasPage = "../categorias.html";
        } else {
            categoriasPage = "categorias.html";
        }
        window.location.href = categoriasPage;
    }

    const loginMenuButton = document.getElementById("loginMenu");

    // Agregar un evento de clic al botón "Iniciar Sesión" para abrir el modal
    loginMenuButton.addEventListener("click", function () {
        const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
        loginModal.show();
    });

    // Al abrir el modal, desactiva el desplazamiento del cuerpo
    var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal._element.addEventListener('show.bs.modal', function () {
        document.body.style.overflow = 'hidden';
    });

    // Cuando se cierra el modal, elimina el backdrop y restaura el desplazamiento del cuerpo
    document.querySelector('#loginModal').addEventListener('hidden.bs.modal', function () {
        var backdrop = document.querySelector('.modal-backdrop');
        backdrop.parentNode.removeChild(backdrop);
        document.body.style.overflow = '';
    });

    // Definición de usuarios existentes (solo para ejemplo)
    const users = [
        { email: "admin@example.com", password: "admin" }
    ];

    // Función para verificar las credenciales del usuario...
    function checkCredentials(email, password) {
        return users.some(user => user.email === email && user.password === password);
    }

    function showSuccessAlert(message) {
        const successModal = new bootstrap.Modal(document.getElementById("successModal"));
        const successMessage = document.getElementById("successMessage");
        successMessage.textContent = message;
        successModal.show();
    }

    function showErrorAlert(message) {
        const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.textContent = message;
        errorModal.show();
    }
    // Función para verificar el estado del inicio de sesión...
    function checkLoginStatus() {
        const loggedIn = getCookie('loggedIn') === 'true';
        if (loggedIn) {
            loginMenu.classList.add('d-none');
            logoutButton.classList.remove('d-none');
            cartButton.classList.remove('d-none');
        } else {
            logoutButton.classList.add('d-none');
            loginMenu.classList.remove('d-none');
        }
    }

    // Botón de login
    loginButton.addEventListener("click", function (event) {
        event.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        // Verificar las credenciales del usuario
        if (checkCredentials(email, password)) {
            setCookie('loggedIn', 'true', 1);
            showSuccessAlert("Credenciales correctas. ¡Bienvenido...");
            checkLoginStatus();
            setTimeout(redirigirACategorias, 2000); // Redirige a categorías después de 2 segundos
        } else {
            showErrorAlert("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    });

    // Botón de logout
    logoutButton.addEventListener("click", function () {
        setCookie('loggedIn', 'false', 1); // Establece la cookie por 1 día
        showSuccessAlert("¡Has cerrado sesión correctamente! Saliendo...");
        checkLoginStatus();
        setTimeout(redirigirACategorias, 2000); // Redirige a categorías después de 2 segundos
    });

    checkLoginStatus(); // Función para verificar el estado de inicio de sesión

    // Llama a initializeCart() para iniciar el carrito cuando se carga la página
    initializeCart();

});