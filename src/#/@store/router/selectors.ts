import { match as IMatch } from 'react-router-dom';

import { createMatchSelector } from 'connected-react-router';
import get from 'lodash/get';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { getQueryParam } from '#/@store/@common/helpers';
import { userRole } from '#/@store/identity/selectors';

import { ROUTE, TASKS_ROUTE } from './consts';

import { IState } from '@types';

type IMatchIdentifier = IMatch<{
  identifier?: string;
  project?: string;
}>;

const baseState = (state: IState) => state.router;

export const prevLocation = createDeepEqualSelector(baseState, s => s.prevLocation);

export const availableRoutes = createDeepEqualSelector([baseState, userRole], (s, role) => {
  return s.routes.filter(r => r.access[0].includes(role));
});

const match = (path: string) => (state: IState): IMatchIdentifier =>
  createMatchSelector(path)(state) as IMatchIdentifier;

const routerSearch = createDeepEqualSelector(baseState, (router: any) => router.location && router.location.search);

export const identifier = createDeepEqualSelector(match('/start/:identifier'), (state: IMatchIdentifier) =>
  get(state, 'params.identifier')
);

export const projectIdSearchParam = createDeepEqualSelector(routerSearch, (search: string) =>
  getQueryParam(search, 'project')
);

export const routeProjectId = createDeepEqualSelector(
  match('/projects/:projectId'),
  (state): number | undefined => get(state, 'params.projectId') && parseInt(get(state, 'params.projectId'), 10)
);

export const routeTaskSequenceNumber = createDeepEqualSelector(
  match(`${TASKS_ROUTE()}/:sequenceNumber`),
  (state): number | undefined =>
    get(state, 'params.sequenceNumber') && parseInt(get(state, 'params.sequenceNumber'), 10)
);

const UUID_PARAM = 'uuid';
export const routePublicProjectUuid = createDeepEqualSelector(match(ROUTE.PUBLIC.ONE(`:${UUID_PARAM}`)), (state):
  | string
  | undefined => get(state, `params.${UUID_PARAM}`));
