import React from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextFieldBase, { TextFieldProps } from '@material-ui/core/TextField';

export const Input: React.FC<TextFieldProps & { icon?: React.ReactNode }> = ({
  className,
  error,
  icon,
  InputProps = {},
  InputLabelProps = {},
  ...rest
}): JSX.Element => {
  return (
    <TextFieldBase
      InputProps={{
        className,
        startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : undefined,
        ...InputProps,
      }}
      InputLabelProps={InputLabelProps}
      error={error}
      {...rest}
    />
  );
};
