import { ACCESS_LEVEL } from '@store/projects';
import { ROLES } from '@store/roles';

export const routes = [
  {
    access: [ROLES.ALL],
    path: '/p/:projectId',
  },
  {
    access: [ROLES.ALL],
    path: '/start/:identifier',
  },
  {
    access: [ROLES.USERS],
    path: '/',
    routes: [
      {
        access: [ROLES.USERS],
        exact: true,
        icon: 'home',
        path: '/',
        title: 'Дом',
      },
      {
        access: [ROLES.USERS],
        path: '/sockets',
      },
      {
        access: [ROLES.USERS],
        path: '/profile',
        title: 'Настройки пользователя',
      },
      {
        access: [ROLES.USERS],
        exact: true,
        icon: 'assignment',
        path: '/projects',
        title: 'Мои Проекты',
      },
      {
        access: [ROLES.USERS],
        exact: true,
        icon: 'assignments',
        path: '/all-projects',
        title: 'Все Проекты',
      },
      {
        access: [ROLES.USERS],
        path: '/projects/:projectId',
        routes: [
          {
            access: [ROLES.USERS, ACCESS_LEVEL.RED],
            exact: true,
            icon: 'import-export',
            path: '/projects/:projectId/board',
            title: 'Доска',
          },
          {
            access: [ROLES.USERS, ACCESS_LEVEL.INDIGO],
            exact: true,
            icon: 'list-alt',
            path: '/projects/:projectId/tasks',
            title: 'Задачи',
          },
          {
            access: [ROLES.USERS, ACCESS_LEVEL.INDIGO],
            exact: true,
            icon: 'ballot',
            path: '/projects/:projectId/task-types',
            title: 'Типы Задач',
          },
          {
            access: [ROLES.USERS, ACCESS_LEVEL.INDIGO],
            exact: true,
            icon: 'people',
            path: '/projects/:projectId/members',
            title: 'Участники',
          },
          {
            access: [ROLES.USERS, ACCESS_LEVEL.INDIGO],
            exact: true,
            icon: 'settings',
            path: '/projects/:projectId/settings',
            title: 'Другие Настройки',
          },
          {
            access: [ROLES.USERS, ACCESS_LEVEL.RED],
            path: '/projects/:projectId/tasks/:taskId',
          },
        ],
      },
      {
        access: [ROLES.ADMINS],
        icon: 'account-circle',
        path: '/users',
        title: 'Пользователи',
      },
      {
        access: [ROLES.ALL],
        icon: 'feedback',
        path: '/feedback',
        title: 'Обратная связь',
      },
      {
        componentName: 'TaskTypes',
        icon: 'account-circle',
        path: '/task-types',
        title: 'Типы Задач',
      },
      {
        component: 'Digits',
        path: '/digits',
      },
    ],
  },
  {
    access: [ROLES.ALL],
    path: '/hi',
  },
  {
    access: [ROLES.GUESTS],
    path: '/login',
  },
  {
    access: [ROLES.USERS],
    path: '/profile',
  },
];
