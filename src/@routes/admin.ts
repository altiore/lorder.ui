import { NoMatch } from 'src/components/NoMatch';
import { Main } from 'src/domains/main';
import { Profile } from 'src/domains/profile';
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
