import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { RouteComponentProps } from 'react-router-dom';

import { PageCenter } from 'src/components/PageCenter';
import { DailyRoutine } from './DailyRoutine';
import { LastEvents } from './LastEvents';
import { StartForm } from './StartForm';
import { TasksList } from './TasksList';

export interface IDashboardProps extends RouteComponentProps<{}> {
  theme: Theme;
  classes?: any;
  getAllTasks: any;
}

export class DashboardJsx extends React.PureComponent<IDashboardProps, {}> {
  componentDidMount() {
    this.props.getAllTasks();
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <>
        <div className={classes.timeLine}>
          <DailyRoutine startAt={6} finishAt={23} />
        </div>
        <PageCenter className={classes.root}>
          <Grid item lg={9} md={8} sm={12} className={classes.content}>
            <StartForm />
            <TasksList />
          </Grid>
          <MediaQuery minDeviceWidth={theme.breakpoints.values.sm}>
            <Grid item lg={3} md={4} sm={12}>
              <LastEvents />
            </Grid>
          </MediaQuery>
        </PageCenter>
      </>
    );
  }
}
