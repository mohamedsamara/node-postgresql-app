import React from 'react';

import TextField from '@material-ui/core/TextField';

import useBookInputState from '../../hooks/useBookInputState';

const AddBookForm = ({ saveBook }) => {
  const { value, onChange, reset } = useBookInputState('');

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        saveBook(value);
        reset();
      }}
    >
      <TextField
        autoFocus
        id="standard-basic"
        fullWidth
        label="Name"
        placeholder="Book Name"
        margin="normal"
        onChange={onChange}
        value={value}
      />
    </form>
  );
};

export default AddBookForm;
