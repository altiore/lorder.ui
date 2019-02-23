import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Tooltip from '@material-ui/core/Tooltip';
import * as React from 'react';

export interface IRightMenuProps {
  classes: any;
  logOut: any;
  userAvatar: any;
  userEmail: any;
  userRole: any;
}

export interface IRightMenuState {
  open: boolean;
}

export class RightMenuTsx extends React.Component<IRightMenuProps, IRightMenuState> {
  state = {
    open: false,
  };

  anchorEl: EventTarget | any;

  render() {
    const { classes, logOut, userAvatar, userEmail, userRole } = this.props;
    const { open } = this.state;
    const elId = 'header-right-menu';

    return (
      <div className={classes.root}>
        <ButtonBase
          aria-owns={open ? elId : undefined}
          aria-haspopup="true"
          buttonRef={this.getButtonRef}
          className={classes.avatarButton}
          onClick={this.handleToggle}
        >
          <Avatar alt={userEmail} src={userAvatar || '/d-avatar.png'} className={classes.avatar} />
        </ButtonBase>
        <Popper open={open} anchorEl={this.anchorEl} transition className={classes.menu}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper id={elId} className={classes.menuPaper}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem onClick={this.handleClose} className={classes.item}>
                      Профиль
                    </MenuItem>
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
  }

  private handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  private handleClose = (event: React.SyntheticEvent) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  private getButtonRef = (node: any) => {
    this.anchorEl = node;
  };
}
