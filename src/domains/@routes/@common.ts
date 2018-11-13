import { Digits } from '../digits';
import { PublicProject } from '../publicProject';
import { Start } from '../start';

export const commonRoutes = [
  {
    component: Start,
    path: '/start/:identifier',
  },
  {
    component: Digits,
    path: '/digits',
  },
  {
    component: PublicProject,
    path: '/p/:projectId',
  },
];
