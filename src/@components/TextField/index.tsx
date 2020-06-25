import React from 'react';

import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

import MaterialTextField from '@material-ui/core/TextField';

interface ITextFieldProps {
  input: WrappedFieldInputProps;
  label: string;
  noLabel: boolean;
  meta: WrappedFieldMetaProps;
  [key: string]: any;
}

export const TextField = (props: ITextFieldProps) => {
  const {
    input,
    label,
    noLabel,
    meta: { touched, error },
    ...custom
  } = props;
  return React.createElement(MaterialTextField, {
    error: touched && !!error,
    fullWidth: true,
    helperText: touched && error,
    label: noLabel ? null : label || input.name,
    placeholder: custom.placeholder || label,
    ...input,
    value: typeof input.value === 'undefined' ? '' : input.value,
    ...custom,
  });
};
