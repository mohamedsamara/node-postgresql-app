import React from 'react';

import Books from '../index';

describe('Testing <Books/> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Books />);
  });

  it('It should shallow renders', () => {
    shallow(<Books />);
  });

  it('It should render BookList', () => {
    expect(wrapper.find('BookList')).to.have.lengthOf(1);
  });
});
