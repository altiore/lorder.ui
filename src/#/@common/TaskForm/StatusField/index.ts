import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import TaskStatus from '@components/TaskStatus';

import { projectMembersAsUsers } from '#/@store/projects';
import { allStatuses, EDIT_TASK_FORM } from '#/@store/tasks';
import { stopUserWork } from '#/@store/user-works';

import { change } from 'redux-form';

import { IState, IUser } from '@types';

interface IStatusFieldState {
  assignees: IUser[];
  statuses: string[];
}

const mapState = createStructuredSelector<IState, IStatusFieldState>({
  assignees: projectMembersAsUsers,
  statuses: allStatuses,
});

const onChangeAssignee = value => change(EDIT_TASK_FORM, 'performerId', value);

const mapDispatch = {
  onChangeAssignee,
  onStop: stopUserWork,
};

export default connect<IStatusFieldState, any, any, any>(
  mapState,
  mapDispatch
)(TaskStatus);
