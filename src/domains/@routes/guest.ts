import { Digits } from '../digits';
import { Info } from '../landing';
import { Login } from '../login';
import { NoMatch } from '../noMatch';
import { PublicProject } from '../publicProject';
import { Start } from '../start';

export const routes = [
  {
    component: Login,
    exact: true,
    path: '/login',
  },
  {
    component: Info,
    exact: true,
    path: '/',
  },
  {
    component: Digits,
    path: '/digits',
  },
  {
    component: Start,
    path: '/start/:identifier',
  },
  {
    component: PublicProject,
    path: '/:projectId',
  },
  {
    component: NoMatch,
  },
];
