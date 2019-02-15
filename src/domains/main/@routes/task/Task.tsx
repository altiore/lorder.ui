import * as React from 'react';

import { DashboardTaskForm } from 'src/domains/@common/TaskForm';

export interface ITaskProps {
  classes: any;
}

export class TaskTsx extends React.Component<ITaskProps, {}> {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.root}>
        <DashboardTaskForm {...rest} />
      </div>
    );
  }
}
