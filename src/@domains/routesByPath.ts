import { lazy } from 'react';

export const ROUTES_BY_PATH = {
  '/': lazy(() => import('@domains/@Main')),
  '/hi': lazy(() => import('@domains/@Hi')),
  '/login': lazy(() => import('@domains/@Login')),
  '/p/:projectId': lazy(() => import('@domains/@PublicProject')),
  '/start/:identifier': lazy(() => import('@domains/@Start')),
};
