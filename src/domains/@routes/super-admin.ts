import AccountCircle from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';

import { Digits } from '../digits';
import { Main } from '../main';
import { Dashboard } from '../main/dashboard';
import { AllProjects, OwnProjects } from '../main/projects/list';
import { Project } from '../main/projects/one';
import { Users } from '../main/users';
import { NoMatch } from '../noMatch';
import { Profile } from '../profile';
import { PublicProject } from '../publicProject';

export const routes = [
  {
    component: Digits,
    path: '/digits',
  },
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
      {
        component: PublicProject,
        path: '/:projectId',
      },
    ],
  },
  {
    component: NoMatch,
  },
];
