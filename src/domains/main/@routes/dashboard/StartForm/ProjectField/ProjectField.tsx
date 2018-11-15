import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { SelectField } from 'src/components/SelectField';

export interface IProjectFieldProps extends WrappedFieldProps {
  className?: string;
  getValue?: (value: any) => any;
  getLabel?: (value: any) => any;
  label?: string;
  name: string;
  items?: Array<{ value: any; label: string }>;
}

export const ProjectFieldJsx: React.StatelessComponent<IProjectFieldProps> = ({
  className,
  input,
  getLabel = (item: any) => item.title,
  getValue = (item: any) => item.id,
  label,
  meta,
  name,
  items,
}) => (
  <SelectField input={input} label={label} meta={meta} className={className}>
    {items && !!items.length
      ? items.map((item: any) => (
          <MenuItem key={item.id} value={getValue(item)}>
            {getLabel(item)}
          </MenuItem>
        ))
      : []}
  </SelectField>
);
