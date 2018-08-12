import { createSelector } from 'reselect';

import { DownloadList } from '../@common/entities';
import { IState } from '../rootReducer';
import { TaskType } from './TaskType'

const baseState = (state: IState) => state.taskTypes;

export const taskTypesIsLoaded = createSelector(baseState, (state: DownloadList): boolean => state.isLoaded);

export const taskTypesIsLoading = createSelector(baseState, (state: DownloadList): boolean => state.isLoading);

export const taskTypeList = createSelector(baseState, (state: DownloadList<TaskType>): TaskType[] => state.list);
