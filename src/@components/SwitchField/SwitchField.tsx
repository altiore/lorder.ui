import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { WrappedFieldProps } from 'redux-form';

export interface ISwitchFieldProps extends WrappedFieldProps {
  label: string;
  on: any;
  off: any;
}

export const SwitchField: React.FC<ISwitchFieldProps> = ({ input, label, on, off }) => {
  const handleProjectType = (event: any) => {
    input.onChange(event.target.checked ? on : off);
  };

  return (
    <FormControlLabel
      label={label}
      control={<Switch name={input.name} color="primary" checked={input.checked} onChange={handleProjectType} />}
    />
  );
};
