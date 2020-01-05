import React from 'react';

import Empty from '../index';

describe('Testing <Empty/> component', () => {
  const initialProps = {
    details: 'It looks like there is no books added yet.',
  };

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Empty {...initialProps} />);
  });

  it('It should shallow renders', () => {
    shallow(<Empty />);
  });

  it('It should mounts', () => {
    mount(<Empty />);
  });

  it('It should have a details prop', () => {
    expect(wrapper.props().details).to.not.be.undefined;
  });

  it('It should contain the detail prop text', () => {
    expect(
      wrapper.contains('It looks like there is no books added yet.'),
    ).to.equal(true);
  });

  it('It should have the p element', () => {
    expect(wrapper.find('p')).to.have.length(1);
  });
});
