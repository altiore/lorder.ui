import { lazy } from 'react';

import { ROLES } from '#/@store/roles';
import { ROUTE } from '#/@store/router';

import { IRoute } from '@types';

export const PUBLIC_ROUTES: IRoute[] = [
  {
    access: [ROLES.ALL],
    component: lazy(() => import('./#')),
    exact: true,
    path: ROUTE.PUBLIC.LIST,
  },
  {
    access: [ROLES.ALL],
    component: lazy(() => import('./#-uuid')),
    path: ROUTE.PUBLIC.ONE(),
  },
];
