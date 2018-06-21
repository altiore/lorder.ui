import MaterialTextField from '@material-ui/core/TextField';
import * as React from 'react';

export const TextField = (props: any) => {
  const {
    input,
    label,
    meta: { touched, error },
    ...custom
  } = props;
  return React.createElement(MaterialTextField, {
    error: touched && !!error,
    fullWidth: true,
    helperText: touched && error,
    label: label || input.name,
    margin: "normal",
    placeholder: custom.placeholder || label,
    ...input,
    ...custom,
  });
}