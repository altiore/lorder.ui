import { createAction } from 'redux-actions';

const SOCKETS_NAME = 'EXTERNAL_LIBRARIES';

export const initExtLibrariesAction = createAction(`${SOCKETS_NAME}/INIT`);
