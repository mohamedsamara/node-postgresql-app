import React, { useReducer } from 'react';

import axios from 'axios';
import { useSnackbar } from 'react-snackbar-messages';

import {
  fetchAuthors,
  addAuthor,
  deleteAuthor,
  fetchAuthor,
  fetchAuthorsList,
  handleAuthor,
} from './action';

import { initialState, authorReducer } from './reducer';
import AuthorContext from './context';

const AuthorProvider = props => {
  const [state, dispatch] = useReducer(authorReducer, initialState);
  const snackbar = useSnackbar();

  const handleAuthorErrors = error => {
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

  // add author api
  const addAuthorApi = async authorData => {
    try {
      const response = await axios.post(`/api/author`, { name: authorData });

      const author = response.data.data;

      if (author) {
        dispatch(addAuthor(author));

        snackbar.add(`${response.data.message}`, {
          appearance: 'info',
          autoDismiss: true,
          delay: 1000,
        });
      }
    } catch (error) {
      handleAuthorErrors(error);
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
      handleAuthorErrors(error);
    }
  };

  // update author api
  const updateAuthorApi = async authorData => {
    let newAuthorData;
    const updatedAuthor = { ...authorData };

    if (authorData.books) {
      newAuthorData = authorData.books.map(book => {
        return book.value;
      });

      updatedAuthor.books = [...newAuthorData];
    } else {
      updatedAuthor.books = [];
    }

    try {
      await Promise.all([
        axios.put(`/api/author/${updatedAuthor.id}`, updatedAuthor),
        axios.put(`/api/author/${updatedAuthor.id}/book`, updatedAuthor),
      ]);
    } catch (error) {
      handleAuthorErrors(error);
    }
  };

  // delete author api
  const deleteAuthorApi = async (index, id) => {
    try {
      const response = await axios.delete(`/api/author/${id}`);

      if (response.status === 200) {
        dispatch(deleteAuthor(index));
        return snackbar.add(`${response.data.message}`, {
          appearance: 'info',
          autoDismiss: true,
          delay: 1000,
        });
      }

      throw new Error(response.error);
    } catch (error) {
      handleAuthorErrors(error);
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
      handleAuthorErrors(error);
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
      handleAuthorErrors(error);
    }
  };

  const handleAuthorData = value => {
    dispatch(handleAuthor(value));
  };

  return (
    <AuthorContext.Provider
      value={{
        state,
        dispatch,
        addAuthorApi,
        deleteAuthorApi,
        fetchAuthorsApi,
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

export default AuthorProvider;
