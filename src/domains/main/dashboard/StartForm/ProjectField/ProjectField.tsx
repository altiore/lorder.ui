import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';
import { Field } from 'redux-form';

import { SelectField } from 'src/domains/@common/SelectField';

export interface IProjectFieldProps {
  className?: string;
  getValue?: (value: any) => any;
  getLabel?: (value: any) => any;
  name: string;
  validate?: any[];
  items?: Array<{ value: any; label: string }>;
}

export const ProjectFieldJsx: React.StatelessComponent<IProjectFieldProps> = ({
  className,
  getLabel = (item: any) => item.title,
  getValue = (item: any) => item.id,
  name,
  items,
  validate,
}) => (
  <Field name={name} component={SelectField} validate={validate} className={className}>
    {items &&
      !!items.length &&
      items.map((item: any) => (
        <MenuItem key={item.id} value={getValue(item)}>
          {getLabel(item)}
        </MenuItem>
      ))}
  </Field>
);
