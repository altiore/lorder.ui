import React, { useCallback, useEffect } from 'react';

import { WrappedFieldProps } from 'redux-form';

import { TextFieldProps } from '@material-ui/core/TextField';

import Input from '@components/input';

const InputField: React.FC<WrappedFieldProps & TextFieldProps & { icon?: React.ReactNode }> = ({
  input,
  meta,
  type,
  defaultValue,
  ...rest
}) => {
  const { value, onChange, onBlur } = input;
  useEffect(() => {
    if ((typeof value === 'undefined' || value === null) && typeof defaultValue !== 'undefined') {
      onChange(defaultValue);
    }
  }, [value, defaultValue, onChange]);

  const handleChange = useCallback(
    evt => {
      let val = evt.target.value;
      val = type === 'number' && val ? Number(val) : val;
      if (val === '') {
        val = null;
      }
      onChange(val);
    },
    [onChange, type]
  );

  const handleOnBlur = useCallback(
    evt => {
      let val = evt.target.value;
      val = type === 'number' && val ? Number(val) : val;
      if (val === '') {
        val = null;
      }
      onBlur(evt);
      onChange(val);
    },
    [onBlur, onChange, type]
  );

  const isError = meta.invalid;

  return (
    <Input
      error={isError && meta.touched}
      helperText={isError && meta.touched ? meta.error : undefined}
      type={type}
      {...rest}
      {...{
        ...input,
        onBlur: handleOnBlur,
        onChange: handleChange,
      }}
    />
  );
};

export default InputField;
