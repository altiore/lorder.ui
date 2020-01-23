import React, { lazy, memo, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { IRoute } from '@types';

import LoadingPage from '@components/LoadingPage';
import NestedRoute from '#/@common/#NestedRoute';
import NotFound from '#/@common/NotFoundPage';
import { availableRoutes } from '#/@store/router';

export const ROUTES_BY_PATH = {
  '/': lazy(() => import('./#')),
  '/hi': lazy(() => import('./#hi')),
  '/login': lazy(() => import('./#login')),
  '/p/:projectId': lazy(() => import('./#p/#:projectId')),
  '/start/:identifier': lazy(() => import('./#start/#:identifier')),
};

export const REDUCERS_BY_PATH = {
  '/': import('./#/@store/reducers'),
};

export const App: React.FC = memo(() => {
  const routes = useSelector(availableRoutes);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Switch>
        {routes.map((route: IRoute) => (
          <NestedRoute
            getReducers={REDUCERS_BY_PATH[route.path]}
            key={route.path}
            component={ROUTES_BY_PATH[route.path]}
            {...route}
          />
        ))}
        <Redirect from="/index.html" to="/" exact />
        <Redirect from="/" to="/hi" exact />
        <Redirect to="/login" />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
});
