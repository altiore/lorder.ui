import React, { lazy } from 'react';
import { Redirect } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Switch } from 'react-router';

import { IRoute } from '@types';
import { LayoutLeftDrawer } from '#/@common/LayoutLeftDrawer';
import { ACCESS_LEVEL, Project } from '#/@store/projects';

import NestedRoute from '#/@common/#NestedRoute';
import { ROLES } from '../../../@store/roles';

export const PROJECT_ROUTES = [
  {
    access: [ROLES.USERS, ACCESS_LEVEL.RED],
    exact: true,
    icon: 'import-export',
    path: '/projects/:projectId/board',
    title: 'Доска',
    component: lazy(() => import('./#board')),
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.INDIGO],
    exact: true,
    icon: 'list-alt',
    path: '/projects/:projectId/tasks',
    title: 'Задачи',
    component: lazy(() => import('./#tasks')),
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.INDIGO],
    exact: true,
    icon: 'ballot',
    path: '/projects/:projectId/task-types',
    title: 'Типы Задач',
    component: lazy(() => import('./#task-types')),
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.INDIGO],
    exact: true,
    icon: 'people',
    path: '/projects/:projectId/roles',
    title: 'Роли проекта',
    component: lazy(() => import('./#roles')),
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.INDIGO],
    exact: true,
    icon: 'people',
    path: '/projects/:projectId/members',
    title: 'Участники',
    component: lazy(() => import('./#members')),
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.INDIGO],
    exact: true,
    icon: 'settings',
    path: '/projects/:projectId/settings',
    title: 'Другие Настройки',
    component: lazy(() => import('./#settings')),
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.RED],
    path: '/projects/:projectId/tasks/:sequenceNumber',
    component: lazy(() => import('./#tasks/#:sequenceNumber')),
  },
];

export interface IProjectProps {
  fetchProjectDetails: any;
  openedProject: Project;
  routes: IRoute[];
}

export class ProjectTsx extends React.Component<IProjectProps & RouteComponentProps<any>, {}> {
  componentDidMount(): void {
    const { fetchProjectDetails, openedProject } = this.props;
    if (openedProject && openedProject.id) {
      fetchProjectDetails(openedProject.id);
    }
  }

  componentWillReceiveProps(nextProps: Readonly<IProjectProps & RouteComponentProps<any>>, nextContext: any): void {
    if (
      this.props.openedProject &&
      nextProps.openedProject &&
      this.props.openedProject.id !== nextProps.openedProject.id
    ) {
      this.props.fetchProjectDetails(nextProps.openedProject.id);
    }
  }

  render() {
    const { openedProject } = this.props;

    if (!openedProject || !openedProject.title) {
      return null;
    }

    const availableRoutes = PROJECT_ROUTES.filter(
      (route: IRoute) =>
        !route.accessLevel || !openedProject.accessLevel || route.accessLevel <= openedProject.accessLevel
    );

    return (
      <LayoutLeftDrawer routes={availableRoutes}>
        <Switch>
          <Redirect from="/projects/:projectId" to="/projects/:projectId/board" exact />
          {PROJECT_ROUTES && PROJECT_ROUTES.map((route: IRoute) => <NestedRoute key={route.path} {...route} />)}
        </Switch>
      </LayoutLeftDrawer>
    );
  }
}
