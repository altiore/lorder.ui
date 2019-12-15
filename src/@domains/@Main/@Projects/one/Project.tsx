import React from 'react';
import { Redirect } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

import { IRoute } from '@types';
import { LayoutLeftDrawer } from '@domains/@common/LayoutLeftDrawer';
import { Project } from '@store/projects';

export interface IProjectProps {
  fetchProjectDetails: any;
  openedProject: Project;
  routes: IRoute[];
}

export class ProjectTsx extends React.Component<IProjectProps & RouteComponentProps<any>, {}> {
  componentDidMount(): void {
    const { fetchProjectDetails, openedProject } = this.props;
    if (openedProject && openedProject.id) {
      console.log('get project details from Project.tsx');
      fetchProjectDetails(openedProject.id);
    }
  }

  componentWillReceiveProps(nextProps: Readonly<IProjectProps & RouteComponentProps<any>>, nextContext: any): void {
    if (
      this.props.openedProject &&
      nextProps.openedProject &&
      this.props.openedProject.id !== nextProps.openedProject.id
    ) {
      console.log('get project details from Project.tsx (componentWillReceiveProps)');
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
      <LayoutLeftDrawer
        routes={availableRoutes}
        redirect={<Redirect from="/projects/:projectId" to="/projects/:projectId/board" exact />}
      />
    );
  }
}
