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
    const { fetchProjectDetails, openedProject } = this.props;
    if (openedProject && openedProject.id) {
      fetchProjectDetails(openedProject.id);
    }
  }

  componentWillReceiveProps(
    nextProps: Readonly<IProjectProps & RouteComponentProps<IProjectProps>>,
    nextContext: any
  ): void {
    if (
      this.props.openedProject &&
      nextProps.openedProject &&
      this.props.openedProject.id !== nextProps.openedProject.id
    ) {
      this.props.fetchProjectDetails(nextProps.openedProject.id);
    }
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

    if (!openedProject || !openedProject.title) {
      return null;
    }

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
        <section
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <ButtonBase onClick={this.handleDrawerToggle} className={classes.toggleButton}>
            <ChevronRightIcon />
          </ButtonBase>
          <Switch>
            <Redirect from="/projects/:projectId" to="/projects/:projectId/dnd" exact />
            {routes.map((route: IRoute) => (
              <RouteWithSubRoutes key={route.path || 'NotFound'} {...route} />
            ))}
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
