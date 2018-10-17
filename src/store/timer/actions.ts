import { createAction } from 'redux-actions';

import { ITimer } from './reducer';

export const tickUserTaskTimer = createAction('TIMER/TICK');

export const setCurrentUserTaskId = createAction<Partial<ITimer>>('TIMER/SET_CURRENT_USER_TASK_ID');

export const clearTimer = createAction('TIMER/CLEAR');
