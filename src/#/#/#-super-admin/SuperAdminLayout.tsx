import React, { lazy } from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import FaceIcon from '@material-ui/icons/Face';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import LaptopIcon from '@material-ui/icons/Laptop';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import SyncAltIcon from '@material-ui/icons/SyncAlt';

import NestedRoute from '#/@common/#NestedRoute';
import { LayoutLeftDrawer } from '#/@common/LayoutLeftDrawer';

import { IRoute } from '@types';

export const MAIN_SUPER_ADMIN_ROUTES: IRoute[] = [
  {
    component: lazy(() => import('./#projects')),
    exact: true,
    icon: <LaptopIcon />,
    path: '/all-projects',
    title: 'Все Проекты',
  },
  {
    component: lazy(() => import('./#users')),
    icon: <FaceIcon />,
    path: '/users',
    title: 'Пользователи',
  },
  {
    component: lazy(() => import('./#roles')),
    icon: <PeopleOutlinedIcon />,
    path: '/roles',
    title: 'Допустимые роли',
  },
  {
    component: lazy(() => import('./#task-types')),
    icon: <FormatSizeIcon />,
    path: '/task-types',
    title: 'Типы Задач',
  },
  {
    component: lazy(() => import('./#task-statuses')),
    icon: <SettingsInputComponentIcon />,
    path: '/task-statuses',
    title: 'Статусы задачи',
  },
  {
    component: lazy(() => import('./#task-status-moves')),
    icon: <SyncAltIcon />,
    path: '/task-status-moves',
    title: 'Разрешенные перемещения',
  },
  {
    component: lazy(() => import('./#feedback')),
    icon: <SyncAltIcon />,
    path: '/feedback',
    title: 'Обратная связь',
  },
  {
    component: lazy(() => import('./#other')),
    icon: <SettingsIcon />,
    path: '/other',
    title: 'Другие функции',
  },
];

export const SuperAdminLayoutJsx: React.FC<RouteComponentProps> = () => {
  return (
    <LayoutLeftDrawer routes={MAIN_SUPER_ADMIN_ROUTES}>
      <Switch>
        {MAIN_SUPER_ADMIN_ROUTES.map((route: IRoute) => {
          return <NestedRoute key={route.path} {...route} />;
        })}
      </Switch>
    </LayoutLeftDrawer>
  );
};
