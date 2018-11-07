import { createSelector } from 'reselect';

import { IState } from 'src/@types';

const baseState = (state: IState) => state.form;

export const isFormMount = (formName: string) => createSelector(baseState, state => !!state[formName]);
