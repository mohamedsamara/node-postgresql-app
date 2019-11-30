import React from 'react';

import { Route, Switch, Redirect } from 'react-router';

import { BookProvider } from './context';

import Books from '../../pages/Books';
import AddBook from '../../pages/AddBook';

const Book = () => {
  return (
    <BookProvider>
      <Switch>
        <Route path="/book/list" component={Books} />
        <Route path="/book/add" component={AddBook} />
        <Redirect from="/" to="/book/list" />
      </Switch>
    </BookProvider>
  );
};

export default Book;
