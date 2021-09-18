import React, { useMemo } from 'react';

import uniqueId from 'lodash/uniqueId';
import { WrappedFieldProps } from 'redux-form';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select, { SelectProps } from '@material-ui/core/Select';

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
  const prepItems = useMemo(() => {
    return Array.isArray(items) ? items : Object.keys(items).map(key => ({ name: key, id: items[key] }));
  }, [items]);

  const id = uniqueId();
  const labelId = `${input.name}-${id}-select-field-label`;
  const isError = Boolean(touched && error);
  console.log('items is', {
    items,
    prepItems,
  });
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
        onChange={input.onChange}
        onBlur={input.onBlur}
        labelId={labelId}
        label={label}
        id={id}
        {...(custom as any)}
      >
        {prepItems.map(item => {
          const val = getId(item);
          console.log('value is', {
            val,
          });
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
