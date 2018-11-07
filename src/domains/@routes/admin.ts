import { Digits } from '../digits';
import { Main } from '../main';
import { NoMatch } from '../noMatch';
import { Profile } from '../profile';
import { PublicProject } from '../publicProject';

export const routes = [
  {
    component: Main,
    path: '/',
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
    component: PublicProject,
    path: '/:projectId',
  },
  {
    component: NoMatch,
  },
];
