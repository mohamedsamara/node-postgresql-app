import React from 'react';

import { Route, Switch } from 'react-router';
import { SnackbarProvider } from 'react-snackbar-messages';

import routes from '../../utils/routes';
import Layout from '../../components/Layout';
import BookProvider from '../Book/provider';
import AuthorProvider from '../Author/provider';

const Application = () => {
  return (
    <Layout>
      <SnackbarProvider>
        <BookProvider>
          <AuthorProvider>
            <Switch>
              {routes.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => <route.component {...props} />}
                  />
                ) : null;
              })}
            </Switch>
          </AuthorProvider>
        </BookProvider>
      </SnackbarProvider>
    </Layout>
  );
};

export default Application;
