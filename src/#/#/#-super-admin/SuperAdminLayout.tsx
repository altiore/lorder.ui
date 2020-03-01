import React, { lazy } from 'react';

import FaceIcon from '@material-ui/icons/Face';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import LaptopIcon from '@material-ui/icons/Laptop';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import SyncAltIcon from '@material-ui/icons/SyncAlt';

import { RouteComponentProps, Switch } from 'react-router-dom';

import { IRoute } from '@types';

import NestedRoute from '#/@common/#NestedRoute';
import { ROLES } from '#/@store/roles';
import { LayoutLeftDrawer } from '#/@common/LayoutLeftDrawer';

export const MAIN_SUPER_ADMIN_ROUTES = [
  {
    access: ROLES.SUPER_ADMINS,
    exact: true,
    icon: <LaptopIcon />,
    path: '/all-projects',
    title: 'Все Проекты',
    component: lazy(() => import('./#projects')),
  },
  {
    access: ROLES.SUPER_ADMINS,
    icon: <FaceIcon />,
    path: '/users',
    title: 'Пользователи',
    component: lazy(() => import('./#users')),
  },
  {
    access: ROLES.SUPER_ADMINS,
    icon: <PeopleOutlinedIcon />,
    path: '/roles',
    title: 'Допустимые роли',
    component: lazy(() => import('./#roles')),
  },
  {
    access: ROLES.SUPER_ADMINS,
    icon: <FormatSizeIcon />,
    path: '/task-types',
    title: 'Типы Задач',
    component: lazy(() => import('./#task-types')),
  },
  {
    access: ROLES.SUPER_ADMINS,
    icon: <SettingsInputComponentIcon />,
    path: '/task-statuses',
    title: 'Статусы задачи',
    component: lazy(() => import('./#task-statuses')),
  },
  {
    access: ROLES.SUPER_ADMINS,
    icon: <SyncAltIcon />,
    path: '/task-status-moves',
    title: 'Разрешенные перемещения',
    component: lazy(() => import('./#task-status-moves')),
  },
  {
    access: ROLES.SUPER_ADMINS,
    icon: <SettingsIcon />,
    path: '/other',
    title: 'Другие функции',
    component: lazy(() => import('./#other')),
  },
];

export const SuperAdminLayoutJsx: React.FC<RouteComponentProps> = () => {
  return (
    <LayoutLeftDrawer superAdminRoutes={MAIN_SUPER_ADMIN_ROUTES}>
      <Switch>
        {MAIN_SUPER_ADMIN_ROUTES.map((route: IRoute) => {
          return <NestedRoute key={route.path} {...route} />;
        })}
      </Switch>
    </LayoutLeftDrawer>
  );
};
