import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IState } from '@types';

const baseState = (state: IState) => state.form;

export const isFormMount = (formName: string) => createDeepEqualSelector(baseState, state => !!state[formName]);
