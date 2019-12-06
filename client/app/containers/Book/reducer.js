import update from 'immutability-helper';

import {
  FETCH_BOOKS,
  ADD_BOOK,
  DELETE_BOOK,
  TOGGLE_BOOK_CARD,
  FETCH_BOOK,
  FETCH_BOOK_LIST,
  HANDLE_BOOK,
} from './constant';

const initialState = {
  books: [],
  book: {},
  booksList: [],
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

    case FETCH_BOOK:
      newState = update(state, {
        book: {
          $set: action.payload,
        },
      });
      return newState;

    case FETCH_BOOK_LIST:
      newState = update(state, {
        booksList: {
          $set: action.payload,
        },
      });
      return newState;

    case HANDLE_BOOK:
      newState = update(state, {
        book: {
          author: {
            $set: action.payload,
          },
        },
      });
      return newState;

    default:
      return state;
  }
};

export { initialState, bookReducer };
