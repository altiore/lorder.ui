import React from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import T from '@material-ui/core/Typography';

import { Page } from '@components/page';

export interface IProps {
  test?: number;
}

export const StatisticTsx: React.FunctionComponent<IProps> = () => {
  const { centered, desc } = useStyles();
  return (
    <Page>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <T variant="h4" className={centered}>
            Здесь появится статистика вашего отдыха (в разработке)
          </T>
          <Divider />
          <T className={desc}>Этот проект нужен для учета статистики вашего отдыха. </T>
          <T>Мы надеемся, что это поможет Вам делать выводы об эффективности Вашего времени</T>
        </Grid>
      </Grid>
    </Page>
  );
};

const useStyles = makeStyles(() => ({
  centered: {
    textAlign: 'center',
  },
  desc: {
    marginTop: 16,
  },
}));
