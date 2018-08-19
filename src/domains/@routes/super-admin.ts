import AccountCircle from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { Dashboard } from '../dashboard';
import { Projects } from '../dashboard/projects/list';
import { Project } from '../dashboard/projects/one';
import { Users } from '../dashboard/users';
import { Digits } from '../digits';
import { NoMatch } from '../noMatch';
import { Profile } from '../profile';

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
    component: Dashboard,
    path: '/',
    routes: [
      {
        component: Projects,
        exact: true,
        icon: AssignmentIcon,
        path: '/projects',
        title: 'Проекты',
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
    ],
  },
  {
    component: NoMatch,
  },
];
