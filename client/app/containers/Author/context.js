import React, { useReducer, useEffect } from 'react';

// import { fetchAuthors } from './action';
import { initialState, authorReducer } from './reducer';

const AuthorContext = React.createContext(initialState);

const AuthorProvider = props => {
  const [state, dispatch] = useReducer(authorReducer, initialState);

  useEffect(() => {}, []);
  console.log('state from authors', state);
  console.log('dispatch from authors', dispatch);

  return (
    <AuthorContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthorContext.Provider>
  );
};

export { AuthorProvider, AuthorContext };
