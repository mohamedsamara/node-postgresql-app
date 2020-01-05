import React from 'react';

import Typography from '@material-ui/core/Typography';

import Homepage from '../index';

describe('Testing <Homepage/> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Homepage />);
  });

  it('It should shallow renders', () => {
    shallow(<Homepage />);
  });

  it('It should render Typography', () => {
    expect(wrapper.find(Typography)).to.have.lengthOf(2);
  });

  it('It should have Typography text', () => {
    expect(
      wrapper
        .find(Typography)
        .first()
        .text(),
    ).to.equal('Book Application.');
  });
});
