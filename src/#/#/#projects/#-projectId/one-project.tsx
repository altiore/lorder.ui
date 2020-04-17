import React, { lazy, useEffect, useMemo } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import NestedRoute from '#/@common/#NestedRoute';
import { LayoutLeftDrawer } from '#/@common/LayoutLeftDrawer';
import { Project } from '#/@store/projects';
import { ROLES } from '#/@store/roles';

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
    path: '/projects/:projectId/tasks',
    title: 'Задачи',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.INDIGO],
    component: lazy(() => import('./#roles')),
    path: '/projects/:projectId/roles',
    title: 'Роли Проекта',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.GREEN],
    component: lazy(() => import('./#members')),
    path: '/projects/:projectId/members',
    title: 'Участники',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.INDIGO],
    component: lazy(() => import('./#settings')),
    path: '/projects/:projectId/settings',
    title: 'Настройки',
  },
  {
    access: [ROLES.USERS, ACCESS_LEVEL.RED],
    component: lazy(() => import('./#tasks/#-sequenceNumber')),
    path: '/projects/:projectId/tasks/:sequenceNumber',
  },
];

export interface IProjectProps {
  fetchProjectDetails: any;
  openedProject: Project;
  routes: IRoute[];
  userRole: ROLE;
}

export const ProjectTsx: React.FC<IProjectProps> = ({
  fetchProjectDetails,
  openedProject,
  userRole,
}): JSX.Element | null => {
  useEffect(() => {
    if (
      openedProject &&
      openedProject.id &&
      typeof openedProject.accessLevel === 'number' &&
      openedProject.accessLevel > ACCESS_LEVEL.WHITE &&
      fetchProjectDetails
    ) {
      fetchProjectDetails(openedProject.id);
    }
  }, [fetchProjectDetails, openedProject]);

  const availableRoutes = useAllowedRoutes(PROJECT_ROUTES, userRole, openedProject.accessLevel);

  const redirectTo = useMemo(() => {
    if (typeof openedProject.accessLevel === 'undefined') {
      return '/';
    }

    if (openedProject.accessLevel > ACCESS_LEVEL.WHITE) {
      return '/projects/:projectId/tasks';
    }

    if (openedProject.accessLevel === ACCESS_LEVEL.WHITE) {
      return '/projects/:projectId/invite';
    }

    return '/';
  }, [openedProject]);

  if (!openedProject || !openedProject.title) {
    return null;
  }

  return (
    <LayoutLeftDrawer routes={availableRoutes} showFooter>
      <Switch>
        <Redirect from="/projects/:projectId" to={redirectTo} exact />
        {availableRoutes.map((route: IRoute) => (
          <NestedRoute key={route.path} {...route} />
        ))}
        <Redirect from="/projects/:projectId/invite" to="/projects/:projectId/tasks" exact />
      </Switch>
    </LayoutLeftDrawer>
  );
};
