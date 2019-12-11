import React from 'react';

import { Route, Switch } from 'react-router';

import routes from '../../utils/routes';

import Layout from '../../components/Layout';

const Application = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Application;
