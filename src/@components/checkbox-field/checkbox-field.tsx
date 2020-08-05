import React from 'react';

import uniqueId from 'lodash/uniqueId';
import { WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';

import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const onChange = (input: WrappedFieldInputProps) => (event: React.ChangeEvent<HTMLSelectElement>) =>
  input.onChange(event.target.value);

export interface ISelectFieldProps extends WrappedFieldProps {
  items: any[];
  children: React.ReactNode | JSX.Element;
  label: React.ReactNode | JSX.Element;
  fullWidth?: boolean;
}

export const CheckboxField = ({
  fullWidth = true,
  input,
  items,
  meta: { touched, error },
  label,
  ...custom
}: ISelectFieldProps) => {
  const id = uniqueId();
  const isError = Boolean(touched && error);
  return (
    <FormControl variant="outlined" error={isError} fullWidth={fullWidth}>
      <FormControlLabel
        control={
          <Checkbox
            {...(input as any)}
            value={input.value || ''}
            onChange={onChange(input) as any}
            label={label}
            id={id}
            {...(custom as any)}
          />
        }
        label={label || input.name}
      />
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
