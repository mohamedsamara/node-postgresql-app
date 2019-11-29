import React from 'react';

import { Route, Switch, Redirect } from 'react-router';

import Authors from '../../pages/Authors';

// import page404 from '../../pages/404';

const Author = () => {
  return (
    <Switch>
      <Route path="/author/list" component={Authors} />
      <Redirect from="/" to="/author/list" />
    </Switch>
  );
};

export default Author;
