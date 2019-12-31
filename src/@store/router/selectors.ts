import get from 'lodash/get';
import { match as IMatch } from 'react-router';
import { createSelector } from 'reselect';

import { IState } from '@types';
import { getQueryParam } from '@store/@common/helpers';
import { userRole } from '@store/identity/selectors';

const { createMatchSelector } = require('connected-react-router');

type IMatchIdentifier = IMatch<{
  identifier?: string;
  project?: string;
}>;

const baseState = (state: IState) => state.router;

export const prevLocation = createSelector(
  baseState,
  s => s.prevLocation
);

export const availableRoutes = createSelector(
  [baseState, userRole],
  (s, role) => {
    return s.routes.filter(r => r.access[0].includes(role));
  }
);

export const getAvailableRoutes = createSelector(
  [baseState, userRole],
  (s, role) => basePath => {
    return s.routes.filter(r => ~r.path.indexOf(basePath) && r.access[0].includes(role));
  }
);

const match = (path: string) => (state: IState): IMatchIdentifier =>
  createMatchSelector(path)(state) as IMatchIdentifier;

const routerSearch = createSelector(
  baseState,
  (router: any) => router.location && router.location.search
);

export const identifier = createSelector(
  match('/start/:identifier'),
  (state: IMatchIdentifier) => get(state, 'params.identifier')
);

export const projectIdSearchParam = createSelector(
  routerSearch,
  (search: string) => getQueryParam(search, 'project')
);

export const routeProjectId = createSelector(
  match('/projects/:projectId'),
  (state): number | undefined => get(state, 'params.projectId') && parseInt(get(state, 'params.projectId'), 0)
);

export const routeTaskSequenceNumber = createSelector(
  match('/projects/:projectId/tasks/:sequenceNumber'),
  (state): number | undefined => get(state, 'params.sequenceNumber') && parseInt(get(state, 'params.sequenceNumber'), 0)
);
