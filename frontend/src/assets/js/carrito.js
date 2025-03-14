document.addEventListener("DOMContentLoaded", function () {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const listaCarrito = document.getElementById("lista-carrito");
    const contadorCarrito = document.querySelector(".contador-carrito");
    const totalPrecio = document.getElementById("total-precio");
    const btnVaciar = document.getElementById("btn-vaciar");

    function actualizarCarrito() {
        listaCarrito.innerHTML = "";
        let total = 0;

        if (carrito.length === 0) {
            listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        } else {
            carrito.forEach((producto, index) => {
                const item = document.createElement("div");
                item.classList.add("producto");
                item.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
                    <div>
                        <h3>${producto.nombre}</h3>
                        <p>Precio: $${producto.precio.toFixed(2)}</p>
                    </div>
                    <button class="btn-eliminar" data-index="${index}">Eliminar</button>
                `;
                listaCarrito.appendChild(item);
                total += producto.precio;
            });
        }

        totalPrecio.textContent = `$${total.toFixed(2)}`;
        contadorCarrito.textContent = carrito.length;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    listaCarrito.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-eliminar")) {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            actualizarCarrito();
        }
    });

    btnVaciar.addEventListener("click", function () {
        carrito = [];
        actualizarCarrito();
    });

    actualizarCarrito();
});
