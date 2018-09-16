import AssignmentIcon from '@material-ui/icons/Assignment';

import { Dashboard } from '../dashboard';
import { Projects } from '../dashboard/projects/list';
import { Project } from '../dashboard/projects/one';
import { Digits } from '../digits';
import { NoMatch } from '../noMatch';
import { Profile } from '../profile';

export const routes = [
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
    ],
  },
  {
    component: Digits,
    path: '/digits',
  },
  {
    component: Profile,
    path: '/profile',
  },
  {
    component: NoMatch,
  },
];
