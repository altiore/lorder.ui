import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Switch } from 'react-router-dom';

import LoadingPage from '@components/loading-page';

import NestedRoute from '#/@common/#nested-route';
import { ROLES } from '#/@store/roles';
import { ROUTE } from '#/@store/router';

import { IRoute, ROLE } from '@types';
import { useAllowedRoutes } from '@utils/useAllowedRoutes';

export const APP_MAIN_ROUTES: IRoute[] = [
  {
    access: [ROLES.ALL],
    component: lazy(() => import('./#public')),
    path: ROUTE.PUBLIC.LIST,
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
    component: lazy(() => import('./#auth')),
    path: '/auth',
  },
  {
    access: [ROLES.USERS],
    component: lazy(() => import('./#')),
    getReducers: import('./#/@store/reducers'),
    path: '/',
  },
];

const DESCRIPTION =
  'Lorder позволяет расчитать вклад каждого участника в проект на основании реального вклада участников. Создан, чтоб подчинить время людям труда. Мир меняется - мы его меняем...';

interface IAppProps {
  userRole: ROLE;
}

export const AppJsx: React.FC<IAppProps> = ({ userRole }) => {
  const preparedRoutes = useAllowedRoutes(APP_MAIN_ROUTES, userRole);

  return (
    <>
      <Helmet
        htmlAttributes={{
          dir: 'ltr',
          lang: 'ru',
        }}
      >
        <meta charSet="utf-8" />
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:url" content={process.env.PUBLIC_URL + '/hi'} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Lorder - трекер задач и времени для людей, а не корпораций" />
        <meta property="og:image" content={process.env.PUBLIC_URL + '/android-chrome-192x192.png'} />
        <meta property="og:description" content={DESCRIPTION} />
      </Helmet>
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Redirect from="/index.html" to="/" exact />
          {preparedRoutes.map((route: IRoute) => (
            <NestedRoute key={route.path} {...route} />
          ))}
          <Redirect from="/" to="/hi" exact />
          <Redirect to="/auth" />
        </Switch>
      </Suspense>
    </>
  );
};
