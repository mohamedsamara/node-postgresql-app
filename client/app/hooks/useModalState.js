import { useState } from 'react';

export default initialValue => {
  const [open, setValue] = useState(initialValue);

  return {
    open,
    setOpen: value => {
      setValue(value);
    },
  };
};
