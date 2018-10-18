import Select from '@material-ui/core/Select';
import * as React from 'react';
import { WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';

const onChange = (input: WrappedFieldInputProps) => (event: React.ChangeEvent<HTMLSelectElement>) =>
  input.onChange(event.target.value);

export const SelectField = ({
  input,
  meta: { touched, error },
  children,
  ...custom
}: WrappedFieldProps & { children: React.ComponentType }) => (
  <Select error={touched && error} {...input} onChange={onChange(input)} children={children} {...custom} />
);
