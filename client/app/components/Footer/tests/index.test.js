import React from 'react';
import Typography from '@material-ui/core/Typography';

import Footer from '../index';

describe('Testing <Footer/> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it('It should shallow renders', () => {
    shallow(<Footer />);
  });

  it('It should render Typography', () => {
    expect(wrapper.find(Typography)).to.have.lengthOf(1);
  });

  it('It should have Link text', () => {
    expect(wrapper.find(Typography).text()).to.equal(
      `© ${new Date().getFullYear()} Book Store`,
    );
  });

  it('It should have css class "footer"', () => {
    expect(wrapper.find('div').hasClass('footer')).to.equal(true);
  });
});
