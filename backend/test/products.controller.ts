import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

describe('Products', () => {
  it('should get all products', () =>
    request(Server)
      .get('/api/v1/products')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length(4);
      }));

  it('should add a new product', () =>
    request(Server)
      .post('/api/v1/products')
      .send({ name: 'test', customerPrice: 123, cost: 456 })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('customerPrice')
          .equal(123);
        expect(r.body).to.be.an('object').that.has.property('cost').equal(456);
      }));

  it('should get an product by id', () =>
    request(Server)
      .get('/api/v1/products/5')
      .expect('Content-Type', /json/)
      .then((r) => {
        console.log(r.body);
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('customerPrice')
          .equal(123);
        expect(r.body).to.be.an('object').that.has.property('cost').equal(456);
      }));

  it('should get cart summary', () =>
    request(Server)
      .post('/api/v1/products/cart')
      .send({
        products: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 },
        ],
      })
      .expect('Content-Type', /json/)
      .then((r) => {
        console.log(r.body);
        expect(r.body)
          .to.be.an('object')
          .that.has.property('products')
          .lengthOf(2);
        expect(r.body)
          .to.be.an('object')
          .that.has.property('total')
          .equal('$485');
      }));
});
