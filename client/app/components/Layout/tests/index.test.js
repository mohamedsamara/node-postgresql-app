import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from '../index';
import Footer from '../../Footer';

describe('Testing <Layout/> component', () => {
  const initialProps = {
    children: [],
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Layout {...initialProps} />);
  });

  it('It should shallow renders', () => {
    shallow(<Layout />);
  });

  it('It should render CssBaseline', () => {
    expect(wrapper.find(CssBaseline)).to.have.lengthOf(1);
  });

  it('It should render Footer', () => {
    expect(wrapper.find(Footer)).to.have.lengthOf(1);
  });

  it('It should have a details prop', () => {
    expect(wrapper.props().children).to.not.be.undefined;
  });
});
