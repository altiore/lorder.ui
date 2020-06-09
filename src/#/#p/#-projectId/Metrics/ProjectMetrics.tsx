import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';

import MetricTable from './MetricTable';

interface IProjectMetricsProps {
  statistic: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(6, 0),
  },
}));

export const ProjectMetricsTsx = ({ statistic }: IProjectMetricsProps) => {
  const { root } = useStyles();
  return (
    <Grid container className={root}>
      <Grid item md={1} sm={false} xs={false} />
      <Grid item md={10} sm={12} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <MetricTable title="Неделя" {...(statistic?.metrics?.lastWeek || {})} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MetricTable title="Месяц" {...(statistic?.metrics?.lastMonth || {})} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MetricTable title="Всего" {...(statistic?.metrics?.all || {})} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={1} sm={false} xs={false} />
    </Grid>
  );
};
