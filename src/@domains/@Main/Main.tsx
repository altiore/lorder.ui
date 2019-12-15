import React, { lazy, useCallback, useEffect, useMemo } from 'react';

import { Location } from 'history';
import get from 'lodash/get';
import { RouteComponentProps, Switch } from 'react-router-dom';

import { IRoute } from '@types';

import { RouteWithSubRoutes } from '@domains/@common/RouteWithSubRoutes';
import { PatchTaskForm } from '@domains/@common/TaskForm';

import { Header } from './Header';
import { useStyles } from './styles';

export const ROUTES_BY_PATH = {
  '/': lazy(() => import('./@Dashboard')),
  '/all-projects': lazy(() => import('@domains/@Main/@Projects/list/all')),
  '/feedback': lazy(() => import('@domains/@Main/@routes/feedback')),
  '/projects': lazy(() => import('./@Projects/list')),
  '/projects/:projectId': lazy(() => import('./@Projects/one')),
  '/task-types': lazy(() => import('@domains/@Main/@routes/task-types')),
  '/users': lazy(() => import('@domains/@Main/@routes/users')),
  '/profile': lazy(() => import('@domains/@Main/@Profile')),
  '/sockets': lazy(() => import('@domains/Sockets')),
};

export interface IMainProps {
  closeDialog: () => any;
  goBack: () => any;
  openDialog: (comp: any, props: any, location: any) => any;
  prevLocation?: Location;
  push: (path: string | any) => any;
  routes: IRoute[];
}

export const MainJsx: React.FC<IMainProps & RouteComponentProps> = ({
  closeDialog,
  goBack,
  location,
  openDialog,
  prevLocation,
  push,
  routes,
}) => {
  const classes = useStyles();

  const isModal = useMemo(() => get(location, ['state', 'modal']), [location]);

  const handleCloseDialog = useCallback(() => {
    closeDialog();
    if (prevLocation) {
      push(prevLocation);
    }
  }, [closeDialog, prevLocation, push]);

  useEffect(() => {
    if (isModal && location.pathname !== get(prevLocation, 'pathname')) {
      openDialog(
        <PatchTaskForm taskId={location.state.taskId} projectId={location.state.projectId} />,
        {
          maxWidth: 'lg',
          onClose: handleCloseDialog,
        },
        prevLocation
      );
    }
  }, [handleCloseDialog, isModal, prevLocation, location, openDialog, push]);

  const pageLocation = useMemo(() => (isModal && prevLocation ? prevLocation : location), [
    isModal,
    prevLocation,
    location,
  ]);

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.background} />
      <div className={classes.background2} />
      <main className={classes.main}>
        {Boolean(routes) && (
          <Switch location={pageLocation}>
            {routes.map(({ exact, path, redirect, routes }: IRoute) => {
              return (
                <RouteWithSubRoutes
                  key={path}
                  component={ROUTES_BY_PATH[path]}
                  exact={exact}
                  path={path}
                  redirect={redirect}
                  routes={routes}
                  location={pageLocation}
                />
              );
            })}
          </Switch>
        )}
      </main>
    </div>
  );
};
