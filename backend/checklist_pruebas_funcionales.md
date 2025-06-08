# Checklist de pruebas funcionales para NextLevelBL

## 1. Backend y Base de Datos
- [ ] El backend inicia sin errores ni advertencias en consola.
- [ ] La base de datos contiene las tablas: Roles, Clientes, Productos, Carrito_de_Compras, Ventas, DetalleVentas, MetodosPago, ProcesoPago.
- [ ] Los datos de prueba (clientes y productos) están correctamente insertados.
- [ ] Los índices existen y no hay advertencias de duplicados.

## 2. Productos y Menú
- [ ] El menú muestra todos los productos reales de la base de datos.
- [ ] Las cards de productos muestran nombre, descripción y precio correctos.

## 3. Carrito de Compras
- [ ] Al hacer clic en "Agregar al carrito" en cualquier producto, el producto se agrega correctamente.
- [ ] El contador del carrito en el header aumenta correctamente.
- [ ] El contenido del carrito refleja los productos agregados y sus cantidades.
- [ ] Eliminar un producto del carrito lo elimina correctamente y actualiza el contador.

## 4. Flujo de Compra
- [ ] Se puede proceder al pago desde el carrito (si está implementado).
- [ ] El recibo/factura muestra los productos y totales correctos.

## 5. Integridad de la Base de Datos
- [ ] No hay datos huérfanos (por ejemplo, productos en el carrito que no existen en Productos).
- [ ] Las relaciones y claves foráneas funcionan correctamente (no se pueden insertar datos inválidos).

## 6. Pruebas SQL Manuales (en Workbench)
- [ ] `SELECT * FROM Productos;` muestra todos los productos esperados.
- [ ] `SELECT * FROM Carrito_de_Compras;` muestra los productos agregados al carrito.
- [ ] `SELECT * FROM Clientes;` muestra los clientes de prueba.

## 7. Otros
- [ ] El backend responde correctamente a las rutas `/api/productos`, `/api/carrito/:idCliente`, etc.
- [ ] No hay advertencias ni errores en consola al realizar operaciones desde el frontend.

---

Marca cada casilla a medida que vayas validando el funcionamiento. Si alguna falla, revisa la consola del backend y del navegador para identificar el problema.
