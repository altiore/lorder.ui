import get from 'lodash/get';

import { socketTasks } from '#/@store/sockets';

import { fetchAllParticipantProjectsAction } from '../actions';

export const fetchAllParticipantProjects = () => async dispatch => {
  const res = await dispatch(fetchAllParticipantProjectsAction());
  const receivedProjectIds = get(res, ['payload', 'data'], []).map(el => el.project.id);
  socketTasks.emit('joinAllParticipantProjectRooms', receivedProjectIds);
};
