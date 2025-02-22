document.addEventListener("DOMContentLoaded", function () {
    // Contador del carrito
    let contadorCarrito = 0;
    const contador = document.querySelector(".contador-carrito");

    // Agregar al carrito
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", function () {
            contadorCarrito++;
            contador.textContent = contadorCarrito;
            alert("Producto agregado al carrito 🛒");
        });
    });

    // Formulario de reserva
    const formReserva = document.querySelector(".form-reserva");
    if (formReserva) {
        formReserva.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Reserva realizada con éxito ✅");
            formReserva.reset();
        });
    }

    // Formulario de inicio de sesión
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Validación simple (puedes mejorarla)
            if (username === "usuario" && password === "contraseña") {
                alert("Inicio de sesión exitoso ✅");
                window.location.href = "index.html"; // Redirigir al inicio
            } else {
                alert("Usuario o contraseña incorrectos ❌");
            }
        });
    }
});