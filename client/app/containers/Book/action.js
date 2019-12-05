import {
  FETCH_BOOKS,
  ADD_BOOK,
  DELETE_BOOK,
  TOGGLE_BOOK_CARD,
  FETCH_BOOK,
  FETCH_BOOK_LIST,
} from './constant';

export const fetchBooks = books => {
  return {
    type: FETCH_BOOKS,
    payload: books,
  };
};

export const addBook = book => {
  return {
    type: ADD_BOOK,
    payload: book,
  };
};

export const deleteBook = index => {
  return {
    type: DELETE_BOOK,
    payload: index,
  };
};

export const toggleBookCard = index => {
  return {
    type: TOGGLE_BOOK_CARD,
    payload: index,
  };
};

export const fetchBook = book => {
  return {
    type: FETCH_BOOK,
    payload: book,
  };
};

export const fetchBooksList = books => {
  return {
    type: FETCH_BOOK_LIST,
    payload: books,
  };
};
