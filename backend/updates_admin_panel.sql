-- Añadir columna de estado a la tabla Ventas si no existe
ALTER TABLE Ventas ADD COLUMN IF NOT EXISTS estado ENUM('Pendiente', 'Completado', 'Cancelado') DEFAULT 'Pendiente';

-- Crear tabla para categorías si no existe
CREATE TABLE IF NOT EXISTS Categorias (
  idCategoria INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  descripcion TEXT,
  imagen VARCHAR(255)
);

-- Añadir relación en Productos si no existe
ALTER TABLE Productos ADD COLUMN IF NOT EXISTS idCategoria INT,
ADD FOREIGN KEY IF NOT EXISTS (idCategoria) REFERENCES Categorias(idCategoria);

-- Insertar categorías básicas
INSERT IGNORE INTO Categorias (nombre, descripcion) VALUES
('Hamburguesas', 'Nuestras deliciosas hamburguesas'),
('Papas Fritas', 'Acompañamientos crujientes'),
('Bebidas', 'Refrescantes bebidas'),
('Alitas', 'Las mejores alitas'),
('Hot Dogs', 'Hot dogs gourmet'),
('Entradas', 'Para empezar tu experiencia');

-- Actualizar productos existentes con categorías
UPDATE Productos SET idCategoria = (
  SELECT idCategoria FROM Categorias WHERE nombre = 'Hamburguesas'
) WHERE nombre LIKE '%burger%' OR nombre LIKE '%hamburguesa%';

UPDATE Productos SET idCategoria = (
  SELECT idCategoria FROM Categorias WHERE nombre = 'Papas Fritas'
) WHERE nombre LIKE '%papa%' OR nombre LIKE '%fries%';

UPDATE Productos SET idCategoria = (
  SELECT idCategoria FROM Categorias WHERE nombre = 'Bebidas'
) WHERE nombre LIKE '%bebida%' OR nombre LIKE '%soda%' OR nombre LIKE '%coca%';

UPDATE Productos SET idCategoria = (
  SELECT idCategoria FROM Categorias WHERE nombre = 'Alitas'
) WHERE nombre LIKE '%alita%' OR nombre LIKE '%alas%';

UPDATE Productos SET idCategoria = (
  SELECT idCategoria FROM Categorias WHERE nombre = 'Hot Dogs'
) WHERE nombre LIKE '%hot%' OR nombre LIKE '%perro%';

UPDATE Productos SET idCategoria = (
  SELECT idCategoria FROM Categorias WHERE nombre = 'Entradas'
) WHERE idCategoria IS NULL;
