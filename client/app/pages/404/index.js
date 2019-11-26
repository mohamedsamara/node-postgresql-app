import React from 'react';

import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const page404 = () => {
  return (
    <div className="page404">
      <Typography noWrap variant="body1">
        The page you are looking for was not found{' '}
        <Link to="/">Back To Home Page</Link>
      </Typography>
    </div>
  );
};

export default page404;
