import React, { useReducer } from 'react';

import axios from 'axios';

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

import { useToast } from '../Toast';

const BookContext = React.createContext(initialState);

const BookProvider = props => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const { add } = useToast();

  // add book api
  const addBookApi = async bookData => {
    try {
      const response = await axios.post(`/api/book`, bookData);

      const book = response.data.data;

      if (book) {
        dispatch(addBook(book));
        add(`${response.data.message}`, 'success');
      }
    } catch (error) {
      add(`${error.response.data.message}`, 'error');
    }
  };

  // fetch book api
  const fetchBookApi = async id => {
    try {
      const response = await axios.get(`/api/book/${id}`);

      const book = response.data.data;

      if (book) {
        dispatch(fetchBook(book));
        add(`${response.data.message}`, 'info');
      }
    } catch (error) {
      if (error.response) {
        add(`${error.response.data.message}`, 'error');
      } else {
        add(`${error}`, 'error');
      }
    }
  };

  // update book api
  const updateBookApi = async bookData => {
    const updatedBook = { ...bookData };
    if (bookData.author) {
      updatedBook.author = bookData.author.value;
    } else {
      updatedBook.author = bookData.author;
    }

    try {
      const response = await axios.put(`/api/book/${bookData.id}`, {
        author_id: updatedBook.author,
      });

      const book = response.data.data;

      if (book) {
        add(`${response.data.message}`, 'info');
      }
    } catch (error) {
      if (error.response) {
        add(`${error.response.data.message}`, 'error');
      } else {
        add(`${error}`, 'error');
      }
    }
  };

  // delete book api
  const deleteBookApi = async (index, id) => {
    try {
      const response = await axios.delete(`/api/book/${id}`);

      if (response.status === 200) {
        dispatch(deleteBook(index));
        add(`${response.data.message}`, 'info');
      } else {
        add(`${response.error}`, 'error');
      }
    } catch (error) {
      if (error.response) {
        add(`${error.response.data.message}`, 'error');
      } else {
        add(`${error}`, 'error');
      }
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
      if (error.response) {
        add(`${error.response.data.message}`, 'error');
      } else {
        add(`${error}`, 'error');
      }
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
      if (error.response) {
        add(`${error.response.data.message}`, 'error');
      } else {
        add(`${error}`, 'error');
      }
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

export { BookProvider, BookContext };
