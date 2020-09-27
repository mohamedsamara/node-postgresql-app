import React, { useReducer } from 'react';

import axios from 'axios';
import { useSnackbar } from 'react-snackbar-messages';

import {
  fetchBooks,
  addBook,
  deleteBook,
  toggleBookCard,
  fetchBook,
  fetchBooksList,
  handleBook,
} from './action';

import { initialState, bookReducer } from './reducer';
import BookContext from './context';

const BookProvider = props => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const snackbar = useSnackbar();

  const handleBookErrors = error => {
    if (error.response) {
      snackbar.add(`${error.response.data.message}`, {
        appearance: 'error',
        autoDismiss: true,
        delay: 1000,
      });
    } else {
      snackbar.add(`${error}`, {
        appearance: 'error',
        autoDismiss: true,
        delay: 1000,
      });
    }
  };

  // add book api
  const addBookApi = async bookData => {
    try {
      const response = await axios.post(`/api/book`, bookData);

      const book = response.data.data;

      if (book) {
        dispatch(addBook(book));

        snackbar.add(`${response.data.message}`, {
          appearance: 'info',
          autoDismiss: true,
          delay: 1000,
        });
      }
    } catch (error) {
      handleBookErrors(error);
    }
  };

  // fetch book api
  const fetchBookApi = async id => {
    try {
      const response = await axios.get(`/api/book/${id}`);

      const book = response.data.data;

      if (book) {
        dispatch(fetchBook(book));
      }
    } catch (error) {
      handleBookErrors(error);
    }
  };

  // update book api
  const updateBookApi = async bookData => {
    const updatedBook = { ...bookData };
    if (bookData.author) {
      updatedBook.author_id = bookData.author.value;
    } else {
      updatedBook.author_id = bookData.author;
    }

    try {
      await axios.put(`/api/book/${bookData.id}`, updatedBook);
    } catch (error) {
      handleBookErrors(error);
    }
  };

  // delete book api
  const deleteBookApi = async (index, id) => {
    try {
      const response = await axios.delete(`/api/book/${id}`);

      if (response.status === 200) {
        dispatch(deleteBook(index));

        return snackbar.add(`${response.data.message}`, {
          appearance: 'info',
          autoDismiss: true,
          delay: 1000,
        });
      }

      throw new Error(response.error);
    } catch (error) {
      handleBookErrors(error);
    }
  };

  // fetch books api
  const fetchBooksApi = async () => {
    try {
      const response = await axios.get(`/api/book`);

      const books = response.data.data;

      if (books) {
        dispatch(fetchBooks(books));
      }
    } catch (error) {
      handleBookErrors(error);
    }
  };

  // fetch books list api
  const fetchBookListApi = async () => {
    try {
      const response = await axios.get(`/api/book/list`);

      const books = response.data.data;

      if (books) {
        dispatch(fetchBooksList(books));
      }
    } catch (error) {
      handleBookErrors(error);
    }
  };

  const handleBookData = value => {
    dispatch(handleBook(value));
  };

  return (
    <BookContext.Provider
      value={{
        state,
        dispatch,
        fetchBooksApi,
        addBookApi,
        deleteBookApi,
        toggleBookCard,
        fetchBookApi,
        updateBookApi,
        fetchBookListApi,
        handleBookData,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookProvider;
