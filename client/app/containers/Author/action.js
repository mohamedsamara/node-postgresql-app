import {
  FETCH_AUTHORS,
  ADD_AUTHOR,
  FETCH_AUTHOR,
  FETCH_AUTHOR_LIST,
} from './constant';

export const fetchAuthors = authors => {
  return {
    type: FETCH_AUTHORS,
    payload: authors,
  };
};

export const addAuthor = author => {
  return {
    type: ADD_AUTHOR,
    payload: author,
  };
};

export const fetchAuthor = author => {
  return {
    type: FETCH_AUTHOR,
    payload: author,
  };
};

export const fetchAuthorsList = authors => {
  return {
    type: FETCH_AUTHOR_LIST,
    payload: authors,
  };
};
