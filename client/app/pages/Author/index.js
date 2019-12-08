import React, { useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import { useParams } from 'react-router';

import { AuthorContext } from '../../containers/Author/context';
import { BookContext } from '../../containers/Book/context';

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

const Author = () => {
  const context = useContext(AuthorContext);
  const bookContext = useContext(BookContext);

  const classes = useStyles();

  const { id } = useParams();

  useEffect(() => {
    context.fetchAuthorApi(id);
    bookContext.fetchBookListApi();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5">
              {context.state.author.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              <Chip
                className={classes.chip}
                label={`${context.state.author.books &&
                  context.state.author.books.length} books`}
              />
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <Select
          isMulti
          name="books"
          className="basic-multi-select"
          classNamePrefix="select"
          options={bookContext.state.booksList}
          value={context.state.author.books}
          onChange={context.handleAuthorData}
        />
      </div>
      <Button
        variant="outlined"
        fullWidth
        className={classes.saveBtn}
        onClick={() => context.updateAuthorApi(context.state.author)}
      >
        Save Author
      </Button>
    </div>
  );
};

export default Author;
