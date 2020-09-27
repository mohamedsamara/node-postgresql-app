import React from 'react';

import TextField from '@material-ui/core/TextField';

import useAuthor from '../../containers/Author/useAuthor';

import useAuthorInputState from '../../hooks/useAuthorInputState';

const AddAuthorForm = () => {
  const { value, onChange, reset } = useAuthorInputState();
  const authorStore = useAuthor();

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        authorStore.addAuthorApi(value);
        reset();
      }}
    >
      <TextField
        autoComplete="off"
        autoFocus
        fullWidth
        label="author name"
        placeholder="Author Name"
        margin="normal"
        value={value}
        onChange={onChange}
      />
    </form>
  );
};

export default AddAuthorForm;
