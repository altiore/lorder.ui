import React, { useCallback, useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Tooltip from '@material-ui/core/Tooltip';

import { useStyles } from './styles';
import { ROLE } from '../../../../@types';

export interface IRightMenuProps {
  logOut: any;
  push: (path: string) => void;
  userAvatar: any;
  userEmail: any;
  userRole: any;
}

export interface IRightMenuState {
  open: boolean;
}

export const RightMenuTsx: React.FC<IRightMenuProps> = ({ logOut, push, userAvatar, userEmail, userRole }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen(o => !o);
  }, [setOpen]);

  const [anchorEl, setAnchorEl] = useState();
  const handleClose = useCallback(
    (event: React.SyntheticEvent) => {
      if (anchorEl.contains(event.target)) {
        return;
      }
      setOpen(false);
    },
    [anchorEl, setOpen]
  );

  const goToProfile = useCallback(
    (event: React.SyntheticEvent) => {
      handleClose(event);
      push('/profile');
    },
    [handleClose, push]
  );

  const goToAdminPanel = useCallback(
    (event: React.SyntheticEvent) => {
      handleClose(event);
      push('/users');
    },
    [handleClose, push]
  );

  const elId = 'header-right-menu';
  return (
    <div className={classes.root}>
      <ButtonBase
        aria-owns={open ? elId : undefined}
        aria-haspopup="true"
        buttonRef={setAnchorEl}
        className={classes.avatarButton}
        onClick={handleToggle}
      >
        <Avatar alt={userEmail} src={userAvatar || '/d-avatar.png'} className={classes.avatar} />
      </ButtonBase>
      <Popper open={open} anchorEl={anchorEl} transition className={classes.menu}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper id={elId} className={classes.menuPaper}>
              <ClickAwayListener onClickAway={handleClose as any}>
                <MenuList>
                  <MenuItem onClick={goToProfile} className={classes.item}>
                    Профиль
                  </MenuItem>
                  {userRole === ROLE.SUPER_ADMIN && (
                    <MenuItem onClick={goToAdminPanel} className={classes.item}>
                      Админ Панель
                    </MenuItem>
                  )}
                  <Tooltip
                    title={
                      <div>
                        <p>Вы вошли как: {`${userEmail} (${userRole})`}</p>
                        <p>Нажмите, чтобы выйти</p>
                      </div>
                    }
                  >
                    <MenuItem onClick={logOut} className={classes.item}>
                      Выйти
                    </MenuItem>
                  </Tooltip>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
