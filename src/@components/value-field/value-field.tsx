import React from 'react';

import { WrappedFieldProps } from 'redux-form';

import ValueTsx from '@components/value';
import { IValueProps } from '@components/value/value';

export const ValueFieldTsx: React.FC<WrappedFieldProps & IValueProps> = ({ input, size }): JSX.Element => {
  return <ValueTsx size={size}>{input.value}</ValueTsx>;
};
