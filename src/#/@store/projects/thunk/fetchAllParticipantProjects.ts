import get from 'lodash/get';

import { fetchAllParticipantProjectsAction } from '../actions';
import { socketTasks } from '#/@store/sockets';

export const fetchAllParticipantProjects = () => async dispatch => {
  const res = await dispatch(fetchAllParticipantProjectsAction({}));
  const receivedProjectIds = get(res, ['payload', 'data'], []).map(el => el.project.id);
  socketTasks.emit('joinAllParticipantProjectRooms', receivedProjectIds);
};
