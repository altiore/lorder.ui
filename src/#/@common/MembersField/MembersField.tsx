import React, { useCallback, useMemo, useState } from 'react';
import Popover from 'react-popover';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';

import { WrappedFieldArrayProps } from 'redux-form';

import { useStyles } from './styles';

import { IUser } from '@types';

export interface IMembersFieldProps extends WrappedFieldArrayProps {
  taskId: number;
  projectMembers: IUser[];
  children?: (count: number, onClick: () => void) => React.ReactNode;
}

export default function MembersFieldTsx({ children, fields, projectMembers }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClick = useCallback(() => setIsOpen(open => !open), [setIsOpen]);

  const classes = useStyles();

  const options = useMemo(() => {
    return projectMembers.map(pm => ({
      label: pm.email,
      value: pm.id,
    }));
  }, [projectMembers]);

  const handleChange = useCallback(
    event => {
      console.log('event.target', {
        value: event.target.value,
      });
    },
    [fields]
  );

  const length = fields.length;

  return (
    <Select value={fields.getAll()} multiple onChange={handleChange}>
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
