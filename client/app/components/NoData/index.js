import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  noData: {
    padding: theme.spacing(3, 2),
  },
}));

const NoData = ({ details }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.noData}>
      <Typography component="p"> {details}</Typography>
    </Paper>
  );
};

export default NoData;
