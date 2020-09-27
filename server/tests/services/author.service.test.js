import chai from 'chai';
import chaitHttp from 'chai-http';
import sinon from 'sinon';

import AuthorService from '../../services/author.service';
import database from '../../models';

const { expect } = chai;
chai.use(chaitHttp);

describe('Testing author service', () => {
  it('It should create an author to the db', async () => {
    const stubValue = {
      name: 'author five',
    };

    const stub = sinon.stub(database.author, 'create').returns(stubValue);
    const author = await AuthorService.addAuthor(stubValue);

    expect(stub.calledOnce).to.be.true;
    expect(author.name).to.equal(stubValue.name);
  });

  it('It should get a particular author from the db', async () => {
    const stubValue = {
      id: 1,
      name: 'author one',
    };

    const stub = sinon.stub(database.author, 'findOne').returns(stubValue);
    const author = await AuthorService.getAuthor(stubValue.id);

    expect(stub.calledOnce).to.be.true;
    expect(author).to.have.property('name');
  });

  it('It should delete an author from the db', async () => {
    const stubValue = {
      id: 1,
      name: 'author one',
    };

    const stub = sinon.stub(database.author, 'destroy').returns(stubValue);
    const author = await AuthorService.deleteAuthor(stubValue.id);

    expect(stub.calledOnce).to.be.true;
  });

  it('It should update an author from the db', async () => {
    const stubValue = {
      id: 1,
      name: 'author one updated',
    };

    const stub = sinon.stub(database.author, 'update').returns(stubValue);
    const author = await AuthorService.updateAuthor(stubValue.id, stubValue);

    expect(stub.calledOnce).to.be.true;
    expect(author.name).to.equal(stubValue.name);
  });
});
