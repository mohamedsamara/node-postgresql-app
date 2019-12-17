import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';

import app from '../../index';

chai.use(chatHttp);
const { expect } = chai;

describe('book endpoints:', () => {
  it('It should create a book', done => {
    const book = {
      title: 'book1',
      price: '10',
      description: 'book desc',
    };
    chai
      .request(app)
      .post('/api/book')
      .set('Accept', 'application/json')
      .send(book)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          title: book.title,
          price: book.price,
          description: book.description,
        });
        done();
      });
  });
});
