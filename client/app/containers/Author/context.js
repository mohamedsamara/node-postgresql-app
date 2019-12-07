import React, { useReducer, useEffect } from 'react';

import axios from 'axios';

import {
  fetchAuthors,
  addAuthor,
  fetchAuthor,
  fetchAuthorsList,
  handleAuthor,
} from './action';
import { initialState, authorReducer } from './reducer';

const AuthorContext = React.createContext(initialState);

const AuthorProvider = props => {
  const [state, dispatch] = useReducer(authorReducer, initialState);

  // add author api
  const addAuthorApi = async authorData => {
    try {
      const response = await axios.post(`/api/author`, { name: authorData });

      const author = response.data.data;

      if (author) {
        dispatch(addAuthor(author));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch author api
  const fetchAuthorApi = async id => {
    try {
      const response = await axios.get(`/api/author/${id}`);

      const author = response.data.data;

      if (author) {
        dispatch(fetchAuthor(author));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update author api
  const updateAuthorApi = async authorData => {
    const newAuthorData = authorData.books.map(book => {
      return book.value;
    });

    // eslint-disable-next-line no-param-reassign
    authorData.books = [...newAuthorData];

    try {
      const response = await axios.put(
        `/api/author/${authorData.id}`,
        authorData,
      );

      const author = response.data.data;

      if (author) {
        // dispatch(updateAuthor(author));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch authors api
  const fetchAuthorsApi = async () => {
    try {
      const response = await axios.get(`/api/author`);

      const authors = response.data.data;

      if (authors) {
        dispatch(fetchAuthors(authors));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch authors list api
  const fetchAuthorsListApi = async () => {
    try {
      const response = await axios.get(`/api/author/list`);

      const authors = response.data.data;

      if (authors) {
        dispatch(fetchAuthorsList(authors));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAuthorData = value => {
    dispatch(handleAuthor(value));
  };

  useEffect(() => {
    if (state.authors) {
      fetchAuthorsApi();
    }
  }, []);

  return (
    <AuthorContext.Provider
      value={{
        state,
        dispatch,
        addAuthorApi,
        fetchAuthorApi,
        fetchAuthorsListApi,
        updateAuthorApi,
        handleAuthorData,
      }}
    >
      {props.children}
    </AuthorContext.Provider>
  );
};

export { AuthorProvider, AuthorContext };
