import React from 'react';

import { Route, Switch, Redirect } from 'react-router';

import BookList from '../../components/BookList';

import Test from '../../components/Test';
import Test2 from '../../components/Test2';
import Test3 from '../../components/Test3';
// import page404 from '../../pages/404';

const Book = () => {
  return (
    <Switch>
      <Route exact path="/book" component={Test} />
      <Route path="/book/list" component={BookList} />
      <Route path="/book/add" component={Test3} />
      {/* <Route path="*" component={page404} /> */}
      <Redirect from="/" to="/" />
    </Switch>
  );
};

export default Book;
