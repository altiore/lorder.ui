import React, { lazy } from 'react';
import { Redirect, RouteComponentProps, Switch } from 'react-router-dom';

import NestedRoute from '#/@common/#NestedRoute';
import { LayoutLeftDrawer } from '#/@common/LayoutLeftDrawer';
import { ACCESS_LEVEL, Project } from '#/@store/projects';
import { ROLES } from '#/@store/roles';

import { IRoute } from '@types';

export const PROJECT_ROUTES = [
  {
    access: [ROLES.USERS, ACCESS_LEVEL.RED],
    component: lazy(() => import('./#board')),
    exact: true,
    path: '/projects/:projectId/board',
    title: 'Задачи',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.INDIGO],
    component: lazy(() => import('./#members')),
    exact: true,
    path: '/projects/:projectId/members',
    title: 'Участники',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.INDIGO],
    component: lazy(() => import('./#settings')),
    exact: true,
    path: '/projects/:projectId/settings',
    title: 'Настройки',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.RED],
    component: lazy(() => import('./#tasks/#:sequenceNumber')),
    path: '/projects/:projectId/tasks/:sequenceNumber',
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
      <LayoutLeftDrawer routes={availableRoutes} showFooter>
        <Switch>
          <Redirect from="/projects/:projectId" to="/projects/:projectId/board" exact />
          {PROJECT_ROUTES && PROJECT_ROUTES.map((route: IRoute) => <NestedRoute key={route.path} {...route} />)}
        </Switch>
      </LayoutLeftDrawer>
    );
  }
}
