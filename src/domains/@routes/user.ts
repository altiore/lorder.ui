import AssignmentIcon from '@material-ui/icons/Assignment';

import { Digits } from '../digits';
import { Main } from '../main';
import { Projects } from '../main/projects/list';
import { Project } from '../main/projects/one';
import { NoMatch } from '../noMatch';
import { Profile } from '../profile';

export const routes = [
  {
    component: Main,
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
