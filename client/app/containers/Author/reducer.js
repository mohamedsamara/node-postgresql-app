import update from 'immutability-helper';

import {
  FETCH_AUTHORS,
  ADD_AUTHOR,
  DELETE_AUTHOR,
  FETCH_AUTHOR,
  FETCH_AUTHOR_LIST,
  HANDLE_AUTHOR,
} from './constant';

const initialState = {
  authors: [],
  author: {},
  authorsList: [],
};

const authorReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FETCH_AUTHORS:
      newState = update(state, {
        authors: {
          $set: action.payload,
        },
      });
      return newState;

    case ADD_AUTHOR:
      newState = update(state, {
        authors: {
          $unshift: [action.payload],
        },
      });
      return newState;

    case DELETE_AUTHOR:
      newState = update(state, {
        authors: {
          $splice: [[action.payload, 1]],
        },
      });
      return newState;

    case FETCH_AUTHOR:
      newState = update(state, {
        author: {
          $set: action.payload,
        },
      });
      return newState;

    case FETCH_AUTHOR_LIST:
      newState = update(state, {
        authorsList: {
          $set: action.payload,
        },
      });
      return newState;

    case HANDLE_AUTHOR:
      newState = update(state, {
        author: {
          books: {
            $set: action.payload,
          },
        },
      });

      return newState;

    default:
      return state;
  }
};

export { initialState, authorReducer };
