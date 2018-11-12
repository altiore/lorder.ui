import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';

import { Digits } from '../digits';
import { Main } from '../main';
import { Dashboard } from '../main/@routes/dashboard';
import { OwnProjects } from '../main/@routes/projects/list';
import { Project } from '../main/@routes/projects/one';
import { NoMatch } from '../noMatch';
import { Profile } from '../profile';
import { PublicProject } from '../publicProject';

export const routes = [
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
        title: 'Проекты',
      },
      {
        component: Project,
        path: '/projects/:projectId',
      },
      {
        component: PublicProject,
        path: '/:projectId',
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
