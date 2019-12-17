import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const useStyles = makeStyles(theme => ({
  noData: {
    padding: theme.spacing(3, 2),
    textAlign: 'center',
  },
  icon: {
    color: `${theme.palette.primary.main}`,
    fontSize: '40px',
    marginBottom: theme.spacing(1),
  },
}));

const NoData = ({ details }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.noData}>
      <LibraryBooksIcon className={classes.icon} />
      <Typography component="p"> {details}</Typography>
    </Paper>
  );
};

export default NoData;
