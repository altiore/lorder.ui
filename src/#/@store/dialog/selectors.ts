import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IDialog, IDialogState } from './Dialog';

import { IState } from '@types';

const baseState = (state: IState) => state.dialog;

export const dialogsData = createDeepEqualSelector(baseState, (state: IDialogState): IDialog[] => state.dialogs);

export const lastProps = createDeepEqualSelector(baseState, (state: IDialogState) => state.lastProps);
