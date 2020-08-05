import React from 'react';

import Input from '@components/input';

const InputField = ({ input, meta, ...rest }) => {
  const isError = meta.invalid;
  return (
    <Input
      error={isError && meta.touched}
      helperText={isError && meta.touched ? meta.error : undefined}
      {...rest}
      {...input}
    />
  );
};

export default InputField;
