import React from 'react';

import { Router, Route, Switch } from 'react-router';
import { ThemeProvider } from '@material-ui/styles';

import theme from './utils/theme';

import Application from './containers/Application';
import history from './utils/history';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Application} />
            <Route path="*" component={Application} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
