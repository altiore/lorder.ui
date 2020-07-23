import React from 'react';

import classNames from 'classnames';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextFieldBase, { TextFieldProps } from '@material-ui/core/TextField';

import { useStyles } from './styles';

export const Input: React.FC<TextFieldProps & { icon?: React.ReactNode }> = ({
  className,
  error,
  icon,
  InputProps = {},
  ...rest
}): JSX.Element => {
  const { helperTextDefaultError, helperText } = useStyles();
  return (
    <TextFieldBase
      InputProps={{
        className,
        startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : undefined,
        ...InputProps,
      }}
      FormHelperTextProps={{
        classes: {
          root: classNames({
            [helperTextDefaultError]: true,
            [helperText]: !error,
          }),
        },
      }}
      error={error}
      {...rest}
    />
  );
};
