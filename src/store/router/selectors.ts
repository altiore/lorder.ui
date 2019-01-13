import get from 'lodash-es/get';
import { match as IMatch } from 'react-router';
import { createSelector } from 'reselect';
const { createMatchSelector } = require('connected-react-router');

import { IState } from 'src/@types';
import { getQueryParam } from 'src/store/@common/helpers';

type IMatchIdentifier = IMatch<{
  identifier?: string;
  project?: string;
}>;

const baseState = (state: IState) => state.router;

const match = (path: string) => (state: IState): IMatchIdentifier =>
  createMatchSelector(path)(state) as IMatchIdentifier;

const routerSearch = createSelector(baseState, (router: any) => router.location && router.location.search);

export const identifier = createSelector(match('/start/:identifier'), (state: IMatchIdentifier) =>
  get(state, 'params.identifier')
);

export const projectIdSearchParam = createSelector(routerSearch, (search: string) => getQueryParam(search, 'project'));

export const projectId = createSelector(
  match('/projects/:projectId'),
  (state): number | undefined => get(state, 'params.projectId') && parseInt(get(state, 'params.projectId'), 0)
);
