import chai from 'chai';
import chaitHttp from 'chai-http';
import sinon from 'sinon';

import BookService from '../../services/book.service';
import database from '../../models';

const { expect } = chai;
chai.use(chaitHttp);

describe('Testing book service', () => {
  it('It should create a book to the db', async () => {
    const stubValue = {
      id: 5,
      title: 'book five',
      price: '10',
      description: 'book description',
    };

    const stub = sinon.stub(database.book, 'create').returns(stubValue);
    const book = await BookService.addBook(stubValue);

    expect(stub.calledOnce).to.be.true;
    expect(book.title).to.equal(stubValue.title);
    expect(book.price).to.equal(stubValue.price);
    expect(book.description).to.equal(stubValue.description);
  });

  it('It should get a particular book from the db', async () => {
    const stubValue = {
      id: 1,
      title: 'book one',
      price: '10',
      description: 'book description',
    };

    const stub = sinon.stub(database.book, 'findOne').returns(stubValue);
    const book = await BookService.getBook(stubValue.id);

    expect(stub.calledOnce).to.be.true;
    expect(book).to.have.property('title');
    expect(book).to.have.property('price');
    expect(book).to.have.property('description');
  });

  it('It should delete a book from the db', async () => {
    const stubValue = {
      id: 1,
      title: 'book one',
      price: '10',
      description: 'book description',
    };

    const stub = sinon.stub(database.book, 'destroy').returns(stubValue);
    const book = await BookService.deleteBook(stubValue.id);

    expect(stub.calledOnce).to.be.true;
  });

  it('It should update a book from the db', async () => {
    const stubValue = {
      id: 1,
      title: 'book one updated',
      price: '10',
      description: 'book description updated',
    };

    const stub = sinon.stub(database.book, 'update').returns(stubValue);
    const book = await BookService.updateBook(stubValue.id, stubValue);

    expect(stub.calledOnce).to.be.true;
    expect(book.title).to.equal(stubValue.title);
    expect(book.price).to.equal(stubValue.price);
    expect(book.description).to.equal(stubValue.description);
  });
});
