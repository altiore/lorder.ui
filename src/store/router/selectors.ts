import get from 'lodash-es/get';
import { match as IMatch } from 'react-router';
import { createMatchSelector } from 'react-router-redux';
import { createSelector } from 'reselect';

import { IState } from 'src/@types';

type IMatchIdentifier = IMatch<{
  identifier?: string;
  projectId?: string;
}>;

const match = (path: string) => (state: IState) => createMatchSelector(path)(state) as IMatchIdentifier;

export const identifier = createSelector(match('/start/:identifier'), (state: IMatchIdentifier) =>
  get(state, 'params.identifier')
);

export const projectId = createSelector(
  match('/projects/:projectId'),
  (state): number => parseInt(get(state, 'params.projectId', ''), 0)
);
