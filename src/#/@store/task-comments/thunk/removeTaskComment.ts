import { Dispatch } from 'redux';

import { deleteTaskComments } from '../actions';

export const removeTaskComment = (projectId: number, taskId: number, commentId: number) => async (
  dispatch: Dispatch
) => {
  await dispatch(deleteTaskComments(projectId, taskId, commentId));
  return commentId;
};
