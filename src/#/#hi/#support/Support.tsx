import React from 'react';
import { Helmet } from 'react-helmet';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import TelegramIco from '@components/@icons/Telegram';

import HiHeader from '#/#hi/HiHeader';
import ScreenSupport from '#/@common/ScreenSupport';

export interface ISupportProps {
  brandName: string;
  classes: any;
}

const BLOCKS = {
  start: {
    menu: true,
    name: 'start',
    title: 'Начать',
  },
  support: {
    menu: true,
    name: 'support',
    title: 'Поддержать проект',
  },
};

export const Support: React.FC<ISupportProps> = ({
  brandName,
  classes,
}) => {

  return (
    <Grid container direction="column" className={classes.root}>
      <Helmet>
        <body className={classes.hiBody} />
      </Helmet>

      <HiHeader blocks={BLOCKS} />

      <ScreenSupport name={BLOCKS.support.name} />

      <AppBar key={'bottom'} position="static" component={'footer'}>
        <Toolbar className={classes.bottomBar}>
          <Typography variant="h5" color="inherit">
            Copyright &copy; {brandName}
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" href="https://t.me/razzwan_altiore" target="_blank">
              <TelegramIco />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
