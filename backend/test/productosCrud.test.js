import request from 'supertest';
import app from '../server.js';

describe('CRUD de Productos', () => {
  let productoId;

  it('Debería obtener todos los productos', async () => {
    const res = await request(app).get('/api/productos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Debería agregar un producto', async () => {
    const nuevoProducto = {
      nombre: 'Producto Test',
      descripcion: 'Descripción Test',
      precio: 100,
      stock: 10
    };

    const res = await request(app)
      .post('/api/productos')
      .send(nuevoProducto)
      .set('Authorization', 'Bearer tokenDeAdmin');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('idProducto');
    productoId = res.body.idProducto;
  });

  it('Debería actualizar un producto', async () => {
    const productoActualizado = {
      nombre: 'Producto Test Actualizado',
      descripcion: 'Descripción Actualizada',
      precio: 150,
      stock: 5
    };

    const res = await request(app)
      .put(`/api/productos/${productoId}`)
      .send(productoActualizado)
      .set('Authorization', 'Bearer tokenDeAdmin');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Producto actualizado');
  });

  it('Debería eliminar un producto', async () => {
    const res = await request(app)
      .delete(`/api/productos/${productoId}`)
      .set('Authorization', 'Bearer tokenDeAdmin');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Producto eliminado');
  });
});
