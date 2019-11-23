import React from 'react';

import { ThemeProvider } from '@material-ui/styles';

import theme from './utils/theme';

import Application from './containers/Application';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Application />
      </ThemeProvider>
    </>
  );
};

export default App;
