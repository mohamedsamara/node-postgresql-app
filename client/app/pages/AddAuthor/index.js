import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';

import { useHistory } from 'react-router-dom';

import useModalState from '../../hooks/useModalState';
import AddAuthorForm from '../../components/AddAuthorForm';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    width: '300px',
    [theme.breakpoints.up('sm')]: {
      width: '450px',
    },
  },
}));

const AddAuthor = () => {
  const history = useHistory();
  const classes = useStyles();

  const { open, setOpen } = useModalState(true);

  const handleClose = () => {
    setOpen(false);
    history.goBack();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography variant="h6" component="h6">
            Add Author
          </Typography>
          <AddAuthorForm />
        </div>
      </Fade>
    </Modal>
  );
};

export default AddAuthor;
