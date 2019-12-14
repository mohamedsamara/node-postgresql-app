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
  const updateBookApi = async bookData => {
    try {
      const response = await axios.put(`/api/book/${bookData.id}`, {
        author_id: bookData.author.value,
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

  // fetch books list api
  const fetchBookListApi = async () => {
    try {
      const response = await axios.get(`/api/book/list`);

      const books = response.data.data;

      if (books) {
        dispatch(fetchBooksList(books));
      }
    } catch (error) {
      console.log(error);
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
