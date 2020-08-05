import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';

import ButtonEdit from '@components/button-edit';

import { useStyles } from '../styles';

interface IGroupHeaderProps {
  headerTitle: string;
  buttonTitle: string;
  buttonRoutePath: string;
}

export const GroupHeader = memo(({ headerTitle, buttonTitle, buttonRoutePath = '/' }: IGroupHeaderProps) => {
  const classes = useStyles();
  return (
    <Grid container justify="space-between" alignItems="center" className={classes.tableGroupHeader}>
      <h2 className={classes.h2}>{headerTitle}</h2>
      <ButtonEdit routePath={buttonRoutePath} variant="contained">
        {buttonTitle}
      </ButtonEdit>
    </Grid>
  );
});
