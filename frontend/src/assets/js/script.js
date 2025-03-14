document.addEventListener("DOMContentLoaded", function () {
    let contadorCarrito = 0;
    const contador = document.querySelector(".contador-carrito");
    const carritoLista = document.querySelector(".carrito-lista");
    const btnVaciar = document.querySelector(".btn-vaciar");
    const btnPagar = document.querySelector(".btn-pagar");

    // Cargar el carrito al inicio
    function cargarCarrito() {
        fetch("http://localhost:3000/api/carrito")
            .then(response => response.json())
            .then(data => {
                contadorCarrito = data.length;
                contador.textContent = contadorCarrito;
                renderCarrito(data);
            })
            .catch(error => console.error("Error al obtener el carrito:", error));
    }

    // Renderizar el carrito en la interfaz
    function renderCarrito(carrito) {
        carritoLista.innerHTML = "";
        carrito.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.producto} (x${item.cantidad})`;
            
            // Botón eliminar
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "❌";
            btnEliminar.onclick = () => eliminarProducto(item.producto);

            li.appendChild(btnEliminar);
            carritoLista.appendChild(li);
        });
    }

    // Agregar al carrito
    document.querySelectorAll(".btn-agregar").forEach((boton) => {
        boton.addEventListener("click", function () {
            const producto = this.getAttribute("data-producto");
            const cantidad = 1;

            fetch("http://localhost:3000/api/carrito", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ producto, cantidad })
            })
            .then(response => response.json())
            .then(data => {
                contadorCarrito++;
                contador.textContent = contadorCarrito;
                renderCarrito(data.carrito);
                alert("Producto agregado al carrito 🛒");
            })
            .catch(error => console.error("Error:", error));
        });
    });

    // Eliminar un producto del carrito
    function eliminarProducto(producto) {
        fetch(`http://localhost:3000/api/carrito/${producto}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            contadorCarrito = data.carrito.length;
            contador.textContent = contadorCarrito;
            renderCarrito(data.carrito);
            alert("Producto eliminado ❌");
        })
        .catch(error => console.error("Error:", error));
    }

    // Vaciar carrito
    if (btnVaciar) {
        btnVaciar.addEventListener("click", function () {
            fetch("http://localhost:3000/api/carrito", { method: "DELETE" })
                .then(response => response.json())
                .then(data => {
                    contadorCarrito = 0;
                    contador.textContent = contadorCarrito;
                    renderCarrito([]);
                    alert("Carrito vaciado 🗑️");
                })
                .catch(error => console.error("Error:", error));
        });
    }

    // Proceder al pago
    if (btnPagar) {
        btnPagar.addEventListener("click", function () {
            fetch("http://localhost:3000/api/pago", { method: "POST" })
                .then(response => response.json())
                .then(data => {
                    alert(data.mensaje);
                    if (data.success) {
                        contadorCarrito = 0;
                        contador.textContent = "0";
                        renderCarrito([]);
                    }
                })
                .catch(error => console.error("Error:", error));
        });
    }

    // Cargar el carrito al inicio
    cargarCarrito();
});
