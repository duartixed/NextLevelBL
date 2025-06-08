# Guía de validación funcional NextLevelBL

## 1. Backend y Base de Datos
- Inicia el backend con:
  ```powershell
  cd ..\backend
  node server.js
  ```
- Verifica que no haya errores ni advertencias en la consola.
- Abre MySQL Workbench y ejecuta:
  ```sql
  SHOW TABLES;
  SELECT * FROM Productos;
  SELECT * FROM Clientes;
  SELECT * FROM Carrito_de_Compras;
  ```
- Confirma que existen las tablas y los datos de prueba.

## 2. Productos y Menú
- Inicia el frontend:
  ```powershell
  cd ..\Front_REACT
  npm start
  ```
- Ingresa a la app en el navegador (usualmente http://localhost:3000).
- Verifica que el menú y las cards de productos muestran los datos correctos.

## 3. Carrito de Compras
- Haz clic en "Agregar al carrito" en varios productos.
- Verifica que el contador del carrito aumenta.
- Abre el carrito y revisa que los productos y cantidades sean correctos.
- Elimina un producto y verifica que se actualiza el contador y el contenido.

## 4. Flujo de Compra
- Si está implementado, procede al pago desde el carrito.
- Verifica que el recibo/factura muestre los productos y totales correctos.

## 5. Integridad de la Base de Datos
- En Workbench, ejecuta:
  ```sql
  SELECT * FROM Carrito_de_Compras WHERE idProducto NOT IN (SELECT idProducto FROM Productos);
  ```
- Confirma que no hay resultados (no hay datos huérfanos).

## 6. Pruebas SQL Manuales
- Ejecuta:
  ```sql
  SELECT * FROM Productos;
  SELECT * FROM Carrito_de_Compras;
  SELECT * FROM Clientes;
  ```
- Verifica que los datos sean los esperados.

## 7. Otros
- Prueba las rutas backend con Postman o navegador:
  - `GET http://localhost:3001/api/productos`
  - `GET http://localhost:3001/api/carrito/1` (ajusta el idCliente)
- Verifica que no hay advertencias ni errores en consola del backend ni del navegador.

---

Marca cada punto en el checklist a medida que lo valides. Si encuentras errores, revisa la consola y los logs para detalles.
