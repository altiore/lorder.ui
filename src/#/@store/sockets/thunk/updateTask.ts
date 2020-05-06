import { initialize } from 'redux-form';

import { SOCKET_FORM_NAME } from '../consts';
import { socketTasks } from './initSockets';

export const updateTask = ({ message }, dispatch) => {
  socketTasks.emit('taskUpdated', message);
  dispatch(initialize(SOCKET_FORM_NAME, {}));
};
