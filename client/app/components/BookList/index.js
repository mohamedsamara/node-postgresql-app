import React, { useContext } from 'react';

import { BookContext } from '../../containers/Book/context';

const BookList = () => {
  const context = useContext(BookContext);

  console.log('context from booklist component', context);

  return <div>BookList</div>;
};

export default BookList;
