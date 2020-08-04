import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import NestedRoute from '#/@common/#nested-route';
import { LayoutLeftDrawer } from '#/@common/layout-left-drawer';
import { Project } from '#/@store/projects';
import { ROLES } from '#/@store/roles';
import { TASKS_ROUTE } from '#/@store/router';

import { ACCESS_LEVEL, IRoute, ROLE } from '@types';
import { useAllowedRoutes } from '@utils/useAllowedRoutes';

export const PROJECT_ROUTES: IRoute[] = [
  {
    access: [ROLES.USERS, ACCESS_LEVEL.WHITE, true],
    component: lazy(() => import('./#invite')),
    path: '/projects/:projectId/invite',
    title: 'Приглашение',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.RED],
    component: lazy(() => import('./#tasks')),
    exact: true,
    path: TASKS_ROUTE(),
    title: 'Задачи',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.GREEN],
    component: lazy(() => import('./#members')),
    path: '/projects/:projectId/members',
    title: 'Участники',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.VIOLET],
    component: lazy(() => import('./#roles')),
    path: '/projects/:projectId/roles',
    title: 'Роли Проекта',
  },
  {
    // TODO: изменить, чтоб было доступно пользователям, когда функционал будет готов
    access: [ROLES.SUPER_ADMINS, ACCESS_LEVEL.VIOLET],
    component: lazy(() => import('./#status-moves')),
    path: '/projects/:projectId/status-moves',
    title: 'Разрешенные перемещения',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.YELLOW],
    component: lazy(() => import('./#parts')),
    path: '/projects/:projectId/parts',
    title: 'Части проекта',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.VIOLET],
    component: lazy(() => import('./#task-types')),
    path: '/projects/:projectId/task-types',
    title: 'Типы задач',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.VIOLET],
    component: lazy(() => import('./#settings')),
    path: '/projects/:projectId/settings',
    title: 'Настройки',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.RED],
    component: lazy(() => import('./#tasks/#-sequenceNumber')),
    path: `${TASKS_ROUTE()}/:sequenceNumber`,
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
        return '/';
      }

      if (openedProject.accessLevel > ACCESS_LEVEL.WHITE) {
        return TASKS_ROUTE();
      }

      if (openedProject.accessLevel === ACCESS_LEVEL.WHITE) {
        return '/projects/:projectId/invite';
      }
    }

    return '/';
  }, [openedProject]);

  if (!openedProject || !openedProject.title) {
    return null;
  }

  return (
    <LayoutLeftDrawer routes={availableRoutes} showFooter>
      <Suspense fallback={<div />}>
        <Switch>
          <Redirect from="/projects/:projectId" to={redirectTo} exact />
          {availableRoutes.map((route: IRoute) => (
            <NestedRoute key={route.path} {...route} />
          ))}
          <Redirect from="/projects/:projectId/invite" to={TASKS_ROUTE()} exact />
        </Switch>
      </Suspense>
    </LayoutLeftDrawer>
  );
};
