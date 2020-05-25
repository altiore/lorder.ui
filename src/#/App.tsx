import React, { lazy, Suspense } from 'react';
import Helmet from 'react-helmet';
import { Redirect, Switch } from 'react-router-dom';

import LoadingPage from '@components/LoadingPage';

import NestedRoute from '#/@common/#NestedRoute';

import { ROLES } from './@store/roles';

import { IRoute, ROLE } from '@types';
import { useAllowedRoutes } from '@utils/useAllowedRoutes';

interface IAppProps {
  userRole: ROLE;
}

export const APP_MAIN_ROUTES: IRoute[] = [
  {
    access: [ROLES.ALL],
    component: lazy(() => import('./#p/#-projectId')),
    path: '/p/:projectId',
  },
  {
    access: [ROLES.ALL],
    component: lazy(() => import('./#start/#-identifier')),
    path: '/start/:identifier',
  },
  {
    access: [ROLES.ALL],
    component: lazy(() => import('./#hi')),
    path: '/hi',
  },
  {
    access: [ROLES.GUESTS],
    component: lazy(() => import('./#login')),
    path: '/login',
  },
  {
    access: [ROLES.USERS],
    component: lazy(() => import('./#')),
    getReducers: import('./#/@store/reducers'),
    path: '/',
  },
];

export const AppJsx: React.FC<IAppProps> = ({ userRole }) => {
  const preparedRoutes = useAllowedRoutes(APP_MAIN_ROUTES, userRole);

  return (
    <>
      <Helmet
        style={[
          {
            cssText: `
            html {
              min-height: 100vh;
            }
            
            body {
              min-height: 100vh;
            }
            
            #root {
              flex-grow: 1;
              min-height: 100vh;
            }
        `,
          },
        ]}
      />
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Redirect from="/index.html" to="/" exact />
          {preparedRoutes.map((route: IRoute) => (
            <NestedRoute key={route.path} {...route} />
          ))}
          <Redirect from="/" to="/hi" exact />
          <Redirect to="/login" />
        </Switch>
      </Suspense>
    </>
  );
};
