import React from 'react';

import { WrappedFieldProps } from 'redux-form';

import SelectTree from '@components/select-tree';

export interface IProps<IItem> extends WrappedFieldProps {
  items: (a: any) => IItem[] | IItem[];
  label?: string;
}

export function SelectTreeField<IItem = { id: number | string }>({
  items,
  input,
  label,
  ...rest
}: IProps<IItem>): JSX.Element {
  return (
    <div>
      {Boolean(label) && <label>{label}</label>}
      <SelectTree
        items={typeof items === 'function' ? items(input.value) : items}
        value={input.value}
        onChange={input.onChange}
        multiple={false}
        {...rest}
      />
    </div>
  );
}
