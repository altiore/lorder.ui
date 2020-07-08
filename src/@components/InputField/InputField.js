import React from 'react';

import Input from '@components/Input';

const InputField = ({ input, meta, ...rest }) => {
  const isError = meta.invalid;
  return <Input error={isError} helperText={isError ? meta.error : undefined} {...rest} {...input} />;
};

export default InputField;
