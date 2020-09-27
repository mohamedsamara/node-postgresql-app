import React from 'react';

import { initialState } from './reducer';

const AuthorContext = React.createContext(initialState);

export default AuthorContext;
