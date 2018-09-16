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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as classNames from 'classnames';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import { IRoute } from 'src/@types';
import { RouteWithSubRoutes } from 'src/domains/@common/RouteWithSubRoutes';
import { NoMatch } from './noMatch';

export interface IDashboardProps {
  classes: any;
  isLeftBarOpen: boolean;
  logOut: () => void;
  push: (route: string) => void;
  routes: IRoute[];
  toggleUiSetting: (setting: 'isLeftBarOpen') => void;
  theme: Theme;
}

export class Dashboard extends React.Component<RouteComponentProps<{}> & IDashboardProps, {}> {
  public handleDrawerToggle = () => {
    this.props.toggleUiSetting('isLeftBarOpen');
  };

  public goTo = (route: string) => () => {
    this.props.push(route);
  };

  public render() {
    const { classes, isLeftBarOpen, routes, logOut } = this.props;
    if (!routes) {
      return null;
    }

    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !isLeftBarOpen && classes.drawerPaperClose),
          }}
          open={isLeftBarOpen}
        >
          <div className={classes.toolbar} style={{ justifyContent: isLeftBarOpen ? 'flex-end' : 'center' }}>
            {isLeftBarOpen ? (
              <Typography variant="caption" noWrap>
                {'Altiore'}
              </Typography>
            ) : null}
            <IconButton onClick={this.handleDrawerToggle}>
              {isLeftBarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List component="nav">
            {routes.filter((el: any) => el.icon).map((route: IRoute) => (
              <ListItem key={route.path} button onClick={this.goTo(route.path)}>
                <ListItemIcon>
                  <route.icon />
                </ListItemIcon>
                <ListItemText primary={route.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar}>
            <Avatar onClick={logOut} alt="Remy Sharp" src="/favicon.ico" className={classes.avatar} />
          </div>
          <Switch>
            {routes.map((route: IRoute) => (
              <RouteWithSubRoutes key={route.path} {...route} />
            ))}
            <Route component={NoMatch} />
          </Switch>
        </main>
      </div>
    );
  }
}
