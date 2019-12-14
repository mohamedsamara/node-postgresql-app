import React from 'react';

import { Route, Switch } from 'react-router';

import routes from '../../utils/routes';
import Layout from '../../components/Layout';
import { ToastProvider } from '../Toast';

const Application = () => {
  return (
    <Layout>
      <ToastProvider autoDismiss={false}>
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
      </ToastProvider>
    </Layout>
  );
};

export default Application;
