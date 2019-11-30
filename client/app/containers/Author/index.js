import React from 'react';

import { Route, Switch, Redirect } from 'react-router';

import { AuthorProvider } from './context';

import Authors from '../../pages/Authors';

// import page404 from '../../pages/404';

const Author = () => {
  return (
    <AuthorProvider>
      <Switch>
        <Route path="/author/list" component={Authors} />
        <Redirect from="/" to="/author/list" />
      </Switch>
    </AuthorProvider>
  );
};

export default Author;
