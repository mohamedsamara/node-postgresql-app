import React from 'react';
import { expect } from 'chai';

import Empty from '../index';

describe('Testing <Empty/> component', () => {
  const initialProps = {
    details: 'It looks like there is no books added yet.',
  };

  const wrapper = shallow(<Empty {...initialProps} />);
  const container = mount(<Empty {...initialProps} />);

  it('It should have a details prop', () => {
    expect(container.props().details).to.not.be.undefined;
  });

  it('It should contain the detail prop text', () => {
    expect(
      wrapper.contains('It looks like there is no books added yet.'),
    ).to.equal(true);
  });

  it('It should have the p element', () => {
    expect(container.find('p')).to.have.length(1);
  });
});
