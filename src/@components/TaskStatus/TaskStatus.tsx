import React, { useCallback, useLayoutEffect, useState } from 'react';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';

import { Field } from 'redux-form';

import AssigneeList from './AssigneeList';
import ChangeStatus from './ChangeStatus';
import PerformerField from './PerformerField';
import StartStopBtn from './StartStopBtn';
import StatusField from './StatusField';
import { useStyles } from './styles';

import { IUser } from '@types';

interface ITaskStatus {
  assignees: IUser[];
  isCurrent?: boolean;
  isMine?: boolean;
  onChangeAssignee: (userId: number) => void;
  onStart: (_: any) => void;
  onStop: (_: any) => void;
  statuses: string[];
}

enum POPPER_TYPE {
  ASSIGNEE_LIST = 'assignees',
  CHANGE_STATUS = 'statuses',
}

type IPopperType = POPPER_TYPE | null;

let lastPopperType: IPopperType = null;
let nextPopperType: IPopperType = null;

export const TaskStatus: React.FC<ITaskStatus> = React.memo(
  ({ assignees, isCurrent, isMine, onChangeAssignee, onStart, onStop, statuses }) => {
    const classes = useStyles();

    const anchorRef = React.useRef(null);

    const [popperType, setPopperType] = useState<IPopperType>(null);
    useLayoutEffect(() => {
      if (lastPopperType && popperType && lastPopperType !== popperType) {
        setPopperType(null);
        nextPopperType = popperType;
      }
      if (popperType === null && nextPopperType) {
        setPopperType(nextPopperType);
        nextPopperType = null;
      }
      lastPopperType = popperType;
    }, [popperType, setPopperType]);

    const handleMenuItemClick = useCallback(
      event => {
        onChangeAssignee(event.target.value);
        setPopperType(null);
      },
      [onChangeAssignee, setPopperType]
    );

    const changeStatusToggle = useCallback(
      e => {
        e.stopPropagation();
        setPopperType(poperType => (poperType === POPPER_TYPE.CHANGE_STATUS ? null : POPPER_TYPE.CHANGE_STATUS));
      },
      [setPopperType]
    );

    const assigneeListToggle = useCallback(
      e => {
        e.stopPropagation();
        setPopperType(poperType => (poperType === POPPER_TYPE.ASSIGNEE_LIST ? null : POPPER_TYPE.ASSIGNEE_LIST));
      },
      [setPopperType]
    );

    const handleClose = useCallback(() => {
      setPopperType(null);
    }, [setPopperType]);

    const open = Boolean(popperType);
    return (
      <div className={classes.wrapper}>
        <ClickAwayListener onClickAway={handleClose}>
          <div className={classes.taskStatus} ref={anchorRef}>
            <Field name="status" component={StatusField} changeStatusToggle={changeStatusToggle} statuses={statuses} />
            <Field
              name="performerId"
              component={PerformerField}
              assigneeListToggle={assigneeListToggle}
              open={open}
              assignees={assignees}
            />
            <Popper open={open} anchorEl={anchorRef.current} transition style={{ zIndex: 1303 }}>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <div id="menu-list-grow">
                    {popperType === POPPER_TYPE.ASSIGNEE_LIST && (
                      <AssigneeList assignees={assignees} onItemClick={handleMenuItemClick} />
                    )}
                    {popperType === POPPER_TYPE.CHANGE_STATUS && <ChangeStatus />}
                  </div>
                </Grow>
              )}
            </Popper>
          </div>
        </ClickAwayListener>
        {isMine && <StartStopBtn isStarted={isCurrent} onStart={onStart} onStop={onStop} />}
      </div>
    );
  }
);
