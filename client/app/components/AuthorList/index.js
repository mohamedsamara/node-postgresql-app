import React, { useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { red } from '@material-ui/core/colors';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Link } from 'react-router-dom';

import NoData from '../NoData';

import { AuthorContext } from '../../containers/Author/context';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: red[500],
  },
  authorLink: {
    display: 'block',
    color: `${theme.palette.text.primary}`,
    textDecoration: 'none',
  },
  deleteBtnText: {
    fontSize: 12,
    textTransform: 'capitalize',
    cursor: 'pointer',
  },
  deleteDetails: {
    fontSize: 12,
    marginBottom: 4,
  },
  deleteBtn: {
    fontSize: 12,
    backgroundColor: '#f44336',
    color: `${theme.palette.common.white}`,
  },
  emptyAuthors: {
    padding: theme.spacing(3, 2),
  },
}));

const AuthorList = () => {
  const context = useContext(AuthorContext);
  const classes = useStyles();

  // The effect depends on no variables, so it is only triggered when the component mounts.
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let subscribe = false;

    if (context.state.authors) {
      context.fetchAuthorsApi();
    }

    return () => {
      subscribe = false;
    };
  }, []);

  return (
    <Grid container spacing={3}>
      {context.state.authors.length > 0 ? (
        context.state.authors.map((author, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card>
              <Link to={`/author/${author.id}`} className={classes.authorLink}>
                <CardHeader
                  className={classes.cardHeader}
                  avatar={
                    <Avatar aria-label={author.name} className={classes.avatar}>
                      {author.name.charAt(0)}
                    </Avatar>
                  }
                  title={author.name}
                />
              </Link>
              <CardActions disableSpacing>
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {popupState => (
                    <div>
                      <Button
                        {...bindTrigger(popupState)}
                        className={classes.deleteBtnText}
                        tabIndex={0}
                      >
                        Delete this author?
                      </Button>
                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        <Box p={2}>
                          <Typography
                            className={classes.deleteDetails}
                            component="p"
                          >
                            Deleting this author will delete their associated
                            books?
                          </Typography>
                          <Button
                            variant="contained"
                            fullWidth
                            className={classes.deleteBtn}
                            startIcon={<DeleteIcon />}
                            onClick={() =>
                              context.deleteAuthorApi(index, author.id)
                            }
                          >
                            Delete
                          </Button>
                        </Box>
                      </Popover>
                    </div>
                  )}
                </PopupState>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sm={12} md={12}>
          <NoData details={'It looks like there is no authors added yet.'} />
        </Grid>
      )}
    </Grid>
  );
};

export default AuthorList;
