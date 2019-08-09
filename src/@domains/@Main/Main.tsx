import React, { lazy, useEffect } from 'react';

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
};

export interface IMainProps {
  closeDialog: () => any;
  goBack: () => any;
  openDialog: (comp: any, props: any, location: any) => any;
  push: (path: string | any) => any;
  routes: IRoute[];
}

export const MainJsx: React.FC<IMainProps & RouteComponentProps> = ({
  closeDialog,
  goBack,
  location,
  openDialog,
  push,
  routes,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (get(location, ['state', 'modal'])) {
      openDialog(
        <PatchTaskForm taskId={location.state.taskId} projectId={location.state.projectId} />,
        {
          maxWidth: 'lg',
          onClose: () => {
            closeDialog();
            goBack();
          },
        },
        location
      );
    }
  }, [closeDialog, goBack, location, openDialog, push]);

  if (!routes) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.background} />
      <div className={classes.background2} />
      <main className={classes.main}>
        <Switch>
          {routes.map((route: IRoute) => (
            <RouteWithSubRoutes key={route.path} component={ROUTES_BY_PATH[route.path]} {...route} />
          ))}
        </Switch>
      </main>
    </div>
  );
};
