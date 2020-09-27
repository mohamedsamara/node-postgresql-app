import { useContext } from 'react';

import BookContext from './context';

const useBook = () => useContext(BookContext);

export default useBook;
