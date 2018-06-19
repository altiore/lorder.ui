import { Login } from '../login';
import { NoMatch } from '../noMatch';
import { Start } from '../start';

export const routes = [
  {
    component: Login,
    exact: true,
    path: '/',
  },
  {
    component: Start,
    path: '/start/:identifier',
  },
  {
    component: NoMatch,
  },
];
