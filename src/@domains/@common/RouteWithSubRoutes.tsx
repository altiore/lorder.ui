import React, { memo, useCallback } from 'react';

import { Redirect, Route, RouteComponentProps } from 'react-router';

import { IRoute } from '@types';

import NotFound from '@domains/NotFound';

export const RouteWithSubRoutes = memo(
  ({ component: RouteComponent, exact, path, redirect, routes, location }: IRoute & { location?: any }) => {
    const renderRoute = useCallback(
      (props: RouteComponentProps<any>) => {
        if (!RouteComponent) {
          return <NotFound />;
        }

        return <RouteComponent exact={exact} path={path} routes={routes} {...props} />;
      },
      [RouteComponent, exact, path, routes]
    );

    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return <Route exact={exact} path={path} render={renderRoute} location={location} />;
  }
);
