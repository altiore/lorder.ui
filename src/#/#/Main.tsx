import React, { lazy, useCallback, useEffect, useMemo } from 'react';

import { Location } from 'history';
import get from 'lodash/get';
import includes from 'lodash/includes';
import { RouteComponentProps, Switch } from 'react-router-dom';

import { IRoute, ROLE } from '@types';

import NestedRoute from '#/@common/#NestedRoute';
import { PatchTaskForm } from '#/@common/TaskForm';
import { ROLES } from '#/@store/roles';

import { Header } from './Header';
import { useStyles } from './styles';

export const MAIN_USER_ROUTES = [
  {
    access: ROLES.ALL,
    icon: 'feedback',
    path: '/feedback',
    title: 'Обратная связь',
    component: lazy(() => import('./#feedback')),
  },

  {
    access: ROLES.USERS,
    exact: true,
    icon: 'assignment',
    path: '/projects',
    title: 'Мои Проекты',
    component: lazy(() => import('./#projects')),
  },
  {
    access: ROLES.USERS,
    path: '/projects/:projectId',
    component: lazy(() => import('./#projects/#:projectId')),
  },
  {
    access: ROLES.USERS,
    path: '/profile',
    title: 'Настройки пользователя',
    component: lazy(() => import('./#profile')),
  },
  {
    access: ROLES.USERS,
    exact: true,
    icon: 'home',
    path: '/',
    title: 'Дом',
    component: lazy(() => import('./#')),
  },

  {
    access: ROLES.SUPER_ADMINS,
    path: '/',
    component: lazy(() => import('./#-super-admin')),
  },
];

export interface IMainProps {
  closeDialog: () => any;
  goBack: () => any;
  openDialog: (comp: any, props: any, location: any) => any;
  prevLocation?: Location;
  push: (path: string | any) => any;
  routes: IRoute[];
  userRole: ROLE;
}

export const MainJsx: React.FC<IMainProps & RouteComponentProps> = ({
  closeDialog,
  goBack,
  location,
  openDialog,
  prevLocation,
  push,
  userRole,
}) => {
  const classes = useStyles();

  const preparedRoutes = useMemo(() => {
    return MAIN_USER_ROUTES.filter(r => includes(r.access, userRole));
  }, [userRole]);

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
