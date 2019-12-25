import chai from 'chai';
import chaitHttp from 'chai-http';
import 'chai/register-should';

import { app, PORT } from '../index';

const { expect } = chai;
chai.use(chaitHttp);

describe('Testing app server', () => {
  it(`it should respond to http://localhost:${PORT}`, done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('status').eql('error');
        res.body.should.have
          .property('message')
          .eql('Your request could not be processed. Please try again.');
        done();
      });
  });
});
