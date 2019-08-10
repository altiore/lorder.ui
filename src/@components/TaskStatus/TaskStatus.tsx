import React, { useCallback, useLayoutEffect, useState } from 'react';

import { Avatar, Button, ButtonBase, ClickAwayListener, Grow, Popper } from '@material-ui/core';

import AssigneeList from './AssigneeList';
import ChangeStatus from './ChangeStatus';
import StartStopBtn from './StartStopBtn';
import { useStyles } from './styles';

interface ITaskStatus {
  isMine?: boolean;
  onChangeAssignee: (userId: number) => void;
}

enum POPPER_TYPE {
  ASSIGNEE_LIST = 'assignees',
  CHANGE_STATUS = 'statuses',
}

type IPopperType = POPPER_TYPE | null;

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

let lastPopperType: IPopperType = null;
let nextPopperType: IPopperType = null;

export const TaskStatus: React.FC<ITaskStatus> = React.memo(({ isMine, onChangeAssignee }) => {
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
          <Button className={classes.button} variant="outlined" aria-label="split button" onClick={changeStatusToggle}>
            В процессе
          </Button>
          <ButtonBase
            className={classes.avatarWrapper}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={assigneeListToggle}
          >
            <Avatar className={classes.avatar}>TC</Avatar>
          </ButtonBase>
          <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <div id="menu-list-grow">
                  {popperType === POPPER_TYPE.ASSIGNEE_LIST && (
                    <AssigneeList options={options} onItemClick={handleMenuItemClick} />
                  )}
                  {popperType === POPPER_TYPE.CHANGE_STATUS && <ChangeStatus />}
                </div>
              </Grow>
            )}
          </Popper>
        </div>
      </ClickAwayListener>
      {isMine && <StartStopBtn />}
    </div>
  );
});
