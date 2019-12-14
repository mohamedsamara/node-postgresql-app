/* eslint-disable no-plusplus */

import React, { useReducer, useEffect, useRef } from 'react';

import { addToast, removeToast } from './action';

import { initialState, toastReducer } from './reducer';

const ToastContext = React.createContext(initialState);

// toast components
const ToastContainer = props => <div className="toast-container" {...props} />;

const Toast = ({ children, onDismiss, autoDismiss }) => {
  const removeRef = useRef();
  removeRef.current = onDismiss;

  useEffect(() => {
    let id = 0;
    if (autoDismiss) {
      const duration = 5000;
      id = setTimeout(() => removeRef.current(), duration);
    }

    return () => clearTimeout(id);
  }, []);

  return (
    <div className="toast">
      <div className="edge" />
      <div className="content">{children}</div>
      {!autoDismiss && (
        <button className="close" onClick={onDismiss}>
          x
        </button>
      )}
    </div>
  );
};

let toastCounter = 0;

const ToastProvider = props => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const { children, autoDismiss } = props;

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
          <Toast
            key={id}
            Toast={Toast}
            onDismiss={onDismiss(id)}
            {...rest}
            autoDismiss={autoDismiss}
          >
            {id}---{content}
          </Toast>
        ))}
      </ToastContainer>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
