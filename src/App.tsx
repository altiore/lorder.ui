import React, { lazy, memo, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { IRoute } from '@types';

import LoadingPage from '@components/LoadingPage';
import { RouteWithSubRoutes } from '@domains/@common/RouteWithSubRoutes';
import NotFound from '@domains/@common/NotFoundPage';
import { availableRoutes } from '@store/router';

export const ROUTES_BY_PATH = {
  '/': lazy(() => import('@domains/##')),
  '/hi': lazy(() => import('@domains/#hi')),
  '/login': lazy(() => import('@domains/#login')),
  '/p/:projectId': lazy(() => import('@domains/#p/#:projectId')),
  '/start/:identifier': lazy(() => import('@domains/#start/#:identifier')),
};

const App: React.FC = memo(() => {
  const routes = useSelector(availableRoutes);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Switch>
        {routes.map((route: IRoute) => (
          <RouteWithSubRoutes key={route.path} component={ROUTES_BY_PATH[route.path]} {...route} />
        ))}
        <Redirect from="/index.html" to="/" exact />
        <Redirect from="/" to="/hi" exact />
        <Redirect to="/login" />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
});

export default App;
