import React from 'react';

import uniqueId from 'lodash/uniqueId';
import { WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select, { SelectProps } from '@material-ui/core/Select';

const onChange = (input: WrappedFieldInputProps) => (event: React.ChangeEvent<HTMLSelectElement>) =>
  input.onChange(event.target.value);

const defGetId = el => el.id;
const defGetTitle = el => el.name;

export interface ISelectFieldProps extends WrappedFieldProps, SelectProps {
  fullWidth?: boolean;
  input: any;
  items: any[];
  getId: (el: any) => number | string;
  getTitle: (el: any) => string;
  label?: React.ReactNode | JSX.Element;
  labelProps?: object;
}

export const SelectField = ({
  fullWidth = true,
  getId = defGetId,
  getTitle,
  input,
  items,
  meta: { touched, error },
  label,
  labelProps,
  ...custom
}: ISelectFieldProps) => {
  const id = uniqueId();
  const labelId = `${input.name}-${id}-select-field-label`;
  const isError = Boolean(touched && error);
  return (
    <FormControl variant="outlined" error={isError} fullWidth={fullWidth}>
      {label && (
        <InputLabel {...(labelProps || {})} htmlFor={id} id={labelId}>
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
        {(Array.isArray(items) ? items : Object.keys(items).map(key => ({ name: key, id: items[key] }))).map(item => {
          const val = getId(item);
          return (
            <MenuItem key={val} value={val}>
              {(getTitle || defGetTitle)(item)}
            </MenuItem>
          );
        })}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
