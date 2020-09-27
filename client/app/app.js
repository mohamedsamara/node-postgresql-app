import React from 'react';

import { Router } from 'react-router';
import { ThemeProvider } from '@material-ui/styles';

import theme from './utils/theme';

import Application from './containers/Application';
import history from './utils/history';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Application />
      </Router>
    </ThemeProvider>
  );
};

export default App;
