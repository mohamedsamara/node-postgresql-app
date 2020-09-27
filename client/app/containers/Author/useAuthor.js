import { useContext } from 'react';

import AuthorContext from './context';

const useAuthor = () => useContext(AuthorContext);

export default useAuthor;
