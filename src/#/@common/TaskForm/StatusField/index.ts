import { connect } from 'react-redux';
import { change } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { IState } from '@types';

import TaskStatus from '@components/TaskStatus';
import { projectMembersAsUsers } from '#/@store/projects';
import { allStatuses, EDIT_TASK_FORM, stopUserWork } from '#/@store/tasks';

interface IStatusFieldState {
  assignees: any[];
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

export default connect<any, any, any, any>(
  mapState,
  mapDispatch
)(TaskStatus);
