import update from 'immutability-helper';

import {
  FETCH_BOOKS,
  ADD_BOOK,
  DELETE_BOOK,
  TOGGLE_BOOK_CARD,
} from './constant';

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

    case DELETE_BOOK:
      newState = update(state, {
        books: {
          $splice: [[action.payload, 1]],
        },
      });
      return newState;

    case TOGGLE_BOOK_CARD:
      const book = state.books[action.payload];
      newState = update(state, {
        books: {
          [action.payload]: {
            isCardOpen: {
              $set: !book.isCardOpen,
            },
          },
        },
      });
      return newState;

    default:
      return state;
  }
};

export { initialState, bookReducer };
