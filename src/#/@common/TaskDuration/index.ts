import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { getTaskById } from '#/@store/tasks';
import { currentTaskId } from '#/@store/timer';

import { TaskDurationTsx } from './TaskDuration';

interface ITaskDurationOwn {
  taskId: number | string;
}

const mapStateToProps = createStructuredSelector({
  currentTaskId,
  getTaskById,
} as any);

const TaskDuration: (props: ITaskDurationOwn) => JSX.Element = connect(mapStateToProps as any)(TaskDurationTsx) as any;

export default TaskDuration;
