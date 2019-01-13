import { Digits } from 'src/domains/digits';
import { PublicProject } from 'src/domains/publicProject';
import { Start } from 'src/domains/start';

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
