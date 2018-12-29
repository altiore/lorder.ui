import AccountCircle from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BallotIcon from '@material-ui/icons/Ballot';
import HomeIcon from '@material-ui/icons/Home';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import { NoMatch } from 'src/components/NoMatch';
import { Main } from '../main';
import { Dashboard } from '../main/@routes/dashboard';
import { AllProjects, OwnProjects } from '../main/@routes/projects/list';
import { Project } from '../main/@routes/projects/one';
import DragAndDrop from '../main/@routes/projects/one/DragAndDrop';
import { ProjectMembers } from '../main/@routes/projects/one/ProjectMembers';
import { ProjectTasks } from '../main/@routes/projects/one/ProjectTasks';
import { ProjectTaskTypes } from '../main/@routes/projects/one/ProjectTaskTypes';
import { Settings } from '../main/@routes/projects/one/Settings';
import { Users } from '../main/@routes/users';
import { Profile } from '../profile';
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
            component: DragAndDrop,
            exact: true,
            icon: ImportExportIcon,
            path: '/projects/:projectId/dnd',
            title: 'Board',
          },
          {
            component: ProjectTasks,
            exact: true,
            icon: ListAltIcon,
            path: '/projects/:projectId/tasks',
            title: 'Задачи',
          },
          {
            component: ProjectTaskTypes,
            exact: true,
            icon: BallotIcon,
            path: '/projects/:projectId/task-types',
            title: 'Типы Задач',
          },
          {
            component: ProjectMembers,
            exact: true,
            icon: PeopleIcon,
            path: '/projects/:projectId/members',
            title: 'Участники',
          },
          {
            component: Settings,
            exact: true,
            icon: SettingsIcon,
            path: '/projects/:projectId/settings',
            title: 'Другие Настройки',
          },
        ],
      },
      {
        component: Users,
        icon: AccountCircle,
        path: '/users',
        title: 'Пользователи',
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
