-- Tabla para carritos anónimos (visitantes)
CREATE TABLE IF NOT EXISTS Carrito_Anonimo (
    idAnonimo VARCHAR(64) NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idAnonimo, idProducto),
    FOREIGN KEY (idProducto) REFERENCES Productos(idProducto)
);

-- Puedes agregar más campos si necesitas rastrear IP, navegador, etc.
