import React, { useCallback, useState } from 'react';
import Popover from 'react-popover';

import { WrappedFieldProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { useStyles } from './styles';

import { IUser } from '@types';

// import { ListBox } from 'liw-components/ListBox';

export interface IPerformerFieldProps extends WrappedFieldProps {
  taskId: number;
  projectMembers: IUser[];
  children?: (count: number, onClick: () => void) => React.ReactNode;
}

export default function PerformerFieldTsx({ children, input, projectMembers }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClick = useCallback(() => setIsOpen(open => !open), [setIsOpen]);

  const classes = useStyles();

  const length = input.value.length || '0';

  return (
    <Popover
      preferPlace="below"
      isOpen={isOpen}
      onOuterAction={handleOnClick}
      className={classes.popover}
      enterExitTransitionDurationMs={400}
      body={<Paper className={classes.body}>test</Paper>}
    >
      {children ? children(length, handleOnClick) : <Button onClick={handleOnClick}>{length}</Button>}
    </Popover>
  );
}
