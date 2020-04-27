import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { DownloadList } from '#/@store/@common/entities';
import { projectTaskTypes } from '#/@store/projects/selectors';

import { TaskType } from './task-type';

import { IState } from '@types';

const baseState = (state: IState) => state.taskTypes;

export const taskTypesIsLoaded = createDeepEqualSelector(baseState, (state: DownloadList): boolean => state.isLoaded);

export const taskTypesIsLoading = createDeepEqualSelector(baseState, (state: DownloadList): boolean => state.isLoading);

export const taskTypeList = createDeepEqualSelector(
  baseState,
  (state: DownloadList<TaskType>): TaskType[] => state.list
);

export const getTaskTypeById = createDeepEqualSelector(taskTypeList, (list: TaskType[]) => (id: number) =>
  list.find(e => e.id === id) || new TaskType()
);

export const filteredTaskTypes = createDeepEqualSelector(
  [taskTypeList, projectTaskTypes],
  (allTaskTypes, selectedTaskTypes) =>
    selectedTaskTypes && allTaskTypes.filter(tt => !~selectedTaskTypes.list.findIndex(e => e.id === tt.id))
);
