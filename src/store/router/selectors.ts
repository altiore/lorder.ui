import { match as IMatch } from 'react-router';
import { createMatchSelector } from 'react-router-redux';
import { createSelector } from 'reselect';

import { IState } from '../rootReducer';

type IMatchIdentifier = IMatch<{identifier: string}>;

const match = (state: IState) => createMatchSelector('/start/:identifier')(state) as IMatchIdentifier;

export const identifier = createSelector(match, (state: IMatchIdentifier) => state && state.params && state.params.identifier);