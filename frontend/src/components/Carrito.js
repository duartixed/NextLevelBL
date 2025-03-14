import React from 'react';

const Carrito = ({ items }) => {
    return (
        <div>
            <h2>Carrito</h2>
            {items.length === 0 ? (
                <p>No hay items en el carrito</p>
            ) : (
                items.map(item => (
                    <p key={item.id_carrito}>
                        Dirección: {item.direccion_entrega} - Total: ${item.valor_total_carrito || 0}
                    </p>
                ))
            )}
        </div>
    );
};

export default Carrito;