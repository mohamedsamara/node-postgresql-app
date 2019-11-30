import update from 'immutability-helper';

import { FETCH_BOOKS, ADD_BOOK } from './constant';

const initialState = {
  books: [],
};

const bookReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FETCH_BOOKS:
      newState = update(state, {
        books: {
          $set: action.payload,
        },
      });
      return newState;
    case ADD_BOOK:
      newState = update(state, {
        books: {
          $unshift: [action.payload],
        },
      });
      return newState;
    default:
      return state;
  }
};

export { initialState, bookReducer };
