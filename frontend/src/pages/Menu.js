import React from 'react';

const Menu = ({ onAddToCart }) => {
    const items = [
        { id: 1, nombre: 'Pizza', descripcion: 'Pizza de pepperoni', precio: 15.50 },
        { id: 2, nombre: 'Hamburguesa', descripcion: 'Hamburguesa clásica', precio: 12.00 }
    ];

    return (
        <div>
            <h2>Menú</h2>
            {items.map(item => (
                <div key={item.id}>
                    <h3>{item.nombre}</h3>
                    <p>{item.descripcion} - ${item.precio}</p>
                    <button onClick={() => onAddToCart(item)}>Agregar al Carrito</button>
                </div>
            ))}
        </div>
    );
};

export default Menu;