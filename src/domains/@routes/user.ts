import { Dashboard } from '../dashboard';
import { NoMatch } from '../noMatch';

export const routes = [
  {
    component: Dashboard,
    exact: true,
    path: '/dashboard',
  },
  {
    component: NoMatch,
  },
];
