import { useState } from 'react';

export default () => {
  const [option, setValue] = useState(null);

  return {
    option,
    setOption: value => {
      setValue(value);
    },
  };
};
