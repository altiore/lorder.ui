import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import { NoMatch } from 'src/components/NoMatch';
import { DashboardTaskForm } from 'src/domains/@common/TaskForm';
import { Main } from 'src/domains/main';
import { Dashboard } from 'src/domains/main/@routes/dashboard';
import { OwnProjects } from 'src/domains/main/@routes/projects/list';
import { Project } from 'src/domains/main/@routes/projects/one';
import DragAndDrop from 'src/domains/main/@routes/projects/one/DragAndDrop';
import { Profile } from 'src/domains/profile';
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
            path: '/projects/:projectId/board',
            title: 'Board',
          },
          {
            component: DashboardTaskForm,
            path: '/projects/:projectId/tasks/:taskId',
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
