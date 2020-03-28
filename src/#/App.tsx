import React, { lazy, Suspense, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import includes from 'lodash/includes';

import LoadingPage from '@components/LoadingPage';

import NestedRoute from '#/@common/#NestedRoute';
import NotFound from '#/@common/NotFoundPage';

import { ROLES } from './@store/roles';

import { IRoute, ROLE } from '@types';

interface IAppProps {
  userRole: ROLE;
}

export const APP_MAIN_ROUTES: IRoute[] = [
  {
    access: ROLES.ALL,
    component: lazy(() => import('./#p/#:projectId')),
    path: '/p/:projectId',
  },
  {
    access: ROLES.ALL,
    component: lazy(() => import('./#start/#:identifier')),
    path: '/start/:identifier',
  },
  {
    access: ROLES.ALL,
    component: lazy(() => import('./#hi')),
    path: '/hi',
  },
  {
    access: ROLES.GUESTS,
    component: lazy(() => import('./#login')),
    path: '/login',
  },
  {
    access: ROLES.USERS,
    component: lazy(() => import('./#')),
    getReducers: import('./#/@store/reducers'),
    path: '/',
  },
];

export const AppJsx: React.FC<IAppProps> = ({ userRole }) => {
  const preparedRoutes = useMemo(() => {
    return APP_MAIN_ROUTES.filter(r => includes(r.access, userRole));
  }, [userRole]);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Switch>
        {preparedRoutes.map((route: IRoute) => (
          <NestedRoute key={route.path} {...route} />
        ))}
        <Redirect from="/index.html" to="/" exact />
        <Redirect from="/" to="/hi" exact />
        <Redirect to="/login" />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};
