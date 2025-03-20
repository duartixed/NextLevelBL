import React from 'react';

const Navbar = ({ carritoCount }) => {
    return (
        <nav>
            <div className="logo">Restaurante Gourmet</div>
            <ul className="nav-links">
                <li><a href="/">Inicio</a></li>
                <li><a href="/menu">Menú</a></li>
                <li><a href="/reservas">Reservas</a></li>
                <li><a href="/contacto">Contacto</a></li>
            </ul>
            <div className="carrito">
                <span>Carrito: {carritoCount}</span>
            </div>
        </nav>
    );
};

export default Navbar;