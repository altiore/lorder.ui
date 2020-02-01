import React, { memo, useCallback, useEffect, useState } from 'react';

import { Redirect, Route, RouteComponentProps } from 'react-router';

import { IRoute } from '@types';

import { injectAsyncReducers, removeAsyncReducers } from '#/@store/createStore';
import NotFound from '#/@common/NotFoundPage';
import LoadingPage from '@components/LoadingPage';

interface INestedRoute {
  asyncReducersList?: string[];
  location?: any;
  getReducers?: Promise<any>;
}

export const NestedRoute = memo(
  ({
    component: RouteComponent,
    asyncReducersList,
    exact,
    path,
    redirect,
    getReducers,
    routes,
    location,
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
      return <LoadingPage />;
    }

    return <Route exact={exact} path={path} render={renderRoute} location={location} />;
  }
);
