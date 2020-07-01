import { Dispatch } from 'redux';

import { getProjectMemberById } from '#/@store/projects';

import { getTaskComments } from '../actions';

import { IState } from '@types';

export const fetchTaskComments = (projectId: number, taskId: number) => async (
  dispatch: Dispatch,
  getState: () => IState
) => {
  const response = await dispatch(getTaskComments(projectId, taskId));
  const TaskComments = response?.payload?.data?.data;
  if (TaskComments) {
    return TaskComments.map((task: any) => {
      return { ...task, user: getProjectMemberById(getState())(task.userId) };
    });
  }
  return [];
};
