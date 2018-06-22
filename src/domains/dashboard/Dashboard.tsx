import { Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as classNames from 'classnames';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import { New } from './new';
import { NoMatch } from './noMatch';
import { Projects } from './projects';

export interface IDashboardProps {
  classes: any;
  isLeftBarOpen: boolean;
  push: (route: string) => void;
  toggleUiSetting: (setting: 'isLeftBarOpen') => void;
  theme: Theme;
}

export class Dashboard extends React.Component<RouteComponentProps<{}> & IDashboardProps, {}> {
  public handleDrawerToggle = () => {
    this.props.toggleUiSetting('isLeftBarOpen');
  };

  public goTo = (route: string) => () => {
    this.props.push(route)
  };

  public render() {
    const { classes, isLeftBarOpen } = this.props;

    return (
      <div className={classes.root}>
        <Drawer
          variant='permanent'
          classes={{
            paper: classNames(classes.drawerPaper, !isLeftBarOpen && classes.drawerPaperClose),
          }}
          open={isLeftBarOpen}
        >
          <div className={classes.toolbar} style={{justifyContent: isLeftBarOpen ? 'flex-end' : 'center'}}>
            {isLeftBarOpen ? <Typography variant='caption' noWrap>{'Altiore'}</Typography> : null}
            <IconButton onClick={this.handleDrawerToggle}>
              {isLeftBarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List component="nav">
            <ListItem button onClick={this.goTo('/projects')}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Проекты" />
            </ListItem>
            <ListItem button onClick={this.goTo('/profile')}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Профайл" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar}>
            <Avatar alt="Remy Sharp" src="/favicon.ico" className={classes.avatar} />
          </div>
          <Switch>
            <Route path={`/projects/new`} component={New} />
            <Route path={`/projects`} component={Projects} />
            <Route component={NoMatch} />
          </Switch>
        </main>
      </div>
    );
  }
}
