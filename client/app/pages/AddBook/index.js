import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { useHistory } from 'react-router-dom';

import useModalState from '../../hooks/useModalState';
import AddBookForm from '../../components/AddBookForm';

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

const AddBook = () => {
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
          <h2 id="transition-modal-title">Add Book</h2>
          <AddBookForm />
        </div>
      </Fade>
    </Modal>
  );
};

export default AddBook;
