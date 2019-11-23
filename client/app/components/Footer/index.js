import React from 'react';

import Typography from '@material-ui/core/Typography';

const Footer = () => {
  return (
    <div className="footer">
      <Typography noWrap variant="caption">
        © {`${new Date().getFullYear()} `}
        Book Store
      </Typography>
    </div>
  );
};

export default Footer;
