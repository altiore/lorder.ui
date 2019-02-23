import AccountCircle from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BallotIcon from '@material-ui/icons/Ballot';
import HomeIcon from '@material-ui/icons/Home';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import { NoMatch } from 'src/components/NoMatch';
import { Main } from 'src/domains/main';
import { Dashboard } from 'src/domains/main/@routes/dashboard';
import { AllProjects, OwnProjects } from 'src/domains/main/@routes/projects/list';
import { Project } from 'src/domains/main/@routes/projects/one';
import DragAndDrop from 'src/domains/main/@routes/projects/one/DragAndDrop';
import { ProjectMembers } from 'src/domains/main/@routes/projects/one/ProjectMembers';
import { ProjectTasks } from 'src/domains/main/@routes/projects/one/ProjectTasks';
import { ProjectTaskTypes } from 'src/domains/main/@routes/projects/one/ProjectTaskTypes';
import { Settings } from 'src/domains/main/@routes/projects/one/Settings';
import Task from 'src/domains/main/@routes/task';
import { TaskTypes } from 'src/domains/main/@routes/task-types';
import { Users } from 'src/domains/main/@routes/users';
import { Profile } from 'src/domains/profile';
import { ACCESS_LEVEL } from 'src/store/projects';
import { commonRoutes } from './@common';

export const routes = [
  {
    component: Profile,
    path: '/profile',
  },
  {
    component: Main,
    path: '/',
    routes: [
      {
        component: Dashboard,
        exact: true,
        icon: HomeIcon,
        path: '/',
        title: 'Дом',
      },
      {
        component: OwnProjects,
        exact: true,
        icon: AssignmentIcon,
        path: '/projects',
        title: 'Мои Проекты',
      },
      {
        component: AllProjects,
        exact: true,
        icon: AssignmentIcon,
        path: '/all-projects',
        title: 'Все Проекты',
      },
      {
        component: Project,
        path: '/projects/:projectId',
        routes: [
          {
            accessLevel: ACCESS_LEVEL.RED,
            component: DragAndDrop,
            exact: true,
            icon: ImportExportIcon,
            path: '/projects/:projectId/board',
            title: 'Доска',
          },
          {
            accessLevel: ACCESS_LEVEL.INDIGO,
            component: ProjectTasks,
            exact: true,
            icon: ListAltIcon,
            path: '/projects/:projectId/tasks',
            title: 'Задачи',
          },
          {
            accessLevel: ACCESS_LEVEL.INDIGO,
            component: ProjectTaskTypes,
            exact: true,
            icon: BallotIcon,
            path: '/projects/:projectId/task-types',
            title: 'Типы Задач',
          },
          {
            accessLevel: ACCESS_LEVEL.INDIGO,
            component: ProjectMembers,
            exact: true,
            icon: PeopleIcon,
            path: '/projects/:projectId/members',
            title: 'Участники',
          },
          {
            accessLevel: ACCESS_LEVEL.INDIGO,
            component: Settings,
            exact: true,
            icon: SettingsIcon,
            path: '/projects/:projectId/settings',
            title: 'Другие Настройки',
          },
          {
            accessLevel: ACCESS_LEVEL.RED,
            component: Task,
            path: '/projects/:projectId/tasks/:taskId',
          },
        ],
      },
      {
        component: Users,
        icon: AccountCircle,
        path: '/users',
        title: 'Пользователи',
      },
      {
        component: TaskTypes,
        icon: AccountCircle,
        path: '/task-types',
        title: 'Типы Задач',
      },
      ...commonRoutes,
      {
        component: NoMatch,
      },
    ],
  },
  {
    component: NoMatch,
  },
];
