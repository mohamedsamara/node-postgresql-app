import React, { useReducer, useEffect } from 'react';

import axios from 'axios';

import { fetchAuthors, addAuthor, fetchAuthor } from './action';
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

      console.log('author', author);

      if (author) {
        dispatch(fetchAuthor(author));
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

  useEffect(() => {
    if (state.authors) {
      fetchAuthorsApi();
    }
  }, []);

  return (
    <AuthorContext.Provider
      value={{ state, dispatch, addAuthorApi, fetchAuthorApi }}
    >
      {props.children}
    </AuthorContext.Provider>
  );
};

export { AuthorProvider, AuthorContext };
