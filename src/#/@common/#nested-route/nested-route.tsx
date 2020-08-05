import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

import LoadingPage from '@components/loading-page';

import NotFound from '#/@common/not-found-page';
import { injectAsyncReducers, removeAsyncReducers } from '#/@store/createStore';

import { IRoute } from '@types';

interface INestedRoute {
  asyncReducersList?: string[];
  location?: any;
  getReducers?: Promise<any>;
}

export const NestedRoute = ({
  component: RouteComponent,
  asyncReducersList,
  exact,
  path,
  redirect,
  getReducers,
  routes,
  location,
  ...rest
}: IRoute & INestedRoute) => {
  const [isRouteLoaded, setIsRouteLoaded] = useState(false);

  useEffect(() => {
    if (getReducers) {
      getReducers.then(reducers => {
        if (asyncReducersList && !asyncReducersList[Object.keys(reducers)[0]]) {
          injectAsyncReducers(reducers);
        }
        setIsRouteLoaded(true);
      });
    } else {
      setIsRouteLoaded(true);
    }
    return () => {
      if (getReducers) {
        getReducers.then(reducers => {
          if (asyncReducersList && asyncReducersList[Object.keys(reducers)[0]]) {
            removeAsyncReducers(reducers);
          }
        });
      }
    };
  }, [asyncReducersList, getReducers]);

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

  if (!isRouteLoaded) {
    return <Route exact={exact} path={path} component={LoadingPage} />;
  }

  return <Route exact={exact} path={path} render={renderRoute} location={location} />;
};
