import { NoMatch } from 'src/components/NoMatch';
import { Main } from '../main';
import { Profile } from '../profile';
import { commonRoutes } from './@common';

export const routes = [
  {
    component: Main,
    path: '/',
  },
  {
    component: Profile,
    path: '/profile',
  },
  ...commonRoutes,
  {
    component: NoMatch,
  },
];
