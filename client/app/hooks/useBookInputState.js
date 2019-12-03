import { useState } from 'react';

const initialValue = {
  title: '',
  price: 0,
  description: '',
};

export default () => {
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
