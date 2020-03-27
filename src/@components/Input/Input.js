import React from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextFieldBase from '@material-ui/core/TextField';

const Input = ({ className, icon, InputProps = {}, ...rest }) => {
  return (
    <TextFieldBase
      InputProps={{
        startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : undefined,
        className,
        ...InputProps,
      }}
      {...rest}
    />
  );
};

export default Input;
