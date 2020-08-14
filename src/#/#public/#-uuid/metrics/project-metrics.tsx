import React from 'react';

import Grid from '@material-ui/core/Grid';

import MetricTable from './metric-table';
import { useStyles } from './styles';

interface IProjectMetricsProps {
  statistic: any;
}

export const ProjectMetricsTsx = ({ statistic }: IProjectMetricsProps) => {
  const { tableWrap, root } = useStyles();
  return (
    <Grid container justify="center" className={root}>
      <Grid item md={12} sm={12} xs={12}>
        <Grid container justify="center" alignItems="center">
          <Grid item className={tableWrap}>
            <MetricTable title="Неделя" {...(statistic?.metrics?.lastWeek || {})} />
          </Grid>
          <Grid item className={tableWrap}>
            <MetricTable title="Месяц" {...(statistic?.metrics?.lastMonth || {})} />
          </Grid>
          <Grid item className={tableWrap}>
            <MetricTable title="Всего" {...(statistic?.metrics?.all || {})} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={1} sm={false} xs={false} />
    </Grid>
  );
};
