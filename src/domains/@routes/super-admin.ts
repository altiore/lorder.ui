import AccountCircle from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';

import { Main } from '../main';
import { Dashboard } from '../main/@routes/dashboard';
import { AllProjects, OwnProjects } from '../main/@routes/projects/list';
import { Project } from '../main/@routes/projects/one';
import { Users } from '../main/@routes/users';
import { NoMatch } from '../noMatch';
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
