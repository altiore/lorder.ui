import { createAction } from 'redux-actions';

const SOCKETS_NAME = 'SOCKETS';

export const initSocketsAction = createAction(`${SOCKETS_NAME}/INIT`);

export const updateTaskAction = createAction(`${SOCKETS_NAME}/UPDATE_TASK`);
