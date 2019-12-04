import React, { useReducer, useEffect } from 'react';

import axios from 'axios';

import {
  fetchBooks,
  addBook,
  deleteBook,
  toggleBookCard,
  fetchBook,
} from './action';

import { initialState, bookReducer } from './reducer';

const BookContext = React.createContext(initialState);

const BookProvider = props => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  // add book api
  const addBookApi = async bookData => {
    try {
      const response = await axios.post(`/api/book`, bookData);

      const book = response.data.data;

      if (book) {
        dispatch(addBook(book));
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  // update book api
  const updateBookApi = async (id, bookData) => {
    try {
      const response = await axios.put(`/api/book/${id}`, {
        author_id: bookData.value,
      });

      const book = response.data.data;

      if (book) {
        // dispatch(updateBook(book));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete book api
  const deleteBookApi = async (index, id) => {
    try {
      const response = await axios.delete(`/api/book/${id}`);

      if (response.status === 200) {
        dispatch(deleteBook(index));
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  useEffect(() => {
    if (state.books) {
      fetchBooksApi();
    }
  }, []);

  return (
    <BookContext.Provider
      value={{
        state,
        dispatch,
        addBookApi,
        deleteBookApi,
        toggleBookCard,
        fetchBookApi,
        updateBookApi,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export { BookProvider, BookContext };
