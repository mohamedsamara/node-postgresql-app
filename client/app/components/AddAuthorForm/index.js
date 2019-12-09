import React, { useContext } from 'react';

import TextField from '@material-ui/core/TextField';

import { AuthorContext } from '../../containers/Author/context';

import useAuthorInputState from '../../hooks/useAuthorInputState';

const AddAuthorForm = () => {
  const { value, onChange, reset } = useAuthorInputState();
  const context = useContext(AuthorContext);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        context.addAuthorApi(value);
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
