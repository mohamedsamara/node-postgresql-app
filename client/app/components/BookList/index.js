import React, { useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

import Empty from '../Empty';

import { BookContext } from '../../containers/Book/context';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  deleteBtn: {
    fontSize: 12,
    backgroundColor: '#f44336',
    color: `${theme.palette.common.white}`,
  },
  editLink: {
    display: 'block',
    color: `${theme.palette.text.primary}`,
    margin: theme.spacing(1),
  },
  authorLink: {
    color: `${theme.palette.text.primary}`,
    textDecoration: 'none',
  },
  emptyBooks: {
    padding: theme.spacing(3, 2),
  },
}));

const BookList = () => {
  const context = useContext(BookContext);
  const classes = useStyles();

  // The effect depends on no variables, so it is only triggered when the component mounts.
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let subscribe = false;

    if (context.state.books) {
      subscribe = true;
      context.fetchBooksApi();
    }

    return () => {
      subscribe = false;
    };
  }, []);

  return (
    <Grid container spacing={3}>
      {context.state.books.length > 0 ? (
        context.state.books.map((book, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {(book.author && book.author.name.charAt(0)) || 'R'}
                  </Avatar>
                }
                action={
                  <Link to={`/book/${book.id}`} className={classes.editLink}>
                    <EditIcon size="small" />
                  </Link>
                }
                title={book.title}
                subheader={new Date(book.createdAt).toLocaleString()}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  display="inline"
                >
                  {`${book.title} `}
                </Typography>

                {book.author && (
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    component="span"
                    display="inline"
                  >
                    <strong>by</strong>
                    <Link
                      to={`/author/${book.author.id}`}
                      className={classes.authorLink}
                    >
                      {` ${book.author.name}`}
                    </Link>
                  </Typography>
                )}
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: book.isCardOpen,
                  })}
                  onClick={() =>
                    context.dispatch(context.toggleBookCard(index))
                  }
                  aria-expanded={book.isCardOpen}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={book.isCardOpen} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>{book.description}</Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    className={classes.deleteBtn}
                    startIcon={<DeleteIcon />}
                    onClick={() => context.deleteBookApi(index, book.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sm={12} md={12}>
          <Empty details={'It looks like there is no books added yet.'} />
        </Grid>
      )}
    </Grid>
  );
};

export default BookList;
