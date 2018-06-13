import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { IRoute } from 'src/@types'

const renderRoute = (route: IRoute) => (props: RouteProps) => (
  <route.component {...props} routes={route.routes} />
);

export const RouteWithSubRoutes = (route: IRoute) => (
  <Route
    path={route.path}
    render={renderRoute(route)}
  />
);
