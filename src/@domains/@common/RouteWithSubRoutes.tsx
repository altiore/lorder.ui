import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';

import { IRoute } from '@types';

import { ROUTES_BY_PATH } from '@domains/routesByPath';
import NotFound from '@domains/NotFound';

const renderRoute = (route: IRoute) => (props: RouteComponentProps<any>) => {
  const RouteComponent = route.component || ROUTES_BY_PATH[route.path];
  if (!RouteComponent) {
    return <NotFound />;
  }

  return <RouteComponent exact={route.exact} path={route.path} {...props} routes={route.routes} />;
};

export const RouteWithSubRoutes = (route: IRoute) => {
  if (route.redirect) {
    return <Redirect to={route.redirect} />;
  }
  return <Route exact={route.exact} path={route.path} render={renderRoute(route)} />;
};
