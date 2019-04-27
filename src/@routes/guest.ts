import { Info } from 'domains/landing';
import { Login } from 'domains/login';
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
