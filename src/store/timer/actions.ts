import { createAction } from 'redux-actions';

import { Timer } from './Timer';

export const tickUserWorkTimer = createAction('TIMER/TICK');

export const setCurrentUserWorkId = createAction<Partial<Timer>>('TIMER/SET_CURRENT_USER_TASK_ID');
