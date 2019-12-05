import React, { useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';
import Select from 'react-select';

import { BookContext } from '../../containers/Book/context';
import { AuthorContext } from '../../containers/Author/context';

import useAuthorsListState from '../../hooks/useAuthorsListState';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
  saveBtn: {
    marginTop: theme.spacing(2),
    backgroundColor: '#546e7a',
    color: `${theme.palette.common.white}`,
    '&:hover': {
      color: `${theme.palette.common.black}`,
    },
  },
}));

const Book = () => {
  const context = useContext(BookContext);
  const authorContext = useContext(AuthorContext);

  const { option, setOption } = useAuthorsListState();

  const classes = useStyles();

  const { id } = useParams();

  useEffect(() => {
    context.fetchBookApi(id);
    authorContext.fetchAuthorsListApi();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5">
              {context.state.book.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              {context.state.book.price}$
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
          {context.state.book.description}
        </Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <Select
          name="author"
          className={`basic-multi-select ${classes.dropdown}`}
          classNamePrefix="select"
          options={authorContext.state.authorsList}
          value={
            option ||
            authorContext.state.authorsList.filter(
              x => x.value === context.state.book.author_id,
            )
          }
          onChange={setOption}
        />
        <Button
          variant="outlined"
          fullWidth
          className={classes.saveBtn}
          onClick={() => context.updateBookApi(context.state.book.id, option)}
        >
          Save Book
        </Button>
      </div>
    </div>
  );
};

export default Book;
