import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

import { IRoute } from 'src/@types';

const renderRoute = (route: IRoute) => (props: RouteComponentProps<any>) => {
  return <route.component key={route.path || 'NotFound'} {...props} routes={route.routes} />;
};

export const RouteWithSubRoutes = (route: IRoute) => {
  if (route.redirect) {
    return <Redirect to={route.redirect} />;
  }
  return <Route exact={route.exact} path={route.path} render={renderRoute(route)} />;
};
