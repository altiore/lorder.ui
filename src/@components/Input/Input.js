import InputAdornment from '@material-ui/core/InputAdornment';
import TextFieldBase from '@material-ui/core/TextField';
import React from 'react';

const Input = ({ className, icon, InputProps = {}, ...rest }) => {
  return (
    <TextFieldBase
      variant="outlined"
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
