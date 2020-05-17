import React, { FC, KeyboardEvent, MouseEvent, SyntheticEvent, useCallback, useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExitIcon from '@material-ui/icons/ExitToApp';
import SecurityIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule';

import EnterSvg from './enter-svg';

import { ROLE } from '@types';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    border: '2px solid #faf0b5',
    borderRadius: theme.spacing(3),
    height: theme.spacing(6),
    margin: theme.spacing(0.5),
    width: theme.spacing(6),
  },
  avatarButton: {
    '&:hover': {
      backgroundColor: darken(theme.palette.secondary.dark, 0.5),
    },
    borderRadius: '50%',
  },
  email: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  enterButton: {
    '& svg': {
      color: theme.palette.secondary.main,
      marginRight: theme.spacing(1),
    },
    fontSize: '0.9375rem',
    marginLeft: theme.spacing(3),
  },
  header: {
    backgroundColor: theme.palette.default.light,
    color: theme.palette.default.contrastText,
    display: 'flex',
    flexFlow: 'column nowrap',
    height: 50,
    justifyContent: 'center',
    padding: theme.spacing(1, 2),
  },
  icon: {
    color: theme.palette.default.light,
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
  isAuth: boolean;
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
  isAuth,
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

  const [anchorEl, setAnchorEl] = useState<any>();

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

  const goToMain = useCallback(
    (event: React.SyntheticEvent) => {
      handleClose(event);
      push('/');
    },
    [handleClose, push]
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

  const handleLogIn = useCallback(() => {
    push('/login');
  }, [push]);

  return (
    <div className={classes.root}>
      {isAuth ? (
        <>
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
                        <Typography className={classes.email} variant="h6" noWrap>
                          {userEmail}
                        </Typography>
                        <Typography variant="subtitle2">{userRole}</Typography>
                      </div>
                      <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                        <MenuItem className={classes.menuItem} onClick={goToMain}>
                          <ScheduleIcon className={classes.icon} />
                          <Typography variant="h6">Главная</Typography>
                        </MenuItem>
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
        </>
      ) : (
        <Button color="secondary" aria-haspopup="true" className={classes.enterButton} onClick={handleLogIn}>
          <EnterSvg />
          <span>Войти</span>
        </Button>
      )}
    </div>
  );
};
