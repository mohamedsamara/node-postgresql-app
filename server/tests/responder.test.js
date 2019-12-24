import chai from 'chai';
import chaitHttp from 'chai-http';
import sinon from 'sinon';

import Responder from '../helpers/responder.helper';

const { expect } = chai;
chai.use(chaitHttp);

const responder = new Responder();

describe('testing responder helper', () => {
  before(() => {});

  it('should set success correctly', () => {
    const details = {
      statusCode: 200,
      message: 'test message',
    };

    responder.setSuccess(details.statusCode, details.message);

    expect(responder.statusCode).to.equal(200);
    expect(responder.message).to.equal(details.message);
    expect(responder.type).to.equal('success');
  });

  it('should set success with data correctly', () => {
    const details = {
      statusCode: 200,
      message: 'test message',
      data: [
        { id: 1, name: 'test one' },
        { id: 2, name: 'test two' },
      ],
    };

    responder.setSuccess(details.statusCode, details.message, details.data);

    expect(responder.statusCode).to.equal(200);
    expect(responder.message).to.equal(details.message);
    expect(responder.type).to.equal('success');
    expect(responder.data).to.be.an('array');
    expect(responder.data).to.eql(details.data);
  });

  it('should set error correctly', () => {
    const details = {
      statusCode: 400,
      message: 'test message',
    };

    responder.setError(details.statusCode, details.message);

    expect(responder.statusCode).to.equal(400);
    expect(responder.message).to.equal(details.message);
    expect(responder.type).to.equal('error');
  });

  it('should send success correctly', () => {
    const mockResponse = () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      return res;
    };

    const details = {
      statusCode: 200,
      message: 'test message',
      data: [
        { id: 1, name: 'test one' },
        { id: 2, name: 'test two' },
      ],
    };

    const res = mockResponse();
    const stub = sinon.stub(responder, 'send').returns(details);

    responder.setSuccess(
      details.statusCode,
      details.message,
      details.statusCode,
    );

    const result = responder.send(res);

    expect(stub.calledOnce).to.be.true;
    expect(result.statusCode).to.equal(details.statusCode);
    expect(result.message).to.equal(details.message);
  });
});
