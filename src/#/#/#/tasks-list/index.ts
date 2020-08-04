import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { fetchProjectsDetails, getProjectById } from '#/@store/projects';
import { allTaskLength, isTasksLoaded, isTasksLoading, sortedByFilterTasksWithActive } from '#/@store/tasks';
import { searchTerm } from '#/@store/tasksFilter';
import { isTimerStarted } from '#/@store/timer';
import { currentTaskId } from '#/@store/timer';

import { TasksListJsx } from './tasks-list';

import { IProject, IState } from '@types';

interface ITaskListMapped {
  allTaskLength: number;
  currentTaskId?: number | string;
  getProjectById: (p: number) => IProject;
  isTasksLoaded: boolean;
  isTasksLoading: boolean;
  isTimerStarted: boolean;
  searchTerm?: string;
  tasks: any[];
}

const mapStateToProps = createStructuredSelector<IState, ITaskListMapped>({
  allTaskLength,
  currentTaskId,
  getProjectById,
  isTasksLoaded,
  isTasksLoading,
  isTimerStarted,
  searchTerm,
  tasks: sortedByFilterTasksWithActive,
});

const mapDispatch = {
  fetchProjectsDetails,
};

export default connect(mapStateToProps, mapDispatch)(TasksListJsx);
