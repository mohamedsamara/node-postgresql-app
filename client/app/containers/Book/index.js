import React from 'react';

import { Route, Switch, Redirect } from 'react-router';

import Books from '../../pages/Books';
import AddBook from '../../pages/AddBook';
import BookPage from '../../pages/Book';

const Book = () => {
  return (
    <Switch>
      <Route path="/book/list" component={Books} />
      <Route path="/book/add" component={AddBook} />
      <Route path="/book/:id" component={BookPage} />
      <Redirect from="/" to="/book/list" />
    </Switch>
  );
};

export default Book;
