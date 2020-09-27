import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  chips: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const Homepage = () => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <Typography variant="h6" component="h3">
          Book Store.
        </Typography>
        <Typography component="p">Node PostgreSQL Application</Typography>
      </Paper>
      <div className={classes.chips}>
        <Chip
          icon={<DoneIcon fontSize="small" />}
          label="Node Js"
          color="primary"
          variant="outlined"
        />
        <Chip
          icon={<DoneIcon fontSize="small" />}
          label="Express"
          color="primary"
          variant="outlined"
        />
        <Chip
          icon={<DoneIcon fontSize="small" />}
          label="PostgreSQL"
          color="primary"
          variant="outlined"
        />
        <Chip
          icon={<DoneIcon fontSize="small" />}
          label="Sequelize"
          color="primary"
          variant="outlined"
        />
        <Chip
          icon={<DoneIcon fontSize="small" />}
          label="Webpack"
          color="primary"
          variant="outlined"
        />
        <Chip
          icon={<DoneIcon fontSize="small" />}
          label="ESLint"
          color="primary"
          variant="outlined"
        />
        <Chip
          icon={<DoneIcon fontSize="small" />}
          label="React Hooks"
          color="primary"
          variant="outlined"
        />
        <Chip
          icon={<DoneIcon fontSize="small" />}
          label="Material UI"
          color="primary"
          variant="outlined"
        />
      </div>
    </>
  );
};

export default Homepage;
