const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

chai.use(chaiHttp);
const { expect } = chai;

describe('CRUD de Productos', () => {
  let productoId;

  it('Debería obtener todos los productos', (done) => {
    chai.request(app)
      .get('/api/productos')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Debería agregar un producto', (done) => {
    chai.request(app)
      .post('/api/productos')
      .send({
        nombre: 'Producto de prueba',
        descripcion: 'Descripción del producto',
        precio: 100,
        stock: 10
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('idProducto');
        productoId = res.body.idProducto;
        done();
      });
  });

  it('Debería actualizar un producto', (done) => {
    chai.request(app)
      .put(`/api/productos/${productoId}`)
      .send({
        nombre: 'Producto actualizado',
        descripcion: 'Descripción actualizada',
        precio: 150,
        stock: 5
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Producto actualizado');
        done();
      });
  });

  it('Debería eliminar un producto', (done) => {
    chai.request(app)
      .delete(`/api/productos/${productoId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Producto eliminado');
        done();
      });
  });
});
