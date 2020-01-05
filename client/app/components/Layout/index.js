import React from 'react';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PeopleIcon from '@material-ui/icons/People';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';

import Footer from '../Footer';
import useDrawerState from '../../hooks/useDrawerState';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: theme.palette.common.white,
  },
  menuTitle: {
    color: `${theme.palette.common.white}!important`,
  },
  menuLink: {
    display: 'block',
    color: `${theme.palette.text.primary}`,
    textDecoration: 'none',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

const Layout = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { open, setOpen } = useDrawerState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="application">
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.menuTitle}>
            Book Store
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <NavLink
            to={'/'}
            activeClassName="active-link"
            className={`${classes.menuLink} menu-link`}
            exact
          >
            <ListItem button key={'Home'}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
          </NavLink>
          <NavLink
            to={'/book/list'}
            activeClassName="active-link"
            className={`${classes.menuLink} menu-link`}
            exact
          >
            <ListItem button key={'Books'}>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary={'Books'} />
            </ListItem>
          </NavLink>
          <NavLink
            to={'/book/add'}
            activeClassName="active-link"
            className={`${classes.menuLink} menu-link`}
            exact
          >
            <ListItem button key={'Add Book'}>
              <ListItemIcon>
                <LibraryAddIcon />
              </ListItemIcon>
              <ListItemText primary={'Add Book'} />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
        <List>
          <NavLink
            to={'/author/list'}
            activeClassName="active-link"
            className={`${classes.menuLink} menu-link`}
            exact
          >
            <ListItem button key={'Authors'}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={'Authors'} />
            </ListItem>
          </NavLink>
          <NavLink
            to={'/author/add'}
            activeClassName="active-link"
            className={`${classes.menuLink} menu-link`}
            exact
          >
            <ListItem button key={'Add Author'}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={'Add Author'} />
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
      <div className="application-content">
        <main className="main">
          <Container maxWidth="md">{props.children}</Container>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
