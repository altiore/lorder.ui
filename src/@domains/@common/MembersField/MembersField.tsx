import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, { useCallback, useState } from 'react';
import Popover from 'react-popover';
import { WrappedFieldArrayProps } from 'redux-form';

import PerformerField1 from '@domains/@common/MembersField/PerformerField1';
// import { ListBox } from 'liw-components/ListBox';
import { useStyles } from './styles';

import { IUser } from '@types';

export interface IMembersFieldProps extends WrappedFieldArrayProps {
  patchProjectTask: any;
  taskId: number;
  projectMembers: IUser[];
  children?: (count: number, onClick: () => void) => React.ReactNode;
}

export default function MembersFieldTsx({ children, fields, patchProjectTask, projectMembers }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClick = useCallback(() => setIsOpen(open => !open), [setIsOpen]);

  const classes = useStyles();

  const length = fields.length;

  return (
    <Popover
      preferPlace="below"
      isOpen={isOpen}
      onOuterAction={handleOnClick}
      className={classes.popover}
      enterExitTransitionDurationMs={400}
      body={
        <Paper className={classes.body}>
          <PerformerField1
            fields={fields}
            options={projectMembers.map(el => ({
              label: el.email,
              value: el.id,
            }))}
          />
        </Paper>
      }
    >
      {children ? children(length, handleOnClick) : <Button onClick={handleOnClick}>{length}</Button>}
    </Popover>
  );
}
