import { Info } from 'src/domains/landing';
import { Login } from 'src/domains/login';
import { commonRoutes } from './@common';

export const routes = [
  {
    component: Login,
    path: '/login',
  },
  {
    component: Info,
    exact: true,
    path: '/',
  },
  ...commonRoutes,
  {
    redirect: '/login',
  },
];
