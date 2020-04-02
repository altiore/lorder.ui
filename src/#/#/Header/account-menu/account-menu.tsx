import React, { FC, KeyboardEvent, MouseEvent, SyntheticEvent, useCallback, useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import SupportIcon from '@material-ui/icons/ContactSupport';
import ExitIcon from '@material-ui/icons/ExitToApp';
// import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SecurityIcon from '@material-ui/icons/Lock';
// import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PersonIcon from '@material-ui/icons/Person';

import { ROLE } from '@types';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    margin: '10px',
  },
  avatarButton: {
    borderRadius: '50%',
  },
  email: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  header: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    flexFlow: 'column nowrap',
    height: 50,
    justifyContent: 'center',
    padding: theme.spacing(1, 2),
  },
  icon: {
    color: theme.palette.primary.light,
  },
  item: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
  },
  menu: {
    zIndex: 1301,
  },
  menuItem: {
    '& svg': {
      marginRight: theme.spacing(1),
    },
    alignItems: 'center',
    display: 'flex',
    height: 40,
    paddingLeft: theme.spacing(1.5),
  },
  menuPaper: {},
  paper: {
    overflow: 'hidden',
    width: 220,
  },
  popper: {
    zIndex: 1201,
  },
  root: {
    display: 'flex',
  },
}));

interface IAccountMenuTsx {
  menuId: string;
  isMenuOpen: boolean;
  onClose: () => void;
  logOut: () => void;
  userAvatar?: string;
  userEmail: string;
  userRole: string;
  push: (v: string) => void;
}

export const AccountMenuTsx: FC<IAccountMenuTsx> = ({
  menuId,
  logOut,
  userAvatar,
  userEmail,
  userRole,
  push,
}): JSX.Element => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen(o => !o);
  }, [setOpen]);

  const [anchorEl, setAnchorEl] = useState();

  const handleClose = useCallback(
    (event: KeyboardEvent | MouseEvent | SyntheticEvent) => {
      if (anchorEl.contains(event.target)) {
        return;
      }
      setOpen(false);
    },
    [anchorEl, setOpen]
  );

  const clickAway = useCallback(
    (event: any) => {
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

  const handleListKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        handleClose(event);
      }
    },
    [handleClose]
  );

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
      <Popper className={classes.popper} open={open} anchorEl={anchorEl} role={undefined} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper id={menuId} className={classes.paper}>
              <ClickAwayListener onClickAway={clickAway}>
                <div>
                  <div className={classes.header}>
                    <Typography className={classes.email} variant="h4" noWrap>
                      {userEmail}
                    </Typography>
                    <Typography variant="subtitle2">{userRole}</Typography>
                  </div>
                  <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                    <MenuItem className={classes.menuItem} onClick={goToProfile}>
                      <PersonIcon className={classes.icon} />
                      <Typography variant="h6">Профиль</Typography>
                    </MenuItem>
                    {userRole === ROLE.SUPER_ADMIN && (
                      <MenuItem className={classes.menuItem} onClick={goToAdminPanel}>
                        <SecurityIcon className={classes.icon} />
                        <Typography variant="h6">Админ Панель</Typography>
                      </MenuItem>
                    )}
                  </MenuList>
                  <Divider />
                  <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                    <MenuItem className={classes.menuItem} onClick={logOut}>
                      <ExitIcon className={classes.icon} />
                      <Typography variant="h6">Выйти</Typography>
                    </MenuItem>
                  </MenuList>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
