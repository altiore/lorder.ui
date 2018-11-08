import { Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import RefreshIcon from '@material-ui/icons/Refresh';
import * as classNames from 'classnames';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import { IRoute, ROLE } from 'src/@types';
import { RouteWithSubRoutes } from 'src/domains/@common/RouteWithSubRoutes';
import { Project } from 'src/store/projects';
import { NoMatch } from './noMatch';
import { ProjectButton } from './ProjectButton';

export interface IMainProps {
  classes: any;
  isLeftBarOpen: boolean;
  getUserWorks: () => any;
  logOut: () => void;
  projects: Array<Project & { percent: string; time: string }>;
  push: (route: string) => void;
  routes: IRoute[];
  toggleUiSetting: (setting: 'isLeftBarOpen') => void;
  theme: Theme;
  userAvatar?: string;
  userEmail?: string;
  userRole: ROLE;
  version: string;
}

export class MainJsx extends React.Component<RouteComponentProps<{}> & IMainProps, {}> {
  public handleDrawerToggle = () => {
    this.props.toggleUiSetting('isLeftBarOpen');
  };

  public goTo = (route: string) => () => {
    this.props.push(route);
  };

  public render() {
    const { routes } = this.props;
    if (!routes) {
      return null;
    }

    const { classes, isLeftBarOpen, projects, userAvatar, userEmail, userRole, version } = this.props;
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
              <div>
                <Typography variant="caption" noWrap>
                  App: {version}
                </Typography>
                <Typography variant="caption" noWrap>
                  React: {React.version}
                </Typography>
              </div>
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
            {projects.map(project => (
              <ProjectButton key={project.id} {...project} />
            ))}
            <IconButton onClick={this.clickOnRefresh}>
              <RefreshIcon fontSize={'small'} />
            </IconButton>
            <Tooltip title={`${userEmail} (${userRole})`}>
              <Avatar
                onClick={this.logOut}
                alt="Remy Sharp"
                src={userAvatar || '/d-avatar.png'}
                className={classes.avatar}
              />
            </Tooltip>
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

  private logOut = (e: React.SyntheticEvent) => {
    if (e) {
      this.props.logOut();
    }
  };

  private clickOnRefresh = () => this.props.getUserWorks();
}
