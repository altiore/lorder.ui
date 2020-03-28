import React, { memo, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import { RouteComponentProps } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';

import { PageCenter } from '@components/PageCenter';

import { DailyRoutine } from './DailyRoutine';
import { LastEvents } from './LastEvents';
import { StartForm } from './StartForm';
import { useStyles } from './styles';
import { TasksList } from './TasksList';

export interface IDashboardProps extends RouteComponentProps<{}> {
  getAllTasks: any;
}

export const DashboardJsx: React.FC<IDashboardProps> = memo(({ getAllTasks }) => {
  const classes = useStyles();

  const theme = useTheme();

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  return (
    <>
      <div className={classes.timeLine}>
        <DailyRoutine />
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
});
