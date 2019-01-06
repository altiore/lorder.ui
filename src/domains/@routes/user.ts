import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import { NoMatch } from 'src/components/NoMatch';
import { Main } from '../main';
import { Dashboard } from '../main/@routes/dashboard';
import { OwnProjects } from '../main/@routes/projects/list';
import { Project } from '../main/@routes/projects/one';
import DragAndDrop from '../main/@routes/projects/one/DragAndDrop';
import { Profile } from '../profile';
import { commonRoutes } from './@common';

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
        routes: [
          {
            component: DragAndDrop,
            exact: true,
            icon: ImportExportIcon,
            path: '/projects/:projectId/dnd',
            title: 'Board',
          },
        ],
      },
      ...commonRoutes,
    ],
  },
  {
    component: Profile,
    path: '/profile',
  },
  {
    component: NoMatch,
  },
];
