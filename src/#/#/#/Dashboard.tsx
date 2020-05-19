import React from 'react';
import MediaQuery from 'react-responsive';
import { RouteComponentProps } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import { TIME_LINE_HEIGHT } from '@components/TimeLine';

import { DailyRoutine } from './DailyRoutine';
import { LastEvents } from './LastEvents';
import { StartForm } from './StartForm';
import { TasksList } from './TasksList';

export interface IDashboardProps extends RouteComponentProps<{}> {
  getAllTasks?: any;
}

export const useStyles = makeStyles((theme: Theme) => ({
  collapse: {
    paddingLeft: 88,
  },
  content: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  content2: {
    flexGrow: 1,
    margin: `${theme.spacing(3)}px auto`,
    maxWidth: theme.mainContent.width,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      overflowX: 'hidden',
      padding: theme.spacing(1, 0),
    },
    [theme.breakpoints.up('lg')]: {
      width: theme.mainContent.width,
    },
  },
  contentWrap: {},
  duration: {
    width: 100,
  },
  listRoot: {
    '& > li:last-child': {
      marginBottom: 0,
    },
    paddingBottom: 0,
  },
  project: {
    width: 100,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    cursor: 'pointer',
  },
  timeLine: {
    alignItems: 'flex-start',
    display: 'flex',
    height: TIME_LINE_HEIGHT,
    left: 0,
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 4),
    position: 'absolute',
    top: theme.mixins.toolbar.height,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  title: {
    width: 320,
  },
}));

export const DashboardJsx: React.FC<IDashboardProps> = () => {
  const classes = useStyles();

  const theme = useTheme();

  return (
    <div className={classes.content2}>
      <div className={classes.timeLine}>
        <DailyRoutine />
      </div>
      <Grid container spacing={4} className={classes.contentWrap}>
        <Grid item lg={8} md={7} sm={12} className={classes.content}>
          <TasksList />
          <StartForm />
        </Grid>
        <MediaQuery minDeviceWidth={theme.breakpoints.values.sm}>
          <Grid item lg={4} md={5} sm={12}>
            <LastEvents />
          </Grid>
        </MediaQuery>
      </Grid>
    </div>
  );
};
