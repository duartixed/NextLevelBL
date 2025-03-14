document.addEventListener("DOMContentLoaded", function () {
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    const contadorCarrito = document.querySelector(".contador-carrito");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function actualizarContador() {
        contadorCarrito.textContent = carrito.length;
    }

    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", function () {
            const menuItem = boton.closest(".menu-item");
            const nombre = menuItem.querySelector("h3").textContent;
            const precio = parseFloat(menuItem.dataset.precio) || 0.00; // Si no hay precio, se asigna 0.00
            const imagen = menuItem.querySelector("img").src;

            const producto = { nombre, precio, imagen };

            // Verificar si el producto ya está en el carrito
            const existe = carrito.find((item) => item.nombre === nombre);

            if (existe) {
                alert(`❌ ${nombre} ya está en el carrito.`);
            } else {
                carrito.push(producto);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarContador();
                alert(`✅ ${nombre} agregado al carrito 🛒`);
            }
        });
    });

    actualizarContador();
});

