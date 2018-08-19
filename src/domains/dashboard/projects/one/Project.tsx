import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Project } from 'src/store/projects';

export interface IProjectProps {
  classes: any;
  closeDialog: any;
  openDialog: any;
  project: Project;
}

export class ProjectJsx extends React.Component<RouteComponentProps<{}> & IProjectProps, {}> {
  public render() {
    const { classes, project } = this.props;
    if (!project) {
      return null;
    }
    return (
      <Paper className={classes.root}>
        <h3>{project.title}</h3>
      </Paper>
    );
  }
}
