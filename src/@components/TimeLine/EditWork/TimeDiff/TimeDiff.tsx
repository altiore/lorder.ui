import React, { useMemo } from 'react';

import moment from 'moment';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IEditWorkData } from '../@common';

export interface ITimeDiff {
  formValues: IEditWorkData;
}

const useStyles = makeStyles((theme: Theme) => ({
  hoursClass: {
    fontSize: 26,
    fontWeight: 'bold',
    marginRight: 10,
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: 0,
  },
}));

export const TimeDiffTsx: React.FC<ITimeDiff> = ({ formValues }) => {
  const { root, hoursClass } = useStyles();

  const hours = useMemo(() => {
    return (formValues.finishAt || moment()).diff(formValues.startAt, 'hours');
  }, [formValues]);

  const minutes = useMemo(() => {
    return (formValues.finishAt || moment()).diff(formValues.startAt, 'minutes') % 60;
  }, [formValues]);

  return (
    <div className={root}>
      <Typography className={hoursClass} variant="h3">
        {hours}ч
      </Typography>
      <Typography className={hoursClass} variant="h3">
        {minutes}м
      </Typography>
    </div>
  );
};
