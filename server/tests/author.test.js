import chai from 'chai';
import chaitHttp from 'chai-http';

import { app } from '../index';

import initialize from '../db/initialize';
import truncate from '../db/truncate';

const { expect } = chai;
chai.use(chaitHttp);

describe('testing author endpoints', () => {
  before(done => {
    (async () => {
      await initialize();
      done();
    })();
  });

  after(done => {
    (async () => {
      await truncate('author');
      done();
    })();
  });

  it('It should create a author', done => {
    const author = {
      name: 'author one',
    };
    chai
      .request(app)
      .post('/api/author')
      .set('Accept', 'application/json')
      .send(author)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          name: author.name,
        });
        done();
      });
  });

  it('It should not create author with empty parameters', done => {
    const author = {};
    chai
      .request(app)
      .post('/api/author')
      .set('Accept', 'application/json')
      .send(author)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property('message')
          .eql('some details are missing');
        done();
      });
  });

  it('It should get all authors', done => {
    chai
      .request(app)
      .get('/api/author')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('name');
        done();
      });
  });

  it('It should get a particular auhtor', done => {
    const authorId = 1;
    chai
      .request(app)
      .get(`/api/author/${authorId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('name');
        res.body.data.should.have.property('books');
        done();
      });
  });

  it('It should not get a particular author with invalid id', done => {
    const authorId = 456789;
    chai
      .request(app)
      .get(`/api/author/${authorId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property('message')
          .eql(`cannot find author with the id ${authorId}`);
        done();
      });
  });

  it('It should not get a particular author with non-numeric id', done => {
    const authorId = 'test';
    chai
      .request(app)
      .get(`/api/author/${authorId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property('message')
          .eql('please provide a valid numeric value');
        done();
      });
  });

  it('It should update author', done => {
    const authorId = 2;
    const updatedAuthor = {
      name: 'author one updated',
    };
    chai
      .request(app)
      .put(`/api/author/${authorId}`)
      .set('Accept', 'application/json')
      .send(updatedAuthor)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedAuthor.id);
        expect(res.body.data.name).equal(updatedAuthor.name);
        done();
      });
  });

  it('It should update author books', done => {
    const authorId = 2;
    const updatedAuthor = {
      books: [1, 2],
    };
    chai
      .request(app)
      .put(`/api/author/${authorId}/book`)
      .set('Accept', 'application/json')
      .send(updatedAuthor)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.books)
          .to.be.an('array')
          .that.does.not.include(3);
        expect(res.body.data.books).to.eql(updatedAuthor.books);

        done();
      });
  });

  it('It should not update author with invalid id', done => {
    const authorId = '567890';
    const updatedAuthor = {
      name: 'author one updated',
    };
    chai
      .request(app)
      .put(`/api/author/${authorId}`)
      .set('Accept', 'application/json')
      .send(updatedAuthor)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property('message')
          .eql(`cannot find author with the id: ${authorId}`);
        done();
      });
  });

  it('It should not update author with non-numeric id value', done => {
    const authorId = 'test';
    const updatedAuthor = {
      name: 'author one updated',
    };
    chai
      .request(app)
      .put(`/api/author/${authorId}`)
      .set('Accept', 'application/json')
      .send(updatedAuthor)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property('message')
          .eql('please provide a valid numeric value');
        done();
      });
  });

  it('It should delete author', done => {
    const authorId = 2;
    chai
      .request(app)
      .delete(`/api/author/${authorId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it('It should not delete author with invalid id', done => {
    const authorId = 87667;
    chai
      .request(app)
      .delete(`/api/author/${authorId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property('message')
          .eql(`author with the id ${authorId} cannot be found`);
        done();
      });
  });
});
