import React from 'react';

import Authors from '../index';

describe('Testing <Authors/> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Authors />);
  });

  it('It should shallow renders', () => {
    shallow(<Authors />);
  });

  it('It should render AuthorList', () => {
    expect(wrapper.find('AuthorList')).to.have.lengthOf(1);
  });
});
