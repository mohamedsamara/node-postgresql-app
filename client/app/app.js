import React from 'react';

import { ThemeProvider } from '@material-ui/styles';

import theme from './utils/theme';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>Test Theming</ThemeProvider>
    </>
  );
};

export default App;
