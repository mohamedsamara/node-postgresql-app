import chai from 'chai';
import chaitHttp from 'chai-http';

import { app } from '../index';

import initialize from '../db/initialize';
import truncate from '../db/truncate';

const { expect } = chai;
chai.use(chaitHttp);

describe('testing book endpoints', () => {
  before(done => {
    (async () => {
      await initialize();
      done();
    })();
  });

  after(done => {
    (async () => {
      await truncate('book');
      done();
    })();
  });

  it('It should create a book', done => {
    const book = {
      title: 'book one',
      price: '10',
      description: 'book description',
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

  it('It should not create a book with empty parameters', done => {
    const book = {
      price: '10',
      description: 'book description',
    };
    chai
      .request(app)
      .post('/api/book')
      .set('Accept', 'application/json')
      .send(book)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property('message')
          .eql('some details are missing');
        done();
      });
  });

  it('It should get all books', done => {
    chai
      .request(app)
      .get('/api/book')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('title');
        res.body.data[0].should.have.property('price');
        res.body.data[0].should.have.property('description');
        done();
      });
  });

  it('It should get a particular book', done => {
    const bookId = 2;
    chai
      .request(app)
      .get(`/api/book/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('title');
        res.body.data.should.have.property('price');
        res.body.data.should.have.property('description');
        done();
      });
  });

  it('It should not get a particular book with invalid id', done => {
    const bookId = 456789;
    chai
      .request(app)
      .get(`/api/book/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property('message')
          .eql(`cannot find book with the id ${bookId}`);
        done();
      });
  });

  it('It should not get a particular book with non-numeric id', done => {
    const bookId = 'test';
    chai
      .request(app)
      .get(`/api/book/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property('message')
          .eql('please provide a valid numeric value');
        done();
      });
  });

  it('It should update a book', done => {
    const bookId = 2;
    const updatedBook = {
      title: 'book one updated',
      price: '10',
      description: 'book description updated',
      author_id: null,
    };
    chai
      .request(app)
      .put(`/api/book/${bookId}`)
      .set('Accept', 'application/json')
      .send(updatedBook)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedBook.id);
        expect(res.body.data.title).equal(updatedBook.title);
        expect(res.body.data.price).equal(updatedBook.price);
        expect(res.body.data.description).equal(updatedBook.description);
        done();
      });
  });

  it('It should update a book author', done => {
    const bookId = 2;
    const updatedBook = {
      title: 'book one updated',
      price: '10',
      description: 'book description updated',
      author_id: 1,
    };
    chai
      .request(app)
      .put(`/api/book/${bookId}`)
      .set('Accept', 'application/json')
      .send(updatedBook)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedBook.id);
        expect(res.body.data.title).equal(updatedBook.title);
        expect(res.body.data.price).equal(updatedBook.price);
        expect(res.body.data.description).equal(updatedBook.description);
        done();
      });
  });

  it('It should not update a book with invalid id', done => {
    const bookId = '567890';
    const updatedBook = {
      title: 'book one updated',
      price: '11',
      description: 'book description updated',
      author_id: null,
    };
    chai
      .request(app)
      .put(`/api/book/${bookId}`)
      .set('Accept', 'application/json')
      .send(updatedBook)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property('message')
          .eql(`cannot find book with the id: ${bookId}`);
        done();
      });
  });

  it('It should not update a book with non-numeric id value', done => {
    const bookId = 'test';
    const updatedBook = {
      id: bookId,
      title: 'book one',
      price: '100',
      description: 'book description',
    };
    chai
      .request(app)
      .put(`/api/book/${bookId}`)
      .set('Accept', 'application/json')
      .send(updatedBook)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property('message')
          .eql('please provide a valid numeric value');
        done();
      });
  });

  it('It should delete a book', done => {
    const bookId = 2;
    chai
      .request(app)
      .delete(`/api/book/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it('It should not delete a book with invalid id', done => {
    const bookId = 87667;
    chai
      .request(app)
      .delete(`/api/book/${bookId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property('message')
          .eql(`book with the id ${bookId} cannot be found`);
        done();
      });
  });
});
