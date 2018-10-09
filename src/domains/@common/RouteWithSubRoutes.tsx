import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { IRoute } from 'src/@types';

const renderRoute = (route: IRoute) => (props: RouteProps) => (
  <route.component key={route.path || 'NotFound'} {...props} routes={route.routes} />
);

export const RouteWithSubRoutes = (route: IRoute) => (
  <Route exact={route.exact} path={route.path} render={renderRoute(route)} />
);
