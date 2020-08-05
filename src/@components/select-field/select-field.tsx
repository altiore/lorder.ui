import React from 'react';

import uniqueId from 'lodash/uniqueId';
import { WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const onChange = (input: WrappedFieldInputProps) => (event: React.ChangeEvent<HTMLSelectElement>) =>
  input.onChange(event.target.value);

export interface ISelectFieldProps extends WrappedFieldProps {
  items: any[];
  children: React.ReactNode | JSX.Element;
  label: React.ReactNode | JSX.Element;
  fullWidth?: boolean;
}

export const SelectField = ({
  fullWidth = true,
  input,
  items,
  meta: { touched, error },
  label,
  ...custom
}: ISelectFieldProps) => {
  const id = uniqueId();
  const labelId = `${input.name}-${id}-select-field-label`;
  const isError = Boolean(touched && error);
  return (
    <FormControl variant="outlined" error={isError} fullWidth={fullWidth}>
      {label && (
        <InputLabel htmlFor={id} id={labelId}>
          {label}
        </InputLabel>
      )}
      <Select
        {...(input as any)}
        value={input.value || ''}
        error={isError}
        onChange={onChange(input) as any}
        labelId={labelId}
        label={label}
        id={id}
        {...(custom as any)}
      >
        {(Array.isArray(items) ? items : Object.keys(items).map(key => ({ name: items[key], id: key }))).map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
