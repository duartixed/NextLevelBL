import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Carrito from "./components/Carrito";
import Menu from "./pages/Menu";
import Home from "./pages/Home"; // Importa Home.js

function App() {
    const [carritoCount, setCarritoCount] = useState(0);
    const [carritoItems, setCarritoItems] = useState([]);
    const [carritoId, setCarritoId] = useState(null);

    useEffect(() => {
        cargarCarritos();
    }, []);

    const cargarCarritos = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/carrito");
            const items = Array.isArray(response.data) ? response.data : [];
            setCarritoItems(items);
            setCarritoCount(items.length);
        } catch (error) {
            console.error("Error:", error);
            setCarritoItems([]);
            setCarritoCount(0);
        }
    };

    const crearCarrito = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/carrito", {
                id_cliente: 1,
                direccion_entrega: "Calle Ejemplo",
                forma_pago: "tarjeta",
            });
            setCarritoId(response.data.id_carrito);
            cargarCarritos();
            return response.data.id_carrito;
        } catch (error) {
            console.error("Error al crear carrito:", error);
        }
    };

    const agregarProductoCarrito = async (producto) => {
        let currentCarritoId = carritoId;
        try {
            if (!currentCarritoId) {
                currentCarritoId = await crearCarrito();
            }
            await axios.post(`http://localhost:3000/api/carrito/${currentCarritoId}/productos`, {
                id_producto: producto.id,
                cantidad: 1,
            });
            cargarCarritos();
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    };

    return (
        <Router>
            <Navbar carritoCount={carritoCount} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu onAddToCart={agregarProductoCarrito} />} />
                <Route path="/carrito" element={<Carrito items={carritoItems} />} />
            </Routes>
        </Router>
    );
}

export default App;
