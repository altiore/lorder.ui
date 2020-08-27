import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import NestedRoute from '#/@common/#nested-route';
import { LayoutLeftDrawer } from '#/@common/layout-left-drawer';
import { Project } from '#/@store/projects';
import { ROLES } from '#/@store/roles';
import { ROUTE } from '#/@store/router';

import { ACCESS_LEVEL, IRoute, ROLE } from '@types';
import { useAllowedRoutes } from '@utils/useAllowedRoutes';

export const PROJECT_ROUTES: IRoute[] = [
  {
    access: [ROLES.USERS, ACCESS_LEVEL.WHITE, true],
    component: lazy(() => import('./#invite')),
    path: ROUTE.PROJECT.INVITE(),
    title: 'Приглашение',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.RED],
    component: lazy(() => import('./#tasks')),
    exact: true,
    path: ROUTE.PROJECT.TASKS(),
    title: 'Задачи',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.GREEN],
    component: lazy(() => import('./#members')),
    path: ROUTE.PROJECT.MEMBERS(),
    title: 'Участники',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.VIOLET],
    component: lazy(() => import('./#roles')),
    path: ROUTE.PROJECT.ROLES(),
    title: 'Роли Проекта',
  },
  {
    // TODO: изменить, чтоб было доступно пользователям, когда функционал будет готов
    access: [ROLES.SUPER_ADMINS, ACCESS_LEVEL.VIOLET],
    component: lazy(() => import('./#status-moves')),
    path: ROUTE.PROJECT.STATUS_MOVES(),
    title: 'Разрешенные перемещения',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.YELLOW],
    component: lazy(() => import('./#parts')),
    path: ROUTE.PROJECT.PARTS(),
    title: 'Части проекта',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.VIOLET],
    component: lazy(() => import('./#task-types')),
    path: ROUTE.PROJECT.TASK_TYPES(),
    title: 'Типы задач',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.VIOLET],
    component: lazy(() => import('./#settings')),
    path: ROUTE.PROJECT.SETTINGS(),
    title: 'Настройки',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.RED],
    component: lazy(() => import('./#tasks/#-sequenceNumber')),
    path: ROUTE.PROJECT.TASK.ONE(),
  },
];

export interface IProjectProps {
  fetchOneProject: any;
  openedProject: Project;
  routes: IRoute[];
  userRole: ROLE;
}

export const ProjectTsx: React.FC<IProjectProps> = ({
  fetchOneProject,
  openedProject,
  userRole,
}): JSX.Element | null => {
  useEffect(() => {
    if (fetchOneProject) {
      fetchOneProject();
    }
  }, [fetchOneProject]);

  const availableRoutes = useAllowedRoutes(PROJECT_ROUTES, userRole, openedProject && openedProject.accessLevel);

  const redirectTo = useMemo(() => {
    if (openedProject) {
      if (typeof openedProject.accessLevel === 'undefined') {
        return ROUTE.MAIN;
      }

      if (openedProject.accessLevel > ACCESS_LEVEL.WHITE) {
        return ROUTE.PROJECT.TASKS();
      }

      if (openedProject.accessLevel === ACCESS_LEVEL.WHITE) {
        return ROUTE.PROJECT.INVITE();
      }
    }

    return ROUTE.MAIN;
  }, [openedProject]);

  if (!openedProject || !openedProject.title) {
    return null;
  }

  return (
    <LayoutLeftDrawer routes={availableRoutes} showFooter>
      <Suspense fallback={<div />}>
        <Switch>
          <Redirect from={ROUTE.PROJECT.ONE()} to={redirectTo} exact />
          {availableRoutes.map((route: IRoute) => (
            <NestedRoute key={route.path} {...route} />
          ))}
          <Redirect from={ROUTE.PROJECT.INVITE()} to={ROUTE.PROJECT.TASKS()} exact />
        </Switch>
      </Suspense>
    </LayoutLeftDrawer>
  );
};
