import ButtonBase from '@material-ui/core/ButtonBase';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LaptopIcon from '@material-ui/icons/Laptop';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import * as classNames from 'classnames';
import upperFirst from 'lodash-es/upperFirst';
import * as React from 'react';
import { match, RouteComponentProps, Switch } from 'react-router';

import { IRoute, ROLE } from 'src/@types';
import { RouteWithSubRoutes } from 'src/domains/@common/RouteWithSubRoutes';

export interface ILayoutLeftDrawerProps {
  children?: React.ReactNode;
  redirect?: React.ReactNode;
  classes: any;
  goTo: any;
  isLeftBarOpen: boolean;
  match: match<any>;
  routes?: IRoute[];
  title?: string;
  toggleUiSetting: any;
  theme: Theme;
  userRole: ROLE;
}

export class LayoutLeftDrawerTsx extends React.Component<
  ILayoutLeftDrawerProps & RouteComponentProps<ILayoutLeftDrawerProps>,
  {}
> {
  handleDrawerToggle = () => {
    this.props.toggleUiSetting('isLeftBarOpen');
  };

  render() {
    const { children, classes, isLeftBarOpen, title, theme, redirect, routes, userRole } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={isLeftBarOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <Typography variant="h5" className={classes.projectTitle}>
              {title || upperFirst(userRole)}
            </Typography>
            <div className={classes.grow} />
            <IconButton onClick={this.handleDrawerToggle}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          {routes &&
            routes.length && (
              <>
                <List>
                  {routes.filter((el: any) => el.icon).map((route: IRoute) => (
                    <ListItem key={route.path} button onClick={this.goTo(route.path)}>
                      <ListItemIcon>
                        <route.icon />
                      </ListItemIcon>
                      <ListItemText primary={route.title} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </>
            )}
          <List>
            <ListItem button onClick={this.goTo('/projects')}>
              <ListItemIcon>
                <LaptopIcon />
              </ListItemIcon>
              <ListItemText primary={'Проекты'} />
            </ListItem>
            {userRole === ROLE.SUPER_ADMIN && (
              <>
                <ListItem button onClick={this.goTo('/all-projects')}>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Все Проекты'} />
                </ListItem>
                <ListItem button onClick={this.goTo('/users')}>
                  <ListItemIcon>
                    <PeopleOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Пользователи'} />
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
        <section
          className={classNames(classes.content, {
            [classes.contentShift]: isLeftBarOpen,
          })}
        >
          <ButtonBase onClick={this.handleDrawerToggle} className={classes.toggleButton}>
            <ChevronRightIcon />
          </ButtonBase>
          {children}
          <Switch>
            {redirect}
            {routes && routes.map((route: IRoute) => <RouteWithSubRoutes key={route.path || 'NotFound'} {...route} />)}
          </Switch>
        </section>
      </div>
    );
  }

  private goTo = (path?: string) => () => {
    if (path) {
      const { goTo, match } = this.props;
      goTo(path.replace(match.path, match.url));
    }
  };
}
