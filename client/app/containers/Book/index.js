import React from 'react';

import { Route, Switch, Redirect } from 'react-router';

import BookList from '../../components/BookList';

import AddBookForm from '../../components/AddBookForm';

import Test from '../../components/Test';
// import page404 from '../../pages/404';

const Book = () => {
  return (
    <Switch>
      <Route exact path="/book" component={Test} />
      <Route path="/book/list" component={BookList} />
      <Route path="/book/add" component={AddBookForm} />
      {/* <Route path="*" component={page404} /> */}
      <Redirect from="/" to="/" />
    </Switch>
  );
};

export default Book;
