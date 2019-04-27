import { NoMatch } from 'components/NoMatch';
import { Main } from 'domains/main';
import { Profile } from 'domains/profile';
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
