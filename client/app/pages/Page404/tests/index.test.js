import React from 'react';

import { Link } from 'react-router-dom';

import Page404 from '../index';

describe('Testing <page404/> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Page404 />);
  });

  it('It should shallow renders', () => {
    shallow(<Page404 />);
  });

  it('It should have two li', () => {
    expect(wrapper.find('li')).to.have.lengthOf(2);
  });

  it('It should render Link', () => {
    expect(wrapper.find(Link)).to.have.lengthOf(1);
  });

  it('It should have Link text', () => {
    expect(wrapper.find(Link).text()).to.equal('Back To Home Page');
  });

  it('It should have css class "page404"', () => {
    expect(wrapper.find('div').hasClass('page404')).to.equal(true);
  });
});
