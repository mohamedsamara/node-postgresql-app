import React from 'react';

import { Route, Switch, Redirect } from 'react-router';

import Books from '../../pages/Books';
import AddBook from '../../pages/AddBook';

// import page404 from '../../pages/404';

const Book = () => {
  return (
    <Switch>
      {/* <Route exact path="/book" component={Test} /> */}
      <Route path="/book/list" component={Books} />
      <Route path="/book/add" component={AddBook} />
      {/* <Route path="*" component={page404} /> */}
      <Redirect from="/" to="/book/list" />
    </Switch>
  );
};

export default Book;
