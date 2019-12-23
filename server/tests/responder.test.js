import chai from 'chai';
import chaitHttp from 'chai-http';

import { app } from '../index';

import Responder from '../helpers/responder.helper';

const { expect } = chai;
chai.use(chaitHttp);

describe('testing responder helper', () => {
  before(() => {
    const responder = new Responder();
  });

  it('', done => {});
});
