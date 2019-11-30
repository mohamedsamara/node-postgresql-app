import React from 'react';

import { Route, Switch, Redirect } from 'react-router';

import { BookProvider } from './context';

import Books from '../../pages/Books';
import AddBook from '../../pages/AddBook';

// import page404 from '../../pages/404';

const Book = () => {
  return (
    <BookProvider>
      <Switch>
        {/* <Route exact path="/book" component={Test} /> */}
        <Route path="/book/list" component={Books} />
        <Route path="/book/add" component={AddBook} />
        {/* <Route path="*" component={page404} /> */}
        <Redirect from="/" to="/book/list" />
      </Switch>
    </BookProvider>
  );
};

export default Book;
