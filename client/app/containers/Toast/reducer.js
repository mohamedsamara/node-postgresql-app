import update from 'immutability-helper';

import { ADD_TOAST, REMOVE_TOAST } from './constant';

const initialState = {
  toasts: [],
  id: 0,
};

const toastReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_TOAST:
      newState = update(state, {
        toasts: {
          $unshift: [action.payload],
        },
      });

      return newState;

    case REMOVE_TOAST:
      newState = update(state, {
        toasts: {
          $splice: [[action.payload, 1]],
        },
      });
      return newState;

    default:
      return state;
  }
};

export { initialState, toastReducer };
