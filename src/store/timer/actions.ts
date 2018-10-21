import { createAction } from 'redux-actions';

import { ITimer } from './reducer';

export const tickUserWorkTimer = createAction('TIMER/TICK');

export const setCurrentUserWorkId = createAction<Partial<ITimer>>('TIMER/SET_CURRENT_USER_TASK_ID');
