import Button from '@material-ui/core/Button';
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
import * as React from 'react';
import { Redirect, Switch } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

import { IRoute } from 'src/@types';
import { RouteWithSubRoutes } from 'src/domains/@common/RouteWithSubRoutes';
import { Project } from 'src/store/projects';

export interface IProjectProps {
  classes: any;
  fetchProjectDetails: any;
  openedProject: Project;
  routes: IRoute[];
  goTo: any;
  theme: Theme;
}

export interface IProjectState {
  open: boolean;
}

export class ProjectTsx extends React.Component<IProjectProps & RouteComponentProps<IProjectProps>, IProjectState> {
  state = {
    open: false,
  };

  componentDidMount(): void {
    this.props.fetchProjectDetails(this.props.openedProject.id);
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleDrawerToggle = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  render() {
    const { classes, openedProject, theme, routes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <Typography variant="h5" className={classes.projectTitle}>
              {openedProject.title}
            </Typography>
            <div className={classes.grow} />
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
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
          <List>
            <ListItem button onClick={this.goTo('/projects')}>
              <ListItemIcon>
                <LaptopIcon />
              </ListItemIcon>
              <ListItemText primary={'Проекты'} />
            </ListItem>
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
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <Button onClick={this.handleDrawerToggle}>Open</Button>
          <Switch>
            <Redirect from="/projects/:projectId" to="/projects/:projectId/tasks" exact />
            {routes.map((route: IRoute) => (
              <RouteWithSubRoutes key={route.path || 'NotFound'} {...route} />
            ))}
          </Switch>
        </main>
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
