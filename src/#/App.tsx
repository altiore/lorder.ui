import React, { lazy, Suspense, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import includes from 'lodash/includes';

import { IRoute, ROLE } from '@types';

import LoadingPage from '@components/LoadingPage';
import NestedRoute from '#/@common/#NestedRoute';
import NotFound from '#/@common/NotFoundPage';
import { ROLES } from './@store/roles';

interface IAppProps {
  userRole: ROLE;
}

export const APP_MAIN_ROUTES: IRoute[] = [
  {
    access: ROLES.ALL,
    path: '/p/:projectId',
    component: lazy(() => import('./#p/#:projectId')),
  },
  {
    access: ROLES.ALL,
    path: '/start/:identifier',
    component: lazy(() => import('./#start/#:identifier')),
  },
  {
    access: ROLES.ALL,
    path: '/hi',
    component: lazy(() => import('./#hi')),
  },
  {
    access: ROLES.GUESTS,
    path: '/login',
    component: lazy(() => import('./#login')),
  },
  {
    access: ROLES.USERS,
    path: '/',
    component: lazy(() => import('./#')),
    getReducers: import('./#/@store/reducers'),
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
