import React, { useContext } from 'react';

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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import { BookContext } from '../../containers/Book/context';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
    backgroundColor: '#f44336',
    color: `${theme.palette.common.white}`,
  },
}));

const BookList = () => {
  const context = useContext(BookContext);
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {context.state.books.map((book, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={book.title}
              subheader={new Date(book.createdAt).toLocaleString()}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {book.title}
              </Typography>
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
                onClick={() => context.dispatch(context.toggleBookCard(index))}
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
      ))}
    </Grid>
  );
};

export default BookList;
