import { connect } from 'react-redux';

import { change } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { projectMembersAsUsers } from '#/@store/projects';
import { canStartTask, EDIT_TASK_FORM, getTaskBySequenceNumber } from '#/@store/tasks';
import { stopUserWork } from '#/@store/user-works';

import { TaskStatus } from './task-status';

import { IState, ITask, IUser } from '@types';

interface IStatusFieldState {
  assignees: IUser[];
  canStartTask: (a: number, b: number) => boolean;
  getTaskBySequenceNumber: (a: number, b: number) => undefined | ITask;
}

const mapState = createStructuredSelector<IState, IStatusFieldState>({
  assignees: projectMembersAsUsers,
  canStartTask,
  getTaskBySequenceNumber,
});

const onChangeAssignee = value => change(EDIT_TASK_FORM, 'performerId', value);

const mapDispatch = {
  onChangeAssignee,
  onStop: stopUserWork,
};

export default connect<IStatusFieldState, any, any, any>(mapState, mapDispatch)(TaskStatus);
