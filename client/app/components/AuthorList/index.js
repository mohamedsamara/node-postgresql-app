import React, { useContext } from 'react';

import { AuthorContext } from '../../containers/Author/context';

const AuthorList = () => {
  const context = useContext(AuthorContext);

  console.log('context from authorlist component', context);
  return <div>AuthorList</div>;
};

export default AuthorList;
