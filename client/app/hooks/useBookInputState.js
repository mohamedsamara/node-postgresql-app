import { useState } from 'react';

export default initialValue => {
  const [values, setValues] = useState(initialValue);

  return {
    values,
    onChange: event => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    },
    reset: () => {
      setValues(initialValue);
    },
  };
};
