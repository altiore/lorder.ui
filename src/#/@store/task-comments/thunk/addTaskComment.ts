import { Dispatch } from 'redux';

import { getProjectMemberById } from '#/@store/projects';

import { postTaskComment } from '../actions';

import { IState } from '@types';

export const addTaskComment = (projectId: number, taskId: number, comment: string) => async (
  dispatch: Dispatch,
  getState: () => IState
) => {
  const response = await dispatch(postTaskComment(projectId, taskId, comment));
  const newComment = response?.payload?.data;
  if (newComment) {
    return {
      ...newComment,
      user: getProjectMemberById(getState())(newComment.userId),
    };
  }
  return false;
};
