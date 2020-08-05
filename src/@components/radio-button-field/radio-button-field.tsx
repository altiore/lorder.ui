import React from 'react';

import { WrappedFieldProps } from 'redux-form';

import RadioButton from '@components/radio-button';

export interface ISwitchFieldProps extends WrappedFieldProps {
  items: Array<{ title: string; value: any }>;
  label: string;
}

export const RadioButtonField: React.FC<ISwitchFieldProps> = ({ input, items, label, meta }) => {
  const { name, value, onChange } = input;

  return <RadioButton name={name} onChange={onChange} value={value} items={items} label={label} error={meta.error} />;
};
