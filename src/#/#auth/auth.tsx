import React, { lazy, Suspense, useMemo } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import HiHeader from '#/#hi/@common/hi-header';
import { ROUTE } from '#/@store/router';

import BackImg from './imgs/back-plannet.png';

interface IProps extends RouteComponentProps {
  clearErrors: any;
  push: (path: string) => void;
}

export const useStyles = makeStyles((theme: Theme) => ({
  formWrapper: {
    color: '#ffffff',
    width: 310,
  },
  root: {
    alignItems: 'center',
    background: 'rgba(25, 30, 36, 0.92)',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(5, 0, 6),
    width: 468,
    [theme.breakpoints.down('sm')]: {
      background: 'transparent',
      height: 500,
      width: 310,
    },
  },
  titleStyle: {
    marginBottom: 24,
  },
  wrapper: {
    alignItems: 'center',
    background: `linear-gradient(265.8deg, #121212 -5.98%, rgba(18, 18, 18, 0) 78.77%), linear-gradient(180deg, #121212 0%, rgba(18, 18, 18, 0) 46.3%), url(${BackImg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      paddingTop: theme.spacing(2),
    },
  },
}));

export const Auth: React.FC<IProps> = ({ location }) => {
  const { pathname } = location;

  const isLogin = useMemo(() => {
    return !pathname.match(ROUTE.AUTH.REGISTER);
  }, [pathname]);

  const title = useMemo(() => {
    if (!isLogin) {
      return 'Регистрация';
    }
    return 'Вход';
  }, [isLogin]);

  const { formWrapper, root, titleStyle, wrapper } = useStyles();
  return (
    <div className={wrapper}>
      <HiHeader />
      <div className={root}>
        <div className={formWrapper}>
          <Typography variant="h2" color="inherit" className={titleStyle}>
            {title}
          </Typography>

          <Suspense fallback={<div />}>
            <Switch>
              <Route path={ROUTE.AUTH.LOGIN} component={lazy(() => import('./#signin'))} />
              <Route path={ROUTE.AUTH.REGISTER} component={lazy(() => import('./#signup'))} />
              <Redirect to={ROUTE.AUTH.LOGIN} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
