import * as React from 'react';
import { Redirect } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

import { IRoute } from 'src/@types';
import { LayoutLeftDrawer } from 'src/domains/@common/LayoutLeftDrawer';
import { Project } from 'src/store/projects';

export interface IProjectProps {
  fetchProjectDetails: any;
  routes: IRoute[];
  selectedProject: Project;
}

export class ProjectTsx extends React.Component<IProjectProps & RouteComponentProps<IProjectProps>, {}> {
  componentDidMount(): void {
    const { fetchProjectDetails, selectedProject } = this.props;
    if (selectedProject && selectedProject.id) {
      fetchProjectDetails(selectedProject.id);
    }
  }

  componentWillReceiveProps(
    nextProps: Readonly<IProjectProps & RouteComponentProps<IProjectProps>>,
    nextContext: any
  ): void {
    if (
      this.props.selectedProject &&
      nextProps.selectedProject &&
      this.props.selectedProject.id !== nextProps.selectedProject.id
    ) {
      this.props.fetchProjectDetails(nextProps.selectedProject.id);
    }
  }

  render() {
    const { selectedProject, routes } = this.props;

    if (!selectedProject || !selectedProject.title) {
      return null;
    }

    const availableRoutes = routes.filter(
      (route: IRoute) =>
        !route.accessLevel || !selectedProject.accessLevel || route.accessLevel <= selectedProject.accessLevel
    );

    return (
      <LayoutLeftDrawer
        routes={availableRoutes}
        redirect={<Redirect from="/projects/:projectId" to="/projects/:projectId/board" exact />}
      />
    );
  }
}
