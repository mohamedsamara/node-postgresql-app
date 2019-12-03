import React from 'react';

import { Route, Switch, Redirect } from 'react-router';

import { BookProvider } from './context';
import { AuthorProvider } from '../Author/context';

import Books from '../../pages/Books';
import AddBook from '../../pages/AddBook';
import BookPage from '../../pages/Book';

const Book = () => {
  return (
    <BookProvider>
      <Switch>
        <Route path="/book/list" component={Books} />
        <Route path="/book/add" component={AddBook} />
        <AuthorProvider>
          <Route path="/book/:id" component={BookPage} />
        </AuthorProvider>
        <Redirect from="/" to="/book/list" />
      </Switch>
    </BookProvider>
  );
};

export default Book;
