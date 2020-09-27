import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';
import Select from 'react-select';

import useAuthor from '../../containers/Author/useAuthor';
import useBook from '../../containers/Book/useBook';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 560,
    margin: 'auto',
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
    fontSize: 12,
    textTransform: 'capitalize',
    marginTop: theme.spacing(2),
    backgroundColor: '#546e7a',
    color: `${theme.palette.common.white}`,
    '&:hover': {
      color: `${theme.palette.common.black}`,
    },
  },
}));

const Book = () => {
  const authorStore = useAuthor();
  const bookStore = useBook();
  const classes = useStyles();

  const { id } = useParams();

  useEffect(() => {
    bookStore.fetchBookApi(id);
    authorStore.fetchAuthorsListApi();
  }, [id]);

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5">
              {bookStore.state.book.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              {bookStore.state.book.price}$
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
          {bookStore.state.book.description}
        </Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <Select
          name="author"
          className={`basic-multi-select ${classes.dropdown}`}
          classNamePrefix="select"
          options={authorStore.state.authorsList}
          value={bookStore.state.book.author}
          onChange={bookStore.handleBookData}
        />
        <Button
          variant="outlined"
          fullWidth
          className={classes.saveBtn}
          onClick={() => bookStore.updateBookApi(bookStore.state.book)}
        >
          Save Book
        </Button>
      </div>
    </div>
  );
};

export default Book;
