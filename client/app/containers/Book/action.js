import { FETCH_BOOKS, ADD_BOOK } from './constant';

export const fetchBooks = books => ({
  type: FETCH_BOOKS,
  payload: books,
});

export const addBook = book => {
  return {
    type: ADD_BOOK,
    payload: book,
  };
};
