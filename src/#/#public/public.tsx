import React, { Suspense } from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import TelegramIco from '@components/@icons/Telegram';
import LoadingPage from '@components/loading-page';

import HiHeader from '#/#hi/@common/hi-header';
import NestedRoute from '#/@common/#nested-route';

import { PUBLIC_ROUTES } from './routes';

import { IRoute } from '@types';

export const useStyles = makeStyles((theme: Theme) => ({
  bottomBar: {
    alignItems: 'center',
    color: theme.palette.secondary.main,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
    },
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    minHeight: 'calc(100vh - 56px)',
  },
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    minHeight: '100vh',
    minWidth: 0,
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

interface IProps extends RouteComponentProps {
  empty?: any;
}

export const PublicTsx: React.FC<IProps> = () => {
  const { bottomBar, content, root, sectionDesktop } = useStyles();
  return (
    <div className={root}>
      <HiHeader hideSecond />

      <main className={content}>
        <Suspense fallback={<LoadingPage />}>
          <Switch>
            {PUBLIC_ROUTES.map((route: IRoute) => (
              <NestedRoute key={route.path} {...route} />
            ))}
          </Switch>
        </Suspense>
      </main>

      <AppBar color="default" key={'bottom'} position="static" component={'footer'}>
        <Toolbar className={bottomBar}>
          <Typography variant="h6" color="inherit">
            Copyright &copy; Lorder
          </Typography>
          <div className={sectionDesktop}>
            <IconButton color="inherit" href={'https://t.me/joinchat/BmXj_kK5vnoAWdQF7tTc1g'} target={'_blank'}>
              <TelegramIco />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
