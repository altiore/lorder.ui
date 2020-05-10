import React, { lazy, useCallback, useEffect, useMemo } from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import get from 'lodash/get';

import NestedRoute from '#/@common/#NestedRoute';
import { PatchTaskForm } from '#/@common/TaskForm';
import { ROLES } from '#/@store/roles';

import { Location } from 'history';

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
  closeDialog: () => any;
  openDialog: (comp: any, props: any, location: any) => any;
  prevLocation?: Location;
  push: (path: string | any) => any;
  routes: IRoute[];
  userRole: ROLE;
}

export const MainJsx: React.FC<IMainProps & RouteComponentProps> = ({
  closeDialog,
  location,
  openDialog,
  prevLocation,
  push,
  userRole,
}) => {
  const classes = useStyles();

  const preparedRoutes = useAllowedRoutes(MAIN_USER_ROUTES, userRole);

  const isModal = useMemo(() => get(location, ['state', 'modal']), [location]);

  const handleCloseDialog = useCallback(() => {
    closeDialog();
    if (prevLocation) {
      push(prevLocation);
    }
  }, [closeDialog, prevLocation, push]);

  useEffect(() => {
    if (isModal && get(location, 'pathname') !== get(prevLocation, 'pathname')) {
      openDialog(
        <PatchTaskForm taskId={get(location, ['state', 'taskId'])} projectId={get(location, ['state', 'projectId'])} />,
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
        {Boolean(preparedRoutes) && (
          <Switch location={pageLocation}>
            {preparedRoutes.map((route: IRoute) => {
              return <NestedRoute key={route.path} {...route} routes={MAIN_USER_ROUTES} location={pageLocation} />;
            })}
          </Switch>
        )}
      </main>
    </div>
  );
};
