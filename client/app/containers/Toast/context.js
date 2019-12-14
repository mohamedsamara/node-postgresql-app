/* eslint-disable no-plusplus */

import React, { useReducer } from 'react';

import { addToast, removeToast } from './action';

import { initialState, toastReducer } from './reducer';

const ToastContext = React.createContext(initialState);

let toastCounter = 0;

const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const add = content => {
    // eslint-disable-next-line no-undef
    const id = toastCounter++;
    const toast = { content, id };
    dispatch(addToast(toast));
  };

  const remove = id => {
    const index = state.toasts.findIndex(t => t.id !== id);

    dispatch(removeToast(index));
  };

  const onDismiss = id => () => remove(id);

  return (
    <ToastContext.Provider value={{ add, onDismiss }}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
