import { PURGE } from 'redux-persist';

import { socketTasks } from '@store/sockets';

export const logOut = () => dispatch => {
  socketTasks.emit('leaveAllParticipantProjectRooms');
  dispatch({
    type: PURGE,
    result: () => {
      console.log('user logged out');
    },
  });
};
