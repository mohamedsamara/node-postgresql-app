import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { NavLink } from 'react-router-dom';

import { AuthorContext } from '../../containers/Author/context';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: red[500],
  },
  menuLink: {
    display: 'block',
    color: `${theme.palette.text.primary}`,
    textDecoration: 'none',
  },
}));

const AuthorList = () => {
  const context = useContext(AuthorContext);
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {context.state.authors.map((author, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <NavLink
            to={`/author/${author.id}`}
            activeClassName="active-link"
            className={classes.menuLink}
            exact
          >
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {author.name.charAt(0)}
                  </Avatar>
                }
                title={author.name}
              />
            </Card>
          </NavLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default AuthorList;
