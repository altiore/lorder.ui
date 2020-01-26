import React, { lazy } from 'react';
import { Redirect } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Switch } from 'react-router';

import { IRoute } from '@types';
import { LayoutLeftDrawer } from '#/@common/LayoutLeftDrawer';
import { Project } from '#/@store/projects';

import NestedRoute from '#/@common/#NestedRoute';

export const ROUTES_BY_PATH = {
  '/projects/:projectId/board': lazy(() => import('./#board')),
  '/projects/:projectId/members': lazy(() => import('./#members')),
  '/projects/:projectId/settings': lazy(() => import('./#settings')),
  '/projects/:projectId/task-types': lazy(() => import('./#task-types')),
  '/projects/:projectId/tasks/:sequenceNumber': lazy(() => import('./#tasks/#:sequenceNumber')),
  '/projects/:projectId/tasks': lazy(() => import('./#tasks')),
};

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
    const { openedProject, routes } = this.props;

    if (!openedProject || !openedProject.title) {
      return null;
    }

    const availableRoutes = routes.filter(
      (route: IRoute) =>
        !route.accessLevel || !openedProject.accessLevel || route.accessLevel <= openedProject.accessLevel
    );

    return (
      <LayoutLeftDrawer routes={availableRoutes}>
        <Switch>
          <Redirect from="/projects/:projectId" to="/projects/:projectId/board" exact />
          {routes &&
            routes.map((route: IRoute) => (
              <NestedRoute component={ROUTES_BY_PATH[route.path]} key={route.path} {...route} />
            ))}
        </Switch>
      </LayoutLeftDrawer>
    );
  }
}
