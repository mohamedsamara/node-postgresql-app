import React, { useReducer, useEffect } from 'react';

// import { fetchBooks, addBook } from './action';
import { initialState, bookReducer } from './reducer';

const BookContext = React.createContext(initialState);

const BookProvider = props => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  useEffect(() => {}, []);

  const addBookApi = () => {};

  return (
    <BookContext.Provider value={{ state, dispatch, addBookApi }}>
      {props.children}
    </BookContext.Provider>
  );
};

export { BookProvider, BookContext };
