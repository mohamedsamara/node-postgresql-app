import React, { useReducer } from 'react';

import axios from 'axios';

import {
  fetchAuthors,
  addAuthor,
  deleteAuthor,
  fetchAuthor,
  fetchAuthorsList,
  handleAuthor,
} from './action';

import { initialState, authorReducer } from './reducer';

import { useToast } from '../Toast';

const AuthorContext = React.createContext(initialState);

const AuthorProvider = props => {
  const [state, dispatch] = useReducer(authorReducer, initialState);
  const { add } = useToast();

  // add author api
  const addAuthorApi = async authorData => {
    try {
      const response = await axios.post(`/api/author`, { name: authorData });

      const author = response.data.data;

      if (author) {
        dispatch(addAuthor(author));
        add(`${response.data.message}`, 'success');
      }
    } catch (error) {
      if (error.response) {
        add(`${error.response.data.message}`, 'error');
      } else {
        add(`${error}`, 'error');
      }
    }
  };

  // fetch author api
  const fetchAuthorApi = async id => {
    try {
      const response = await axios.get(`/api/author/${id}`);

      const author = response.data.data;

      if (author) {
        dispatch(fetchAuthor(author));
        add(`${response.data.message}`, 'success');
      }
    } catch (error) {
      if (error.response) {
        add(`${error.response.data.message}`, 'error');
      } else {
        add(`${error}`, 'error');
      }
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
      const response = await Promise.all([
        axios.put(`/api/author/${updatedAuthor.id}`, updatedAuthor),
        axios.put(`/api/author/${updatedAuthor.id}/book`, updatedAuthor),
      ]);

      if (response[0].status === 200 && response[1].status === 200) {
        add(`${response[0].data.message}`, 'info');
      }
    } catch (error) {
      if (error.response) {
        add(`${error.response.data.message}`, 'error');
      } else {
        add(`${error}`, 'error');
      }
    }
  };

  // delete author api
  const deleteAuthorApi = async (index, id) => {
    try {
      const response = await axios.delete(`/api/author/${id}`);

      if (response.status === 200) {
        dispatch(deleteAuthor(index));
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

  // fetch authors api
  const fetchAuthorsApi = async () => {
    try {
      const response = await axios.get(`/api/author`);

      const authors = response.data.data;

      if (authors) {
        dispatch(fetchAuthors(authors));
      }
    } catch (error) {
      if (error.response) {
        add(`${error.response.data.message}`, 'error');
      } else {
        add(`${error}`, 'error');
      }
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
      if (error.response) {
        add(`${error.response.data.message}`, 'error');
      } else {
        add(`${error}`, 'error');
      }
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

export { AuthorProvider, AuthorContext };
