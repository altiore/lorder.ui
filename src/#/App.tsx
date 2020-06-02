import React, { lazy, Suspense, useEffect } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import LoadingPage from '@components/LoadingPage';

import NestedRoute from '#/@common/#NestedRoute';

import { ROLES } from './@store/roles';

import { IRoute, ROLE } from '@types';
import { useAllowedRoutes } from '@utils/useAllowedRoutes';

interface IAppProps {
  getUserWorks: () => any;
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

export const AppJsx: React.FC<IAppProps> = ({ getUserWorks, userRole }) => {
  useEffect(() => {
    // при каждом открытии таба мы должны заново получать работу, чтоб получить последнюю актуальную работу из другого устройства или окна браузера
    window.onfocus = getUserWorks;
  }, [getUserWorks]);

  const preparedRoutes = useAllowedRoutes(APP_MAIN_ROUTES, userRole);

  return (
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
  );
};
