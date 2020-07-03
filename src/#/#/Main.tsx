import React, { lazy, Suspense, useCallback, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps, Switch } from 'react-router-dom';

import { Location } from 'history';
import get from 'lodash/get';

import { DialogProps } from '@material-ui/core/Dialog';

import NestedRoute from '#/@common/#NestedRoute';
import { PatchTaskForm } from '#/@common/TaskForm';
import { DEFAULT_TRANSITION_DURATION } from '#/@store/dialog/consts';
import { ROLES } from '#/@store/roles';
import { EDIT_TASK_FORM } from '#/@store/tasks';

import { Header } from './Header';
import { useStyles } from './styles';

import { IRoute, ROLE } from '@types';
import { useAllowedRoutes } from '@utils/useAllowedRoutes';

export const MAIN_USER_ROUTES: IRoute[] = [
  {
    access: [ROLES.USERS],
    component: lazy(() => import('./#projects')),
    exact: true,
    icon: 'assignment',
    path: '/projects',
    title: 'Мои Проекты',
  },
  {
    access: [ROLES.USERS],
    component: lazy(() => import('./#projects/#-projectId')),
    path: '/projects/:projectId',
  },
  {
    access: [ROLES.USERS],
    component: lazy(() => import('./#profile')),
    path: '/profile',
    title: 'Настройки пользователя',
  },
  {
    access: [ROLES.USERS],
    component: lazy(() => import('./#')),
    exact: true,
    icon: 'home',
    path: '/',
    title: 'Дом',
  },

  {
    access: [ROLES.SUPER_ADMINS],
    component: lazy(() => import('./#-super-admin')),
    path: '/',
  },
];

export interface IMainProps {
  destroy: (form: string) => void;
  getAllTasks: () => any;
  openDialog: (comp: any, props: any, location: any) => any;
  prevLocation?: Location;
  push: (path: string | any) => any;
  routes: IRoute[];
  userRole: ROLE;
}

export const MainJsx: React.FC<IMainProps & RouteComponentProps> = ({
  destroy,
  getAllTasks,
  location,
  openDialog,
  prevLocation,
  push,
  userRole,
}) => {
  const classes = useStyles();

  const preparedRoutes = useAllowedRoutes(MAIN_USER_ROUTES, userRole);

  const isModal = useMemo(() => get(location, ['state', 'modal']), [location]);

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  const handleCloseDialog = useCallback(() => {
    if (prevLocation) {
      push(prevLocation);
      setTimeout(() => {
        destroy(EDIT_TASK_FORM);
      }, DEFAULT_TRANSITION_DURATION);
    } else {
      push('/');
      destroy(EDIT_TASK_FORM);
    }
  }, [destroy, prevLocation, push]);

  useEffect(() => {
    if (isModal && location?.pathname !== prevLocation?.pathname) {
      openDialog(
        <PatchTaskForm taskId={get(location, ['state', 'taskId'])} projectId={get(location, ['state', 'projectId'])} />,
        {
          maxWidth: 'lg',
          onClose: handleCloseDialog,
        } as Partial<DialogProps>,
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
      <Helmet>
        <body className={classes.scrollBody} />
      </Helmet>
      <Header />
      <div className={classes.background} />
      <div className={classes.background2} />
      <main className={classes.main}>
        <Suspense fallback={<div />}>
          {Boolean(preparedRoutes) && (
            <Switch location={pageLocation}>
              {preparedRoutes.map((route: IRoute) => {
                return <NestedRoute key={route.path} {...route} routes={MAIN_USER_ROUTES} location={pageLocation} />;
              })}
            </Switch>
          )}
        </Suspense>
      </main>
    </div>
  );
};
