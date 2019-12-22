import chai from 'chai';
import chaitHttp from 'chai-http';
import 'chai/register-should';

import { app, PORT } from '../index';

const { expect } = chai;
chai.use(chaitHttp);

describe('testing app server', () => {
  it(`test responding to http://localhost:${PORT}`, done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(400);

        if (err) {
          expect(res).to.contain(
            'Your request could not be processed. Please try again.',
          );
        }

        done();
      });
  });
});
