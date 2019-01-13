import * as React from 'react';
import { Redirect } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

import { IRoute } from 'src/@types';
import { LayoutLeftDrawer } from 'src/domains/@common/LayoutLeftDrawer';
import { Project } from 'src/store/projects';

export interface IProjectProps {
  fetchProjectDetails: any;
  openedProject: Project;
  routes: IRoute[];
}

export class ProjectTsx extends React.Component<IProjectProps & RouteComponentProps<IProjectProps>, {}> {
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

  render() {
    const { openedProject, routes } = this.props;

    if (!openedProject || !openedProject.title) {
      return null;
    }

    return (
      <LayoutLeftDrawer
        title={openedProject.title}
        routes={routes}
        redirect={<Redirect from="/projects/:projectId" to="/projects/:projectId/board" exact />}
      />
    );
  }
}
