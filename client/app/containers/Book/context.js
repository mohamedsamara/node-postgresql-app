import React from 'react';

import { initialState } from './reducer';

const BookContext = React.createContext(initialState);

export default BookContext;
