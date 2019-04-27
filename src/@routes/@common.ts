import { Digits } from 'domains/digits';
import { PublicProject } from 'domains/publicProject';
import { Start } from 'domains/start';

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
