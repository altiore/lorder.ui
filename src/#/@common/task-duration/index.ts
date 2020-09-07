import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { getTaskById } from '#/@store/tasks';
import { currentTaskId } from '#/@store/timer';
import { isPaused } from '#/@store/user-works';

import { TaskDurationTsx } from './task-duration';

import { IState, ITask } from '@types';

interface ITaskDurationOwn {
  taskId: number | string;
}

interface IMapped {
  currentTaskId?: number | string;
  getTaskById: (id: number) => ITask | undefined;
  isPaused: boolean;
}

const mapStateToProps = createStructuredSelector<IState, IMapped>({
  currentTaskId,
  getTaskById,
  isPaused,
});

const TaskDuration: (props: ITaskDurationOwn) => JSX.Element = connect(mapStateToProps as any)(TaskDurationTsx) as any;

export default TaskDuration;
