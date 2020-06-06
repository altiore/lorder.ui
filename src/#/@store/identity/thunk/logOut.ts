import { PURGE } from 'redux-persist';

import { socketTasks } from '#/@store/sockets';

export const logOut = () => dispatch => {
  socketTasks.emit('leaveAllParticipantProjectRooms');
  dispatch({
    result: () => {
      window.sessionStorage.clear();
      console.log('user logged out');
    },
    type: PURGE,
  });
};
