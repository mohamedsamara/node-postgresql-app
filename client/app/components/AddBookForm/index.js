import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import { BookContext } from '../../containers/Book/context';

import useBookInputState from '../../hooks/useBookInputState';

const useStyles = makeStyles(theme => ({
  saveBtn: {
    marginTop: theme.spacing(2),
  },
}));

const AddBookForm = () => {
  const classes = useStyles();
  const { values, onChange, reset } = useBookInputState();
  const context = useContext(BookContext);

  const handleSubmit = event => {
    event.preventDefault();
    context.addBookApi(values);
    reset();
  };

  return (
    <form>
      <TextField
        autoComplete="off"
        autoFocus
        fullWidth
        label="book title"
        name="title"
        placeholder="Book Name"
        margin="normal"
        value={values.title}
        onChange={onChange}
      />
      <TextField
        fullWidth
        multiline
        rowsMax="4"
        label="book description"
        name="description"
        placeholder="Book Description"
        margin="normal"
        value={values.description}
        onChange={onChange}
      />

      <TextField
        autoComplete="off"
        fullWidth
        label="book price"
        name="price"
        placeholder="Book Price"
        onChange={onChange}
        margin="normal"
        value={values.price}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        className={classes.saveBtn}
        onClick={handleSubmit}
      >
        Save Book
      </Button>
    </form>
  );
};

export default AddBookForm;
