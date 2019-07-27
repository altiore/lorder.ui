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

import AllInboxIcon from '@material-ui/icons/AllInbox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BallotIcon from '@material-ui/icons/Ballot';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FeedbackIcon from '@material-ui/icons/Feedback';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import LaptopIcon from '@material-ui/icons/Laptop';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import classNames from 'classnames';
import upperFirst from 'lodash/upperFirst';
import React, { lazy, useCallback } from 'react';
import { match, RouteComponentProps, Switch } from 'react-router';

import { IRoute, ROLE } from '@types';
import { LinkButton } from '@domains/@common/LinkButton';
import { RouteWithSubRoutes } from '@domains/@common/RouteWithSubRoutes';
import { Project } from '@store/projects';
import { useStyles } from './styles';

export interface ILayoutLeftDrawerProps {
  children?: React.ReactNode;
  redirect?: React.ReactNode;
  classes: any;
  goTo: any;
  isLeftBarOpen: boolean;
  isWidthSm: boolean;
  match: match<any>;
  routes?: IRoute[];
  selectedProject: Project;
  toggleUiSetting: any;
  theme: Theme;
  userRole: ROLE;
}

// TODO: move to correct place in route paths
export const ROUTES_BY_PATH = {
  '/projects/:projectId/board': lazy(() => import('@domains/@Main/@routes/projects/one/DragAndDrop')),
  '/projects/:projectId/members': lazy(() => import('@domains/@Main/@routes/projects/one/ProjectMembers')),
  '/projects/:projectId/settings': lazy(() => import('@domains/@Main/@routes/projects/one/Settings')),
  '/projects/:projectId/task-types': lazy(() => import('@domains/@Main/@routes/projects/one/ProjectTaskTypes')),
  '/projects/:projectId/tasks': lazy(() => import('@domains/@Main/@routes/projects/one/ProjectTasks')),
  '/projects/:projectId/tasks/:taskId': lazy(() => import('@domains/@Main/@routes/task')),
};

export const ICONS_MAP = {
  ballot: BallotIcon,
  'import-export': AllInboxIcon,
  'list-alt': ListAltIcon,
  people: PeopleOutlinedIcon,
  settings: SettingsIcon,
};

export const LayoutLeftDrawerTsx: React.FC<ILayoutLeftDrawerProps & RouteComponentProps<any>> = ({
  children,
  goTo,
  isLeftBarOpen,
  isWidthSm,
  match,
  redirect,
  routes,
  selectedProject,
  theme,
  toggleUiSetting,
  userRole,
}) => {
  const classes = useStyles();

  const handleDrawerToggle = useCallback(() => {
    toggleUiSetting('isLeftBarOpen');
  }, [toggleUiSetting]);

  const goToPage = useCallback(
    (path?: string) => () => {
      if (path) {
        if (isWidthSm) {
          handleDrawerToggle();
        }
        goTo(path.replace(match.path, match.url));
      }
    },
    [handleDrawerToggle, goTo, match, isWidthSm]
  );

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
          {selectedProject && (
            <LinkButton to={`/projects/${selectedProject.id}`} className={classes.projectTitle}>
              {selectedProject.title}
            </LinkButton>
          )}
          {userRole !== ROLE.USER && <Typography className={classes.userRole}>{upperFirst(userRole)}</Typography>}
          <div className={classes.grow} />
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {routes && routes.length && (
          <>
            <List>
              {routes
                .filter((el: any) => el.icon)
                .map((route: IRoute) => {
                  const CurIcon = ICONS_MAP[route.icon];
                  return (
                    <ListItem key={route.path} button onClick={goToPage(route.path)}>
                      <ListItemIcon>{CurIcon ? <CurIcon /> : route.icon}</ListItemIcon>
                      <ListItemText primary={route.title} />
                    </ListItem>
                  );
                })}
            </List>
            <Divider />
          </>
        )}
        <List>
          <ListItem button onClick={goToPage('/projects')}>
            <ListItemIcon>
              <LaptopIcon />
            </ListItemIcon>
            <ListItemText primary={'Проекты'} />
          </ListItem>
          {userRole === ROLE.SUPER_ADMIN && (
            <>
              <ListItem button onClick={goToPage('/all-projects')}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={'Все Проекты'} />
              </ListItem>
              <ListItem button onClick={goToPage('/users')}>
                <ListItemIcon>
                  <PeopleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'Пользователи'} />
              </ListItem>
              <ListItem button onClick={goToPage('/task-types')}>
                <ListItemIcon>
                  <FormatSizeIcon />
                </ListItemIcon>
                <ListItemText primary={'Типы Задач'} />
              </ListItem>
              <ListItem button onClick={goToPage('/feedback')}>
                <ListItemIcon>
                  <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary={'Обратная связь'} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
      <section
        className={(classNames as any)(classes.content, {
          [classes.contentShift]: isLeftBarOpen,
        })}
      >
        <ButtonBase onClick={handleDrawerToggle} className={classes.toggleButton}>
          <ChevronRightIcon />
        </ButtonBase>
        {children}
        <Switch>
          {redirect}
          {routes &&
            routes.map((route: IRoute) => (
              <RouteWithSubRoutes component={ROUTES_BY_PATH[route.path]} key={route.path} {...route} />
            ))}
        </Switch>
      </section>
    </div>
  );
};
