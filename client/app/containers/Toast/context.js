/* eslint-disable no-plusplus */

import React, { useReducer } from 'react';

import { addToast, removeToast } from './action';

import { initialState, toastReducer } from './reducer';

const ToastContext = React.createContext(initialState);

// toast components
const ToastContainer = props => <div className="toast-container" {...props} />;

const Toast = ({ children, onDismiss }) => (
  <div className="toast" onClick={onDismiss}>
    <div className="edge" />
    <div className="content">{children}</div>
  </div>
);

let toastCounter = 0;

const ToastProvider = props => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const add = content => {
    // eslint-disable-next-line no-undef
    const id = toastCounter++;
    const toast = { content, id };
    dispatch(addToast(toast));
  };

  const remove = id => {
    const index = state.toasts.findIndex(t => t.id === id);

    dispatch(removeToast(index));
  };

  const onDismiss = id => () => remove(id);

  return (
    <ToastContext.Provider value={{ add, remove }}>
      <ToastContainer>
        {state.toasts.map(({ content, id, ...rest }) => (
          <Toast key={id} Toast={Toast} onDismiss={onDismiss(id)} {...rest}>
            {content}
          </Toast>
        ))}
      </ToastContainer>
      {props.children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
